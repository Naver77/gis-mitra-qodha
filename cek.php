<?php
require_once 'config/database.php';

if ($conn) {
    echo "<h1>✅ ALHAMDULILLAH KONEKSI SUKSES!</h1>";
    echo "Database: $db terhubung.";
}
?>