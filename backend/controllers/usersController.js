const pool = require('../config/db');

exports.getAllUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users ORDER BY id DESC');
    res.status(200).json(rows); // Changed to return array directly to match frontend expectation
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { firstName, lastName, email, phone, age, company, country, image } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (firstName, lastName, email, phone, age, company, country, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone || null, age || null, company || null, country || null, image || null]
    );
    
    const newUser = { id: result.insertId, ...req.body };
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
