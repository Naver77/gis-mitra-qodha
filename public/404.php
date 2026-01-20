<!DOCTYPE html>
<html lang="id">
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Halaman Tidak Ditemukan</title>
</head>
<body class="bg-gray-50 h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-9xl font-extrabold text-brand-gold opacity-20">404</h1>
    <h2 class="text-3xl font-bold text-gray-800 -mt-10 mb-4">Ups! Halaman Hilang</h2>
    <p class="text-gray-500 mb-8 max-w-md">Sepertinya Anda tersesat. Halaman yang Anda cari mungkin sudah dihapus atau alamatnya salah.</p>
    <a href="index.php" class="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-bold">
        Kembali ke Beranda
    </a>
    
    <script>
        tailwind.config = { theme: { extend: { colors: { brand: { gold: '#f59e0b' } } } } }
    </script>
</body>
</html>