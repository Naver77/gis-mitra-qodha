<?php
// File: api/map_data.php
header('Content-Type: application/json');
require_once '../config/database.php';

// 1. Ambil data mitra yang statusnya AKTIF ('1')
$sql = "SELECT * FROM tb_mitra WHERE status_aktif = '1'";
$result = mysqli_query($conn, $sql);

$features = [];

while ($row = mysqli_fetch_assoc($result)) {
    // 2. Susun format GeoJSON untuk setiap titik
    $features[] = [
        "type" => "Feature",
        "properties" => [
            "id" => $row['id_mitra'],
            "nama" => $row['nama_mitra'],
            "alamat" => $row['alamat'],
            "kota" => $row['kota'],
            "hp" => $row['no_hp'],
            "foto" => $row['foto']
        ],
        "geometry" => [
            "type" => "Point",
            // PENTING: GeoJSON urutannya [Longitude, Latitude] (X, Y)
            // Jangan terbalik, nanti peta muncul di Antartika!
            "coordinates" => [
                (float)$row['longitude'], 
                (float)$row['latitude']
            ]
        ]
    ];
}

// 3. Bungkus dalam FeatureCollection
$geojson = [
    "type" => "FeatureCollection",
    "features" => $features
];

// 4. Output JSON
echo json_encode($geojson, JSON_PRETTY_PRINT);
?>