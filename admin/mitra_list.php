<?php
session_start();
require_once '../config/database.php';

// Cek Login
if (!isset($_SESSION['login'])) {
    header("Location: login.php");
    exit;
}

// Ambil Data Mitra dari Database
$query = "SELECT * FROM tb_mitra ORDER BY id_mitra DESC";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Data Mitra - QodhaMaps</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/dataTables.tailwindcss.min.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.tailwindcss.min.js"></script>
</head>
<body class="bg-gray-50 font-sans leading-normal tracking-normal">

    <nav class="bg-emerald-600 p-4 shadow-lg fixed w-full z-10 top-0">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white font-bold text-xl flex items-center gap-2">
                <i class="fa-solid fa-layer-group"></i> Qodha Admin
            </div>
            <a href="logout.php" class="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition">
                <i class="fa-solid fa-power-off"></i> Logout
            </a>
        </div>
    </nav>

    <div class="flex pt-16 h-screen">
        <aside class="w-64 bg-white border-r hidden md:block shadow-sm">
            <ul class="p-4 space-y-2">
                <li><a href="dashboard.php" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"><i class="fa-solid fa-gauge w-6"></i> Dashboard</a></li>
                <li><a href="mitra_list.php" class="block px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-lg"><i class="fa-solid fa-map-location-dot w-6"></i> Data Mitra</a></li>
                <li><a href="produk_list.php" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"><i class="fa-solid fa-box w-6"></i> Data Produk</a></li>
                <li class="pt-4 border-t"><a href="../public/index.php" target="_blank" class="block px-4 py-2 text-gray-500 hover:text-emerald-600"><i class="fa-solid fa-globe w-6"></i> Lihat Website</a></li>
            </ul>
        </aside>

        <main class="flex-1 p-6 overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Daftar Mitra</h1>
                <a href="mitra_add.php" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Tambah Mitra Baru
                </a>
            </div>

            <div class="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                <table id="tabelMitra" class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th class="px-4 py-3 rounded-l-lg">Nama Mitra</th>
                            <th class="px-4 py-3">Lokasi (Kota)</th>
                            <th class="px-4 py-3">Koordinat</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3 rounded-r-lg text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($row = mysqli_fetch_assoc($result)): ?>
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3 font-medium text-gray-900">
                                <?= htmlspecialchars($row['nama_mitra']); ?>
                                <div class="text-xs text-gray-400 font-normal mt-1"><?= htmlspecialchars($row['alamat']); ?></div>
                            </td>
                            <td class="px-4 py-3">
                                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    <?= htmlspecialchars($row['kota']); ?>
                                </span>
                            </td>
                            <td class="px-4 py-3 font-mono text-xs">
                                Lat: <?= $row['latitude']; ?><br>
                                Lng: <?= $row['longitude']; ?>
                            </td>
                            <td class="px-4 py-3">
                                <?php if($row['status_aktif'] == '1'): ?>
                                    <span class="text-green-600 font-bold text-xs"><i class="fa-solid fa-check-circle"></i> Aktif</span>
                                <?php else: ?>
                                    <span class="text-red-500 font-bold text-xs"><i class="fa-solid fa-times-circle"></i> Tutup</span>
                                <?php endif; ?>
                            </td>
                            <td class="px-4 py-3 text-center space-x-1">
                                <a href="mitra_edit.php?id=<?= $row['id_mitra']; ?>" class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1.5 rounded text-xs" title="Edit">
                                    <i class="fa-solid fa-pen"></i>
                                </a>
                                <a href="mitra_delete.php?id=<?= $row['id_mitra']; ?>" onclick="return confirm('Yakin ingin menghapus data ini?')" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded text-xs" title="Hapus">
                                    <i class="fa-solid fa-trash"></i>
                                </a>
                                <a href="https://www.google.com/maps?q=<?= $row['latitude']; ?>,<?= $row['longitude']; ?>" target="_blank" class="bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 py-1.5 rounded text-xs" title="Cek di Gmaps">
                                    <i class="fa-solid fa-map-pin"></i>
                                </a>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>

    <script>
        $(document).ready(function () {
            $('#tabelMitra').DataTable({
                responsive: true,
                language: {
                    search: "Cari:",
                    lengthMenu: "Tampilkan _MENU_ data",
                    info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
                    paginate: { first: "First", last: "Last", next: "→", previous: "←" }
                }
            });
        });
    </script>
</body>
</html>