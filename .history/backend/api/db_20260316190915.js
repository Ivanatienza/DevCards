import mysql from 'mysql2/promise';


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'devcards',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;