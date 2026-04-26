const { Pool } = require('pg');
require('dotenv').config();

// Neon uses standard PostgreSQL connection strings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon requires SSL
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
