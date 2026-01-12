<?php $page_title = "Kemitraan & Lokasi"; ?>
<?php include 'header.php'; ?>

<section class="bg-gray-900 py-20 text-center relative overflow-hidden">
    <div class="absolute inset-0 bg-brand-gold opacity-10"></div>
    <div class="relative z-10 max-w-4xl mx-auto px-4">
        <h1 class="text-4xl font-bold text-white mb-4">Bergabung Menjadi Mitra Qodha</h1>
        <p class="text-gray-300 text-lg mb-8">Dapatkan penghasilan tambahan dengan memasarkan produk yang pasti laku dan berkah.</p>
        <div class="flex justify-center gap-4">
            <a href="https://wa.me/6281717302223?text=Halo, saya ingin info kemitraan" class="px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-emerald-600 transition">
                Daftar Sekarang
            </a>
            <a href="#lokasi" class="px-6 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition">
                Lihat Sebaran Mitra
            </a>
        </div>
    </div>
</section>

<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900">Pilihan Paket Usaha</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-bl-xl">STARTER</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Paket Reseller</h3>
                <p class="text-gray-500 text-sm mb-6">Cocok untuk pemula yang ingin mencoba pasar.</p>
                <ul class="space-y-3 mb-8 text-sm text-gray-600">
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> 12 Pcs Mix Produk</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Spanduk Kecil</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Masuk Grup Support</li>
                </ul>
                <a href="#" class="block w-full py-3 bg-gray-100 text-gray-800 font-bold text-center rounded-xl hover:bg-gray-200">Hubungi Admin</a>
            </div>
            
            <div class="border-2 border-brand-gold rounded-2xl p-8 shadow-xl relative overflow-hidden transform scale-105 bg-white">
                <div class="absolute top-0 right-0 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Paket Agen</h3>
                <p class="text-gray-500 text-sm mb-6">Untuk toko herbal atau perlengkapan ibadah.</p>
                <ul class="space-y-3 mb-8 text-sm text-gray-600">
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> 50 Pcs Mix Produk</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Banner Toko Resmi</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Prioritas Stok</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Listing di Website</li>
                </ul>
                <a href="#" class="block w-full py-3 bg-brand-gold text-white font-bold text-center rounded-xl hover:bg-amber-600 shadow-lg">Ambil Paket Ini</a>
            </div>

            <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-brand-dark text-white text-xs font-bold px-3 py-1 rounded-bl-xl">PRO</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Distributor Kota</h3>
                <p class="text-gray-500 text-sm mb-6">Hak eksklusif pemasaran satu kota/kabupaten.</p>
                <ul class="space-y-3 mb-8 text-sm text-gray-600">
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> 1 Karton Besar</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Full Marketing Kit</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i> Support Iklan FB/IG</li>
                </ul>
                <a href="#" class="block w-full py-3 bg-gray-100 text-gray-800 font-bold text-center rounded-xl hover:bg-gray-200">Hubungi Admin</a>
            </div>
        </div>
    </div>
</section>

<section id="lokasi" class="bg-gray-50 py-16 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Jaringan Mitra Kami</h2>
            <p class="text-gray-500">Cek lokasi mitra terdekat di kota Anda</p>
        </div>
        
        <div class="bg-white p-2 rounded-2xl shadow-lg border border-gray-200 h-[500px] overflow-hidden relative">
            <div class="absolute inset-0 flex items-center justify-center bg-gray-50 z-0">
                <p class="text-gray-400">Memuat Peta...</p>
            </div>
            <iframe src="distributor.php" class="w-full h-full border-0 rounded-xl relative z-10" title="Peta Mitra"></iframe>
        </div>
        
        <div class="text-center mt-6">
            <a href="distributor.php" class="text-brand-gold font-bold hover:underline">Buka Peta Fullscreen <i class="fa-solid fa-arrow-right ml-1"></i></a>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>