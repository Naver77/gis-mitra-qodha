import mysql from 'mysql2/promise';

// Mendefinisikan tipe global agar TypeScript tidak komplain di mode Development
declare global {
  var mysqlPool: mysql.Pool | undefined;
}

// VALIDASI KEAMANAN: Memastikan variabel lingkungan wajib telah diisi
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  throw new Error("Kredensial Database tidak ditemukan! Pastikan file .env sudah terisi.");
}

// Konfigurasi Database Murni dari Environment Variables
const dbConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Murni dari env (Misal: 3308 di lokal, 3306 di Vercel)
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Bisa kosong string jika memang tidak ada password di lokal
  database: process.env.DB_NAME,
  
  // PENGATURAN KETAHANAN KONEKSI (Mencegah ECONNRESET dari Hostinger)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,

  // SSL menyesuaikan environment (Vercel = butuh SSL, Lokal = tanpa SSL)
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : undefined
};

let pool: mysql.Pool;

// Pola Singleton: Mencegah koneksi ganda (Database Jebol) saat hot-reload di Next.js
if (process.env.NODE_ENV === 'production') {
  // Di Vercel: Dikelola oleh serverless
  pool = mysql.createPool(dbConfig);
} else {
  // Di Lokal: Pakai ulang koneksi yang ada di memori global
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool(dbConfig);
  }
  pool = global.mysqlPool;
}

export default pool;