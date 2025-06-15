export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTicket = (ticketData) => {
  const errors = [];
  
  // Required fields
  if (!ticketData.title || ticketData.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (ticketData.title.trim().length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (!ticketData.description || ticketData.description.trim().length === 0) {
    errors.push('Description is required');
  } else if (ticketData.description.trim().length > 2000) {
    errors.push('Description must be less than 2000 characters');
  }
  
  // Optional fields validation
  if (ticketData.priority && !['low', 'medium', 'high', 'urgent'].includes(ticketData.priority)) {
    errors.push('Priority must be one of: low, medium, high, urgent');
  }
  
  if (ticketData.category && ticketData.category.trim().length > 50) {
    errors.push('Category must be less than 50 characters');
  }
  
  if (ticketData.userEmail && !validateEmail(ticketData.userEmail)) {
    errors.push('Please provide a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmailData = (emailData) => {
  const errors = [];
  
  if (!emailData.to || !validateEmail(emailData.to)) {
    errors.push('Valid recipient email is required');
  }
  
  if (!emailData.subject || emailData.subject.trim().length === 0) {
    errors.push('Subject is required');
  } else if (emailData.subject.trim().length > 200) {
    errors.push('Subject must be less than 200 characters');
  }
  
  if (!emailData.text || emailData.text.trim().length === 0) {
    errors.push('Email content is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  // Remove potentially dangerous HTML tags and scripts
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const sanitizeTicketData = (ticketData) => {
  return {
    ...ticketData,
    title: sanitizeString(ticketData.title),
    description: sanitizeString(ticketData.description),
    category: sanitizeString(ticketData.category),
    userEmail: sanitizeString(ticketData.userEmail),
    userName: sanitizeString(ticketData.userName)
  };
};