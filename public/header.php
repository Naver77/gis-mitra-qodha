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
        
        /* Global body padding untuk navbar fixed */
        body {
            margin: 0;
            padding-top: 73px;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        
        /* Glassmorphism navbar */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(16px) saturate(100%);
            -webkit-backdrop-filter: blur(16px) saturate(100%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 4px 30px rgba(16, 185, 129, 0.08), 
                        0 8px 16px rgba(0, 0, 0, 0.04);
        }

        /* Navbar container - optimized for logo */
        .navbar-container {
            padding: 10px 0;
        }

        /* Logo image styling */
        .navbar-logo {
            max-height: 45px;
            width: auto;
            object-fit: contain;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .navbar-logo:hover {
            transform: scale(1.05) translateY(-1px);
        }

        /* Modern menu link styles */
        .menu-link {
            position: relative;
            transition: color 0.3s ease;
            font-size: 0.9375rem;
            font-weight: 500;
            color: #4b5563;
        }

        .menu-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2.5px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            border-radius: 4px;
            transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .menu-link:hover::after {
            width: 100%;
        }

        .menu-link:hover {
            color: var(--color-primary);
        }

        .menu-link.active {
            color: var(--color-primary);
        }

        .menu-link.active::after {
            width: 100%;
        }

        /* Mobile menu animation */
        #mobileMenu {
            animation: slideDownFade 0.3s ease-out forwards;
        }

        #mobileMenu.hidden {
            animation: slideUpFade 0.3s ease-in forwards;
        }

        @keyframes slideDownFade {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUpFade {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }

        /* Mobile menu link with active state */
        .mobile-menu-link {
            position: relative;
            display: block;
            padding: 0.5rem 0;
            font-size: 0.875rem;
            font-weight: 500;
            color: #4b5563;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
            padding-left: 12px;
            margin-left: -12px;
        }

        .mobile-menu-link:hover {
            color: var(--color-primary);
            border-left-color: var(--color-primary);
            padding-left: 16px;
        }

        .mobile-menu-link.active {
            color: var(--color-primary);
            border-left-color: var(--color-primary);
            font-weight: 600;
        }

        /* Mobile menu button effect */
        .mobile-btn {
            transition: all 0.3s ease;
        }

        .mobile-btn:active {
            transform: scale(0.95);
        }
        
        /* WhatsApp CTA styles (sticky) */
        .whatsapp-cta {
            position: fixed;
            right: 1rem;
            bottom: 1.25rem;
            z-index: 60;
            display: inline-flex;
            align-items: center;
            gap: 0.625rem;
            background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
            color: #fff;
            padding: 0.5rem 0.9rem;
            border-radius: 9999px;
            box-shadow: 0 8px 24px rgba(16,185,129,0.12);
            transform: translateY(0);
            transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.2s ease;
            will-change: transform;
        }

        .whatsapp-cta .fa-whatsapp {
            font-size: 1.125rem;
        }

        .whatsapp-cta .label {
            font-weight: 600;
        }

        /* small red badge/dot */
        .whatsapp-badge {
            position: absolute;
            top: -6px;
            right: -6px;
            width: 10px;
            height: 10px;
            background: #ef4444;
            border-radius: 9999px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            display: inline-block;
        }

        /* subtle pulse to draw attention (low intensity) */
        .whatsapp-pulse { animation: waPulse 2.2s infinite; }
        @keyframes waPulse {
            0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.12); }
            70% { box-shadow: 0 0 0 10px rgba(16,185,129,0); }
            100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }

        /* entrance animation */
        .wa-enter { animation: waEnter 0.36s cubic-bezier(.2,.9,.3,1) both; }
        @keyframes waEnter { from { transform: translateY(10px) scale(.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

        /* responsive adjustments: icon-only on very small devices */
        @media (max-width: 640px) {
            .whatsapp-cta { padding: 0.55rem; gap: 0.4rem; right: 0.75rem; bottom: 0.75rem; }
            .whatsapp-cta .label { display: none; }
        }
        
        /* Product Cards Interactive Hover */
        .product-card {
            position: relative;
            overflow: hidden;
            border-radius: 0.75rem;
            border: 1px solid #e5e7eb;
            background: #fff;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .product-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(16,185,129,0.15), 0 8px 16px rgba(0,0,0,0.08);
            border-color: #d1fae5;
        }

        .product-card-header {
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
        }

        .product-card-icon {
            display: inline-block;
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .product-card:hover .product-card-icon {
            transform: scale(1.15) rotate(5deg);
        }

        /* Overlay on hover */
        .product-card-overlay {
            position: absolute;
            inset: 0;
            background: rgba(16,185,129,0.08);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        .product-card:hover .product-card-overlay {
            opacity: 1;
        }

        .product-card-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .product-card-footer {
            flex-shrink: 0;
            border-top: 1px solid #f3f4f6;
            padding-top: 1rem;
            margin-top: 1rem;
        }

        .product-card-cta {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.625rem 1rem;
            background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
            color: #fff;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.25s ease;
            border: none;
            cursor: pointer;
            overflow: hidden;
        }

        .product-card-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.2);
            transition: left 0.35s ease;
            z-index: -1;
        }

        .product-card-cta:hover {
            transform: translateX(4px);
            box-shadow: 0 8px 16px rgba(16,185,129,0.25);
        }

        .product-card-cta:hover::before {
            left: 100%;
        }

        .product-card-cta i {
            transition: transform 0.25s ease;
        }

        .product-card-cta:hover i {
            transform: translateX(2px);
        }
    </style>
</head>
<body class="bg-white">

<!-- NAVBAR HEADER -->
<nav>
    <div class="w-full px-6 navbar-container">
        <div class="max-w-7xl mx-auto flex items-center justify-between h-full">
            <!-- Logo -->
            <div class="flex items-center">
                <img src="./assets/img/logo%20qodha%20(Lanscape).png" alt="Qodha Mitra Logo" class="navbar-logo">
            </div>

            <!-- Menu Navigation (Desktop) -->
            <div class="hidden md:flex items-center gap-8">
                <a href="index.php" class="menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">
                    Beranda
                </a>
                <a href="kategori.php" class="menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'kategori.php' ? 'active' : ''; ?>">
                    Kategori
                </a>
                <a href="distributor.php" class="menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'distributor.php' ? 'active' : ''; ?>">
                    Distributor
                </a>
                <a href="contact.php" class="menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'contact.php' ? 'active' : ''; ?>">
                    Hubungi Kami
                </a>
                <a href="faq.php" class="menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'faq.php' ? 'active' : ''; ?>">
                    FAQ
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="mobile-btn md:hidden text-gray-700 hover:text-emerald-600">
                <i class="fa-solid fa-bars text-xl"></i>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden mt-2 pb-3 border-t border-gray-100 pt-3 space-y-2">
            <a href="index.php" class="mobile-menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">Beranda</a>
            <a href="kategori.php" class="mobile-menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'kategori.php' ? 'active' : ''; ?>">Kategori</a>
            <a href="distributor.php" class="mobile-menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'distributor.php' ? 'active' : ''; ?>">Distributor</a>
            <a href="contact.php" class="mobile-menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'contact.php' ? 'active' : ''; ?>">Hubungi Kami</a>
            <a href="faq.php" class="mobile-menu-link <?php echo basename($_SERVER['PHP_SELF']) == 'faq.php' ? 'active' : ''; ?>">FAQ</a>
        </div>
    </div>
</nav>

<script>
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}
</script>
