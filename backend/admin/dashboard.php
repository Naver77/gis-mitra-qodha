<?php
session_start();
// 1. Cek Keamanan: Kalau belum login, tendang!
if (!isset($_SESSION['login'])) {
    header("Location: login.php?msg=Harap login terlebih dahulu!");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin - QodhaMaps</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 font-sans leading-normal tracking-normal">

    <nav class="bg-emerald-600 p-4 shadow-lg fixed w-full z-10 top-0">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white font-bold text-xl flex items-center gap-2">
                <i class="fa-solid fa-layer-group"></i> Qodha Admin
            </div>
            <div class="flex items-center gap-4">
                <span class="text-emerald-100 text-sm">Halo, <b><?= $_SESSION['nama']; ?></b></span>
                <a href="logout.php" class="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition">
                    <i class="fa-solid fa-power-off"></i> Logout
                </a>
            </div>
        </div>
    </nav>

    <div class="flex pt-16 h-screen">
        
        <aside class="w-64 bg-white border-r hidden md:block shadow-sm">
            <ul class="p-4 space-y-2">
                <li>
                    <a href="dashboard.php" class="block px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg">
                        <i class="fa-solid fa-gauge w-6"></i> Dashboard
                    </a>
                </li>
                <li>
                    <a href="mitra_list.php" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <i class="fa-solid fa-map-location-dot w-6"></i> Data Mitra
                    </a>
                </li>
                <li>
                    <a href="produk_list.php" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <i class="fa-solid fa-box w-6"></i> Data Produk
                    </a>
                </li>
                <li class="pt-4 border-t">
                    <a href="../public/index.php" target="_blank" class="block px-4 py-2 text-gray-500 hover:text-emerald-600 transition">
                        <i class="fa-solid fa-globe w-6"></i> Lihat Website
                    </a>
                </li>
            </ul>
        </aside>

        <main class="flex-1 p-6 overflow-y-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500 flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Total Mitra</p>
                        <h3 class="text-2xl font-bold text-gray-800">20</h3>
                    </div>
                    <div class="bg-emerald-100 p-3 rounded-full text-emerald-600">
                        <i class="fa-solid fa-store text-xl"></i>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Total Kota</p>
                        <h3 class="text-2xl font-bold text-gray-800">15</h3>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full text-blue-600">
                        <i class="fa-solid fa-city text-xl"></i>
                    </div>
                </div>
                 <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500 flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Kunjungan</p>
                        <h3 class="text-2xl font-bold text-gray-800">1,240</h3>
                    </div>
                    <div class="bg-orange-100 p-3 rounded-full text-orange-600">
                        <i class="fa-solid fa-eye text-xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                <h2 class="text-xl font-bold mb-2">Selamat Datang di Panel Admin QodhaMaps! 🚀</h2>
                <p class="opacity-90">Sistem ini siap digunakan untuk memetakan mitra di seluruh Indonesia. Mulai dengan mengelola data mitra di menu sebelah kiri.</p>
            </div>

        </main>
    </div>
</body>
</html>