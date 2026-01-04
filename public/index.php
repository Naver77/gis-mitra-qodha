<?php include 'header.php'; ?>

    <!-- SIDEBAR -->
    <aside class="w-full md:w-[420px] bg-white border-r border-var(--color-gray-200) z-[1000] flex flex-col h-full absolute md:relative transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out" id="sidebar">
        
        <!-- HEADER -->
        <div class="px-6 py-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white z-20 border-b border-emerald-700">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <i class="fa-solid fa-map text-lg"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold tracking-tight">Qodha Maps</h1>
                    <p class="text-xs text-emerald-100 opacity-90">Jaringan Mitra Resmi</p>
                </div>
            </div>
        </div>

        <!-- SEARCH & ACTIONS -->
        <div class="p-4 bg-white border-b border-var(--color-gray-200) space-y-3 z-10">
            <!-- Search Bar -->
            <div class="relative group">
                <input type="text" id="searchBox" placeholder="Cari nama atau lokasi..." 
                    class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-var(--color-gray-200) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-gray-400 text-sm group-focus-within:text-emerald-500"></i>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-2 gap-2">
                <button onclick="getLocation()" class="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 active:scale-95 transition-all border border-emerald-100">
                    <i class="fa-solid fa-location-crosshairs text-sm"></i>
                    <span>Disekitar Saya</span>
                </button>
                <button onclick="toggleDetailPanel()" class="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 active:scale-95 transition-all border border-blue-100">
                    <i class="fa-solid fa-chart-simple text-sm"></i>
                    <span>Statistik</span>
                </button>
            </div>

            <!-- Filter Tabs -->
            <div class="flex border-b border-var(--color-gray-200) overflow-x-auto -mx-4 px-4">
                <button onclick="filterByStatus('all')" class="tab-btn active" data-filter="all">
                    Semua
                </button>
                <button onclick="filterByStatus('active')" class="tab-btn" data-filter="active">
                    <i class="fa-solid fa-circle text-[6px] mr-1.5" style="vertical-align: middle;"></i>Buka
                </button>
                <button onclick="filterByStatus('closed')" class="tab-btn" data-filter="closed">
                    <i class="fa-solid fa-circle text-[6px] mr-1.5" style="vertical-align: middle;"></i>Tutup
                </button>
            </div>
        </div>

        <!-- STATS (Mini) -->
        <div class="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-var(--color-gray-200) grid grid-cols-3 gap-2">
            <div class="stat-card">
                <div class="stat-value text-emerald-600" id="totalMitra">0</div>
                <div class="stat-label">Total</div>
            </div>
            <div class="stat-card">
                <div class="stat-value text-green-600" id="activeMitra">0</div>
                <div class="stat-label">Buka</div>
            </div>
            <div class="stat-card">
                <div class="stat-value text-red-600" id="closedMitra">0</div>
                <div class="stat-label">Tutup</div>
            </div>
        </div>

        <!-- LIST CONTAINER -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-var(--color-gray-50)" id="mitraList">
            <div class="flex flex-col items-center justify-center h-40 text-gray-400">
                <div class="loader mb-4"></div>
                <p class="text-sm font-medium">Memuat data mitra...</p>
                <p class="text-xs mt-1">Tunggu sebentar</p>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="px-4 py-4 text-center text-xs text-gray-500 bg-white border-t border-var(--color-gray-200) font-medium">
            <p>Qodha Mitra Maps © 2026</p>
            <p class="mt-1 text-[10px]">Sistem Informasi Geografis</p>
        </div>
    </aside>

    <!-- DETAIL PANEL (Hidden by default) -->
    <div id="detailPanel" class="hidden fixed bottom-0 md:bottom-auto left-0 right-0 md:left-auto md:right-0 md:top-0 md:w-96 h-96 md:h-full bg-white border-t md:border-t-0 md:border-l border-var(--color-gray-200) z-50 md:z-10 flex flex-col shadow-2xl md:shadow-lg">
        <div class="px-6 py-4 border-b border-var(--color-gray-200) flex items-center justify-between sticky top-0 bg-white">
            <h2 class="text-lg font-bold text-gray-800">Statistik Mitra</h2>
            <button onclick="toggleDetailPanel()" class="text-gray-400 hover:text-gray-600 md:hidden">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <div class="space-y-4">
                <h3 class="font-semibold text-gray-700 text-sm uppercase tracking-wide">Ringkasan</h3>
                <div class="grid grid-cols-3 gap-3">
                    <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 text-center border border-emerald-200">
                        <div class="text-2xl font-bold text-emerald-700" id="statTotal">0</div>
                        <div class="text-xs text-emerald-600 font-medium mt-1">Total Mitra</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                        <div class="text-2xl font-bold text-green-700" id="statActive">0</div>
                        <div class="text-xs text-green-600 font-medium mt-1">Sedang Buka</div>
                    </div>
                    <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center border border-red-200">
                        <div class="text-2xl font-bold text-red-700" id="statClosed">0</div>
                        <div class="text-xs text-red-600 font-medium mt-1">Sedang Tutup</div>
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="font-semibold text-gray-700 text-sm uppercase tracking-wide">Kota Terbanyak</h3>
                <div id="citiesList" class="space-y-2">
                    <div class="h-20 flex items-center justify-center text-gray-400">
                        <p class="text-sm">Memuat...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <main class="flex-1 relative h-full overflow-hidden">
        <!-- Mobile Toggle Button -->
        <button onclick="toggleSidebar()" class="absolute top-4 left-4 z-[999] bg-white p-3 rounded-lg shadow-lg md:hidden text-emerald-600 hover:bg-gray-50 active:scale-95 transition border border-var(--color-gray-200)">
            <i class="fa-solid fa-bars text-lg"></i>
        </button>
        
        <!-- Map Container -->
        <div id="map"></div>
    </main>

<?php include 'footer.php'; ?>