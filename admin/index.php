<?php
// File: admin/index.php
session_start();

// Cek: Apakah user sudah punya tiket masuk (session)?
if (isset($_SESSION['login']) && $_SESSION['login'] === true) {
    // Kalau sudah login, langsung ke Dashboard
    header("Location: dashboard.php");
} else {
    // Kalau belum, tendang ke Login
    header("Location: login.php");
}
exit;
?>