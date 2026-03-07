<?php
require_once '../config/database.php';

if(isset($_POST['type']) && isset($_POST['id'])) {
    $type = mysqli_real_escape_string($conn, $_POST['type']); // 'klik_produk' atau 'klik_mitra'
    $id = (int)$_POST['id'];
    
    // Catat ke database
    $q = "INSERT INTO tb_log_aktivitas (tipe_log, id_ref) VALUES ('$type', '$id')";
    mysqli_query($conn, $q);
}
?>