
<!-- FOOTER -->
<footer class="w-full bg-slate-950 text-gray-300 mt-auto border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Social Icons Top Center -->
        <div class="flex justify-center gap-4 mb-8 pb-6 border-b border-slate-800">
            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"><i class="fab fa-whatsapp"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"><i class="fab fa-instagram"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"><i class="fab fa-x-twitter"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300"><i class="fab fa-youtube"></i></a>
        </div>

        <!-- 4 Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
            <!-- Contact -->
            <div>
                <h4 class="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Kontak</h4>
                <ul class="space-y-2 text-xs text-gray-400">
                    <li class="flex gap-2 items-start">
                        <i class="fa-solid fa-map-pin text-emerald-500 mt-1 flex-shrink-0"></i>
                        <span>Jakarta, Indonesia</span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <i class="fa-solid fa-phone text-emerald-500 mt-1 flex-shrink-0"></i>
                        <span><a href="tel:+62212345678" class="hover:text-emerald-400 transition">+62 (21) 234-5678</a></span>
                    </li>
                    <li class="flex gap-2 items-start">
                        <i class="fa-solid fa-envelope text-emerald-500 mt-1 flex-shrink-0"></i>
                        <span><a href="mailto:info@qodha.id" class="hover:text-emerald-400 transition">info@qodha.id</a></span>
                    </li>
                </ul>
            </div>

            <!-- Menu -->
            <div>
                <h4 class="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Menu</h4>
                <ul class="space-y-1.5 text-xs text-gray-400">
                    <li><a href="index.php" class="hover:text-emerald-400 transition">Beranda</a></li>
                    <li><a href="kategori.php" class="hover:text-emerald-400 transition">Kategori</a></li>
                    <li><a href="distributor.php" class="hover:text-emerald-400 transition">Distributor</a></li>
                    <li><a href="contact.php" class="hover:text-emerald-400 transition">Hubungi Kami</a></li>
                    <li><a href="faq.php" class="hover:text-emerald-400 transition">FAQ</a></li>
                </ul>
            </div>

            <!-- Distributors -->
            <div>
                <h4 class="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Distributor</h4>
                <ul class="space-y-1.5 text-xs text-gray-400">
                    <li><a href="distributor.php" class="hover:text-emerald-400 transition">Cari Distributor</a></li>
                    <li><a href="#" class="hover:text-emerald-400 transition">Menjadi Distributor</a></li>
                    <li><a href="contact.php" class="hover:text-emerald-400 transition">Kontak Sales</a></li>
                    <li><a href="#" class="hover:text-emerald-400 transition">Wholesale</a></li>
                </ul>
            </div>

            <!-- Working Days/Hours -->
            <div>
                <h4 class="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Jam Operasional</h4>
                <div class="space-y-2 text-xs text-gray-400">
                    <div class="flex gap-2 items-start">
                        <i class="fa-regular fa-calendar text-emerald-500 mt-1 flex-shrink-0"></i>
                        <span>Senin - Jumat</span>
                    </div>
                    <div class="flex gap-2 items-start">
                        <i class="fa-regular fa-clock text-emerald-500 mt-1 flex-shrink-0"></i>
                        <span>08:00 - 17:00 WIB</span>
                    </div>
                    <div class="pt-2 border-t border-slate-800">
                        <p class="text-emerald-400 text-xs font-medium">Sabtu: 09:00 - 14:00</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom - Compact Copyright & Links -->
        <div class="border-t border-slate-800 pt-4">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-xs text-gray-500">© 2026 Qodha Mitra. Parfum No. 1 di Indonesia. All rights reserved.</p>
                <div class="flex gap-4 text-xs text-gray-400">
                    <a href="#" class="hover:text-emerald-400 transition">Privasi</a>
                    <span class="text-slate-700">•</span>
                    <a href="#" class="hover:text-emerald-400 transition">Syarat & Ketentuan</a>
                    <span class="text-slate-700">•</span>
                    <a href="#" class="hover:text-emerald-400 transition">Panduan</a>
                </div>
            </div>
        </div>
    </div>
</footer>

    <!-- Leaflet and map script (only if on distributor page) -->
    <?php if (basename($_SERVER['PHP_SELF']) == 'distributor.php'): ?>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="./assets/js/map.js"></script>
    <?php endif; ?>
</body>
</html>
