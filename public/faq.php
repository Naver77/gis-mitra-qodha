<?php $page_title = "FAQ"; ?>
<?php include 'header.php'; ?>

<!-- PAGE HEADER -->
<section class="w-full bg-gradient-to-r from-purple-600 to-purple-500 py-12">
    <div class="max-w-7xl mx-auto px-6 text-white">
        <h1 class="text-4xl font-bold mb-2">Pertanyaan Umum (FAQ)</h1>
        <p class="text-purple-100">Temukan jawaban atas pertanyaan-pertanyaan Anda</p>
    </div>
</section>

<!-- FAQ CONTENT -->
<section class="w-full bg-white py-16">
    <div class="max-w-3xl mx-auto px-6">
        <div class="space-y-4">
            <?php 
            $faqs = [
                [
                    'q' => 'Bagaimana cara menemukan distributor terdekat?',
                    'a' => 'Anda dapat menggunakan fitur peta interaktif kami di halaman Distributor. Cukup klik tombol "Disekitar Saya" untuk menemukan distributor di lokasi Anda, atau gunakan pencarian untuk kota spesifik.'
                ],
                [
                    'q' => 'Apakah semua distributor menjual produk yang sama?',
                    'a' => 'Meskipun semua distributor kami resmi, ada beberapa yang mungkin mengkhususkan pada kategori produk tertentu. Hubungi distributor langsung untuk konfirmasi ketersediaan produk.'
                ],
                [
                    'q' => 'Bagaimana cara menghubungi distributor?',
                    'a' => 'Setiap distributor memiliki nomor kontak yang ditampilkan di peta. Anda juga bisa langsung menghubungi via WhatsApp melalui tombol "Chat WhatsApp" yang tersedia.'
                ],
                [
                    'q' => 'Apakah harga sama di semua distributor?',
                    'a' => 'Harga dapat berbeda tergantung lokasi dan kebijakan masing-masing distributor. Sebaiknya hubungi distributor terdekat untuk mendapatkan penawaran terbaik.'
                ],
                [
                    'q' => 'Berapa lama waktu pengiriman?',
                    'a' => 'Waktu pengiriman tergantung lokasi dan distributor. Rata-rata pengiriman adalah 1-3 hari kerja untuk wilayah Jabodetabek, dan 3-7 hari untuk luar Jabodetabek.'
                ],
                [
                    'q' => 'Apakah ada garansi untuk produk yang dibeli?',
                    'a' => 'Ya, semua produk original memiliki garansi resmi. Periode dan syarat garansi tergantung jenis produk. Konsultasikan dengan distributor untuk detail garansi.'
                ],
                [
                    'q' => 'Bagaimana cara menjadi distributor Qodha?',
                    'a' => 'Jika Anda tertarik bergabung sebagai distributor, silakan hubungi kami melalui halaman Hubungi Kami dengan menyertakan informasi bisnis Anda.'
                ],
                [
                    'q' => 'Apakah ada diskon untuk pembelian dalam jumlah besar?',
                    'a' => 'Ya, kami menawarkan program khusus untuk pembelian dalam jumlah besar. Hubungi tim penjualan kami untuk mendapatkan penawaran khusus.'
                ],
            ];

            foreach($faqs as $index => $faq):
            ?>
            <details class="bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition" open="<?php echo $index === 0 ? 'open' : ''; ?>">
                <summary class="flex items-center justify-between w-full p-6 cursor-pointer select-none hover:bg-gray-100 transition">
                    <h3 class="text-lg font-semibold text-gray-900"><?php echo $faq['q']; ?></h3>
                    <i class="fa-solid fa-chevron-down text-purple-600 transition transform group-open:rotate-180"></i>
                </summary>
                <div class="px-6 pb-6 border-t border-gray-200 pt-6">
                    <p class="text-gray-700 leading-relaxed"><?php echo $faq['a']; ?></p>
                </div>
            </details>
            <?php endforeach; ?>
        </div>

        <!-- Additional Help -->
        <div class="mt-16 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-8 border border-purple-200 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Tidak Menemukan Jawaban?</h3>
            <p class="text-gray-700 mb-6">Tim dukungan kami siap membantu Anda 24/7</p>
            <a href="contact.php" class="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
                <i class="fa-solid fa-envelope mr-2"></i>Hubungi Kami
            </a>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>
