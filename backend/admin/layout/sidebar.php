<aside class="w-64 bg-brand-dark text-white flex-col transition-all duration-300 hidden md:flex">
    <div class="h-16 flex items-center justify-center border-b border-gray-700 bg-gray-900/50">
        <h1 class="text-xl font-bold tracking-wider text-brand-gold">QODHA <span class="text-white text-sm font-normal">ADMIN</span></h1>
    </div>

    <nav class="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        
        <a href="index.php" class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition <?= basename($_SERVER['PHP_SELF']) == 'index.php' ? 'bg-brand-gold text-gray-900 font-bold' : 'text-gray-300' ?>">
            <i class="fa-solid fa-gauge-high w-6"></i>
            <span>Dashboard</span>
        </a>

        <div class="pt-4 pb-1">
            <p class="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Master Data</p>
        </div>

        <a href="produk_list.php" class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300">
            <i class="fa-solid fa-box w-6"></i>
            <span>Data Produk</span>
        </a>
        
        <a href="kategori_list.php" class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300">
            <i class="fa-solid fa-tags w-6"></i>
            <span>Kategori</span>
        </a>

        <div class="pt-4 pb-1">
            <p class="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">WebGIS Mitra</p>
        </div>

        <a href="mitra_list.php" class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300">
            <i class="fa-solid fa-store w-6"></i>
            <span>Data Mitra</span>
        </a>
        
        <a href="../public/distributor.php" target="_blank" class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300 group">
            <i class="fa-solid fa-map-location-dot w-6 text-brand-green group-hover:text-white transition"></i>
            <span>Lihat Peta (Live)</span>
        </a>

    </nav>

    <div class="p-4 border-t border-gray-700">
        <a href="logout.php" class="flex items-center gap-3 text-red-400 hover:text-red-300 transition text-sm font-bold">
            <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </a>
    </div>
</aside>

<div class="flex-1 flex flex-col h-screen overflow-hidden relative">
    
    <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
        <div class="flex items-center gap-4">
            <button class="md:hidden text-gray-600"><i class="fa-solid fa-bars text-xl"></i></button>
            <h2 class="text-lg font-bold text-gray-700">Panel Kontrol</h2>
        </div>
        <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-gray-800"><?= $_SESSION['admin_nama'] ?? 'Admin' ?></p>
                <p class="text-xs text-gray-500">Administrator</p>
            </div>
            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <i class="fa-solid fa-user"></i>
            </div>
        </div>
    </header>

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">