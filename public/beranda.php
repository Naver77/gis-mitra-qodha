<?php $page_title = "Beranda"; ?>
<?php include 'header.php'; ?>

<!-- HERO SECTION -->
<section class="w-full bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <!-- Text -->
            <div>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Temukan Distributor <span class="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Resmi</span> Terdekat
                </h1>
                <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                    Jaringan distributor terpercaya kami siap melayani kebutuhan produk berkualitas Anda di seluruh Indonesia dengan harga terbaik dan layanan prima.
                </p>
                <div class="flex gap-4 flex-wrap">
                    <a href="distributor.php" class="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition transform hover:-translate-y-1">
                        <i class="fa-solid fa-map-location-dot mr-2"></i>Cari Distributor
                    </a>
                    <a href="kategori.php" class="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition">
                        <i class="fa-solid fa-th mr-2"></i>Lihat Kategori
                    </a>
                </div>
            </div>

            <!-- Image -->
            <div class="flex justify-center">
                <div class="relative w-full max-w-md">
                    <div class="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl blur-2xl opacity-20"></div>
                    <div class="relative bg-white rounded-2xl shadow-xl p-8 text-center">
                        <i class="fa-solid fa-map text-6xl text-emerald-600 mb-4"></i>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">2,450+</h3>
                        <p class="text-gray-600">Distributor Aktif</p>
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <p class="text-sm text-gray-500">Melayani seluruh Indonesia dengan komitmen terbaik</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- STATS SECTION -->
<section class="w-full bg-white py-12">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 text-center border border-emerald-200">
                <div class="text-3xl font-bold text-emerald-600 mb-2">2,450+</div>
                <p class="text-sm text-gray-700 font-medium">Distributor Aktif</p>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center border border-blue-200">
                <div class="text-3xl font-bold text-blue-600 mb-2">34</div>
                <p class="text-sm text-gray-700 font-medium">Provinsi Terjangkau</p>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center border border-orange-200">
                <div class="text-3xl font-bold text-orange-600 mb-2">500+</div>
                <p class="text-sm text-gray-700 font-medium">Produk Tersedia</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center border border-purple-200">
                <div class="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p class="text-sm text-gray-700 font-medium">Dukungan Pelanggan</p>
            </div>
        </div>
    </div>
</section>

<!-- KATEGORI SECTION -->
<section class="w-full bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kategori Produk</h2>
            <p class="text-lg text-gray-600">Jelajahi berbagai kategori produk unggulan kami</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <?php 
            $categories = [
                ['icon' => 'fa-bolt', 'name' => 'Elektronik', 'color' => 'emerald'],
                ['icon' => 'fa-hammer', 'name' => 'Peralatan', 'color' => 'blue'],
                ['icon' => 'fa-tshirt', 'name' => 'Pakaian', 'color' => 'orange'],
                ['icon' => 'fa-home', 'name' => 'Rumah Tangga', 'color' => 'purple'],
                ['icon' => 'fa-book', 'name' => 'Edukasi', 'color' => 'pink'],
                ['icon' => 'fa-utensils', 'name' => 'Makanan', 'color' => 'red'],
                ['icon' => 'fa-dumbbell', 'name' => 'Olahraga', 'color' => 'green'],
                ['icon' => 'fa-spa', 'name' => 'Kecantikan', 'color' => 'rose'],
            ];
            
            foreach($categories as $cat):
                $colorMap = [
                    'emerald' => 'from-emerald-500 to-emerald-600',
                    'blue' => 'from-blue-500 to-blue-600',
                    'orange' => 'from-orange-500 to-orange-600',
                    'purple' => 'from-purple-500 to-purple-600',
                    'pink' => 'from-pink-500 to-pink-600',
                    'red' => 'from-red-500 to-red-600',
                    'green' => 'from-green-500 to-green-600',
                    'rose' => 'from-rose-500 to-rose-600',
                ];
            ?>
            <a href="kategori.php" class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition transform hover:-translate-y-2 group">
                <div class="bg-gradient-to-br <?php echo $colorMap[$cat['color']]; ?> w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition">
                    <i class="fa-solid <?php echo $cat['icon']; ?>"></i>
                </div>
                <h3 class="font-semibold text-gray-900"><?php echo $cat['name']; ?></h3>
            </a>
            <?php endforeach; ?>
        </div>

        <div class="text-center mt-10">
            <a href="kategori.php" class="inline-block px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition">
                Lihat Semua Kategori <i class="fa-solid fa-arrow-right ml-2"></i>
            </a>
        </div>
    </div>
</section>

<!-- CTA SECTION -->
<section class="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 py-16">
    <div class="max-w-7xl mx-auto px-6 text-center text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Siap Menemukan Distributor Terbaik?</h2>
        <p class="text-lg mb-8 text-emerald-100">Jelajahi peta interaktif kami dan temukan distributor resmi di lokasi Anda</p>
        <a href="distributor.php" class="inline-block px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
            <i class="fa-solid fa-map-location-dot mr-2"></i>Buka Peta Distributor
        </a>
    </div>
</section>

<?php include 'footer.php'; ?>
