<?php
// File: config/database.php

// --- PERBAIKAN 1: Definisikan ENVIRONMENT jika belum ada ---
// Agar tidak error "Undefined constant" saat file ini diakses langsung
if (!defined('ENVIRONMENT')) {
    define('ENVIRONMENT', 'development');
}

// 1. KONFIGURASI DATABASE
$db['default'] = array(
    'dsn'   => '',
    'hostname' => 'localhost', // Gunakan localhost untuk Laragon
    'username' => 'root',
    'password' => '',          // Default Laragon kosong
    'database' => 'db_qodha_gis',
    'dbdriver' => 'mysqli',
    'dbprefix' => '',
    'pconnect' => FALSE,       // FALSE = Wajib untuk mencegah "MySQL Has Gone Away"
    'db_debug' => (ENVIRONMENT !== 'production'),
    'cache_on' => FALSE,
    'cachedir' => '',
    'char_set' => 'utf8mb4',
    'dbcollat' => 'utf8mb4_general_ci',
    'swap_pre' => '',
    'encrypt'  => FALSE,
    'compress' => FALSE,
    'stricton' => FALSE,
    'failover' => array(),
    'save_queries' => TRUE
);

// --- PERBAIKAN 2: Mapping Variabel untuk Koneksi Manual ---
// Kode kamu sebelumnya error karena $host, $user, dll belum ada isinya.
// Kita ambil isinya dari array $db['default'] di atas.

$host = $db['default']['hostname'];
$user = $db['default']['username'];
$pass = $db['default']['password'];
$db_name = $db['default']['database'];
$port = 3308; // Default port Laragon

// 2. MELAKUKAN KONEKSI
// Menggunakan @ untuk menangkap error dengan rapi di blok diagnosa bawah
$conn = @mysqli_connect($host, $user, $pass, $db_name, $port);

// 3. CEK KONEKSI (DIAGNOSTIK LENGKAP)
if (!$conn) {
    // Tampilkan pesan error yang jelas untuk debugging
    echo "<div style='background: #ffcccc; padding: 20px; border: 1px solid red; font-family: sans-serif;'>";
    echo "<h3>❌ KONEKSI DATABASE GAGAL!</h3>";
    echo "<strong>Pesan Error Sistem:</strong> " . mysqli_connect_error() . "<br><br>";
    echo "<strong>Analisis Masalah:</strong><br>";
    echo "1. Pastikan Laragon sudah diklik <b>'Start All'</b>.<br>";
    echo "2. Pastikan database <b>'$db_name'</b> sudah dibuat di phpMyAdmin.<br>";
    echo "3. Jika errornya 'Target machine actively refused', restart Laragon.<br>";
    echo "</div>";
    die(); // Matikan halaman
}

// 4. SETTING TIMEZONE & BASE URL
date_default_timezone_set('Asia/Jakarta');
$base_url = "http://localhost/gis_mitraqodha/"; 

?>