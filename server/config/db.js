// Connection to PostgreSQL DB.

const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `coc_mesa`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Connected to PostgreSQL");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = { connectDB, pool };
