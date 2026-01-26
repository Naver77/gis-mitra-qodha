<section class="relative w-full min-h-[90vh] bg-gray-900 flex items-center overflow-hidden py-16 lg:py-24">
    <!-- Background Animated Blobs -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-green rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Kiri: Copywriting -->
            <div class="space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md mx-auto lg:mx-0">
                    <span class="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                    <span class="text-xs font-bold text-brand-gold tracking-wide uppercase">Premium Aromatic Sunnah</span>
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Keharuman <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Bernilai Ibadah</span>
                </h1>
                <p class="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Hadirkan ketenangan jiwa dengan koleksi wewangian alami Qodha. Diproses higienis dengan bahan baku terbaik untuk menemani ibadah Anda.
                </p>
                <div class="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                    <a href="products.php" class="px-8 py-4 bg-brand-gold text-gray-900 font-bold rounded-xl hover:bg-white transition shadow-lg transform hover:-translate-y-1 flex items-center gap-2">
                        <i class="fa-solid fa-bag-shopping"></i> Lihat Koleksi
                    </a>
                    <a href="distributor.php" class="px-8 py-4 border border-gray-600 text-white font-bold rounded-xl hover:bg-gray-800 transition flex items-center gap-2">
                        <i class="fa-solid fa-map-location-dot"></i> Cari Agen
                    </a>
                </div>
            </div>

            <!-- Kanan: Card Carousel Interaktif -->
            <div class="flex justify-center w-full relative">
                <div class="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-700/10 transform rotate-1 hover:rotate-0 transition duration-500">
                    <div class="relative h-80 bg-gray-100 flex items-center justify-center overflow-hidden group">
                        <img id="productImage" src="" alt="Produk" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark uppercase tracking-wide shadow-sm">Featured</div>
                    </div>
                    <div class="p-6 relative bg-white">
                        <div class="absolute -top-6 right-6 flex gap-2">
                            <button onclick="window.prevHeroProduct()" class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-brand-gold transition hover:scale-110"><i class="fa-solid fa-chevron-left"></i></button>
                            <button onclick="window.nextHeroProduct()" class="w-10 h-10 bg-brand-gold rounded-full shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition hover:scale-110"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <h3 id="productName" class="text-xl font-bold text-gray-900 mb-1 line-clamp-1">Loading...</h3>
                        <p id="productPrice" class="text-brand-gold font-bold text-lg mb-2">Rp 0</p>
                        <p id="productDesc" class="text-sm text-gray-500 line-clamp-2 mb-4 h-10">Loading...</p>
                        <div class="flex gap-2 justify-center pt-2" id="dotsContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>