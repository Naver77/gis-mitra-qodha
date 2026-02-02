<?php 
$page_title = "Pusat Bantuan & FAQ"; 
include 'header.php'; 

// --- DATA FAQ (Dikategorikan untuk UX yang lebih baik) ---
$faq_categories = [
    'umum' => [
        'label' => 'Umum & Tentang Kami',
        'icon' => 'fa-circle-info',
        'items' => [
            [
                'q' => 'Apa itu Qodha Aromatic?',
                'a' => 'Qodha Aromatic merupakan produsen wewangian sunnah yang memproduksi wewangian aromatic berkualitas dalam bentuk produk bukhur, dupa, hio dan juga parfum. Di kemas dalam berbagai macam jenis kemasan menarik, ukuran dan berbagai varian aroma mengesankan, elegan dengan harga yang terjangkau.'
            ],
            [
                'q' => 'Apa Keunggulan Qodha Aromatic?',
                'a' => 'Kami menawarkan keunggulan kompetitif:<br>
                        <ul class="list-disc pl-5 mt-2 space-y-1">
                            <li>Join Kemitraan rendah mulai dari 1jt saja.</li>
                            <li>Kemudahan Bermitra & Berbelanja.</li>
                            <li>Banyak Keuntungan & Program promo.</li>
                            <li>Pilihan aroma yang beragam & banyak pilihan.</li>
                            <li>Kualitas premium & kemasan sangat menarik.</li>
                            <li>Harga sangat terjangkau tentunya.</li>
                        </ul>'
            ],
            [
                'q' => 'Apakah produk Qodha Halal & sudah bersertifikat BPOM?',
                'a' => 'Alhamdulillah, inSyaAllah sudah dipastikan aman Halal. Sudah melalui tahapan pemeriksaan dan sudah mendapatkan Izin Edar resmi dari BPOM RI. Sehingga 💯 aman untuk digunakan dan produknyapun sudah tidak diragukan lagi.'
            ],
            [
                'q' => 'Bagaimana cara menghubungi customer service?',
                'a' => 'Anda bisa menghubungi kami melalui:<br>
                        <strong>WhatsApp:</strong> <a href="https://wa.me/6281717302223" class="text-brand-gold hover:underline">+62817-1730-2223</a><br><br>
                        Atau bisa langsung datang ke Gallery Store kami di:<br>
                        Jl. Empang No.29B, Empang, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16132, Indonesia.'
            ]
        ]
    ],
    'kemitraan' => [
        'label' => 'Kemitraan & Bisnis',
        'icon' => 'fa-handshake',
        'items' => [
            [
                'q' => 'Bagaimana Menjadi Mitra Qodha Aromatic?',
                'a' => 'Qodha Aromatic membuka 3 Level kemitraan yaitu: <strong>Distributor, Agen, dan Reseller</strong>.<br><br>
                        <strong>Syarat Belanja Awal:</strong>
                        <ul class="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Distributor:</strong> Pembelian pertama 6 karton (± Rp 6jt). Repeat order min 3 karton.</li>
                            <li><strong>Agen:</strong> Pembelian pertama 3 karton (± Rp 3jt). Repeat order min 1 karton.</li>
                            <li><strong>Reseller:</strong> Pembelian pertama 1 Karton (± Rp 1jt). Repeat order min Lusinan.</li>
                        </ul>
                        <br>
                        <em>*Semua paket bisa Mix Aroma. Mitra wajib repeat order min 1x/bulan agar status keanggotaan tetap aktif.</em>'
            ],
            [
                'q' => 'Apa Keuntungan Menjadi Mitra Qodha Aromatic?',
                'a' => '<ul class="space-y-2">
                            <li>✅ Mendapatkan harga terbaik mitra sesuai kategori</li>
                            <li>✅ Mendapatkan Hard & Soft Copy Katalog</li>
                            <li>✅ Bonus Akrilik/Display Tempat Parfum (khusus produk parfum)</li>
                            <li>✅ Dibuatkan Spanduk Resmi Kemitraan</li>
                            <li>✅ Free Konsultasi Advertising & Marketing</li>
                            <li>✅ Free Produk Tester / Sample Produk Terbaru</li>
                            <li>✅ Full Support: Katalog Gdrive, Konten Promosi, & Info Stok</li>
                        </ul>'
            ],
            [
                'q' => 'Bagaimana cara order/join Kemitraan?',
                'a' => '<ol class="list-decimal pl-5 space-y-1">
                            <li>Hubungi kami melalui WhatsApp untuk konsultasi.</li>
                            <li>Pilih Kategori Kemitraan sesuai S&K.</li>
                            <li>Pilih jenis produk & aroma yg mau diorder.</li>
                            <li>Lakukan pembayaran sesuai rincian invoice yg dikirim.</li>
                            <li>Pesanan dikirim ke alamat Anda, atau siap diambil.</li>
                        </ol>'
            ],
            [
                'q' => 'Apakah bisa konsultasi sebelum order?',
                'a' => 'Tentu! Kami siap membantu Anda dengan senang hati 😊. Jangan ragu untuk menghubungi nomor resmi Customer Service kami untuk informasi lebih lanjut.'
            ]
        ]
    ],
    'produk' => [
        'label' => 'Info Produk',
        'icon' => 'fa-bottle-droplet',
        'items' => [
            [
                'q' => 'Apakah bisa mix aroma dalam pesanan?',
                'a' => 'Ya, Bisa Banget! Anda dapat memilih berbagai pilihan aroma yang tersedia dari katalog Kami dalam satu pesanan tertentu. Saat ini kami menyediakan puluhan aroma tercipta disetiap jenis produknya.'
            ],
            [
                'q' => 'Apakah bisa mencoba aroma awalan terlebih dahulu?',
                'a' => 'Ya, kami menyediakan sampel tester setiap aroma untuk Anda coba sebelum memesan dalam jumlah besar di store.'
            ],
            [
                'q' => 'Apakah Produk Qodha aman digunakan untuk ibadah?',
                'a' => 'Produk Qodha Aromatic dibuat mengunakan Bahan yang halal dan sudah Bersertifikasi Halal MUI. Pastinya Produk Qodha bisa digunakan kegiatan Ibadah seperti Sholat, Pengajian, Tabligh, Dzikir, dan lainnya.'
            ],
            [
                'q' => 'Apakah parfum Qodha mengandung alkohol?',
                'a' => 'Produk Qodha Perfumes ada 2 Jenis:<br>
                        1. <strong>Eau De Perfume:</strong> Mengandung Absolute (pelarut khusus parfum) namun 0% Alkohol yang memabukkan, sehingga aman untuk ibadah.<br>
                        2. <strong>Concentrate:</strong> 100% biang murni, tekstur lebih oily, Non Alkohol.'
            ]
        ]
    ],
    'pemesanan' => [
        'label' => 'Pemesanan & Pengiriman',
        'icon' => 'fa-truck-fast',
        'items' => [
            [
                'q' => 'Berapa jumlah minimum pemesanan (MOQ)?',
                'a' => 'Tanpa minimum order. Anda bisa order eceran satuan dengan harga HET. Namun jika ingin harga lebih murah, disarankan mengambil paket kemitraan.'
            ],
            [
                'q' => 'Apakah pembayaran bisa dilakukan dengan sistem COD?',
                'a' => 'Pemesanan langsung ke pusat melalui <strong>Transfer Bank</strong>. Sistem COD hanya tersedia jika Anda membeli melalui Official Store kami di Marketplace (Shopee, Lazada, Tokopedia, TikTok Shop).'
            ],
            [
                'q' => 'Apa saja ekspedisi yang digunakan?',
                'a' => 'Kami bekerjasama dengan berbagai perusahaan logistik, baik Cargo (untuk partai besar) maupun Express (JNE, J&T, dll) dengan tarif kompetitif dan aman.'
            ],
            [
                'q' => 'Apakah Produk Qodha bisa dikirim ke luar negeri?',
                'a' => 'Bisa. Produk Qodha sudah tersebar di berbagai wilayah Indonesia dan juga ke Luar Negeri seperti Malaysia & Singapura.'
            ]
        ]
    ]
];
?>

<!-- 1. HERO SEARCH SECTION -->
<section class="relative bg-gray-900 py-20 px-4 overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div class="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold rounded-full filter blur-[100px] opacity-20"></div>
    <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-green rounded-full filter blur-[100px] opacity-20"></div>

    <div class="relative z-10 max-w-3xl mx-auto text-center">
        <span class="text-brand-gold font-bold tracking-widest text-sm uppercase mb-2 block">Pusat Bantuan</span>
        <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-6">Apa yang bisa kami bantu?</h1>
        
        <!-- Search Bar -->
        <div class="relative max-w-xl mx-auto">
            <input type="text" id="searchInput" placeholder="Cari pertanyaan (misal: Mitra, Reseller, Halal)..." 
                class="w-full py-4 pl-12 pr-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:bg-white/20 transition shadow-lg">
            <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
    </div>
</section>

<!-- 2. FAQ CONTENT -->
<section class="bg-gray-50 py-16 min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
        
        <!-- CATEGORY TABS (Desktop & Mobile Scroll) -->
        <div class="flex flex-nowrap overflow-x-auto pb-4 gap-3 mb-10 justify-start md:justify-center no-scrollbar" id="faqTabs">
            <button onclick="filterFaq('all')" class="tab-btn active px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition border border-gray-200 bg-white text-gray-600 hover:border-brand-gold hover:text-brand-gold shadow-sm" data-cat="all">
                Semua Topik
            </button>
            <?php foreach($faq_categories as $key => $cat): ?>
            <button onclick="filterFaq('<?= $key ?>')" class="tab-btn px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition border border-gray-200 bg-white text-gray-600 hover:border-brand-gold hover:text-brand-gold shadow-sm flex items-center gap-2" data-cat="<?= $key ?>">
                <i class="fa-solid <?= $cat['icon'] ?>"></i> <?= $cat['label'] ?>
            </button>
            <?php endforeach; ?>
        </div>

        <!-- FAQ LIST -->
        <div class="space-y-4" id="faqContainer">
            <?php foreach($faq_categories as $key => $cat): ?>
                <div class="faq-group" data-category="<?= $key ?>">
                    <!-- Category Header (Hidden by default, shown when filtering/searching) -->
                    <h3 class="text-xl font-bold text-gray-800 mb-4 mt-8 px-2 flex items-center gap-2">
                        <i class="fa-solid <?= $cat['icon'] ?> text-brand-gold"></i> <?= $cat['label'] ?>
                    </h3>

                    <div class="space-y-3">
                        <?php foreach($cat['items'] as $item): ?>
                        <details class="faq-item group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                            <summary class="flex items-center justify-between w-full p-5 cursor-pointer select-none bg-white relative z-10">
                                <h4 class="text-base font-bold text-gray-800 pr-8 group-hover:text-brand-green transition text-left"><?= $item['q'] ?></h4>
                                <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-open:bg-brand-gold group-open:text-white transition flex-shrink-0">
                                    <i class="fa-solid fa-chevron-down text-xs transition-transform duration-300 group-open:rotate-180"></i>
                                </div>
                            </summary>
                            <div class="px-5 pb-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-transparent group-open:border-gray-100 animate-fadeIn">
                                <div class="pt-4">
                                    <?= $item['a'] ?>
                                </div>
                            </div>
                        </details>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- NO RESULT STATE -->
        <div id="noResults" class="hidden text-center py-12">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">
                <i class="fa-solid fa-magnifying-glass-minus"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800">Pertanyaan tidak ditemukan</h3>
            <p class="text-gray-500 text-sm mt-1">Coba gunakan kata kunci lain atau hubungi kami langsung.</p>
        </div>

        <!-- CONTACT CTA -->
        <div class="mt-16 bg-white rounded-2xl p-8 md:p-10 border border-gray-200 text-center shadow-lg relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div class="relative z-10">
                <h3 class="text-2xl font-bold text-gray-900 mb-3">Masih butuh bantuan?</h3>
                <p class="text-gray-500 mb-8 max-w-lg mx-auto">Tim customer service kami siap membantu Anda melalui WhatsApp atau Kunjungi Store kami.</p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="https://wa.me/6281717302223" target="_blank" class="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                        <i class="fa-brands fa-whatsapp text-lg"></i> Chat WhatsApp
                    </a>
                    <a href="contact.php" class="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-map-location-dot"></i> Lihat Lokasi Store
                    </a>
                </div>
            </div>
        </div>

    </div>
</section>

<!-- JAVASCRIPT LOGIC -->
<script>
    // 1. Logic Pencarian Real-time
    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqGroups = document.querySelectorAll('.faq-group');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        let hasResult = false;

        // Reset Tabs visual
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
            b.classList.add('bg-white', 'text-gray-600');
        });

        faqGroups.forEach(group => {
            let hasVisibleItem = false;
            const items = group.querySelectorAll('.faq-item');
            
            items.forEach(item => {
                const question = item.querySelector('h4').textContent.toLowerCase();
                const answer = item.querySelector('div').textContent.toLowerCase();
                
                if (question.includes(keyword) || answer.includes(keyword)) {
                    item.style.display = 'block';
                    // Highlight match text logic could go here
                    hasVisibleItem = true;
                    hasResult = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Sembunyikan grup jika tidak ada item yang cocok
            group.style.display = hasVisibleItem ? 'block' : 'none';
        });

        noResults.style.display = hasResult ? 'none' : 'block';
    });

    // 2. Logic Filter Kategori (Tabs)
    function filterFaq(category) {
        // Reset Search Input
        searchInput.value = '';
        noResults.style.display = 'none';

        // Update Button Styles
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if(btn.dataset.cat === category) {
                btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
                btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-md');
            } else {
                btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
                btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-md');
            }
        });

        // Show/Hide Groups
        faqGroups.forEach(group => {
            const items = group.querySelectorAll('.faq-item');
            items.forEach(item => item.style.display = 'block'); // Reset item visibility from search

            if (category === 'all' || group.dataset.category === category) {
                group.style.display = 'block';
                // Animasi masuk
                group.classList.add('animate-fadeIn');
            } else {
                group.style.display = 'none';
                group.classList.remove('animate-fadeIn');
            }
        });
    }

    // Default: Active All
    filterFaq('all');
</script>

<style>
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
    
    /* Smooth Details Animation */
    details > summary { list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
</style>

<?php include 'footer.php'; ?>