<?php
header('Content-Type: application/json');
require_once '../config/database.php';

// Ambil data mitra terbaru
$query = "SELECT * FROM tb_mitra";
$result = mysqli_query($conn, $query);

$features = [];

while($row = mysqli_fetch_assoc($result)) {
    // Sanitasi output untuk keamanan JSON
    $nama = htmlspecialchars($row['nama_toko']);
    $alamat = htmlspecialchars($row['alamat']);
    $pemilik = htmlspecialchars($row['pemilik']);
    $jenis = $row['jenis_mitra']; // Agen, Reseller, Distributor

    $features[] = [
        'type' => 'Feature',
        'geometry' => [
            'type' => 'Point',
            'coordinates' => [(float)$row['longitude'], (float)$row['latitude']]
        ],
        'properties' => [
            'id' => $row['id_mitra'],
            'nama' => $nama,
            'pemilik' => $pemilik,
            'alamat' => $alamat,
            'hp' => $row['no_hp'],
            'jenis' => $jenis, 
            'foto' => !empty($row['foto_toko']) ? $row['foto_toko'] : 'default_store.png'
        ]
    ];
}

echo json_encode(['type' => 'FeatureCollection', 'features' => $features]);
?>