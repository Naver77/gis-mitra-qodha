import mysql from 'mysql2/promise';

// Mendefinisikan tipe global agar TypeScript tidak komplain di mode Development
declare global {
  var mysqlPool: mysql.Pool | undefined;
}

// Konfigurasi Database dengan Fallback Super Aman
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  // Mengubah port default menjadi 3308 sesuai konfigurasi Laragon Anda
  port: Number(process.env.DB_PORT) || 3308,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_qodha_gis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool: mysql.Pool;

// Pola Singleton: Mencegah koneksi ganda (Database Jebol) saat hot-reload di Next.js (Lokal)
if (process.env.NODE_ENV === 'production') {
  // Di Hosting (Vercel/VPS): Selalu buat pool baru yang dikelola otomatis oleh server
  pool = mysql.createPool(dbConfig);
} else {
  // Di Lokal (Laragon/XAMPP): Pakai ulang koneksi yang ada di memori global
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool(dbConfig);
  }
  pool = global.mysqlPool;
}

export default pool;