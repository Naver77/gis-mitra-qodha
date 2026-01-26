<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-8">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Produk Terlaris Bulan Ini</h2>
                <p class="text-gray-500 mt-1">Pilihan pelanggan setia Qodha.</p>
            </div>
            <a href="products.php" class="text-sm font-bold text-brand-gold hover:underline hidden md:inline-block">Lihat Semua <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        
        <div class="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-4 scrollbar-hide snap-x snap-mandatory">
            <?php 
            if($best_sellers && mysqli_num_rows($best_sellers) > 0) {
                while($prod = mysqli_fetch_assoc($best_sellers)) {
                    echo renderProductCard($prod); 
                }
            } else {
                echo '<div class="text-gray-400 text-sm italic w-full text-center">Belum ada data produk.</div>';
            }
            ?>
        </div>
    </div>
</section>