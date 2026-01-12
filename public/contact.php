<?php $page_title = "Hubungi Kami"; ?>
<?php include 'header.php'; ?>

<!-- PAGE HEADER -->
<section class="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-10 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 text-white">
        <h1 class="text-3xl sm:text-4xl font-bold mb-2">Hubungi Kami</h1>
        <p class="text-sm sm:text-base text-gray-300">Kami siap membantu menjawab pertanyaan Anda</p>
    </div>
</section>

<!-- CONTACT CONTENT -->
<section class="w-full bg-white py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <!-- Contact Info Cards -->
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 sm:p-8 border border-gray-200">
                <div class="w-12 sm:w-14 h-12 sm:h-14 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl sm:text-2xl mb-4">
                    <i class="fa-solid fa-map-pin"></i>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">Lokasi Kantor</h3>
                <p class="text-gray-700">
                    Jl. Merdeka No. 123<br>
                    Jakarta Pusat, 12190<br>
                    Indonesia
                </p>
            </div>

                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 sm:p-8 border border-yellow-200">
                <div class="w-12 sm:w-14 h-12 sm:h-14 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl sm:text-2xl mb-4">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">Telepon</h3>
                <p class="text-gray-700">
                    <a href="tel:+62212345678" class="hover:text-yellow-500">+62 (21) 2345-678</a><br>
                    <a href="tel:+62212345679" class="hover:text-yellow-500">+62 (21) 2345-679</a><br>
                    Senin-Jumat: 08:00-17:00 WIB
                </p>
            </div>

                <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 sm:p-8 border border-orange-200">
                <div class="w-12 sm:w-14 h-12 sm:h-14 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xl sm:text-2xl mb-4">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">Email</h3>
                <p class="text-gray-700">
                    <a href="mailto:info@qodha.id" class="hover:text-orange-600">info@qodha.id</a><br>
                    <a href="mailto:support@qodha.id" class="hover:text-orange-600">support@qodha.id</a><br>
                    Respon dalam 2 jam kerja
                </p>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Kirim Pesan Kepada Kami</h2>
            <form class="space-y-4 sm:space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" placeholder="John Doe" class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    </div>
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" placeholder="john@example.com" class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    </div>
                </div>

                <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Telepon</label>
                        <input type="tel" placeholder="+62 81234567890" class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                </div>

                <div>
                    <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Subjek</label>
                    <input type="text" placeholder="Misal: Pertanyaan Produk" class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                </div>

                <div>
                    <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Pesan</label>
                    <textarea rows="5" placeholder="Tulis pesan Anda di sini..." class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
                </div>

                <button type="submit" class="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:shadow-lg transition">
                    <i class="fa-solid fa-paper-plane mr-2"></i>Kirim Pesan
                </button>
            </form>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>
