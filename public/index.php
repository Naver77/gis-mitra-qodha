<?php 
$page_title = "Beranda"; 
require_once '../config/database.php'; 
require_once '../inc/functions.php';  

// PREPARE DATA
$hero_products = getHeroProducts($conn);
$best_sellers  = getBestSellers($conn, 8);
$categories    = getHomeCategories();
$value_props   = getValuePropositions();
$stats         = getProductStats(); // Data Statistik

include 'header.php'; 
?>

<!-- ASSETS -->
<script src="assets/js/script.js" defer></script>
<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .animate-blob { animation: blob 10s infinite; }
    @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    .animation-delay-2000 { animation-delay: 2s; }
</style>

<!-- MODULAR SECTIONS -->
<?php 
include 'sections/home_hero.php';       // Banner Utama
include 'sections/home_stats.php';      // Statistik Produk (BARU)
include 'sections/home_categories.php'; // Pilihan Kategori
include 'sections/home_bestseller.php'; // Produk Terlaris
include 'sections/home_education.php';  // Video Edukasi
include 'sections/home_values.php';     // Keunggulan & Peta
?>

<!-- JS INITIALIZATION -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const heroData = <?php echo json_encode($hero_products); ?>;
        if(typeof initHeroCarousel === 'function') {
            initHeroCarousel(heroData);
        }
    });
</script>

<?php include 'footer.php'; ?>