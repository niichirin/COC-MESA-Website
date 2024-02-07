// Connection to PostgreSQL DB.

const { Pool } = require('pg');

require('dotenv').config();

const db = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: `coc_mesa_tutoring`,
    password: DB_PASSWORD,
    port: DB_PORT
});

const connectDB = async () => {
    try {
        await db.connect();
        console.log("Connected to PostgreSQL");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;