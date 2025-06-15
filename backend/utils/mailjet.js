import mailjet from 'node-mailjet';
import dotenv from 'dotenv';
import { db } from './firebase.js';

dotenv.config();

// Email department configurations
const EMAIL_DEPARTMENTS = {
  support: {
    fromEmail: 'support@weboid.dev',
    fromName: 'Weboid Support',
    replyTo: 'support@weboid.dev',
    signOffName: 'Support Team',
    signOffTitle: 'Weboid Support',
    description: 'Support Request'
  },
  accounts: {
    fromEmail: 'accounts@weboid.dev',
    fromName: 'Accounts and Billing',
    replyTo: 'accounts@weboid.dev',
    signOffName: 'Accounts Team',
    signOffTitle: 'Accounts & Billing, Weboid',
    description: 'Accounts & Billing'
  },
  general: {
    fromEmail: 'hello@weboid.dev',
    fromName: 'Weboid',
    replyTo: 'hello@weboid.dev',
    signOffName: 'Weboid',
    signOffTitle: 'Weboid',
    description: 'General Inquiry'
  },
  noreply: {
    fromEmail: 'noreply@weboid.dev',
    fromName: 'Weboid',
    replyTo: null, // No reply-to for system emails
    signOffName: 'Weboid',
    signOffTitle: 'Weboid',
    description: 'System Notification'
  },
  marketing: {
    fromEmail: 'digital@weboid.dev',
    fromName: 'Weboid',
    replyTo: 'kiaora@weboid.dev',
    signOffName: 'Weboid',
    signOffTitle: 'Weboid',
    description: 'Newsletter & Updates'
  }
};

// Initialise Mailjet API connection
const initializeMailjet = () => {
  try {
    if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
      console.error("WARNING: Mailjet API keys are not properly set in environment variables!");
      return null;
    }
    
    return mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
  } catch (error) {
    console.error("Failed to initialize Mailjet client:", error);
    throw new Error(`Mailjet initialization error: ${error.message}`);
  }
};

const MailJetConnection = initializeMailjet();

// Get email settings from database (with department overrides)
const getEmailSettings = async (department = 'general') => {
  try {
    let settings = {
      defaultFrom: process.env.FROM_EMAIL || "hello@weboid.dev",
      defaultReplyTo: process.env.DEFAULT_REPLY_TO || "hello@weboid.dev",
      defaultCc: []
    };

    if (db) {
      const snapshot = await db.collection("emailSettings").get();
      if (!snapshot.empty) {
        settings = { ...settings, ...snapshot.docs[0].data() };
      }
    }

    // Override with department-specific settings
    const deptConfig = EMAIL_DEPARTMENTS[department] || EMAIL_DEPARTMENTS.general;
    return {
      ...settings,
      department: department,
      fromEmail: deptConfig.fromEmail,
      fromName: deptConfig.fromName,
      replyTo: deptConfig.replyTo,
      signOffName: deptConfig.signOffName,
      signOffTitle: deptConfig.signOffTitle,
      description: deptConfig.description
    };
  } catch (error) {
    console.error("Error fetching email settings:", error);
    const deptConfig = EMAIL_DEPARTMENTS[department] || EMAIL_DEPARTMENTS.general;
    return {
      defaultFrom: process.env.FROM_EMAIL || "hello@weboid.dev",
      defaultReplyTo: process.env.DEFAULT_REPLY_TO || "hello@weboid.dev",
      defaultCc: [],
      department: department,
      fromEmail: deptConfig.fromEmail,
      fromName: deptConfig.fromName,
      replyTo: deptConfig.replyTo,
      signOffName: deptConfig.signOffName,
      signOffTitle: deptConfig.signOffTitle,
      description: deptConfig.description
    };
  }
};

// Helper function for generating the Weboid email template with dynamic signature
export const generateDefaultEmailTemplate = (bodyContent, recipientName = '', emailDescription = '', signOffName = 'Weboid Team', signOffTitle = 'Weboid', options = {}) => {
  const {
    logoUrl = 'https://www.weboid.dev/img/Logo25-WhiteTEXT-TransBG.png',
    logoAlt = 'Weboid',
    iconUrl = 'https://www.weboid.dev/img/WIcon25-White-TransBG.png',
    backgroundColor = '#f5f5f5',
    containerBackgroundColor = '#ffffff',
    headerBackgroundColor = '#000000',
    footerBackgroundColor = '#111827',
    primaryColor = '#2563eb',
    textColor = '#1f2937',
    lightTextColor = '#6b7280',
    footerTextColor = '#d1d5db'
  } = options;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: ${backgroundColor};
          line-height: 1.6;
        }
        .email-container {
          background-color: ${containerBackgroundColor};
          max-width: 600px;
          margin: 20px auto;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: ${headerBackgroundColor};
          padding: 30px 30px 20px 30px;
          border-bottom: 1px solid #e5e7eb;
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .logo-container {
          flex-shrink: 0;
        }
        .logo {
          max-height: 40px;
          width: auto;
        }
        .description-container {
          flex-grow: 1;
          text-align: right;
        }
        .email-description {
          color: #d1d5db;
          font-size: 14px;
          margin: 0;
          font-weight: 500;
        }
        @media only screen and (max-width: 480px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .description-container {
            text-align: left;
            width: 100%;
          }
        }
        .email-body {
          padding: 30px;
          color: ${textColor};
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: ${textColor};
        }
        .content {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 25px;
        }
        .content p {
          margin: 0 0 15px 0;
        }
        .content h1, .content h2, .content h3 {
          color: ${textColor};
          margin: 25px 0 15px 0;
        }
        .content h1 {
          font-size: 24px;
          font-weight: 700;
        }
        .content h2 {
          font-size: 20px;
          font-weight: 600;
        }
        .content h3 {
          font-size: 18px;
          font-weight: 600;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          margin: 20px 0;
          color: #ffffff;
          background-color: ${primaryColor};
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: background-color 0.2s;
        }
        .button:hover {
          background-color: #1d4ed8;
        }
        .signature {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 16px;
          color: ${textColor};
          font-weight: 500;
        }
        .footer {
          background-color: ${footerBackgroundColor};
          padding: 25px 30px;
          text-align: left;
          font-size: 13px;
          color: ${footerTextColor};
          line-height: 1.5;
        }
        .footer-section {
          margin-bottom: 15px;
        }
        .company-info {
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .contact-info {
          margin-bottom: 8px;
        }
        .contact-info a {
          color: #60a5fa;
          text-decoration: none;
        }
        .contact-info a:hover {
          text-decoration: underline;
        }
        .disclaimer-section {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #374151;
        }
        .disclaimer {
          font-size: 11px;
          color: #9ca3af;
          line-height: 1.4;
          margin-bottom: 15px;
        }
        .icon-container {
          text-align: center;
          margin-top: 15px;
        }
        .footer-icon {
          height: 24px;
          width: auto;
          opacity: 0.7;
        }
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 10px;
            border-radius: 4px;
          }
          .email-header, .email-body, .footer {
            padding: 20px;
          }
          .content {
            font-size: 15px;
          }
          .greeting {
            font-size: 17px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <div class="header-content">
            <div class="logo-container">
              <img src="${logoUrl}" alt="${logoAlt}" class="logo">
            </div>
            ${emailDescription ? `
            <div class="description-container">
              <p class="email-description">${emailDescription}</p>
            </div>` : ''}
          </div>
        </div>
        
        <div class="email-body">
          ${recipientName ? `<div class="greeting">Kia ora ${recipientName},</div>` : '<div class="greeting">Kia ora,</div>'}
          
          <div class="content">
            ${bodyContent}
          </div>
          
          <div class="signature">
            Regards,<br>
            <strong>${signOffName}</strong><br>
            <em>${signOffTitle}</em>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-section">
            <div class="company-info">Weboid - Aotearoa New Zealand | NZBN 9429050012305</div>
            <div class="contact-info">
              <strong>Billing & Accounts:</strong> <a href="mailto:accounts@weboid.dev">accounts@weboid.dev</a><br>
              <strong>Support:</strong> <a href="mailto:support@weboid.dev">support@weboid.dev</a><br>
              <strong>General:</strong> <a href="mailto:hello@weboid.dev">hello@weboid.dev</a>
            </div>
            <div style="margin-top: 8px; font-size: 12px;">
              You are receiving this email because you have an account with Weboid or have requested information from us.
            </div>
          </div>
          
          <div class="disclaimer-section">
            <div class="icon-container">
              <img src="${iconUrl}" alt="Weboid Icon" class="footer-icon">
            </div>
            
            <div class="disclaimer">
              The content of this message is confidential. If you have received it by mistake, please inform us by email reply and then delete the message. It is forbidden to copy, forward, or in any way reveal the contents of this message to anyone. The integrity and security of this email cannot be guaranteed over the Internet. Therefore, the sender will not be held liable for any damage caused by the message. Any reply to this email acknowledges acceptance of our Terms and Conditions and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Enhanced sendEmail function with department support
export const sendEmail = async (
  toEmail, 
  subject, 
  bodyContent, 
  recipientName = '', 
  department = 'general', // New parameter for department
  replyToEmail = null, 
  ccEmails = [], 
  options = {}
) => {  
  try {
    if (!toEmail) {
      throw new Error('Recipient email address is required');
    }

    if (!MailJetConnection) {
      console.log(`Mailjet credentials not configured. ${department.toUpperCase()} email would be sent to:`, toEmail);
      return { message: 'Email service not configured - development mode' };
    }
    
    // Get email settings with department configuration
    const emailSettings = await getEmailSettings(department);
    
    // Use department settings or provided overrides
    const fromEmail = options.fromEmail || emailSettings.fromEmail;
    const fromName = options.fromName || emailSettings.fromName;
    const replyTo = replyToEmail || emailSettings.replyTo;
    const emailDescription = options.emailDescription || emailSettings.description;
    
    const shouldUseCc = ccEmails && ccEmails.length > 0;
    const ccList = shouldUseCc ? ccEmails : [];
    
    // Use the enhanced Weboid email template with dynamic signature
    const htmlContent = generateDefaultEmailTemplate(
      bodyContent, 
      recipientName, 
      emailDescription,
      emailSettings.signOffName,
      emailSettings.signOffTitle,
      options
    );

    const messageData = {
      From: {
        Email: fromEmail,
        Name: fromName,
      },
      To: [
        {
          Email: toEmail,
        },
      ],
      Subject: subject,
      HTMLPart: htmlContent,
      TextPart: bodyContent.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    // Add Reply-To if provided (some departments like noreply don't have reply-to)
    if (replyTo) {
      messageData.ReplyTo = {
        Email: replyTo,
      };
    }

    // Only add CC emails if they actually exist
    if (ccList.length > 0) {
      messageData.Cc = ccList.map(email => ({ Email: email }));
    }
    
    const requestPayload = {
      Messages: [messageData],
    };

    try {
      const request = await MailJetConnection.post('send', { version: 'v3.1' }).request(requestPayload);
        
      // Check if response contains errors
      if (request.body && request.body.Messages && request.body.Messages[0]) {
        const messageStatus = request.body.Messages[0].Status;
        if (messageStatus !== 'success') {
          console.error('Message was not successful:', messageStatus);
          throw new Error(`Mailjet message status: ${messageStatus}`);
        }
      }
      
      return request.body;
    } catch (apiError) {
      console.error('Mailjet API error:', apiError);
      console.error('Error details:', apiError.response?.body || 'No response body');
      
      // Try to extract useful error information
      const errorMessage = apiError.response?.body?.ErrorMessage || 
                          apiError.response?.body?.ErrorInfo || 
                          apiError.message || 
                          'Unknown Mailjet API error';
      
      throw new Error(`Mailjet API error: ${errorMessage}`);
    }
  } catch (error) {
    console.error(`Error sending ${department} email:`, error);
    throw error; // Re-throw to allow caller to handle the error
  }
};

// Export department configurations for use in other modules
export { EMAIL_DEPARTMENTS };

// Convenience functions for specific departments
export const sendSupportEmail = (toEmail, subject, bodyContent, recipientName = '', replyToEmail = null, ccEmails = [], options = {}) => {
  return sendEmail(toEmail, subject, bodyContent, recipientName, 'support', replyToEmail, ccEmails, options);
};

export const sendAccountsEmail = (toEmail, subject, bodyContent, recipientName = '', replyToEmail = null, ccEmails = [], options = {}) => {
  return sendEmail(toEmail, subject, bodyContent, recipientName, 'accounts', replyToEmail, ccEmails, options);
};

export const sendGeneralEmail = (toEmail, subject, bodyContent, recipientName = '', replyToEmail = null, ccEmails = [], options = {}) => {
  return sendEmail(toEmail, subject, bodyContent, recipientName, 'general', replyToEmail, ccEmails, options);
};

export const sendSystemEmail = (toEmail, subject, bodyContent, recipientName = '', ccEmails = [], options = {}) => {
  return sendEmail(toEmail, subject, bodyContent, recipientName, 'noreply', null, ccEmails, options);
};

export const sendMarketingEmail = (toEmail, subject, bodyContent, recipientName = '', replyToEmail = null, ccEmails = [], options = {}) => {
  return sendEmail(toEmail, subject, bodyContent, recipientName, 'marketing', replyToEmail, ccEmails, options);
};