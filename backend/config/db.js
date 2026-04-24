const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Connected Successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed!');
    console.error('   Error Message:', err.message);
    console.error('   Error Code:', err.code);
    console.log('\n💡 Tip: Make sure MySQL is running and you have updated your credentials in the backend/.env file.');
  });

module.exports = pool;
