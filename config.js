require('dotenv').config();

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction,
// })

const pool = new Pool({
  connectionString:"postgres://bmhcjzrbohihqu:c82cb08dc1f260ca30cf1f0f0b37e2e4e897730c8955c2b71fd3e8c7de6c5f90@ec2-54-235-104-136.compute-1.amazonaws.com:5432/devd8atc88r0bs",
  ssl:true
});

module.exports = { pool }
