require('dotenv').config();

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

let connectionString = "";

if(isProduction) {
  connectionString=process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString:connectionString,
  ssl:true
});

module.exports = { pool }
