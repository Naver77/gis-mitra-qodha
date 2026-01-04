<?php
// File: config/database.php

// 1. Konfigurasi Database (Sesuaikan dengan Laragon)
$host = "localhost";
$user = "root";      // Default user Laragon
$pass = "";          // Default password Laragon (kosong)
$db   = "db_qodha_gis"; // Nama database yang kita buat tadi

// 2. Melakukan Koneksi
$conn = mysqli_connect($host, $user, $pass, $db);

// 3. Cek Koneksi (Opsional: Matikan ini saat sudah live/hosting)
if (!$conn) {
    die("Koneksi Database Gagal: " . mysqli_connect_error());
}

// 4. Set Timezone WIB (Penting untuk data waktu input mitra)
date_default_timezone_set('Asia/Jakarta');

// 5. Global Base URL (Opsional, biar gampang panggil link)
// Ganti port jika Laragon Anda tidak pakai port 80
$base_url = "http://localhost/gis_mitraqodha/"; 

?>