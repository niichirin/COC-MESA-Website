// Connection to PostgreSQL DB.

const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: `coc_mesa_tutoring`,
    password: process.env.DB_PASSWORD,
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
