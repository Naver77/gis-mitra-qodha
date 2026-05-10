🌍 Qodha Aromatic WebGIS & CRM

Sistem Informasi Geografis (WebGIS) komprehensif berbasis Cloud Serverless untuk pemetaan dan manajemen jaringan mitra distribusi Qodha Aromatic. Dibangun menggunakan arsitektur modern Next.js untuk skalabilitas dan performa maksimal.

✨ Fitur Utama (Core Features)

🗺️ Spasial & Pemetaan (WebGIS)

Kalkulasi Radius Cerdas: Implementasi algoritma Haversine Formula (LBS) untuk menghitung jarak garis lurus dari lokasi pengguna ke ratusan mitra secara real-time di sisi klien (Zero Server Load).

Smart Geocoding: Ekstraksi otomatis Latitude, Longitude, Kecamatan, dan Kota hanya dengan menempelkan URL Google Maps. Diotaki oleh integrasi API Nominatim OpenStreetMap.

Choropleth Polygon Map: Visualisasi densitas (kepadatan) jumlah mitra per wilayah menggunakan GeoJSON teroptimasi dengan HTML5 Canvas Rendering.

🤝 Customer Relationship Management (CRM)

Lead Generation Routing: Melindungi privasi kontak mitra dengan merutekan pesan prospek pembeli melalui formulir interaktif menuju WhatsApp Customer Service pusat secara terotomatisasi.

Dasbor Analitik Real-time: Memantau laporan Top Produk Diminati dan Mitra Paling Dicari berdasarkan log interaksi spasial pengguna.

🔐 Keamanan & Performa

Otentikasi Berlapis: Sistem login administrator dilindungi enkripsi Bcrypt Hashing dan sesi JSON Web Token (JWT) berbasis Cookies (HttpOnly).

Incremental Static Regeneration (ISR): Caching komputasi agregasi basis data untuk mempercepat waktu muat peta menjadi di bawah 0.1 detik.

🚀 Panduan Instalasi (Development)

Sistem ini membutuhkan Node.js (Versi 18.x atau lebih baru) dan Peladen Basis Data MySQL (XAMPP/Laragon).

1. Kloning Repositori & Instalasi Dependensi

# Buka terminal dan masuk ke folder proyek
cd qodha-webgis

# Instalasi paket NPM
npm install


2. Konfigurasi Lingkungan (Environment Variables)
Buat file .env di direktori utama (root) dan sesuaikan dengan kredensial basis data Anda:

DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="db_qodha_gis"
JWT_SECRET="rahasia-qodha-aromatic-s1"


3. Impor Basis Data

Buka phpMyAdmin atau perangkat lunak manajemen MySQL lainnya.

Buat basis data baru bernama db_qodha_gis.

Impor file Sinkronisasi_Database_Total.sql yang tersedia.

(Kredensial Admin Bawaan: Username: admin | Password: admin123)

4. Jalankan Peladen Lokal

npm run dev


Buka peramban (browser) dan akses http://localhost:3000.

📚 Hak Cipta & Lisensi

Dikembangkan secara eksklusif untuk PT Dobha Putra Salim (Qodha Aromatic) sebagai proyek pemenuhan Tugas Akhir / Skripsi pada Program Studi Informatika, STIKOM EL RAHMA.

Dikembangkan oleh: Abdul Aziz Fayyadh Prasojo (2026)