
<!-- FOOTER -->
<footer class="w-full bg-gray-900 text-gray-300 mt-16">
    <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Company Info -->
            <div>
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                        Q
                    </div>
                    <h3 class="text-lg font-bold text-white">Qodha Mitra</h3>
                </div>
                <p class="text-sm text-gray-400">Jaringan distributor resmi terpercaya, melayani kebutuhan produk berkualitas ke seluruh Indonesia.</p>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 class="text-white font-semibold mb-4">Menu</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="index.php" class="text-gray-400 hover:text-emerald-400 transition">Beranda</a></li>
                    <li><a href="kategori.php" class="text-gray-400 hover:text-emerald-400 transition">Kategori Produk</a></li>
                    <li><a href="distributor.php" class="text-gray-400 hover:text-emerald-400 transition">Cari Distributor</a></li>
                    <li><a href="faq.php" class="text-gray-400 hover:text-emerald-400 transition">FAQ</a></li>
                </ul>
            </div>

            <!-- Support -->
            <div>
                <h4 class="text-white font-semibold mb-4">Dukungan</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="contact.php" class="text-gray-400 hover:text-emerald-400 transition">Hubungi Kami</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-emerald-400 transition">Kebijakan Privasi</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-emerald-400 transition">Syarat & Ketentuan</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-emerald-400 transition">Panduan Pembelian</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h4 class="text-white font-semibold mb-4">Kontak</h4>
                <ul class="space-y-3 text-sm">
                    <li class="flex gap-2">
                        <i class="fa-solid fa-phone text-emerald-500 mt-0.5"></i>
                        <span><a href="tel:+62212345678" class="text-gray-400 hover:text-emerald-400 transition">+62 (21) 2345-678</a></span>
                    </li>
                    <li class="flex gap-2">
                        <i class="fa-solid fa-envelope text-emerald-500 mt-0.5"></i>
                        <span><a href="mailto:info@qodha.id" class="text-gray-400 hover:text-emerald-400 transition">info@qodha.id</a></span>
                    </li>
                    <li class="flex gap-2">
                        <i class="fa-solid fa-map-pin text-emerald-500 mt-0.5"></i>
                        <span class="text-gray-400">Jakarta, Indonesia</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-gray-500">© 2026 Qodha Mitra. All rights reserved.</p>
            <div class="flex gap-4 mt-4 md:mt-0">
                <a href="#" class="text-gray-400 hover:text-emerald-400 transition"><i class="fab fa-facebook text-lg"></i></a>
                <a href="#" class="text-gray-400 hover:text-emerald-400 transition"><i class="fab fa-instagram text-lg"></i></a>
                <a href="#" class="text-gray-400 hover:text-emerald-400 transition"><i class="fab fa-linkedin text-lg"></i></a>
                <a href="#" class="text-gray-400 hover:text-emerald-400 transition"><i class="fab fa-twitter text-lg"></i></a>
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
