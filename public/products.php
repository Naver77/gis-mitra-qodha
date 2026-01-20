<?php 
$page_title = "Katalog Produk"; 
require_once '../config/database.php';

// 1. CONFIG VIEW
$current_view = isset($_GET['category']) ? strtolower($_GET['category']) : 'all'; 

// Format Rupiah
function formatRupiah($angka){ return "Rp " . number_format($angka,0,',','.'); }

// --- FUNGSI RENDER CARD (PERBAIKAN: ISOLASI HOVER) ---
function renderProductCard($prod, $base_url) {
    // Fallback Image
    $img_src = !empty($prod['foto_produk']) ? $base_url . 'assets/img/' . $prod['foto_produk'] : $base_url . 'assets/img/marker_qodha.png';
    
    // Badge Gender
    $badge = '';
    if(isset($prod['gender'])) {
        if($prod['gender'] == 'pria') $badge = '<span class="absolute top-2 right-2 bg-blue-900/90 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase shadow-sm z-20">Man</span>';
        elseif($prod['gender'] == 'wanita') $badge = '<span class="absolute top-2 right-2 bg-pink-500/90 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase shadow-sm z-20">Woman</span>';
        elseif($prod['gender'] == 'unisex') $badge = '<span class="absolute top-2 right-2 bg-purple-600/90 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase shadow-sm z-20">Unisex</span>';
    }

    return '
    <div class="group/card relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:border-brand-gold">
        
        <div class="relative aspect-[4/5] bg-gray-50 overflow-hidden">
            <img src="'.$img_src.'" class="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 z-10 relative" loading="lazy" alt="'.$prod['nama_produk'].'">
            '.$badge.'
            
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                <a href="https://wa.me/6281717302223?text=Halo, saya pesan: '.$prod['nama_produk'].'" 
   onclick="catatKlik(\'klik_produk\', '.$prod['id_produk'].')" 
   target="_blank" 
   class="bg-brand-green text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    <i class="fa-brands fa-whatsapp"></i> Pesan
                </a>
            </div>
        </div>

        <div class="p-3 flex flex-col flex-1 relative z-10 bg-white">
            <h3 class="text-xs md:text-sm font-bold text-gray-800 leading-snug line-clamp-2 mb-1 min-h-[2.5rem]" title="'.$prod['nama_produk'].'">
                '.$prod['nama_produk'].'
            </h3>
            <div class="mt-auto pt-2 border-t border-gray-50 flex justify-between items-center">
                <span class="text-xs md:text-sm font-bold text-brand-gold">'.formatRupiah($prod['harga']).'</span>
                <button class="text-gray-300 hover:text-brand-dark transition"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    </div>';
}

// --- 2. DATA PREPARATION ---
$main_menus = [
    'Dupa' => 'Dupa', 'Bukhur' => 'Bukhur', 'Parfum' => 'Parfum', 
    'Hio' => 'Hio', 'Aksesoris' => 'Aksesoris', 'Paket Hemat' => 'Paket', 'Lainnya' => 'Lainnya'
];

$grouped_data = [];
foreach($main_menus as $key => $val) { $grouped_data[$key] = []; }

$q_cat = "SELECT * FROM tb_kategori ORDER BY nama_kategori ASC";
$res_cat = mysqli_query($conn, $q_cat);

while($cat = mysqli_fetch_assoc($res_cat)) {
    $name = strtolower($cat['nama_kategori']);
    if(strpos($name, 'dupa') !== false) $grouped_data['Dupa'][] = $cat;
    elseif(strpos($name, 'bukhur') !== false) $grouped_data['Bukhur'][] = $cat;
    elseif(strpos($name, 'hio') !== false) $grouped_data['Hio'][] = $cat;
    elseif(strpos($name, 'parfum') !== false || strpos($name, 'perfume') !== false) $grouped_data['Parfum'][] = $cat;
    elseif(strpos($name, 'paket') !== false || strpos($name, 'kemitraan') !== false) $grouped_data['Paket Hemat'][] = $cat;
    elseif(strpos($name, 'alat') !== false || strpos($name, 'prapen') !== false || strpos($name, 'aksesoris') !== false) $grouped_data['Aksesoris'][] = $cat;
    else $grouped_data['Lainnya'][] = $cat;
}
?>

<?php include 'header.php'; ?>

<div class="bg-white pt-6 pb-2 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
            <?php 
                if($current_view == 'all') echo 'New Arrivals & Semua Produk';
                elseif($current_view == 'paket') echo 'Paket Hemat & Kemitraan';
                else echo 'Kategori ' . ucfirst($current_view);
            ?>
        </h1>
        <p class="text-sm text-gray-500">
            <?php 
                if($current_view == 'all') echo 'Jelajahi koleksi lengkap wewangian Qodha Aromatic.';
                else echo 'Menampilkan semua varian dan ukuran untuk kategori ini.';
            ?>
        </p>
    </div>
</div>

<div id="categoryMenu" class="sticky top-[85px] z-40 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex overflow-x-auto py-3 gap-2 no-scrollbar">
            <a href="products.php?category=all" 
               class="px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition shadow-sm border 
               <?= $current_view == 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold' ?>">
               New Arrivals / Semua
            </a>
            <?php foreach($main_menus as $label => $keyword): 
                $isActive = ($current_view == 'paket' && $label == 'Paket Hemat') || ($current_view == strtolower($label));
            ?>
            <a href="products.php?category=<?= $label == 'Paket Hemat' ? 'paket' : strtolower($label) ?>" 
               class="px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition shadow-sm border 
               <?= $isActive ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold' ?>">
                <?= $label ?>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <?php 
        $groups_to_show = ($current_view == 'all') ? array_keys($main_menus) : (($current_view == 'paket') ? ['Paket Hemat'] : []);
        if(empty($groups_to_show) && $current_view != 'all') {
            foreach($main_menus as $key => $val) { if(strtolower($key) == $current_view) $groups_to_show[] = $key; }
        }

        foreach($groups_to_show as $groupName):
            if(empty($grouped_data[$groupName])) continue;
        ?>

        <div class="space-y-6">
            <?php if($current_view == 'all'): ?>
            <div class="flex items-center gap-3 border-b border-gray-200 pb-2 mt-8">
                <div class="h-8 w-1.5 bg-brand-gold rounded-full"></div>
                <h2 class="text-2xl font-bold text-gray-900 uppercase tracking-wide"><?= $groupName ?></h2>
            </div>
            <?php endif; ?>

            <?php foreach($grouped_data[$groupName] as $subCat): 
                $cat_id = $subCat['id_kategori'];
                $q_prod = "SELECT * FROM tb_produk WHERE id_kategori = '$cat_id' ORDER BY nama_produk ASC";
                $r_prod = mysqli_query($conn, $q_prod);
                if(mysqli_num_rows($r_prod) == 0) continue;
            ?>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative">
                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-gray-800"><?= $subCat['nama_kategori'] ?></h3>
                        <p class="text-[10px] text-gray-500 uppercase tracking-wide">Tersedia <?= mysqli_num_rows($r_prod) ?> Varian</p>
                    </div>
                    <?php if($current_view == 'all'): ?>
                    <div class="hidden md:block text-xs text-gray-400">Scroll untuk melihat varian &rarr;</div>
                    <?php endif; ?>
                </div>

                <?php if($current_view == 'all'): ?>
                    
                    <div class="relative group/shelf shelf-wrapper">
                        
                        <button onclick="scrollShelf(this, 'left')" class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition opacity-0 group-hover/shelf:opacity-100 md:group-hover/shelf:opacity-100 focus:opacity-100 -ml-3 md:-ml-4 border border-gray-100">
                            <i class="fa-solid fa-chevron-left text-xs"></i>
                        </button>

                        <div class="scroll-shelf flex overflow-x-auto pb-4 -mx-2 px-2 space-x-4 scrollbar-hide snap-x snap-mandatory scroll-smooth relative z-10">
                            <?php while($prod = mysqli_fetch_assoc($r_prod)): ?>
                                <div class="flex-shrink-0 w-40 snap-center">
                                    <?= renderProductCard($prod, $base_url); ?>
                                </div>
                            <?php endwhile; ?>
                            
                            <div class="flex-shrink-0 w-32 snap-center flex items-center justify-center">
                                <a href="products.php?category=<?= strtolower($groupName) ?>" class="flex flex-col items-center gap-2 text-gray-400 hover:text-brand-gold transition p-4 border-2 border-dashed border-gray-200 rounded-xl w-full h-40 justify-center">
                                    <i class="fa-solid fa-grid-2 text-xl"></i>
                                    <span class="text-[10px] font-bold text-center">Lihat Semua<br>Varian</span>
                                </a>
                            </div>
                        </div>

                        <button onclick="scrollShelf(this, 'right')" class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition opacity-0 group-hover/shelf:opacity-100 md:group-hover/shelf:opacity-100 focus:opacity-100 -mr-3 md:-mr-4 border border-gray-100">
                            <i class="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                    </div>

                <?php else: ?>
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <?php while($prod = mysqli_fetch_assoc($r_prod)): ?>
                            <?= renderProductCard($prod, $base_url); ?>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>

            </div>
            <?php endforeach; ?>
        </div>
        <?php endforeach; ?>

        <?php if($current_view == 'all'): ?>
        <div class="pt-12 mt-12 border-t-2 border-gray-100" id="rekomendasi">
            <div class="text-center mb-10">
                <span class="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wide">Rekomendasi Spesial</span>
                <h2 class="text-2xl font-bold text-gray-900 mt-2">Pilih Sesuai Karakter</h2>
            </div>
            
            <div class="space-y-10">
                <?php 
                $genders = ['pria' => ['icon'=>'fa-mars', 'col'=>'text-blue-600', 'lbl'=>'Maskulin'], 
                            'wanita' => ['icon'=>'fa-venus', 'col'=>'text-pink-500', 'lbl'=>'Feminim']];
                foreach($genders as $key => $g): ?>
                <div>
                    <h3 class="text-sm font-bold text-gray-600 mb-3 ml-1 flex items-center gap-2">
                        <i class="fa-solid <?= $g['icon'] ?> <?= $g['col'] ?>"></i> Aroma <?= $g['lbl'] ?> (<?= ucfirst($key) ?>)
                    </h3>
                    
                    <div class="relative group/shelf shelf-wrapper">
                        <button onclick="scrollShelf(this, 'left')" class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover/shelf:opacity-100 transition -ml-3 text-gray-600"><i class="fa-solid fa-chevron-left text-xs"></i></button>
                        
                        <div class="scroll-shelf flex overflow-x-auto pb-4 -mx-4 px-4 space-x-3 scrollbar-hide snap-x relative z-10">
                            <?php 
                            $r_gen = mysqli_query($conn, "SELECT * FROM tb_produk WHERE gender='$key' LIMIT 8");
                            while($row = mysqli_fetch_assoc($r_gen)) echo '<div class="flex-shrink-0 w-36 snap-center">'.renderProductCard($row, $base_url).'</div>';
                            ?>
                        </div>

                        <button onclick="scrollShelf(this, 'right')" class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover/shelf:opacity-100 transition -mr-3 text-gray-600"><i class="fa-solid fa-chevron-right text-xs"></i></button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

    </div>
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>

<script>
    // 1. Script Header Animation
    let lastScrollY = window.scrollY;
    const categoryMenu = document.getElementById('categoryMenu');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            categoryMenu.classList.remove('top-[85px]');
            categoryMenu.classList.add('top-0');
        } else {
            categoryMenu.classList.remove('top-0');
            categoryMenu.classList.add('top-[85px]');
        }
        lastScrollY = currentScrollY;
    });

    // 2. Script Scroll Button
    function scrollShelf(btn, direction) {
        const wrapper = btn.closest('.shelf-wrapper');
        const container = wrapper.querySelector('.scroll-shelf');
        if(container) {
            const scrollAmount = 300; 
            if(direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    }
</script>

<?php include 'footer.php'; ?>