const errorHandler = (err, req, res, next) => {
  console.error('Error Details:', err.message);

  // Database connection errors
  if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST') {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // General fallback
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
