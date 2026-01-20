<?php
session_start();
require_once '../config/database.php';

// Proteksi: Cek Login
if(!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

$act = $_POST['act'] ?? $_GET['act'];

// --- LOGIC INSERT & UPDATE ---
if($act == 'insert' || $act == 'update') {
    
    // 1. Sanitasi Input (Mencegah Error SQL)
    $nama = mysqli_real_escape_string($conn, $_POST['nama_toko']);
    $pemilik = mysqli_real_escape_string($conn, $_POST['pemilik']);
    $jenis = $_POST['jenis_mitra'];
    $alamat = mysqli_real_escape_string($conn, $_POST['alamat']);
    $lat = $_POST['latitude'];
    $lng = $_POST['longitude'];
    
    // 2. Auto-Format WhatsApp (08 -> 628)
    $hp = $_POST['no_hp'];
    // Hapus spasi atau dash (-)
    $hp = preg_replace('/[^0-9]/', '', $hp);
    // Jika diawali 0, ganti jadi 62
    if(substr($hp, 0, 1) == '0') {
        $hp = '62' . substr($hp, 1);
    }

    if($act == 'insert') {
        // Query Tambah
        $q = "INSERT INTO tb_mitra (nama_toko, pemilik, no_hp, alamat, latitude, longitude, jenis_mitra, created_at) 
              VALUES ('$nama', '$pemilik', '$hp', '$alamat', '$lat', '$lng', '$jenis', NOW())";
    } else {
        // Query Edit
        $id = $_POST['id_mitra'];
        $q = "UPDATE tb_mitra SET 
                nama_toko='$nama', 
                pemilik='$pemilik', 
                no_hp='$hp', 
                alamat='$alamat', 
                latitude='$lat', 
                longitude='$lng', 
                jenis_mitra='$jenis'
              WHERE id_mitra='$id'";
    }

    // Eksekusi
    if(mysqli_query($conn, $q)) {
        header("Location: mitra_list.php?msg=success");
    } else {
        // Debugging jika error
        echo "Error: " . mysqli_error($conn);
    }

// --- LOGIC DELETE ---
} elseif($act == 'delete') {
    $id = $_GET['id'];
    mysqli_query($conn, "DELETE FROM tb_mitra WHERE id_mitra='$id'");
    header("Location: mitra_list.php?msg=deleted");
}
?>