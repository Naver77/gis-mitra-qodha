<?php 
// Pastikan variabel $stats sudah ada (dikirim dari index.php)
if(!isset($stats)) $stats = []; 
?>
<section class="bg-gray-800 py-12 border-y border-gray-700 relative overflow-hidden group">
    <!-- Dekorasi background -->
    <div class="absolute -left-20 -top-20 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl group-hover:bg-brand-green/30 transition duration-700"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-gray-700/50">
            <?php foreach($stats as $st): ?>
            <div class="p-2 flex flex-col items-center justify-center group/item">
                <div class="text-4xl md:text-5xl font-extrabold mb-2 transition duration-300 transform group-hover/item:scale-110 <?= isset($st['highlight']) ? 'text-brand-gold' : 'text-white' ?>">
                    <?= $st['count'] ?><span class="text-lg align-top opacity-50">+</span>
                </div>
                <div class="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                    <i class="fa-solid <?= $st['icon'] ?> <?= isset($st['highlight']) ? 'text-brand-gold' : 'text-gray-500' ?>"></i>
                    <?= $st['label'] ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>