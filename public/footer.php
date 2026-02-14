</main>
<footer class="bg-gray-950 text-gray-400 border-t border-gray-800 font-sans">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div class="space-y-4">
                <img src="assets/img/qodhawhite.png" class="h-10 brightness-0 invert opacity-90" alt="Logo White">

                <p class="text-xs leading-relaxed text-gray-400">
                    Produsen wewangian Sunnah berkualitas tinggi dengan bahan alami. Menghadirkan ketenangan dan keberkahan aroma di setiap aktivitas ibadah Anda.
                </p>

                <div class="pt-1">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Terverifikasi Oleh</p>
                    <div class="flex flex-wrap gap-2">
                        <div class="bg-white rounded p-1 h-8 w-auto flex items-center justify-center shadow-lg">
                            <img src="assets/img/banggabuatanindonesia.png" class="h-full w-auto object-contain" alt="BBI">
                        </div>
                        <div class="bg-white rounded p-1 h-8 w-auto flex items-center justify-center shadow-lg">
                            <img src="assets/img/halal.png" class="h-full w-auto object-contain" alt="Halal">
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-800 md:border-none pt-4 md:pt-0">
                <button onclick="toggleFooter('jelajahi')" class="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                    <h4 class="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-brand-gold pl-3">Jelajahi</h4>
                    <i id="icon-jelajahi" class="fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden"></i>
                </button>

                <ul id="content-jelajahi" class="space-y-2 text-sm mt-4 hidden md:block">
                    <li><a href="beranda.php" class="hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Beranda</a></li>
                    <li><a href="products.php" class="hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Katalog Produk</a></li>
                    <li><a href="distributor.php" class="hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Peta Sebaran Mitra</a></li>
                    <li><a href="partnership.php" class="hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Peluang Kemitraan</a></li>
                    <li><a href="faq.php" class="hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Bantuan & FAQ</a></li>
                </ul>
            </div>

            <div class="flex flex-col gap-0 md:gap-10 border-t border-gray-800 md:border-none">
                
                <div class="pt-4 md:pt-0 pb-4 md:pb-0 border-b border-gray-800 md:border-none">
                    <button onclick="toggleFooter('store')" class="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                        <h4 class="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-brand-gold pl-3">Official Store</h4>
                        <i id="icon-store" class="fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden"></i>
                    </button>

                    <div id="content-store" class="hidden md:block mt-4">
                        <div class="flex flex-wrap gap-3">
                            <a href="https://www.tokopedia.com/qodha" target="_blank" class="group w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-[#42b549]" title="Tokopedia">
                                <img src="assets/img/tokopedia.png" class="w-6 h-6 object-contain" alt="Tokopedia">
                            </a>
                            <a href="https://shopee.co.id/qodha.id" target="_blank" class="group w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-[#ee4d2d]" title="Shopee">
                                <img src="assets/img/shopee.png" class="w-6 h-6 object-contain" alt="Shopee">
                            </a>
                            <a href="https://www.tiktok.com/@qodhaaromatic" target="_blank" class="group w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-[#0f146d]" title="TikTok">
                                <img src="assets/img/tiktok.png" class="w-6 h-6 object-contain" alt="TikTok">
                            </a>
                        </div>
                    </div>
                </div>

                <div class="pt-4 md:pt-0">
                    <button onclick="toggleFooter('sosmed')" class="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                        <h4 class="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-gray-700 pl-3">Ikuti Kami</h4>
                        <i id="icon-sosmed" class="fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden"></i>
                    </button>

                    <div id="content-sosmed" class="hidden md:block mt-4">
                        <div class="flex gap-3">
                            <a href="https://www.instagram.com/qodha.id/" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-lg text-sm" title="Instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://www.facebook.com/qodhaaromatic" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg text-sm" title="Facebook">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="https://www.youtube.com/channel/UC3MouHTaJ5rD90jzYENTzqQ" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg text-sm" title="YouTube">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div class="border-t border-gray-800 md:border-none pt-4 md:pt-0">
                <button onclick="toggleFooter('kontak')" class="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                    <h4 class="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-brand-gold pl-3">Hubungi Kami</h4>
                    <i id="icon-kontak" class="fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden"></i>
                </button>
                
                <div id="content-kontak" class="hidden md:block mt-4">
                    <ul class="space-y-3 text-sm mb-6">
                        <li class="flex items-start gap-3">
                            <i class="fa-solid fa-map-location-dot text-brand-gold mt-1"></i>
                            <span class="leading-snug text-xs">Bogor, Jawa Barat<br><span class="text-[10px] text-gray-500">(Pusat Distribusi)</span></span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fa-brands fa-whatsapp text-brand-gold"></i>
                            <a href="https://wa.me/6281717302223" class="hover:text-white font-semibold transition text-xs">+62 817 1730 2223</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fa-regular fa-envelope text-brand-gold"></i>
                            <a href="mailto:info@qodha.id" class="hover:text-white transition text-xs">info@qodha.id</a>
                        </li>
                    </ul>

                    <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-800">
                        <h5 class="text-white text-[10px] font-bold uppercase mb-2 flex items-center gap-2">
                            <i class="fa-regular fa-clock text-brand-green"></i> Jam Operasional
                        </h5>
                        <div class="space-y-1 text-[10px]">
                            <div class="flex justify-between">
                                <span>Senin - Sabtu</span>
                                <span class="text-white font-mono">08:00 - 16:45</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>Minggu / Libur</span>
                                <span class="text-red-400">Tutup</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="border-t border-gray-800 bg-gray-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-gray-500">
                <p>&copy; 2026 Qodha Aromatic WebGIS. All rights reserved.</p>
                <div class="flex gap-4">
                    <a href="#" class="hover:text-white transition">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition">Terms</a>
                    <a href="#" class="hover:text-white transition">Sitemap</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<a href="https://wa.me/6281717302223?text=Halo%20Admin%20Qodha,%20saya%20ingin%20bertanya..." target="_blank" 
   class="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center">
    <div class="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        Chat Admin
        <div class="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
    </div>
    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-green-600 transition transform hover:scale-110 animate-bounce-slow">
        <i class="fa-brands fa-whatsapp text-2xl"></i>
    </div>
    <span class="absolute inset-0 rounded-full border border-green-500 animate-ping opacity-75"></span>
</a>

<style>
    .animate-bounce-slow { animation: bounce 3s infinite; }
    @keyframes bounce {
        0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
        50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
    }
</style>

<script>
    function toggleFooter(selectedId) {
        // Cek apakah layar sedang dalam mode mobile (< 768px)
        // Jika di desktop, kita matikan fungsi klik ini agar tidak menutup menu
        if (window.innerWidth >= 768) return;

        // Daftar semua ID section yang bisa di-toggle
        const ids = ['jelajahi', 'store', 'sosmed', 'kontak'];

        ids.forEach(id => {
            const content = document.getElementById('content-' + id);
            const icon = document.getElementById('icon-' + id);

            if (id === selectedId) {
                // Jika ini section yang diklik
                if (content.classList.contains('hidden')) {
                    // Buka
                    content.classList.remove('hidden');
                    icon.classList.add('rotate-180'); // Putar panah
                } else {
                    // Tutup (jika diklik lagi)
                    content.classList.add('hidden');
                    icon.classList.remove('rotate-180');
                }
            } else {
                // Tutup section lainnya (Fitur Eksklusif)
                content.classList.add('hidden');
                if(icon) icon.classList.remove('rotate-180');
            }
        });
    }

    // Fungsi Menu Burger (Existing)
    function toggleMenu() {
        const menu = document.getElementById('mobileMenu');
        const icon = document.getElementById('menuIcon');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden'); menu.classList.add('flex');
            icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark');
        } else {
            menu.classList.add('hidden'); menu.classList.remove('flex');
            icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars');
        }
    }

    function catatKlik(tipe, id) {
    // Kirim data ke API tanpa mengganggu user (Background Process)
    const formData = new FormData();
    formData.append('type', tipe);
    formData.append('id', id);
    
    fetch('../api/log_click.php', {
        method: 'POST',
        body: formData
    }).catch(err => console.log('Log error:', err));
    // Tidak perlu menunggu respon, biarkan user lanjut ke WA
}
</script>

</body>
</html>