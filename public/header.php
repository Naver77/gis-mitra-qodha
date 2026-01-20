<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' | Qodha Aromatic' : 'Qodha Aromatic'; ?></title>
    <link rel="icon" href="assets/img/qodhacirclemascot.png" type="image/png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <meta name="description" content="Qodha Aromatic - Pusat Distributor Wewangian Sunnah Terlengkap & Termurah. Temukan lokasi agen terdekat.">
<meta property="og:title" content="Qodha Aromatic | WebGIS Mitra">
<meta property="og:description" content="Platform resmi pencarian lokasi agen, reseller, dan katalog produk Qodha Aromatic.">
<meta property="og:image" content="assets/img/qodhacirclemascot.png"> <meta property="og:url" content="https://qodha.id">
<meta property="og:type" content="website">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] },
                    colors: {
                        brand: { 
                            gold: '#f59e0b',   /* Amber-500 */
                            dark: '#111827',   /* Gray-900 */
                            green: '#10b981'   /* Emerald-500 */
                        }
                    },
                    boxShadow: {
                        'glow': '0 0 15px rgba(245, 158, 11, 0.5)',
                        'floating': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    }
                }
            }
        }
    </script>

    <style>
        body { display: flex; flex-direction: column; min-height: 100vh; }
        
        /* Default Navbar (Desktop) */
        .desktop-glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            border-bottom: 2px solid #f59e0b;
        }

        /* Mobile Menu Animation */
        .dropdown-menu {
            opacity: 0; transform: translateY(10px); visibility: hidden;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .dropdown-menu {
            opacity: 1; transform: translateY(0); visibility: visible;
        }
        .group:hover .group-hover\:block { display: block; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased selection:bg-brand-gold selection:text-white">

    <nav id="mainNavbar" class="fixed z-50 transition-all duration-300 w-full h-[85px] desktop-glass top-0">
        
        <div class="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div class="flex justify-between items-center h-full">
                
                <a href="index.php" class="flex items-center gap-2 group">
                    <img src="assets/img/qodhablack.png" alt="Qodha" class="h-10 md:h-12 w-auto object-contain transition transform group-hover:scale-105">
                </a>

                <div class="hidden md:flex items-center space-x-1 lg:space-x-4">
                    
                    <a href="index.php" class="px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition <?= basename($_SERVER['PHP_SELF']) == 'beranda.php' ? 'text-brand-gold' : '' ?>">
                        Beranda
                    </a>

                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center gap-1 px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition group-hover:text-brand-gold">
                            Produk <i class="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
                        </button>
                        <div class="absolute top-[60px] left-0 w-56 pt-4 dropdown-menu">
                            <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                                <a href="kategori.php" class="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-brand-gold border-b border-gray-100">
                                    <i class="fa-solid fa-box-open mr-2 text-brand-gold"></i> Semua Katalog
                                </a>
                                <a href="products.php?category=dupa" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold">Dupa & Hio</a>
                                <a href="products.php?category=bukhur" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold">Bukhur Premium</a>
                                <a href="products.php?category=parfum" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold">Parfum Islami</a>
                            </div>
                        </div>
                    </div>

                    <a href="distributor.php" class="px-4 py-2 text-sm font-bold text-white bg-brand-green rounded-full shadow-md hover:bg-emerald-600 hover:shadow-glow transition transform hover:-translate-y-0.5 flex items-center gap-2">
                        <i class="fa-solid fa-map-location-dot"></i> Peta Sebaran
                    </a>

                    <a href="partnership.php" class="px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition <?= basename($_SERVER['PHP_SELF']) == 'partnership.php' ? 'text-brand-gold' : '' ?>">
                        Kemitraan
                    </a>

                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center gap-1 px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition group-hover:text-brand-gold">
                            Bantuan <i class="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
                        </button>
                        <div class="absolute top-[60px] right-0 w-48 pt-4 dropdown-menu">
                            <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                                <a href="about.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold"><i class="fa-regular fa-building mr-2"></i> Profil Qodha</a>
                                <a href="faq.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold"><i class="fa-regular fa-circle-question mr-2"></i> FAQ</a>
                                <a href="contact.php" class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold"><i class="fa-regular fa-envelope mr-2"></i> Hubungi Kami</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:hidden flex items-center">
                    <button onclick="toggleMenu()" class="text-gray-600 hover:text-brand-gold p-2 transition rounded-full hover:bg-gray-50">
                        <i class="fa-solid fa-bars text-2xl" id="menuIcon"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobileMenu" class="absolute top-[80px] left-0 w-full bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl border-t border-gray-100 hidden flex-col md:hidden max-h-[80vh] overflow-y-auto">
            <div class="p-4 space-y-2">
                <a href="beranda.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Beranda</a>
                <a href="products.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Katalog Produk</a>
                <a href="distributor.php" class="block px-4 py-3 rounded-xl font-bold text-white bg-brand-green text-center shadow-md"><i class="fa-solid fa-map-location-dot mr-2"></i> Peta Mitra</a>
                <a href="partnership.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Kemitraan</a>
                <a href="contact.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Hubungi Kami</a>
            </div>
        </div>
    </nav>

    <main class="flex-grow pt-[85px] w-full relative">

    <script>
        let lastScrollTop = 0;
        const navbar = document.getElementById('mainNavbar');
        const mobileMenu = document.getElementById('mobileMenu');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Logic: Jika scroll ke bawah > 50px, sembunyikan (geser ke atas)
            // Jika scroll ke atas, tampilkan lagi
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll Down -> Hide
                navbar.style.transform = 'translateY(-100%)';
                // Tutup menu mobile jika terbuka agar rapi
                if(!mobileMenu.classList.contains('hidden')) toggleMenu();
            } else {
                // Scroll Up -> Show
                navbar.style.transform = 'translateY(0)';
                
                // Efek Floating (Melayang) saat scroll up tapi bukan di paling atas
                if (scrollTop > 50) {
                    navbar.classList.add('shadow-md');
                    // Di Mobile: Ubah jadi "Floating Island" (Kecil di tengah)
                    if(window.innerWidth < 768) {
                        navbar.classList.remove('w-full', 'rounded-none');
                        navbar.classList.add('w-[90%]', 'left-[5%]', 'top-4', 'rounded-2xl', 'border', 'border-gray-200');
                    }
                } else {
                    // Reset ke Default saat di paling atas
                    navbar.classList.remove('shadow-md');
                    if(window.innerWidth < 768) {
                        navbar.classList.remove('w-[90%]', 'left-[5%]', 'top-4', 'rounded-2xl', 'border', 'border-gray-200');
                        navbar.classList.add('w-full', 'rounded-none');
                    }
                }
            }
            lastScrollTop = scrollTop;
        });

        function toggleMenu() {
            const icon = document.getElementById('menuIcon');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    </script>
</body>
</html>