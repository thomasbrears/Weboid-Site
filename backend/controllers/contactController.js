import { db } from '../utils/firebase.js';
import { sendSupportEmail, sendGeneralEmail } from '../utils/mailjet.js';
import { validateContactData, sanitizeContactData } from '../utils/validation.js';

// Fallback in-memory storage for development
let contacts = [];
let contactIdCounter = 1;

const COLLECTION_NAME = 'contacts';

// Helper function to generate random 3-digit contact reference number
const generateContactNumber = () => {
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  return randomNumber.toString();
};

// Helper function to check if contact number already exists
const isContactNumberUnique = async (contactNumber) => {
  if (!db) {
    return !contacts.some(contact => contact.contactNumber === contactNumber);
  }

  try {
    const snapshot = await db.collection(COLLECTION_NAME)
      .where('contact_number', '==', contactNumber)
      .limit(1)
      .get();
    
    return snapshot.empty;
  } catch (error) {
    console.error('Error checking contact number uniqueness:', error);
    return false;
  }
};

// Helper function to generate unique contact number
const generateUniqueContactNumber = async (maxAttempts = 10) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const contactNumber = generateContactNumber();
    const isUnique = await isContactNumberUnique(contactNumber);
    
    if (isUnique) {
      return contactNumber;
    }
  }
  
  console.warn('Could not generate unique 3-digit contact number, falling back to timestamp');
  return (Date.now() % 1000).toString().padStart(3, '0');
};

// Helper function to convert Firestore document to plain object
const docToObject = (doc) => {
  if (!doc.exists) return null;
  
  const data = doc.data();
  const converted = { 
    id: doc.id,
    contactNumber: data.contact_number || data.contactNumber 
  };
  
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

const contactController = {
  // Get all contacts
  async getAllContacts(req, res) {
    try {
      if (db) {
        const snapshot = await db.collection(COLLECTION_NAME)
          .orderBy('created_at', 'desc')
          .get();
        
        const contacts = queryToArray(snapshot);
        
        return res.json({ 
          success: true, 
          data: contacts || [], 
          count: contacts?.length || 0 
        });
      }
      
      console.log('Using in-memory storage - Firebase not configured');
      res.json({
        success: true,
        data: contacts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
        count: contacts.length
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contacts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get single contact by Firebase ID or contact number
  async getContact(req, res) {
    try {
      const { id } = req.params;
      
      if (db) {
        let doc;
        
        doc = await db.collection(COLLECTION_NAME).doc(id).get();
        
        if (!doc.exists && /^\d{3}$/.test(id)) {
          const snapshot = await db.collection(COLLECTION_NAME)
            .where('contact_number', '==', id)
            .limit(1)
            .get();
          
          if (!snapshot.empty) {
            doc = snapshot.docs[0];
          }
        }
        
        if (!doc || !doc.exists) {
          return res.status(404).json({
            success: false,
            message: 'Contact not found'
          });
        }
        
        const contact = docToObject(doc);
        return res.json({ success: true, data: contact });
      }
      
      const contact = contacts.find(c => 
        c.id === parseInt(id) || c.contactNumber === id
      );
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }
      
      res.json({ success: true, data: contact });
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Create general contact submission
  async createContact(req, res) {
    try {
      let contactData = req.body;
      
      contactData = sanitizeContactData(contactData);
      
      const validation = validateContactData(contactData);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      const contactNumber = await generateUniqueContactNumber();

      const newContact = {
        contact_number: contactNumber,
        type: contactData.type || 'general',
        name: contactData.name?.trim(),
        email: contactData.email?.trim(),
        phone: contactData.phone?.trim(),
        subject: contactData.subject?.trim(),
        message: contactData.message?.trim(),
        company: contactData.company?.trim(),
        website: contactData.website?.trim(),
        source: contactData.source || 'website',
        status: 'new',
        created_at: new Date(),
        updated_at: new Date()
      };

      let createdContact;

      if (db) {
        const docRef = await db.collection(COLLECTION_NAME).add(newContact);
        const doc = await docRef.get();
        createdContact = docToObject(doc);
      } else {
        createdContact = {
          ...newContact,
          id: contactIdCounter++,
          contactNumber: contactNumber,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        contacts.push(createdContact);
        console.log('Contact created in memory:', createdContact);
      }

      // Send confirmation email
      if (createdContact.email) {
        try {
          const displayContactNumber = createdContact.contactNumber || createdContact.contact_number;
          const userName = createdContact.name || '';
          const subject = `Contact Confirmation - We've received your message (#${displayContactNumber})`;
          
          const bodyContent = `
            <h2>Thank you for contacting Weboid!</h2>
            <p>We've received your message and we'll get back to you within 24 hours.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Contact Details</h3>
              <p><strong>Reference Number:</strong> #${displayContactNumber}</p>
              <p><strong>Name:</strong> ${createdContact.name}</p>
              <p><strong>Email:</strong> ${createdContact.email}</p>
              ${createdContact.phone ? `<p><strong>Phone:</strong> ${createdContact.phone}</p>` : ''}
              ${createdContact.company ? `<p><strong>Company:</strong> ${createdContact.company}</p>` : ''}
              ${createdContact.subject ? `<p><strong>Subject:</strong> ${createdContact.subject}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date(createdContact.created_at).toLocaleString()}</p>
            </div>
            
            <div style="background-color: #fff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
              <h4>Your Message:</h4>
              <p>${createdContact.message}</p>
            </div>
            
            <p>We appreciate your interest in Weboid and look forward to helping you with your website needs.</p>
            
            <p style="color: #666; font-size: 14px;">
              You will receive email updates regarding your inquiry. Please reference #${displayContactNumber} in any correspondence.
            </p>
          `;

          await sendGeneralEmail(
            createdContact.email, 
            subject, 
            bodyContent, 
            userName
          );

          // Send internal notification
          const internalSubject = `New Contact Submission #${displayContactNumber} - ${createdContact.subject || 'General Inquiry'}`;
          const internalBodyContent = `
            New contact form submission:

            Reference #${displayContactNumber}
            Type: ${createdContact.type.toUpperCase()}
            Name: ${createdContact.name || 'Not provided'}
            Email: ${createdContact.email}
            Phone: ${createdContact.phone || 'Not provided'}
            Company: ${createdContact.company || 'Not provided'}
            Website: ${createdContact.website || 'Not provided'}
            Subject: ${createdContact.subject || 'Not provided'}
            Source: ${createdContact.source}
            Submitted: ${new Date(createdContact.created_at).toLocaleString()}

            Message:
            ${createdContact.message}

            Reply to: ${createdContact.email}
          `;

          await sendGeneralEmail(
            'weboidnz@gmail.com',
            internalSubject,
            internalBodyContent,
            'Weboid System'
          );

        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Contact submission received successfully',
        data: createdContact
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Create website assessment submission
  async createWebsiteAssessment(req, res) {
    try {
      let assessmentData = req.body;
      
      assessmentData = sanitizeContactData(assessmentData);
      
      const validation = validateContactData(assessmentData, 'assessment');
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      const contactNumber = await generateUniqueContactNumber();

      const newAssessment = {
        contact_number: contactNumber,
        type: 'website_assessment',
        name: assessmentData.name?.trim(),
        email: assessmentData.email?.trim(),
        phone: assessmentData.phone?.trim(),
        business: assessmentData.business?.trim(),
        current_website: assessmentData.currentWebsite?.trim(),
        challenges: assessmentData.challenges?.trim(),
        goals: assessmentData.goals?.trim(),
        source: 'landing_page_assessment',
        status: 'new',
        priority: 'high', // Website assessments are high priority
        created_at: new Date(),
        updated_at: new Date()
      };

      let createdAssessment;

      if (db) {
        const docRef = await db.collection(COLLECTION_NAME).add(newAssessment);
        const doc = await docRef.get();
        createdAssessment = docToObject(doc);
      } else {
        createdAssessment = {
          ...newAssessment,
          id: contactIdCounter++,
          contactNumber: contactNumber,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        contacts.push(createdAssessment);
        console.log('Website assessment created in memory:', createdAssessment);
      }

      // Send confirmation email for website assessment
      if (createdAssessment.email) {
        try {
          const displayContactNumber = createdAssessment.contactNumber || createdAssessment.contact_number;
          const userName = createdAssessment.name || '';
          const subject = `Website Assessment Request Received - We'll call you within 24 hours! (#${displayContactNumber})`;
          
          const bodyContent = `
            <h2>Thank you for requesting a Website Assessment!</h2>
            <p>We've received your website assessment request and Thomas will personally call you back within 24 hours to discuss your needs.</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Assessment Request Details</h3>
              <p><strong>Reference Number:</strong> #${displayContactNumber}</p>
              <p><strong>Name:</strong> ${createdAssessment.name}</p>
              <p><strong>Email:</strong> ${createdAssessment.email}</p>
              <p><strong>Phone:</strong> ${createdAssessment.phone}</p>
              ${createdAssessment.business ? `<p><strong>Business:</strong> ${createdAssessment.business}</p>` : ''}
              ${createdAssessment.current_website ? `<p><strong>Current Website:</strong> ${createdAssessment.current_website}</p>` : ''}
              <p><strong>Priority:</strong> High Priority Assessment</p>
              <p><strong>Submitted:</strong> ${new Date(createdAssessment.created_at).toLocaleString()}</p>
            </div>
            
            ${createdAssessment.challenges ? `
            <div style="background-color: #fff; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
              <h4>Current Website Challenges:</h4>
              <p>${createdAssessment.challenges}</p>
            </div>` : ''}
            
            ${createdAssessment.goals ? `
            <div style="background-color: #fff; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <h4>Website Goals:</h4>
              <p>${createdAssessment.goals}</p>
            </div>` : ''}
            
            <div style="background-color: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
              <h4>What happens next:</h4>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Thomas will personally review your information</li>
                <li>You'll receive a call within 24 hours</li>
                <li>We'll provide honest advice about what would work best</li>
                <li>No obligation, no sales pressure</li>
              </ul>
            </div>
            
            <p>We're excited to help you create a website that actually works for your business!</p>
            
            <p style="color: #666; font-size: 14px;">
              Please reference assessment #${displayContactNumber} if you need to contact us before we call you.
            </p>
          `;

          await sendGeneralEmail(
            createdAssessment.email, 
            subject, 
            bodyContent, 
            userName
          );

          // Send urgent internal notification for website assessment
          const internalSubject = `🚨 HIGH PRIORITY - New Website Assessment #${displayContactNumber} - ${createdAssessment.business || createdAssessment.name}`;
          const internalBodyContent = `
            HIGH PRIORITY WEBSITE ASSESSMENT REQUEST:

            Reference #${displayContactNumber}
            Name: ${createdAssessment.name}
            Email: ${createdAssessment.email}
            Phone: ${createdAssessment.phone}
            Business: ${createdAssessment.business || 'Not provided'}
            Current Website: ${createdAssessment.current_website || 'None provided'}
            Source: Landing Page Assessment Form
            Submitted: ${new Date(createdAssessment.created_at).toLocaleString()}

            CURRENT WEBSITE CHALLENGES:
            ${createdAssessment.challenges || 'Not specified'}

            WEBSITE GOALS:
            ${createdAssessment.goals || 'Not specified'}

            ⚡ ACTION REQUIRED: Call ${createdAssessment.name} at ${createdAssessment.phone} within 24 hours
            📧 Reply to: ${createdAssessment.email}

            Customer has been sent confirmation email and is expecting a call within 24 hours.
          `;

          await sendGeneralEmail(
            'weboidnz@gmail.com',
            internalSubject,
            internalBodyContent,
            'Weboid System'
          );

        } catch (emailError) {
          console.error('Failed to send assessment confirmation email:', emailError);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Website assessment request received successfully! We\'ll call you within 24 hours.',
        data: createdAssessment
      });
    } catch (error) {
      console.error('Error creating website assessment:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit website assessment request',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Update contact
  async updateContact(req, res) {
    try {
      const { id } = req.params;
      let updates = req.body;

      updates = sanitizeContactData(updates);
      updates.updated_at = new Date();

      if (db) {
        let docRef;
        let doc;
        
        docRef = db.collection(COLLECTION_NAME).doc(id);
        doc = await docRef.get();
        
        if (!doc.exists && /^\d{3}$/.test(id)) {
          const snapshot = await db.collection(COLLECTION_NAME)
            .where('contact_number', '==', id)
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
            message: 'Contact not found'
          });
        }
        
        await docRef.update(updates);
        
        const updatedDoc = await docRef.get();
        const updatedContact = docToObject(updatedDoc);
        
        return res.json({ 
          success: true, 
          message: 'Contact updated successfully', 
          data: updatedContact 
        });
      }

      const contactIndex = contacts.findIndex(c => 
        c.id === parseInt(id) || c.contactNumber === id
      );
      if (contactIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      const updatedContact = {
        ...contacts[contactIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      contacts[contactIndex] = updatedContact;

      res.json({
        success: true,
        message: 'Contact updated successfully',
        data: updatedContact
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update contact',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Delete contact
  async deleteContact(req, res) {
    try {
      const { id } = req.params;

      if (db) {
        let docRef;
        let doc;
        
        docRef = db.collection(COLLECTION_NAME).doc(id);
        doc = await docRef.get();
        
        if (!doc.exists && /^\d{3}$/.test(id)) {
          const snapshot = await db.collection(COLLECTION_NAME)
            .where('contact_number', '==', id)
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
            message: 'Contact not found'
          });
        }
        
        const contactData = docToObject(doc);
        await docRef.delete();
        
        return res.json({ 
          success: true, 
          message: 'Contact deleted successfully', 
          data: contactData 
        });
      }

      const contactIndex = contacts.findIndex(c => 
        c.id === parseInt(id) || c.contactNumber === id
      );
      if (contactIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Contact not found'
        });
      }

      const deletedContact = contacts.splice(contactIndex, 1)[0];

      res.json({
        success: true,
        message: 'Contact deleted successfully',
        data: deletedContact
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete contact',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get contacts by type
  async getContactsByType(req, res) {
    try {
      const { type } = req.params;
      
      if (db) {
        const snapshot = await db.collection(COLLECTION_NAME)
          .where('type', '==', type)
          .orderBy('created_at', 'desc')
          .get();
        
        const contacts = queryToArray(snapshot);
        
        return res.json({ 
          success: true, 
          data: contacts || [], 
          count: contacts?.length || 0 
        });
      }
      
      const filteredContacts = contacts
        .filter(contact => contact.type === type)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      res.json({
        success: true,
        data: filteredContacts,
        count: filteredContacts.length
      });
    } catch (error) {
      console.error('Error fetching contacts by type:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contacts by type',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

export default contactController;