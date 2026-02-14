<section id="analisa" class="py-16 bg-gray-50 border-b border-gray-200">
    <!-- Container Lebih Lebar untuk Tabel Perbandingan -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div class="text-center mb-10">
            <span class="text-green-600 font-bold tracking-widest text-sm uppercase bg-green-50 px-3 py-1 rounded-full border border-green-100">Analisa Modal</span>
            <h2 class="text-3xl font-bold text-gray-900 mt-3">Perbandingan Harga Kemitraan</h2>
            <p class="text-gray-500 mt-2 text-sm">Lihat selisih harga modal yang didapatkan setiap tingkatan mitra.</p>
        </div>

        <div class="overflow-x-auto w-fit mx-auto rounded-xl border border-gray-200 shadow-md bg-white">
            <table class="w-auto text-sm text-left border-collapse">
                <thead class="bg-gray-900 text-white uppercase font-bold tracking-tight text-xs">
                    <tr>
                        <!-- Kolom Nomor -->
                        <th class="px-4 py-3 text-center border-r border-gray-700 w-12">
                            No
                        </th>

                        <!-- Produk (Sticky) -->
                        <th class="px-6 py-3 sticky left-0 bg-gray-900 z-20 border-r border-gray-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] whitespace-nowrap">
                            Produk
                        </th>
                        
                        <!-- Reseller -->
                        <th class="px-5 py-3 text-center bg-gray-800 border-r border-gray-700 whitespace-nowrap">
                            Reseller <span class="block text-[10px] font-normal text-gray-400 capitalize mt-0.5">Tier 3</span>
                        </th>
                        
                        <!-- Agen -->
                        <th class="px-5 py-3 text-center bg-gray-800 border-r border-gray-700 whitespace-nowrap">
                            Agen <span class="block text-[10px] font-normal text-gray-400 capitalize mt-0.5">Tier 2</span>
                        </th>
                        
                        <!-- Distributor -->
                        <th class="px-5 py-3 text-center bg-brand-gold text-gray-900 whitespace-nowrap">
                            Distributor <span class="block text-[10px] font-normal text-gray-800 capitalize mt-0.5">VIP</span>
                        </th>
                    </tr>
                </thead>
                
                <tbody class="divide-y divide-gray-100 font-medium text-gray-700 text-xs sm:text-sm">
                    <?php foreach($pricelist as $index => $row): ?>
                    <tr class="hover:bg-blue-50/20 transition duration-150 group <?= $index % 2 == 0 ? 'bg-white' : 'bg-gray-50' ?>">
                        
                        <!-- Nomor Urut -->
                        <td class="px-4 py-3 text-center font-semibold text-gray-500 border-r border-gray-100">
                            <?= $index + 1 ?>
                        </td>

                        <!-- Nama Produk -->
                        <td class="px-6 py-3 font-bold text-gray-800 sticky left-0 bg-inherit z-10 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] align-middle whitespace-nowrap">
                            <div class="leading-tight"><?= $row['nama_produk'] ?></div>
                            <div class="text-[11px] text-gray-400 font-normal mt-1"><?= $row['qty'] ?> <?= $row['satuan'] ?></div>
                        </td>
                        
                        <!-- Reseller -->
                        <td class="px-5 py-3 text-center border-r border-gray-100 align-middle">
                            <div class="font-bold text-gray-700 whitespace-nowrap"><?= formatRupiah($row['harga_reseller']) ?></div>
                            <div class="text-[10px] text-gray-400 mt-1 leading-none whitespace-nowrap">Total: <?= formatRupiah($row['harga_reseller'] * $row['qty']) ?></div>
                        </td>
                        
                        <!-- Agen -->
                        <td class="px-5 py-3 text-center border-r border-gray-100 bg-green-50/10 align-middle">
                            <div class="font-bold text-green-700 whitespace-nowrap"><?= formatRupiah($row['harga_agen']) ?></div>
                            <div class="text-[10px] text-green-600/60 mt-1 leading-none whitespace-nowrap">Total: <?= formatRupiah($row['harga_agen'] * $row['qty']) ?></div>
                        </td>
                        
                        <!-- Distributor -->
                        <td class="px-5 py-3 text-center bg-yellow-50/40 relative group-hover:bg-yellow-100/40 transition align-middle">
                            <div class="font-extrabold text-gray-900 text-base whitespace-nowrap"><?= formatRupiah($row['harga_distributor']) ?></div>
                            <div class="text-[10px] text-gray-500 mt-1 font-semibold leading-none whitespace-nowrap">Total: <?= formatRupiah($row['harga_distributor'] * $row['qty']) ?></div>
                            
                            <!-- Badge Hemat -->
                            <?php $hemat = ($row['harga_reseller'] - $row['harga_distributor']) * $row['qty']; ?>
                            <?php if($hemat > 0): ?>
                            <div class="mt-1.5 inline-block bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded border border-green-200 leading-none whitespace-nowrap">
                                Hemat <?= number_format($hemat/1000, 0) ?>rb
                            </div>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 italic bg-white px-4 py-2 rounded-full border border-gray-200 w-fit mx-auto shadow-sm">
            <i class="fa-solid fa-circle-info text-blue-400"></i>
            <span>Harga di atas adalah Harga Satuan (Pcs) & Total Per Karton/Lusin.</span>
        </div>
    </div>
</section>