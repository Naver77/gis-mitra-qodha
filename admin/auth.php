<?php
session_start();
require_once '../config/database.php';

if (isset($_POST['login'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    // 1. Cek Username
    $query = "SELECT * FROM tb_admin WHERE username = '$username'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);

        // 2. Cek Password (Hash Verification)
        if (password_verify($password, $row['password'])) {
            // LOGIN SUKSES
            $_SESSION['login'] = true;
            $_SESSION['id_admin'] = $row['id_admin'];
            $_SESSION['nama'] = $row['nama_lengkap'];
            
            // Update 'terakhir_login'
            mysqli_query($conn, "UPDATE tb_admin SET terakhir_login = NOW() WHERE id_admin = '".$row['id_admin']."'");

            header("Location: dashboard.php");
            exit;
        } 
        
        // --- FITUR AUTO FIX (HANYA UNTUK DEVELOPMENT) ---
        // Jika password di database masih dummy, dan user ketik 'admin123', kita update hash-nya otomatis
        else if ($password == 'admin123') {
            $newHash = password_hash('admin123', PASSWORD_DEFAULT);
            mysqli_query($conn, "UPDATE tb_admin SET password = '$newHash' WHERE id_admin = '".$row['id_admin']."'");
            
            // Login ulang otomatis
            header("Location: login.php?msg=Password database diperbarui. Silakan login lagi.");
            exit;
        }
        // ------------------------------------------------
    }

    header("Location: login.php?msg=Username atau Password salah!");
    exit;
}
?>