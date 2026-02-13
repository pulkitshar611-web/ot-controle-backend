import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Explicitly handle SSL: Only enable if NOT localhost
// And if localhost, explicitly DISABLE it to avoid "Server does not support secure connection"
if (process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1') {
    dbConfig.ssl = {
        rejectUnauthorized: false
    };
} else {
    // Force disable SSL for local connections
    dbConfig.ssl = false;
}

console.log(`🔌 Attempting to connect to DB at ${process.env.DB_HOST} with user ${process.env.DB_USER}...`);

const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.error('👉 Tip: Check if XAMPP/MySQL is running and database exists.');
    } else {
        console.log('✅ Connected to MySQL Database Successfully!');
        connection.release();
    }
});

export default pool.promise();
