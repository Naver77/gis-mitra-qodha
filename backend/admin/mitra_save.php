<?php
session_start();
require_once '../config/database.php';

// Pastikan tombol simpan ditekan
if (isset($_POST['simpan'])) {
    
    // 1. Ambil & Bersihkan Data (Sanitasi)
    $nama     = mysqli_real_escape_string($conn, $_POST['nama']);
    $alamat   = mysqli_real_escape_string($conn, $_POST['alamat']);
    $provinsi = mysqli_real_escape_string($conn, $_POST['provinsi']);
    $kota     = mysqli_real_escape_string($conn, $_POST['kota']);
    $hp       = mysqli_real_escape_string($conn, $_POST['hp']);
    $status   = mysqli_real_escape_string($conn, $_POST['status']);
    
    // Koordinat (Decimal)
    $lat      = $_POST['lat'];
    $lng      = $_POST['lng'];

    // 2. Validasi Sederhana
    if (empty($nama) || empty($lat) || empty($lng)) {
        echo "<script>alert('Data tidak lengkap! Nama dan Koordinat wajib diisi.'); window.history.back();</script>";
        exit;
    }

    // 3. Query Insert
    $query = "INSERT INTO tb_mitra (nama_mitra, alamat, provinsi, kota, no_hp, latitude, longitude, status_aktif) 
              VALUES ('$nama', '$alamat', '$provinsi', '$kota', '$hp', '$lat', '$lng', '$status')";

    // 4. Eksekusi
    if (mysqli_query($conn, $query)) {
        echo "<script>
                alert('Berhasil! Mitra baru telah ditambahkan.');
                window.location.href = 'mitra_list.php';
              </script>";
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }

} else {
    // Kalau coba akses langsung tanpa form
    header("Location: mitra_list.php");
}
?>