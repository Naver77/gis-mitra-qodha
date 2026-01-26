<section class="py-20 bg-gray-900 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('assets/img/pattern-islamic.png')] opacity-5"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Values Grid -->
        <div class="text-center mb-16">
            <span class="text-brand-gold font-bold tracking-widest text-sm uppercase">Keunggulan Kami</span>
            <h2 class="text-3xl md:text-4xl font-extrabold text-white mt-2">Kenapa Harus Qodha Aromatic?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <?php foreach($value_props as $p): ?>
            <div class="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group hover:-translate-y-1">
                <div class="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition"><i class="fa-solid <?= $p['icon'] ?> text-brand-gold text-xl group-hover:text-gray-900"></i></div>
                <h3 class="text-lg font-bold text-white mb-2"><?= $p['title'] ?></h3>
                <p class="text-sm text-gray-400"><?= $p['desc'] ?></p>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- CTA Map -->
        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-emerald-100">
            <div class="flex-1 space-y-6">
                <h2 class="text-3xl font-bold text-gray-900">Temukan Mitra Resmi</h2>
                <p class="text-gray-600 text-lg">Cek lokasi mitra terdekat di kota Anda untuk mendapatkan produk Qodha original.</p>
                <div class="flex flex-wrap gap-4">
                    <a href="distributor.php" class="px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-emerald-600 transition shadow-lg flex items-center gap-2">
                        <i class="fa-solid fa-map-location-dot"></i> Buka Peta
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