<?php
// File: config/database.php

// Mencegah akses langsung jika diperlukan (Opsional, sesuaikan dengan framework jika pakai)
if (!defined('ENVIRONMENT')) {
    define('ENVIRONMENT', 'development');
}

// --- 1. DETEKSI ENVIRONMENT (LOKAL vs HOSTING) ---
$host_server = $_SERVER['HTTP_HOST'];

// Cek apakah akses dari Laptop (Localhost)
$is_local = ($host_server == 'localhost' || $host_server == '127.0.0.1');

if ($is_local) {
    // ==========================================
    // A. SETTINGAN KHUSUS LAPTOP (LARAGON)
    // ==========================================

    // Database Credential
    $db_host = 'localhost';
    $db_user = 'root';
    $db_pass = '';          // Default Laragon kosong
    $db_name = 'db_qodha_gis';
    $db_port = 3308;        // Port Laragon Anda (Sesuai kode lama)

    // Base URL (Sesuaikan folder project di laptop)
    // Pastikan akhiran ada slash '/'
    $base_url = "http://localhost/gis_mitraqodha/";
} else {
    // ==========================================
    // B. SETTINGAN KHUSUS HOSTING (LIVE)
    // ==========================================

    // Database Credential Hosting
    // TODO: GANTI INI DENGAN DATA DARI PANEL HOSTING
    $db_host = 'localhost';             // Di hosting biasanya tetap localhost
    $db_user = 'u354392114_naver77';  // Ganti dengan User DB Hosting
    $db_pass = '*/mut7Gf';   // Ganti dengan Pass DB Hosting
    $db_name = 'u354392114_gismitraqodha';    // Ganti dengan Nama DB Hosting
    $db_port = 3306;                    // Port Standar Hosting (Jangan 3308)

    // Base URL Hosting
    // Script ini otomatis mendeteksi domain (https://domainanda.com/)
    $base_url = "https://" . $host_server . "/";

    // OPSI: Jika project anda di hosting ada di dalam subfolder 'public', hapus // di bawah:
    // $base_url = "https://" . $host_server . "/public/";
}

// --- 2. EKSEKUSI KONEKSI ---
// Menggunakan @ untuk handle error manual
$conn = @mysqli_connect($db_host, $db_user, $db_pass, $db_name, $db_port);

// --- 3. DIAGNOSA ERROR (JIKA GAGAL) ---
if (!$conn) {
    // Tampilan Error yang Informatif
    echo "<div style='background: #fee2e2; color: #991b1b; padding: 20px; border: 1px solid #f87171; font-family: sans-serif; border-radius: 8px; margin: 20px;'>";
    echo "<h3 style='margin-top:0'>❌ KONEKSI DATABASE GAGAL</h3>";
    echo "<p><strong>Pesan Sistem:</strong> " . mysqli_connect_error() . "</p>";

    if ($is_local) {
        echo "<hr><p><strong>Tips Laptop (Local):</strong><br>";
        echo "- Cek apakah Laragon 'Start All' sudah diklik.<br>";
        echo "- Cek apakah nama database <code>$db_name</code> sudah dibuat.<br>";
        echo "- Cek port MySQL di Laragon (apakah benar 3308?).</p>";
    } else {
        echo "<hr><p><strong>Tips Hosting (Live):</strong><br>";
        echo "- Anda belum mengisi Username/Password DB yang benar di file <code>config/database.php</code>.<br>";
        echo "- Pastikan user database sudah diberikan akses ke database (Add User to Database) di cPanel.</p>";
    }
    echo "</div>";
    die(); // Stop script
}

// --- 4. SET GLOBAL CONFIG ---
date_default_timezone_set('Asia/Jakarta');

// (Opsional) Jika kode lama Anda butuh variabel array $db, kita buatkan dummy-nya
// agar kode lain tidak error, tapi koneksi utama tetap pakai $conn di atas.
$db['default']['hostname'] = $db_host;
$db['default']['username'] = $db_user;
$db['default']['password'] = $db_pass;
$db['default']['database'] = $db_name;
