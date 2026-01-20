<?php
session_start();
require_once '../config/database.php';

// Pastikan Login
if(!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

// --- LOGIC UPLOAD GAMBAR ---
function uploadFoto() {
    $namaFile = $_FILES['foto']['name'];
    $ukuranFile = $_FILES['foto']['size'];
    $error = $_FILES['foto']['error'];
    $tmpName = $_FILES['foto']['tmp_name'];

    // Cek apakah ada file yang diupload
    if ($error === 4) { return 'no_image'; }

    // Cek ekstensi
    $ekstensiValid = ['jpg', 'jpeg', 'png', 'webp'];
    $ekstensiGambar = explode('.', $namaFile);
    $ekstensiGambar = strtolower(end($ekstensiGambar));

    if (!in_array($ekstensiGambar, $ekstensiValid)) {
        echo "<script>alert('Yang anda upload bukan gambar!'); window.history.back();</script>";
        return false;
    }

    // Generate nama baru agar tidak bentrok
    $namaFileBaru = uniqid() . '.' . $ekstensiGambar;
    
    // Simpan ke folder PUBLIC
    move_uploaded_file($tmpName, '../public/assets/img/' . $namaFileBaru);

    return $namaFileBaru;
}

// --- MAIN LOGIC ---
$act = $_POST['act'] ?? $_GET['act'];

if($act == 'insert') {
    // 1. TAMBAH DATA
    $nama = mysqli_real_escape_string($conn, $_POST['nama_produk']);
    $harga = $_POST['harga'];
    $kategori = $_POST['id_kategori'];
    $deskripsi = mysqli_real_escape_string($conn, $_POST['deskripsi']);
    $gender = $_POST['gender'];

    // Upload
    $foto = uploadFoto();
    if($foto == 'no_image') $foto = ''; // Bisa kosong jika mau

    $q = "INSERT INTO tb_produk VALUES (NULL, '$kategori', '$nama', '$harga', '$deskripsi', '$foto', CURRENT_TIMESTAMP, '$gender')";
    
    if(mysqli_query($conn, $q)) {
        header("Location: produk_list.php?msg=success");
    } else {
        echo "Error: " . mysqli_error($conn);
    }

} elseif($act == 'update') {
    // 2. EDIT DATA
    $id = $_POST['id_produk'];
    $nama = mysqli_real_escape_string($conn, $_POST['nama_produk']);
    $harga = $_POST['harga'];
    $kategori = $_POST['id_kategori'];
    $deskripsi = mysqli_real_escape_string($conn, $_POST['deskripsi']);
    $gender = $_POST['gender'];
    $foto_lama = $_POST['foto_lama'];

    // Cek ganti foto?
    $foto = uploadFoto();
    if($foto == 'no_image') {
        $foto = $foto_lama; // Pakai foto lama
    } else {
        // Hapus foto lama jika ada dan bukan dummy
        if($foto_lama != '' && file_exists('../public/assets/img/'.$foto_lama)) {
            unlink('../public/assets/img/'.$foto_lama);
        }
    }

    $q = "UPDATE tb_produk SET 
            id_kategori='$kategori', 
            nama_produk='$nama', 
            harga='$harga', 
            deskripsi='$deskripsi', 
            gender='$gender',
            foto_produk='$foto' 
          WHERE id_produk='$id'";

    if(mysqli_query($conn, $q)) {
        header("Location: produk_list.php?msg=updated");
    } else {
        echo "Error: " . mysqli_error($conn);
    }

} elseif($act == 'delete') {
    // 3. HAPUS DATA
    $id = $_GET['id'];
    $img = $_GET['img'];

    // Hapus file gambar fisik
    if($img != '' && file_exists('../public/assets/img/'.$img)) {
        unlink('../public/assets/img/'.$img);
    }

    mysqli_query($conn, "DELETE FROM tb_produk WHERE id_produk='$id'");
    header("Location: produk_list.php?msg=deleted");
}
?>