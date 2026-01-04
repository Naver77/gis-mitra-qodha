<?php $page_title = "Kategori Produk"; ?>
<?php include 'header.php'; ?>

<!-- PAGE HEADER -->
<section class="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 py-12">
    <div class="max-w-7xl mx-auto px-6 text-white">
        <h1 class="text-4xl font-bold mb-2">Kategori Produk</h1>
        <p class="text-emerald-100">Jelajahi semua kategori produk unggulan kami</p>
    </div>
</section>

<!-- CATEGORIES GRID -->
<section class="w-full bg-white py-16">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php 
            $categories = [
                [
                    'name' => 'Elektronik',
                    'icon' => 'fa-bolt',
                    'color' => 'emerald',
                    'description' => 'Produk elektronik terkini dan terpercaya',
                    'count' => '156 produk'
                ],
                [
                    'name' => 'Peralatan & Tools',
                    'icon' => 'fa-hammer',
                    'color' => 'blue',
                    'description' => 'Peralatan berkualitas profesional',
                    'count' => '89 produk'
                ],
                [
                    'name' => 'Fashion & Pakaian',
                    'icon' => 'fa-tshirt',
                    'color' => 'orange',
                    'description' => 'Koleksi fashion terbaru dan trendy',
                    'count' => '234 produk'
                ],
                [
                    'name' => 'Rumah Tangga',
                    'icon' => 'fa-home',
                    'color' => 'purple',
                    'description' => 'Perlengkapan rumah tangga lengkap',
                    'count' => '145 produk'
                ],
                [
                    'name' => 'Edukasi & Buku',
                    'icon' => 'fa-book',
                    'color' => 'pink',
                    'description' => 'Materi edukasi dan buku berkualitas',
                    'count' => '78 produk'
                ],
                [
                    'name' => 'Makanan & Minuman',
                    'icon' => 'fa-utensils',
                    'color' => 'red',
                    'description' => 'Produk makanan premium pilihan',
                    'count' => '198 produk'
                ],
                [
                    'name' => 'Olahraga & Fitness',
                    'icon' => 'fa-dumbbell',
                    'color' => 'green',
                    'description' => 'Perlengkapan olahraga profesional',
                    'count' => '112 produk'
                ],
                [
                    'name' => 'Kecantikan & Perawatan',
                    'icon' => 'fa-spa',
                    'color' => 'rose',
                    'description' => 'Produk kecantikan original & aman',
                    'count' => '167 produk'
                ],
                [
                    'name' => 'Mainan & Hobi',
                    'icon' => 'fa-gamepad',
                    'color' => 'yellow',
                    'description' => 'Mainan edukatif & produk hobi',
                    'count' => '95 produk'
                ],
            ];
            
            $colorMap = [
                'emerald' => 'from-emerald-500 to-emerald-600',
                'blue' => 'from-blue-500 to-blue-600',
                'orange' => 'from-orange-500 to-orange-600',
                'purple' => 'from-purple-500 to-purple-600',
                'pink' => 'from-pink-500 to-pink-600',
                'red' => 'from-red-500 to-red-600',
                'green' => 'from-green-500 to-green-600',
                'rose' => 'from-rose-500 to-rose-600',
                'yellow' => 'from-yellow-500 to-yellow-600',
            ];
            
            foreach($categories as $cat):
            ?>
            <div class="product-card">
                <div class="product-card-header bg-gradient-to-br <?php echo $colorMap[$cat['color']]; ?> p-8 text-white relative">
                    <div class="product-card-overlay"></div>
                    <i class="fa-solid <?php echo $cat['icon']; ?> product-card-icon text-4xl mb-4 block relative z-10"></i>
                    <h3 class="text-2xl font-bold relative z-10"><?php echo $cat['name']; ?></h3>
                </div>
                <div class="product-card-content p-6">
                    <p class="text-gray-600 mb-4 flex-1"><?php echo $cat['description']; ?></p>
                    <div class="product-card-footer">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm text-gray-500 font-medium"><?php echo $cat['count']; ?></span>
                        </div>
                        <a href="distributor.php" class="product-card-cta">
                            <span>Lihat Distributor</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>
