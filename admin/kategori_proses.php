<?php
session_start();
require_once '../config/database.php';

if(!isset($_SESSION['admin_logged_in'])) { header("Location: login.php"); exit; }

$act = $_POST['act'] ?? $_GET['act'];

if($act == 'insert') {
    $nama = mysqli_real_escape_string($conn, $_POST['nama_kategori']);
    $q = "INSERT INTO tb_kategori (nama_kategori) VALUES ('$nama')";
    
    if(mysqli_query($conn, $q)) {
        header("Location: kategori_list.php?msg=success");
    } else {
        echo "Error: " . mysqli_error($conn);
    }

} elseif($act == 'update') {
    $id = $_POST['id_kategori'];
    $nama = mysqli_real_escape_string($conn, $_POST['nama_kategori']);
    
    $q = "UPDATE tb_kategori SET nama_kategori='$nama' WHERE id_kategori='$id'";
    
    if(mysqli_query($conn, $q)) {
        header("Location: kategori_list.php?msg=updated");
    } else {
        echo "Error: " . mysqli_error($conn);
    }

} elseif($act == 'delete') {
    $id = $_GET['id'];
    mysqli_query($conn, "DELETE FROM tb_kategori WHERE id_kategori='$id'");
    header("Location: kategori_list.php?msg=deleted");
}
?>