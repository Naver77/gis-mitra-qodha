<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' | Qodha Aromatic' : 'Qodha Aromatic'; ?></title>
    <link rel="icon" href="assets/img/qodhacirclemascot.png" type="image/png">
    
    <!-- Assets & Config -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] },
                    colors: { brand: { gold: '#f59e0b', dark: '#111827', green: '#10b981' } },
                    boxShadow: { 'glow': '0 0 15px rgba(245, 158, 11, 0.5)' }
                }
            }
        }
    </script>
    <style>
        body { display: flex; flex-direction: column; min-height: 100vh; }
        .desktop-glass { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border-bottom: 2px solid #f59e0b; }
        .dropdown-menu { opacity: 0; transform: translateY(10px); visibility: hidden; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .group:hover .dropdown-menu { opacity: 1; transform: translateY(0); visibility: visible; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased selection:bg-brand-gold selection:text-white">

    <?php
    $current_page = basename($_SERVER['PHP_SELF']);

    function navClass($targetPage, $currentPage) {
        $base = "px-3 py-2 text-sm font-bold transition flex items-center gap-1 ";
        $state = ($targetPage == $currentPage) ? "text-brand-gold" : "text-gray-600 hover:text-brand-gold";
        return $base . $state;
    }
    ?>

    <nav id="mainNavbar" class="fixed z-50 transition-all duration-300 w-full h-[85px] desktop-glass top-0">
        <div class="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div class="flex justify-between items-center h-full">
                
                <!-- Logo -->
                <a href="index.php" class="flex items-center gap-2 group">
                    <img src="assets/img/qodhablack.png" alt="Qodha" class="h-10 md:h-12 w-auto object-contain transition transform group-hover:scale-105">
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-1 lg:space-x-4">
                    
                    <a href="index.php" class="<?= navClass('index.php', $current_page) ?>">
                        Beranda
                    </a>

                    <!-- Dropdown Produk -->
                    <div class="relative group h-full flex items-center">
                        <button class="px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition group-hover:text-brand-gold flex items-center gap-1">
                            Produk <i class="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
                        </button>
                        <div class="absolute top-[60px] left-0 w-64 pt-4 dropdown-menu">
                            <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                                <a href="products.php?category=all" class="block px-4 py-3 text-sm font-bold text-gray-800 hover:bg-orange-50 hover:text-brand-gold border-b border-gray-100 transition">
                                    <div class="flex items-center gap-2">
                                        <div class="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center text-xs"><i class="fa-solid fa-box-open"></i></div>
                                        <span>Semua Katalog</span>
                                    </div>
                                </a>
                                <div class="py-2">
                                    <p class="px-4 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider mb-1">Kategori</p>
                                    <a href="products.php?category=bukhur" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-cloud text-stone-400 w-4 text-center"></i> Bukhur</a>
                                    <a href="products.php?category=dupa" class=" px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-fire text-orange-400 w-4 text-center"></i> Dupa</a>
                                    <a href="products.php?category=parfum" class=" px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition flex items-center gap-2"><i class="fa-solid fa-spray-can text-purple-400 w-4 text-center"></i> Parfum</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="distributor.php" class="px-4 py-2 text-sm font-bold text-white bg-brand-green rounded-full shadow-md hover:bg-emerald-600 hover:shadow-glow transition transform hover:-translate-y-0.5 flex items-center gap-2">
                        <i class="fa-solid fa-map-location-dot"></i> Peta Sebaran
                    </a>

                    <a href="partnership.php" class="<?= navClass('partnership.php', $current_page) ?>">
                        Kemitraan
                    </a>
                    
                    <!-- Dropdown Bantuan (KEMBALI ADA) -->
                    <div class="relative group h-full flex items-center">
                        <button class="px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition group-hover:text-brand-gold flex items-center gap-1">
                            Bantuan <i class="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
                        </button>
                        <div class="absolute top-[60px] right-0 w-56 pt-4 dropdown-menu">
                            <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                                <a href="about.php" class="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition border-b border-gray-50">
                                    <i class="fa-regular fa-building mr-2 text-gray-400"></i> Profil Qodha
                                </a>
                                <a href="faq.php" class="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition border-b border-gray-50">
                                    <i class="fa-regular fa-circle-question mr-2 text-gray-400"></i> Tanya Jawab (FAQ)
                                </a>
                                <a href="contact.php" class="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition">
                                    <i class="fa-regular fa-envelope mr-2 text-gray-400"></i> Hubungi Kami
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Mobile Button -->
                <div class="md:hidden flex items-center">
                    <button onclick="toggleMenu()" class="text-gray-600 hover:text-brand-gold p-2 transition rounded-full hover:bg-gray-50">
                        <i class="fa-solid fa-bars text-2xl" id="menuIcon"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu (Diperbarui juga) -->
        <div id="mobileMenu" class="absolute top-[80px] left-0 w-full bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl border-t border-gray-100 hidden flex-col md:hidden max-h-[80vh] overflow-y-auto">
            <div class="p-4 space-y-2">
                <a href="index.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Beranda</a>
                <a href="products.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Katalog Produk</a>
                <a href="distributor.php" class="block px-4 py-3 rounded-xl font-bold text-white bg-brand-green text-center shadow-md"><i class="fa-solid fa-map-location-dot mr-2"></i> Peta Mitra</a>
                <a href="partnership.php" class="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Kemitraan</a>
                
                <!-- Submenu Bantuan Mobile -->
                <div class="border-t border-gray-100 mt-2 pt-2">
                    <p class="px-4 text-xs font-bold text-gray-400 uppercase mb-1">Bantuan</p>
                    <a href="about.php" class="block px-4 py-2 text-sm text-gray-600 hover:text-brand-gold">Profil Perusahaan</a>
                    <a href="faq.php" class="block px-4 py-2 text-sm text-gray-600 hover:text-brand-gold">FAQ</a>
                    <a href="contact.php" class="block px-4 py-2 text-sm text-gray-600 hover:text-brand-gold">Hubungi Kami</a>
                </div>
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
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
                if(!mobileMenu.classList.contains('hidden')) toggleMenu();
            } else {
                navbar.style.transform = 'translateY(0)';
                if (scrollTop > 50) {
                    navbar.classList.add('shadow-md');
                    if(window.innerWidth < 768) {
                        navbar.classList.add('w-[90%]', 'left-[5%]', 'top-4', 'rounded-2xl', 'border', 'border-gray-200');
                        navbar.classList.remove('w-full', 'rounded-none');
                    }
                } else {
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
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden'); mobileMenu.classList.add('flex');
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                mobileMenu.classList.add('hidden'); mobileMenu.classList.remove('flex');
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        }
    </script>