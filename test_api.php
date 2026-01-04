<?php
// Debug script - test database & API
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'config/database.php';

echo "<h2>Database Connection Test</h2>";
echo "<p><strong>Database:</strong> " . $db . "</p>";
echo "<p><strong>Connection:</strong> " . ($conn ? "✅ Connected" : "❌ Failed") . "</p>";

echo "<h2>Table Info</h2>";

// Check if table exists
$tables = ["tb_mitra", "admin"];
foreach ($tables as $table) {
    $check = mysqli_query($conn, "SELECT 1 FROM $table LIMIT 1");
    $status = $check ? "✅ Exists" : "❌ Not Found";
    echo "<p><strong>$table:</strong> $status</p>";
}

echo "<h2>tb_mitra Data</h2>";

// Count rows
$result = mysqli_query($conn, "SELECT COUNT(*) as count FROM tb_mitra");
$row = mysqli_fetch_assoc($result);
echo "<p><strong>Total Rows:</strong> " . $row['count'] . "</p>";

// Show structure
echo "<h3>Table Structure:</h3>";
$cols = mysqli_query($conn, "SHOW COLUMNS FROM tb_mitra");
echo "<ul>";
while ($col = mysqli_fetch_assoc($cols)) {
    echo "<li>" . $col['Field'] . " (" . $col['Type'] . ")</li>";
}
echo "</ul>";

// Show sample data (first 3)
echo "<h3>Sample Data (First 3):</h3>";
$sample = mysqli_query($conn, "SELECT id_mitra, nama_mitra, latitude, longitude, kota, status_aktif FROM tb_mitra LIMIT 3");
echo "<pre>";
while ($row = mysqli_fetch_assoc($sample)) {
    echo json_encode($row, JSON_PRETTY_PRINT) . "\n";
}
echo "</pre>";

// Test API output
echo "<h2>API Output Test</h2>";
echo "<p><a href='api/map_data.php' target='_blank'>Click to view API response</a> (atau check browser console F12)</p>";

// Check coordinates
$coords = mysqli_query($conn, "SELECT COUNT(*) as count FROM tb_mitra WHERE latitude IS NOT NULL AND longitude IS NOT NULL");
$coord_row = mysqli_fetch_assoc($coords);
echo "<p><strong>Records with Coordinates:</strong> " . $coord_row['count'] . "</p>";

?>
