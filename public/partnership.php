<?php 
$page_title = "Pricelist Kemitraan Resmi"; 
require_once '../config/database.php';
require_once '../inc/functions.php'; 

// Ambil Data Live dari Database
$pricelist = getPricelistData($conn);

include 'header.php'; 
?>

<!-- MODULAR SECTIONS PARTNERSHIP -->
<?php
// 1. Hero & Judul
include 'sections/partnership/part_hero.php';

// 2. Tabel HET (Terpisah sebagai Jangkar)
include 'sections/partnership/part_pricing_het.php';

// 3. Tabel Perbandingan 3 Mitra (Showdown)
include 'sections/partnership/part_pricing_tier.php';

// 4. Pilihan Paket (Card 1jt, 3jt, 6jt)
include 'sections/partnership/part_packages.php';

// 5. Checklist Fasilitas
include 'sections/partnership/part_benefits.php';

// 6. Peta WebGIS
include 'sections/partnership/part_map.php';
?>

<?php include 'footer.php'; ?>