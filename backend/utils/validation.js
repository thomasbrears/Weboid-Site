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

export const validateContactData = (contactData, type = 'general') => {
  const errors = [];
  
  // Required fields for all contact types
  if (!contactData.name || contactData.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (contactData.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (!contactData.email || !validateEmail(contactData.email)) {
    errors.push('Valid email address is required');
  }
  
  // Specific validation for website assessment
  if (type === 'assessment') {
    if (!contactData.phone || contactData.phone.trim().length === 0) {
      errors.push('Phone number is required for website assessment');
    } else if (contactData.phone.trim().length > 20) {
      errors.push('Phone number must be less than 20 characters');
    }
    
    // Goals and challenges are optional but if provided should have reasonable length
    if (contactData.goals && contactData.goals.trim().length > 1000) {
      errors.push('Goals description must be less than 1000 characters');
    }
    
    if (contactData.challenges && contactData.challenges.trim().length > 1000) {
      errors.push('Challenges description must be less than 1000 characters');
    }
    
    if (contactData.business && contactData.business.trim().length > 100) {
      errors.push('Business name must be less than 100 characters');
    }
    
    if (contactData.currentWebsite && contactData.currentWebsite.trim().length > 200) {
      errors.push('Website URL must be less than 200 characters');
    }
  } else {
    // General contact validation
    if (!contactData.message || contactData.message.trim().length === 0) {
      errors.push('Message is required');
    } else if (contactData.message.trim().length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }
    
    if (contactData.subject && contactData.subject.trim().length > 200) {
      errors.push('Subject must be less than 200 characters');
    }
  }
  
  // Optional fields validation (all types)
  if (contactData.phone && contactData.phone.trim().length > 20) {
    errors.push('Phone number must be less than 20 characters');
  }
  
  if (contactData.company && contactData.company.trim().length > 100) {
    errors.push('Company name must be less than 100 characters');
  }
  
  if (contactData.website && contactData.website.trim().length > 200) {
    errors.push('Website URL must be less than 200 characters');
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

export const sanitizeContactData = (contactData) => {
  return {
    ...contactData,
    name: sanitizeString(contactData.name),
    email: sanitizeString(contactData.email),
    phone: sanitizeString(contactData.phone),
    subject: sanitizeString(contactData.subject),
    message: sanitizeString(contactData.message),
    company: sanitizeString(contactData.company),
    business: sanitizeString(contactData.business),
    website: sanitizeString(contactData.website),
    currentWebsite: sanitizeString(contactData.currentWebsite),
    challenges: sanitizeString(contactData.challenges),
    goals: sanitizeString(contactData.goals)
  };
};