import { db } from '../utils/firebase.js';
import { sendSupportEmail } from '../utils/mailjet.js';
import { validateTicket, sanitizeTicketData } from '../utils/validation.js';

// Fallback in-memory storage for development
let tickets = [];
let ticketIdCounter = 1;

const COLLECTION_NAME = 'tickets';

// Helper function to generate random 3-digit ticket number
const generateTicketNumber = () => {
  // Generate random number between 100 and 999 (inclusive)
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  return randomNumber.toString();
};

// Helper function to check if ticket number already exists
const isTicketNumberUnique = async (ticketNumber) => {
  if (!db) {
    // For in-memory storage, check the tickets array
    return !tickets.some(ticket => ticket.ticketNumber === ticketNumber);
  }

  try {
    const snapshot = await db.collection(COLLECTION_NAME)
      .where('ticket_number', '==', ticketNumber)
      .limit(1)
      .get();
    
    return snapshot.empty; // Returns true if no documents found (unique)
  } catch (error) {
    console.error('Error checking ticket number uniqueness:', error);
    return false; // Assume not unique on error to be safe
  }
};

// Helper function to generate unique ticket number
const generateUniqueTicketNumber = async (maxAttempts = 10) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const ticketNumber = generateTicketNumber();
    const isUnique = await isTicketNumberUnique(ticketNumber);
    
    if (isUnique) {
      return ticketNumber;
    }
  }
  
  // If we can't find a unique number after maxAttempts, fall back to timestamp-based
  console.warn('Could not generate unique 3-digit ticket number, falling back to timestamp');
  return (Date.now() % 1000).toString().padStart(3, '0');
};

// Helper function to convert Firestore timestamp to ISO string
const timestampToISO = (timestamp) => {
  if (!timestamp) return null;
  return timestamp.toDate ? timestamp.toDate().toISOString() : timestamp;
};

// Helper function to convert Firestore document to plain object
const docToObject = (doc) => {
  if (!doc.exists) return null;
  
  const data = doc.data();
  const converted = { 
    id: doc.id,
    ticketNumber: data.ticket_number || data.ticketNumber 
  };
  
  // Convert timestamps and other special types
  Object.keys(data).forEach(key => {
    if (data[key] && typeof data[key].toDate === 'function') {
      converted[key] = data[key].toDate().toISOString();
    } else {
      converted[key] = data[key];
    }
  });
  
  return converted;
};

// Helper function to convert query snapshot to array of objects
const queryToArray = (querySnapshot) => {
  return querySnapshot.docs.map(doc => docToObject(doc));
};

// Helper function to get priority flag for subject line
const getPriorityFlag = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'urgent':
      return 'URGENT ';
    case 'high':
      return ' HIGH PRIORITY ';
    default:
      return '';
  }
};

const ticketController = {
  // Get all tickets
  async getAllTickets(req, res) {
    try {
      if (db) {
        const snapshot = await db.collection(COLLECTION_NAME)
          .orderBy('created_at', 'desc')
          .get();
        
        const tickets = queryToArray(snapshot);
        
        return res.json({ 
          success: true, 
          data: tickets || [], 
          count: tickets?.length || 0 
        });
      }
      
      // Fallback to in-memory storage
      console.log('Using in-memory storage - Firebase not configured');
      res.json({
        success: true,
        data: tickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
        count: tickets.length
      });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tickets',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get single ticket by Firebase ID or ticket number
  async getTicket(req, res) {
    try {
      const { id } = req.params;
      
      if (db) {
        let doc;
        
        // First try to get by Firebase document ID
        doc = await db.collection(COLLECTION_NAME).doc(id).get();
        
        // If not found and ID is 3 digits, search by ticket_number field
        if (!doc.exists && /^\d{3}$/.test(id)) {
          const snapshot = await db.collection(COLLECTION_NAME)
            .where('ticket_number', '==', id)
            .limit(1)
            .get();
          
          if (!snapshot.empty) {
            doc = snapshot.docs[0];
          }
        }
        
        if (!doc || !doc.exists) {
          return res.status(404).json({
            success: false,
            message: 'Ticket not found'
          });
        }
        
        const ticket = docToObject(doc);
        return res.json({ success: true, data: ticket });
      }
      
      // Fallback to in-memory storage
      const ticket = tickets.find(t => 
        t.id === parseInt(id) || t.ticketNumber === id
      );
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found'
        });
      }
      
      res.json({ success: true, data: ticket });
    } catch (error) {
      console.error('Error fetching ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch ticket',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Create new ticket
  async createTicket(req, res) {
    try {
      let ticketData = req.body;
      
      // Sanitize input data
      ticketData = sanitizeTicketData(ticketData);
      
      // Validate input
      const validation = validateTicket(ticketData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      // Generate unique 3-digit ticket number
      const ticketNumber = await generateUniqueTicketNumber();

      const newTicket = {
        ticket_number: ticketNumber,
        title: ticketData.title.trim(),
        description: ticketData.description.trim(),
        priority: ticketData.priority || 'medium',
        category: ticketData.category || 'general',
        status: 'open',
        user_email: ticketData.userEmail?.trim(),
        user_name: ticketData.userName?.trim(),
        created_at: new Date(),
        updated_at: new Date()
      };

      let createdTicket;

      if (db) {
        const docRef = await db.collection(COLLECTION_NAME).add(newTicket);
        const doc = await docRef.get();
        createdTicket = docToObject(doc);
      } else {
        // Fallback to in-memory storage
        createdTicket = {
          ...newTicket,
          id: ticketIdCounter++,
          ticketNumber: ticketNumber,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        tickets.push(createdTicket);
        console.log('Ticket created in memory:', createdTicket);
      }

      // Send confirmation email using Support department
      if (createdTicket.user_email) {
        try {
          const displayTicketNumber = createdTicket.ticketNumber || createdTicket.ticket_number;
          const userName = createdTicket.user_name || '';
          const subject = `Support Ticket Confirmation - ${createdTicket.title} (#${displayTicketNumber})`;
          
          const bodyContent = `
            <h2>Support Ticket Confirmation</h2>
            <p>Thank you for submitting your support ticket. We have received your request and we will get back to you soon.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Ticket Details</h3>
              <p><strong>Ticket Number:</strong> #${displayTicketNumber}</p>
              <p><strong>Title:</strong> ${createdTicket.title}</p>
              <p><strong>Priority:</strong> ${createdTicket.priority}</p>
              <p><strong>Category:</strong> ${createdTicket.category}</p>
              <p><strong>Status:</strong> ${createdTicket.status}</p>
              <p><strong>Created:</strong> ${new Date(createdTicket.created_at).toLocaleString()}</p>
            </div>
            
            <div style="background-color: #fff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
              <h4>Description:</h4>
              <p>${createdTicket.description}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              You will receive email updates when there are changes to your ticket. Please reference ticket number <strong>#${displayTicketNumber}</strong> in any correspondence.
            </p>
            
            <p style="margin-top: 25px;">
              <strong>Need assistance?</strong><br>
              You can reply directly to this email
            </p>
          `;

          // Send confirmation to customer
          await sendSupportEmail(
            createdTicket.user_email, 
            subject, 
            bodyContent, 
            userName,
            null, // replyToEmail (will use support default)
            []    // ccEmails
          );

          // Send internal notification to support team
          const priorityFlag = getPriorityFlag(createdTicket.priority);
          const internalSubject = `${priorityFlag}New Ticket #${displayTicketNumber} - ${createdTicket.title}`;
          const internalBodyContent = `
            New support ticket submitted:

            Ticket #${displayTicketNumber}
            Title: ${createdTicket.title}
            Priority: ${createdTicket.priority.toUpperCase()}
            Category: ${createdTicket.category}
            Status: ${createdTicket.status}
            Submitted: ${new Date(createdTicket.created_at).toLocaleString()}

            Customer:
            Name: ${createdTicket.user_name || 'Not provided'}
            Email: ${createdTicket.user_email}

            Description:
            ${createdTicket.description}

            Reply to customer: ${createdTicket.user_email}
          `;

          // Send internal notification
          await sendSupportEmail(
            'weboidnz@gmail.com',
            internalSubject,
            internalBodyContent,
            'Weboid System',
            null,
            []
          );

        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the request if email fails
        }
      }

      res.status(201).json({
        success: true,
        message: 'Ticket created successfully',
        data: createdTicket
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create ticket',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Update ticket
  async updateTicket(req, res) {
    try {
      const { id } = req.params;
      let updates = req.body;

      // Sanitise updates
      updates = sanitizeTicketData(updates);
      updates.updated_at = new Date();

      if (db) {
        let docRef;
        let doc;
        
        // First try to get by Firebase document ID
        docRef = db.collection(COLLECTION_NAME).doc(id);
        doc = await docRef.get();
        
        // If not found and ID is 3 digits, search by ticket_number field
        if (!doc.exists && /^\d{3}$/.test(id)) {
          const snapshot = await db.collection(COLLECTION_NAME)
            .where('ticket_number', '==', id)
            .limit(1)
            .get();
          
          if (!snapshot.empty) {
            docRef = snapshot.docs[0].ref;
            doc = snapshot.docs[0];
          }
        }
        
        if (!doc || !doc.exists) {
          return res.status(404).json({
            success: false,
            message: 'Ticket not found'
          });
        }
        
        await docRef.update(updates);
        
        // Get updated document
        const updatedDoc = await docRef.get();
        const updatedTicket = docToObject(updatedDoc);
        
        // Send update notification using Support department if email exists and status changed
        if (updatedTicket.user_email && updates.status) {
          try {
            const displayTicketNumber = updatedTicket.ticketNumber || updatedTicket.ticket_number;
            const userName = updatedTicket.user_name || 'there';
            const subject = `Support Ticket Update - ${updatedTicket.title} (#${displayTicketNumber})`;
            
            const bodyContent = `
              <h2>Support Ticket Update</h2>
              <p>Your support ticket has been updated. Here are the latest details:</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Ticket Details</h3>
                <p><strong>Ticket Number:</strong> #${displayTicketNumber}</p>
                <p><strong>Title:</strong> ${updatedTicket.title}</p>
                <p><strong>Priority:</strong> ${updatedTicket.priority}</p>
                <p><strong>Status:</strong> ${updatedTicket.status}</p>
                <p><strong>Last Updated:</strong> ${new Date(updatedTicket.updated_at).toLocaleString()}</p>
              </div>
              
              <div style="background-color: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
                <h4>Status Update:</h4>
                <p>Your ticket status has been updated to: <strong>${updatedTicket.status}</strong></p>
                ${updatedTicket.status === 'resolved' ? 
                  '<p style="color: #059669; font-weight: 600;">✅ Your ticket has been resolved! If you need further assistance, please reply to this email.</p>' :
                  updatedTicket.status === 'in_progress' ?
                  '<p style="color: #0284c7; font-weight: 600;">🔄 Our support team is actively working on your ticket.</p>' :
                  ''
                }
              </div>
              
              <p style="color: #666; font-size: 14px;">
                Please reference ticket number <strong>#${displayTicketNumber}</strong> in any correspondence regarding this ticket.
              </p>
              
              <p style="margin-top: 25px;">
                <strong>Need to add more information?</strong><br>
                You can reply directly to this email
              </p>
            `;

            // Send update notification to customer
            await sendSupportEmail(
              updatedTicket.user_email, 
              subject, 
              bodyContent, 
              userName,
              null, // replyToEmail (will use support default)
              []    // ccEmails
            );

            // Send internal update notification to support team
            const priorityFlag = getPriorityFlag(updatedTicket.priority);
            const internalSubject = `${priorityFlag}Ticket Update #${displayTicketNumber} - Status: ${updatedTicket.status}`;
            const internalBodyContent = `
              Support ticket updated:

              Ticket #${displayTicketNumber}
              Title: ${updatedTicket.title}
              Priority: ${updatedTicket.priority.toUpperCase()}
              Status: ${updatedTicket.status.toUpperCase()}
              Updated: ${new Date(updatedTicket.updated_at).toLocaleString()}

              Customer:
              Name: ${updatedTicket.user_name || 'Not provided'}
              Email: ${updatedTicket.user_email}

              Customer has been notified of this update.
              Reply to customer: ${updatedTicket.user_email}
            `;

            // Send internal notification
            await sendSupportEmail(
              'weboidnz@gmail.com',
              internalSubject,
              internalBodyContent,
              'Weboid System',
              null,
              []
            );

          } catch (emailError) {
            console.error('Failed to send update email:', emailError);
          }
        }
        
        return res.json({ 
          success: true, 
          message: 'Ticket updated successfully', 
          data: updatedTicket 
        });
      }

      // Fallback to in-memory storage
      const ticketIndex = tickets.findIndex(t => 
        t.id === parseInt(id) || t.ticketNumber === id
      );
      if (ticketIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found'
        });
      }

      const updatedTicket = {
        ...tickets[ticketIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      tickets[ticketIndex] = updatedTicket;

      // Send update email for in-memory storage using Support department
      if (updatedTicket.user_email && updates.status) {
        try {
          const displayTicketNumber = updatedTicket.ticketNumber || updatedTicket.ticket_number;
          const userName = updatedTicket.user_name || 'there';
          const subject = `Support Ticket Update - ${updatedTicket.title} (#${displayTicketNumber})`;
          
          const bodyContent = `
            <h2>Support Ticket Update</h2>
            <p>Your support ticket has been updated. Here are the latest details:</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Ticket Details</h3>
              <p><strong>Ticket Number:</strong> #${displayTicketNumber}</p>
              <p><strong>Title:</strong> ${updatedTicket.title}</p>
              <p><strong>Priority:</strong> ${updatedTicket.priority}</p>
              <p><strong>Status:</strong> ${updatedTicket.status}</p>
              <p><strong>Last Updated:</strong> ${new Date(updatedTicket.updated_at).toLocaleString()}</p>
            </div>
            
            <div style="background-color: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
              <h4>Status Update:</h4>
              <p>Your ticket status has been updated to: <strong>${updatedTicket.status}</strong></p>
              ${updatedTicket.status === 'resolved' ? 
                '<p style="color: #059669; font-weight: 600;">✅ Your ticket has been resolved! If you need further assistance, please reply to this email.</p>' :
                updatedTicket.status === 'in_progress' ?
                '<p style="color: #0284c7; font-weight: 600;">🔄 Our support team is actively working on your ticket.</p>' :
                ''
              }
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Please reference ticket number <strong>#${displayTicketNumber}</strong> in any correspondence regarding this ticket.
            </p>
            
            <p style="margin-top: 25px;">
              <strong>Need to add more information?</strong><br>
              You can reply directly to this email and it will be added to your ticket automatically.
            </p>
          `;

          // Send update notification to customer
          await sendSupportEmail(
            updatedTicket.user_email, 
            subject, 
            bodyContent, 
            userName,
            null, // replyToEmail (will use support default)
            []    // ccEmails
          );

          // Send internal update notification to support team - SIMPLIFIED TEXT VERSION
          const priorityFlag = getPriorityFlag(updatedTicket.priority);
          const internalSubject = `${priorityFlag}Ticket Update #${displayTicketNumber} - Status: ${updatedTicket.status}`;
          const internalBodyContent = `
            Support ticket updated:

            Ticket #${displayTicketNumber}
            Title: ${updatedTicket.title}
            Priority: ${updatedTicket.priority.toUpperCase()}
            Status: ${updatedTicket.status.toUpperCase()}
            Updated: ${new Date(updatedTicket.updated_at).toLocaleString()}

            Customer:
            Name: ${updatedTicket.user_name || 'Not provided'}
            Email: ${updatedTicket.user_email}

            Customer has been notified of this update.
            Reply to customer: ${updatedTicket.user_email}
          `;

          // Send internal notification
          await sendSupportEmail(
            'weboidnz@gmail.com',
            internalSubject,
            internalBodyContent,
            'Weboid System',
            null,
            []
          );

        } catch (emailError) {
          console.error('Failed to send update email:', emailError);
        }
      }

      res.json({
        success: true,
        message: 'Ticket updated successfully',
        data: updatedTicket
      });
    } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update ticket',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Delete ticket
  async deleteTicket(req, res) {
    try {
      const { id } = req.params;

      if (db) {
        let docRef;
        let doc;
        
        // First try to get by Firebase document ID
        docRef = db.collection(COLLECTION_NAME).doc(id);
        doc = await docRef.get();
        
        // If not found and ID is 3 digits, search by ticket_number field
        if (!doc.exists && /^\d{3}$/.test(id)) {
          const snapshot = await db.collection(COLLECTION_NAME)
            .where('ticket_number', '==', id)
            .limit(1)
            .get();
          
          if (!snapshot.empty) {
            docRef = snapshot.docs[0].ref;
            doc = snapshot.docs[0];
          }
        }
        
        if (!doc || !doc.exists) {
          return res.status(404).json({
            success: false,
            message: 'Ticket not found'
          });
        }
        
        const ticketData = docToObject(doc);
        await docRef.delete();
        
        return res.json({ 
          success: true, 
          message: 'Ticket deleted successfully', 
          data: ticketData 
        });
      }

      // Fallback to in-memory storage
      const ticketIndex = tickets.findIndex(t => 
        t.id === parseInt(id) || t.ticketNumber === id
      );
      if (ticketIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found'
        });
      }

      const deletedTicket = tickets.splice(ticketIndex, 1)[0];

      res.json({
        success: true,
        message: 'Ticket deleted successfully',
        data: deletedTicket
      });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete ticket',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get tickets by status
  async getTicketsByStatus(req, res) {
    try {
      const { status } = req.params;
      
      if (db) {
        const snapshot = await db.collection(COLLECTION_NAME)
          .where('status', '==', status)
          .orderBy('created_at', 'desc')
          .get();
        
        const tickets = queryToArray(snapshot);
        
        return res.json({ 
          success: true, 
          data: tickets || [], 
          count: tickets?.length || 0 
        });
      }
      
      // Fallback to in-memory storage
      const filteredTickets = tickets
        .filter(ticket => ticket.status === status)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      res.json({
        success: true,
        data: filteredTickets,
        count: filteredTickets.length
      });
    } catch (error) {
      console.error('Error fetching tickets by status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tickets by status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

export default ticketController;