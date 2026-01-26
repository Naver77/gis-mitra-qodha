<?php 
$page_title = "Katalog Produk"; 

// 1. LOAD MODUL (CORE)
require_once '../config/database.php';
require_once '../inc/functions.php';  

// 2. SIAPKAN DATA
$current_view = isset($_GET['category']) ? preg_replace('/[^a-zA-Z0-9-]/', '', $_GET['category']) : 'all'; 
$current_view = strtolower($current_view);

// Panggil fungsi pengelompokan
list($main_menus, $grouped_data) = getGroupedCategories($conn);
?>

<?php include 'header.php'; ?>

<!-- HEADER PAGE -->
<div class="bg-white pt-24 pb-4 border-b border-gray-100 relative overflow-hidden">
    <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
            <?php 
                if($current_view == 'all') echo 'Koleksi <span class="text-brand-gold">Terlengkap</span>';
                elseif($current_view == 'paket') echo 'Paket Hemat & Kemitraan';
                else echo 'Kategori ' . ucfirst($current_view);
            ?>
        </h1>
        <p class="text-sm text-gray-500 max-w-2xl">
            <?php 
                if($current_view == 'all') echo 'Temukan aroma yang mendefinisikan karakter spiritual dan relaksasi Anda.';
                else echo 'Menampilkan varian premium khusus kategori ini.';
            ?>
        </p>
    </div>
</div>

<!-- STICKY MENU FILTER (PROBLEM SOLVED HERE) -->
<div id="categoryMenu" class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex overflow-x-auto py-3 gap-2 no-scrollbar items-center">
            
            <?php 
            // --- FIX CSS CONFLICT: DEFINISI CLASS DI PHP ---
            $base_btn = "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border";
            
            // Logic Tombol "Semua"
            $all_btn_style = ($current_view == 'all') 
                ? "bg-gray-900 text-white border-gray-900 shadow-md" // Active
                : "bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold"; // Inactive
            ?>

            <a href="products.php?category=all" class="<?= $base_btn ?> <?= $all_btn_style ?>">
               <i class="fa-solid fa-layer-group mr-1"></i> Semua
            </a>

            <?php foreach($main_menus as $label => $keyword): 
                $slug = ($label == 'Paket Hemat') ? 'paket' : strtolower($label);
                
                // Logic Tombol Per Kategori
                $cat_btn_style = ($current_view == $slug)
                    ? "bg-brand-gold text-white border-brand-gold shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold";
            ?>
            <a href="products.php?category=<?= $slug ?>" class="<?= $base_btn ?> <?= $cat_btn_style ?>">
                <?= $label ?>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<!-- CONTENT AREA -->
<div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <?php 
        $groups_to_show = ($current_view == 'all') ? array_keys($main_menus) : (($current_view == 'paket') ? ['Paket Hemat'] : []);
        
        if(empty($groups_to_show) && $current_view != 'all') {
            foreach($main_menus as $key => $val) { 
                if(strtolower($key) == ucfirst($current_view) || strtolower($key) == $current_view) $groups_to_show[] = $key; 
            }
        }

        foreach($groups_to_show as $groupName):
            if(empty($grouped_data[$groupName])) continue;
        ?>

        <!-- GROUP SECTION -->
        <div class="space-y-6 animate-fade-in-up">
            <?php if($current_view == 'all'): ?>
            <div class="flex items-center gap-3 border-b border-gray-200 pb-2 mt-8">
                <div class="h-8 w-1.5 bg-brand-gold rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wide"><?= $groupName ?></h2>
            </div>
            <?php endif; ?>

            <?php foreach($grouped_data[$groupName] as $subCat): 
                $cat_id = $subCat['id_kategori'];
                $q_prod = "SELECT * FROM tb_produk WHERE id_kategori = '$cat_id' ORDER BY nama_produk ASC";
                $r_prod = mysqli_query($conn, $q_prod);
                $total_prod = mysqli_num_rows($r_prod);
                if($total_prod == 0) continue;
            ?>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative transition hover:shadow-md">
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <?= $subCat['nama_kategori'] ?>
                        <span class="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full"><?= $total_prod ?></span>
                    </h3>
                    <?php if($current_view == 'all' && $total_prod > 4): ?>
                    <div class="hidden md:flex items-center gap-1 text-xs text-gray-400">
                        <i class="fa-solid fa-arrows-left-right"></i> Geser
                    </div>
                    <?php endif; ?>
                </div>

                <?php if($current_view == 'all'): ?>
                    <!-- MODE RAK (SCROLL) -->
                    <div class="relative group/shelf shelf-wrapper">
                        <button onclick="scrollShelf(this, 'left')" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition opacity-0 group-hover/shelf:opacity-100 -ml-5 border border-gray-100"><i class="fa-solid fa-chevron-left"></i></button>

                        <div class="scroll-shelf flex overflow-x-auto pb-6 -mx-2 px-2 space-x-4 scrollbar-hide snap-x snap-mandatory scroll-smooth relative z-10">
                            <?php while($prod = mysqli_fetch_assoc($r_prod)): ?>
                                <div class="flex-shrink-0 w-44 md:w-52 snap-center">
                                    <?= renderProductCard($prod); ?>
                                </div>
                            <?php endwhile; ?>
                            <div class="flex-shrink-0 w-32 snap-center flex items-center justify-center">
                                <a href="products.php?category=<?= strtolower($groupName) ?>" class="flex flex-col items-center gap-2 text-gray-400 hover:text-brand-gold transition p-4 border-2 border-dashed border-gray-200 rounded-xl w-full h-40 justify-center hover:bg-yellow-50 hover:border-brand-gold/50">
                                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white"><i class="fa-solid fa-arrow-right"></i></div>
                                    <span class="text-[10px] font-bold text-center">Lihat Semua<br>Varian</span>
                                </a>
                            </div>
                        </div>

                        <button onclick="scrollShelf(this, 'right')" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition opacity-0 group-hover/shelf:opacity-100 -mr-5 border border-gray-100"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                <?php else: ?>
                    <!-- MODE GRID -->
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <?php while($prod = mysqli_fetch_assoc($r_prod)): ?>
                            <?= renderProductCard($prod); ?>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>

            </div>
            <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
        
        <?php if(empty($groups_to_show) && empty($grouped_data)): ?>
            <div class="text-center py-20">
                <i class="fa-solid fa-box-open text-6xl text-gray-200 mb-4"></i>
                <h3 class="text-lg font-bold text-gray-500">Belum ada produk di kategori ini.</h3>
                <a href="products.php?category=all" class="text-brand-gold underline text-sm mt-2 block">Kembali ke Semua Produk</a>
            </div>
        <?php endif; ?>

    </div>
</div>

<script>
function scrollShelf(btn, direction) {
    const wrapper = btn.closest('.shelf-wrapper');
    const container = wrapper.querySelector('.scroll-shelf');
    const scrollAmount = 300;
    if (direction === 'left') container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    else container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}
</script>

<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
</style>

<?php include 'footer.php'; ?>