<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' | Qodha Mitra' : 'Qodha Mitra - Jaringan Distributor Resmi'; ?></title>
    
    <!-- Tailwind & Assets -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="./assets/img/marker_qodha.png">

    <!-- Project styles -->
    <link rel="stylesheet" href="./assets/css/style.css">
    <style>
        :root {
            --color-primary: #10b981;
            --color-primary-dark: #059669;
            --color-primary-light: #d1fae5;
            --color-secondary: #0ea5e9;
            --color-gray-50: #f9fafb;
            --color-gray-100: #f3f4f6;
            --color-gray-200: #e5e7eb;
            --color-gray-300: #d1d5db;
            --color-gray-700: #374151;
            --color-gray-800: #1f2937;
            --color-gray-900: #111827;
        }
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
</head>
<body class="bg-white">

<!-- NAVBAR HEADER -->
<nav class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
    <div class="w-full px-6 py-3">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-2">
                <div class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    Q
                </div>
                <div>
                    <h1 class="text-base font-bold text-gray-900">Qodha Mitra</h1>
                    <p class="text-xs text-gray-500">Distributor</p>
                </div>
            </div>

            <!-- Menu Navigation (Desktop) -->
            <div class="hidden md:flex items-center gap-8">
                <a href="index.php" class="text-sm font-medium text-gray-700 hover:text-emerald-600 transition <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'text-emerald-600 border-b-2 border-emerald-600' : ''; ?>">
                    Beranda
                </a>
                <a href="kategori.php" class="text-sm font-medium text-gray-700 hover:text-emerald-600 transition <?php echo basename($_SERVER['PHP_SELF']) == 'kategori.php' ? 'text-emerald-600 border-b-2 border-emerald-600' : ''; ?>">
                    Kategori
                </a>
                <a href="distributor.php" class="text-sm font-medium text-gray-700 hover:text-emerald-600 transition <?php echo basename($_SERVER['PHP_SELF']) == 'distributor.php' ? 'text-emerald-600 border-b-2 border-emerald-600' : ''; ?>">
                    Distributor
                </a>
                <a href="contact.php" class="text-sm font-medium text-gray-700 hover:text-emerald-600 transition <?php echo basename($_SERVER['PHP_SELF']) == 'contact.php' ? 'text-emerald-600 border-b-2 border-emerald-600' : ''; ?>">
                    Hubungi Kami
                </a>
                <a href="faq.php" class="text-sm font-medium text-gray-700 hover:text-emerald-600 transition <?php echo basename($_SERVER['PHP_SELF']) == 'faq.php' ? 'text-emerald-600 border-b-2 border-emerald-600' : ''; ?>">
                    FAQ
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="md:hidden text-gray-700 hover:text-emerald-600">
                <i class="fa-solid fa-bars text-xl"></i>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden mt-3 pb-3 border-t border-gray-100 pt-3 space-y-2">
            <a href="index.php" class="block text-sm font-medium text-gray-700 hover:text-emerald-600 py-1.5">Beranda</a>
            <a href="kategori.php" class="block text-sm font-medium text-gray-700 hover:text-emerald-600 py-1.5">Kategori</a>
            <a href="distributor.php" class="block text-sm font-medium text-gray-700 hover:text-emerald-600 py-1.5">Distributor</a>
            <a href="contact.php" class="block text-sm font-medium text-gray-700 hover:text-emerald-600 py-1.5">Hubungi Kami</a>
            <a href="faq.php" class="block text-sm font-medium text-gray-700 hover:text-emerald-600 py-1.5">FAQ</a>
        </div>
    </div>
</nav>

<script>
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}
</script>
