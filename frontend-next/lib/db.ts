import mysql from 'mysql2/promise';

// Mendefinisikan tipe global agar TypeScript tidak komplain di mode Development
declare global {
  var mysqlPool: mysql.Pool | undefined;
}

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool: mysql.Pool;

// Pola Singleton: Mencegah koneksi ganda saat proses hot-reload di Next.js
if (process.env.NODE_ENV === 'production') {
  pool = mysql.createPool(dbConfig);
} else {
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool(dbConfig);
  }
  pool = global.mysqlPool;
}

export default pool;