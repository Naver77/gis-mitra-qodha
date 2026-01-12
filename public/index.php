<?php 
$page_title = "Beranda"; 
require_once '../config/database.php'; 

// --- 1. QUERY UNTUK CAROUSEL HERO (CARD PRODUK) ---
$hero_products = [];
$q_hero = "SELECT * FROM tb_produk ORDER BY id_produk DESC LIMIT 5";
$r_hero = mysqli_query($conn, $q_hero);

if($r_hero && mysqli_num_rows($r_hero) > 0) {
    while($row = mysqli_fetch_assoc($r_hero)) {
        $hero_products[] = [
            'name' => $row['nama_produk'],
            'desc' => $row['deskripsi'] ?? 'Keharuman alami berkualitas premium.',
            // Pastikan path ini sesuai
            'image' => !empty($row['foto_produk']) ? 'assets/img/'.$row['foto_produk'] : 'assets/img/marker_qodha.png'
        ];
    }
} else {
    // Dummy Data jika database kosong
    $hero_products[] = ['name' => 'Produk Qodha', 'desc' => 'Segera hadir produk terbaik.', 'image' => 'assets/img/marker_qodha.png'];
}

// --- 2. QUERY BEST SELLER (UNTUK SECTION BAWAH) ---
$q_best = "SELECT * FROM tb_produk ORDER BY created_at DESC LIMIT 6";
$r_best = mysqli_query($conn, $q_best);

// Helper Rupiah
function formatRupiah($angka){ return "Rp " . number_format($angka,0,',','.'); }
?>

<?php include 'header.php'; ?>

<section class="relative w-full min-h-[90vh] bg-gray-900 flex items-center overflow-hidden py-20">
    <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-green rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            
            <div class="space-y-6 text-center lg:text-left animate-fade-in-up">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md mx-auto lg:mx-0">
                    <span class="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                    <span class="text-xs font-bold text-brand-gold tracking-wide uppercase">Premium Aromatic Sunnah</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Keharuman <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Bernilai Ibadah</span>
                </h1>

                <p class="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Hadirkan ketenangan jiwa dan suasana khusyuk dengan koleksi wewangian alami Qodha. Diproses higienis dengan bahan baku terbaik.
                </p>

                <div class="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                    <a href="products.php" class="px-8 py-4 bg-brand-gold text-gray-900 font-bold rounded-xl hover:bg-white transition shadow-lg hover:shadow-brand-gold/20 transform hover:-translate-y-1">
                        Lihat Koleksi
                    </a>
                    <a href="distributor.php" class="px-8 py-4 border border-gray-600 text-white font-bold rounded-xl hover:bg-gray-800 transition flex items-center gap-2">
                        <i class="fa-solid fa-map-location-dot"></i> Cari Agen
                    </a>
                </div>
            </div>

            <div class="flex justify-center w-full relative">
                <div class="absolute inset-0 bg-brand-gold rounded-full blur-3xl opacity-10 pointer-events-none"></div>
                
                <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-700/10 transform rotate-1 hover:rotate-0 transition duration-500">
                    <div class="relative h-80 bg-gray-100 flex items-center justify-center overflow-hidden group">
                        <img id="productImage" src="" alt="Produk" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    </div>
                    
                    <div class="p-6 relative">
                        <div class="absolute -top-6 right-6 flex gap-2">
                            <button onclick="prevProduct()" class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-brand-gold transition hover:scale-110"><i class="fa-solid fa-chevron-left"></i></button>
                            <button onclick="nextProduct()" class="w-10 h-10 bg-brand-gold rounded-full shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition hover:scale-110"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>

                        <span class="text-xs font-bold text-brand-green bg-green-50 px-2 py-1 rounded mb-2 inline-block">Featured Product</span>
                        <h3 id="productName" class="text-2xl font-bold text-gray-900 mb-1">Loading...</h3>
                        <p id="productDesc" class="text-sm text-gray-500 line-clamp-2 mb-4">Loading...</p>
                        
                        <div class="flex gap-2" id="dotsContainer"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<section class="py-20 bg-white relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1 space-y-6">
                <span class="text-brand-green font-bold tracking-widest text-sm uppercase">Edukasi & Manfaat</span>
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    Kenapa Sih Harus Pakai <span class="text-brand-gold">Aromaterapi?</span>
                </h2>
                <p class="text-gray-600 text-lg leading-relaxed">
                    Aroma bukan sekadar wewangian, tapi kunci ketenangan. Simak bagaimana aromaterapi dapat meningkatkan kualitas istirahat, fokus ibadah, dan menciptakan suasana positif di rumah Anda.
                </p>
                <ul class="space-y-3 mt-4">
                    <li class="flex items-center gap-3"><i class="fa-solid fa-check-circle text-brand-green text-xl"></i><span class="text-gray-700 font-medium">Relaksasi pikiran & tubuh</span></li>
                    <li class="flex items-center gap-3"><i class="fa-solid fa-check-circle text-brand-green text-xl"></i><span class="text-gray-700 font-medium">Meningkatkan fokus & mood</span></li>
                    <li class="flex items-center gap-3"><i class="fa-solid fa-check-circle text-brand-green text-xl"></i><span class="text-gray-700 font-medium">Sunnah yang menghidupkan suasana</span></li>
                </ul>
            </div>
            <div class="order-1 lg:order-2">
                <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition duration-500">
                    <div class="aspect-video w-full bg-gray-900">
                        <iframe class="w-full h-full" src="https://www.youtube.com/embed/Y0tF0nTD2fU?rel=0&modestbranding=1" title="Manfaat Aromaterapi Qodha" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-16 bg-gray-50 border-y border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
            <h2 class="text-2xl font-bold text-gray-900">Pilih Kategori Favorit</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <a href="products.php?category=dupa" class="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
                <div class="w-12 h-12 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-xl mb-3 text-orange-500 group-hover:scale-110 transition"><i class="fa-solid fa-fire-flame-curved"></i></div>
                <h3 class="font-bold text-gray-800 text-sm">Dupa</h3>
            </a>
            <a href="products.php?category=bukhur" class="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
                <div class="w-12 h-12 mx-auto bg-stone-50 rounded-full flex items-center justify-center text-xl mb-3 text-stone-600 group-hover:scale-110 transition"><i class="fa-solid fa-cloud"></i></div>
                <h3 class="font-bold text-gray-800 text-sm">Bukhur</h3>
            </a>
            <a href="products.php?category=parfum" class="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
                <div class="w-12 h-12 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-xl mb-3 text-purple-500 group-hover:scale-110 transition"><i class="fa-solid fa-spray-can"></i></div>
                <h3 class="font-bold text-gray-800 text-sm">Parfum</h3>
            </a>
            <a href="products.php?category=hio" class="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
                <div class="w-12 h-12 mx-auto bg-red-50 rounded-full flex items-center justify-center text-xl mb-3 text-red-500 group-hover:scale-110 transition"><i class="fa-solid fa-wind"></i></div>
                <h3 class="font-bold text-gray-800 text-sm">Hio Stick</h3>
            </a>
            <a href="products.php?category=paket" class="group bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
                <div class="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center text-xl mb-3 text-green-600 group-hover:scale-110 transition"><i class="fa-solid fa-box-open"></i></div>
                <h3 class="font-bold text-gray-800 text-sm">Paket Hemat</h3>
            </a>
        </div>
    </div>
</section>

<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-8">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Terlaris Minggu Ini</h2>
                <p class="text-gray-500 mt-1">Pilihan pelanggan setia Qodha.</p>
            </div>
            <a href="products.php" class="text-sm font-bold text-brand-gold hover:underline hidden md:inline-block">Lihat Semua <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-4 scrollbar-hide snap-x snap-mandatory">
            <?php while($prod = mysqli_fetch_assoc($r_best)): 
                $img = !empty($prod['foto_produk']) ? 'assets/img/'.$prod['foto_produk'] : 'assets/img/marker_qodha.png';
            ?>
            <div class="flex-shrink-0 w-48 snap-center group">
                <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:border-brand-gold">
                    <div class="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                        <img src="<?= $img ?>" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="<?= $prod['nama_produk'] ?>">
                        <div class="absolute top-2 left-2 bg-brand-gold text-white text-[9px] px-2 py-1 rounded font-bold uppercase shadow-sm">Best Seller</div>
                    </div>
                    <div class="p-3 flex flex-col flex-1">
                        <h3 class="text-sm font-bold text-gray-800 line-clamp-2 mb-1 leading-snug" title="<?= $prod['nama_produk'] ?>">
                            <?= $prod['nama_produk'] ?>
                        </h3>
                        <div class="mt-auto pt-2 flex justify-between items-center">
                            <span class="text-sm font-bold text-brand-gold"><?= formatRupiah($prod['harga']) ?></span>
                            <a href="https://wa.me/6281717302223?text=Order <?= $prod['nama_produk'] ?>" target="_blank" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-green hover:text-white transition">
                                <i class="fa-solid fa-cart-plus text-xs"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
    </div>
</section>

<section class="py-20 bg-gray-900 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('assets/img/pattern-islamic.png')] opacity-5"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-overlay filter blur-[128px] opacity-20"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
            <span class="text-brand-gold font-bold tracking-widest text-sm uppercase">Keunggulan Kami</span>
            <h2 class="text-3xl md:text-4xl font-extrabold text-white mt-2">Kenapa Harus Qodha Aromatic?</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-tags text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Harga Terjangkau</h3>
                <p class="text-sm text-gray-400">Produk berkualitas tinggi dengan harga yang sangat bersaing.</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-box-open text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Packaging Mewah</h3>
                <p class="text-sm text-gray-400">Desain elegan dan menarik, cocok untuk hadiah.</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-wind text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Aroma Terkenal</h3>
                <p class="text-sm text-gray-400">Banyak pilihan aroma best seller yang dicari pasar.</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-mosque text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Bernilai Ibadah</h3>
                <p class="text-sm text-gray-400">Produk bernuansa sunnah untuk kenyamanan ibadah.</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-hand-holding-dollar text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Harga Termurah</h3>
                <p class="text-sm text-gray-400">Akses langsung tangan pertama (produsen).</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-headset text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Support Penjualan</h3>
                <p class="text-sm text-gray-400">Benefit fasilitas lengkap untuk membantu mitra.</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-photo-film text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Konten Promosi</h3>
                <p class="text-sm text-gray-400">Tersedia materi foto & video siap pakai.</p>
            </div>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid fa-handshake text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2">Kekeluargaan</h3>
                <p class="text-sm text-gray-400">Amanah dan memudahkan mitra dengan pendekatan hangat.</p>
            </div>
        </div>
    </div>
</section>

<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-emerald-100">
            <div class="flex-1 space-y-6">
                <h2 class="text-3xl font-bold text-gray-900">Masih Bingung Memilih?</h2>
                <p class="text-gray-600 text-lg">
                    Konsultasikan kebutuhan aroma Anda atau temukan lokasi mitra resmi terdekat untuk mencium aromanya secara langsung.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="https://wa.me/6281717302223" target="_blank" class="px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-emerald-600 transition shadow-lg">
                        <i class="fa-brands fa-whatsapp mr-2"></i> Chat Admin
                    </a>
                    <a href="distributor.php" class="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 border border-gray-200 transition">
                        <i class="fa-solid fa-map-location-dot mr-2"></i> Buka Peta
                    </a>
                </div>
            </div>
            <div class="flex-1 w-full relative">
                <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-500">
                    <img src="assets/img/map-preview.png" onerror="this.src='https://via.placeholder.com/600x350?text=Peta+Sebaran+Mitra+Qodha'" class="w-full h-auto" alt="Peta Lokasi">
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-16 bg-brand-gold relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('assets/img/pattern-islamic.png')] opacity-10"></div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-4">Siap Menjadi Mitra Sukses Qodha?</h2>
        <p class="text-white/90 mb-8 text-lg">Bergabunglah dengan ratusan mitra lainnya dan raih keberkahan usaha bersama kami.</p>
        <a href="partnership.php" class="inline-block px-10 py-4 bg-white text-brand-dark font-bold rounded-full shadow-xl hover:scale-105 transition transform">
            Daftar Kemitraan Sekarang
        </a>
    </div>
</section>

<script>
    const products = <?php echo json_encode($hero_products); ?>;
    let currentProduct = 0;
    
    function initCarousel() {
        const dotsContainer = document.getElementById('dotsContainer');
        if(!dotsContainer) return; 

        products.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-brand-gold w-6' : 'bg-gray-300'}`;
            dot.onclick = () => goToProduct(idx);
            dotsContainer.appendChild(dot);
        });
        updateCarousel();
    }
    
    function updateCarousel() {
        if(products.length === 0) return;
        const product = products[currentProduct];
        const nameEl = document.getElementById('productName');
        const descEl = document.getElementById('productDesc');
        const imgEl = document.getElementById('productImage');

        if(nameEl) nameEl.textContent = product.name;
        if(descEl) descEl.textContent = product.desc;
        if(imgEl) imgEl.src = product.image;
        
        const dots = document.querySelectorAll('#dotsContainer button');
        dots.forEach((dot, idx) => {
            if (idx === currentProduct) {
                dot.classList.remove('bg-gray-300', 'w-2');
                dot.classList.add('bg-brand-gold', 'w-6');
            } else {
                dot.classList.remove('bg-brand-gold', 'w-6');
                dot.classList.add('bg-gray-300', 'w-2');
            }
        });
    }
    
    function nextProduct() {
        currentProduct = (currentProduct + 1) % products.length;
        updateCarousel();
    }
    
    function prevProduct() {
        currentProduct = (currentProduct - 1 + products.length) % products.length;
        updateCarousel();
    }
    
    function goToProduct(idx) {
        currentProduct = idx;
        updateCarousel();
    }
    
    setInterval(nextProduct, 5000);
    document.addEventListener('DOMContentLoaded', initCarousel);
</script>

<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    .animate-blob { animation: blob 10s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
</style>

<?php include 'footer.php'; ?>