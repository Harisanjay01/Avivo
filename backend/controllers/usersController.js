const pool = require('../config/db');

exports.getAllUsers = async (req, res, next) => {
  try {
    // Using prepared statement for security
    const [rows] = await pool.execute('SELECT * FROM users ORDER BY id ASC');
    
    res.status(200).json({
      users: rows
    });
  } catch (err) {
    // If it's a DB connection error, the middleware will catch it
    // But we can also specifically check here if we want custom messages
    if (err.message.includes('connect')) {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    next(err);
  }
};
