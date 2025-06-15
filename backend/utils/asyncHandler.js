// Wrapper function to handle async errors in Express routes
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Database connection helper (for future use)
export const withDatabase = (fn) => async (req, res, next) => {
  try {
    // This is where you would add database connection logic
    // For now, it just passes through
    return await fn(req, res, next);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Database connection error'
    });
  }
};

// Response helper functions
export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const sendError = (res, message, statusCode = 500, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    timestamp: new Date().toISOString()
  });
};

// Rate limiting helper (basic implementation)
const rateLimitStore = new Map();

export const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitStore.has(clientId)) {
      rateLimitStore.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const clientData = rateLimitStore.get(clientId);
    
    if (now > clientData.resetTime) {
      rateLimitStore.set(clientId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (clientData.count >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }
    
    clientData.count++;
    next();
  };
};