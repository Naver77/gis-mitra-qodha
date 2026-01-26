<section class="py-16 bg-gray-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
            <h2 class="text-2xl font-bold text-gray-900">Kategori Pilihan</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            <?php foreach($categories as $c): ?>
            <a href="products.php?category=<?= $c['id'] ?>" class="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
                <div class="w-14 h-14 mx-auto <?= $c['bg'] ?> rounded-full flex items-center justify-center text-2xl mb-3 <?= $c['col'] ?> group-hover:scale-110 transition"><i class="fa-solid <?= $c['icon'] ?>"></i></div>
                <h3 class="font-bold text-gray-800"><?= $c['name'] ?></h3>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>