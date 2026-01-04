<?php
// File: api/map_data.php
header('Content-Type: application/json');
require_once '../config/database.php';

$features = [];
$error = null;

// Ambil data mitra (semua, filter status_aktif di client jika diperlukan)
$sql = "SELECT * FROM tb_mitra WHERE latitude IS NOT NULL AND longitude IS NOT NULL";
$result = mysqli_query($conn, $sql);

if (!$result) {
    $error = "Query Error: " . mysqli_error($conn);
} else {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $lat = (float)$row['latitude'];
            $lng = (float)$row['longitude'];
            
            // Validasi koordinat
            if ($lat >= -90 && $lat <= 90 && $lng >= -180 && $lng <= 180) {
                $features[] = [
                    "type" => "Feature",
                    "properties" => [
                        "id" => isset($row['id_mitra']) ? $row['id_mitra'] : '',
                        "nama" => isset($row['nama_mitra']) ? $row['nama_mitra'] : 'Unknown',
                        "alamat" => isset($row['alamat']) ? $row['alamat'] : '',
                        "kota" => isset($row['kota']) ? $row['kota'] : '',
                        "hp" => isset($row['no_hp']) ? $row['no_hp'] : '',
                        "foto" => isset($row['foto']) ? $row['foto'] : '',
                        "status_aktif" => isset($row['status_aktif']) ? $row['status_aktif'] : '0'
                    ],
                    "geometry" => [
                        "type" => "Point",
                        "coordinates" => [$lng, $lat]
                    ]
                ];
            }
        }
    }
}

$geojson = [
    "type" => "FeatureCollection",
    "features" => $features,
    "count" => count($features),
    "debug" => [
        "db" => $GLOBALS['db'] ?? 'unknown',
        "error" => $error,
        "status" => $error ? "error" : "success"
    ]
];

echo json_encode($geojson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>