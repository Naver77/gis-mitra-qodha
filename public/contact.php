<?php $page_title = "Hubungi Kami"; ?>
<?php include 'header.php'; ?>

<!-- PAGE HEADER -->
<section class="w-full bg-gradient-to-r from-blue-600 to-blue-500 py-12">
    <div class="max-w-7xl mx-auto px-6 text-white">
        <h1 class="text-4xl font-bold mb-2">Hubungi Kami</h1>
        <p class="text-blue-100">Kami siap membantu menjawab pertanyaan Anda</p>
    </div>
</section>

<!-- CONTACT CONTENT -->
<section class="w-full bg-white py-16">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <!-- Contact Info Cards -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
                <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                    <i class="fa-solid fa-map-pin"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Lokasi Kantor</h3>
                <p class="text-gray-700">
                    Jl. Merdeka No. 123<br>
                    Jakarta Pusat, 12190<br>
                    Indonesia
                </p>
            </div>

            <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-8 border border-emerald-200">
                <div class="w-14 h-14 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Telepon</h3>
                <p class="text-gray-700">
                    <a href="tel:+62212345678" class="hover:text-emerald-600">+62 (21) 2345-678</a><br>
                    <a href="tel:+62212345679" class="hover:text-emerald-600">+62 (21) 2345-679</a><br>
                    Senin-Jumat: 08:00-17:00 WIB
                </p>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 border border-orange-200">
                <div class="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <p class="text-gray-700">
                    <a href="mailto:info@qodha.id" class="hover:text-orange-600">info@qodha.id</a><br>
                    <a href="mailto:support@qodha.id" class="hover:text-orange-600">support@qodha.id</a><br>
                    Respon dalam 2 jam kerja
                </p>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan Kepada Kami</h2>
            <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" placeholder="John Doe" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" placeholder="john@example.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                    <input type="tel" placeholder="+62 81234567890" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                    <input type="text" placeholder="Misal: Pertanyaan Produk" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                    <textarea rows="6" placeholder="Tulis pesan Anda di sini..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <button type="submit" class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition">
                    <i class="fa-solid fa-paper-plane mr-2"></i>Kirim Pesan
                </button>
            </form>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>
