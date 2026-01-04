<?php $page_title = "Cari Distributor"; ?>
<?php include 'header.php'; ?>

<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html {
        height: 100%;
        width: 100%;
    }
    
    body {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        background: white;
    }

    /* Fixed navbar at top */
    nav { 
        position: fixed; 
        top: 0; 
        left: 0; 
        right: 0; 
        z-index: 100;
        height: 64px;
    }
    
    /* Main map area - takes remaining space after navbar */
    #mapContainer {
        margin-top: 64px;
        flex: 1;
        display: flex;
        overflow: hidden;
        height: calc(100vh - 64px);
        width: 100%;
        position: relative;
        background: white;
    }

    /* Map itself fills container */
    #map { 
        height: 100% !important; 
        width: 100% !important; 
        z-index: 1;
        flex: 1;
        background-color: #f0f0f0;
    }

    .marker-icon-custom {
        transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), 
                    filter 0.28s ease, box-shadow 0.28s ease !important;
        will-change: transform;
        transform-origin: center bottom;
    }

    .marker-selected {
        transform: scale(1.18) !important;
        filter: drop-shadow(0 10px 18px rgba(16, 185, 129, 0.35));
    }

    .leaflet-popup-content-wrapper {
        background: white;
        border-radius: 16px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.06);
        padding: 0;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .leaflet-popup-content { margin: 0; width: 320px !important; padding: 0; }
    .leaflet-popup-tip { background: white; box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.08); }
    
    .leaflet-container a.leaflet-popup-close-button {
        top: 12px; right: 12px; color: #9ca3af; font-size: 20px; width: 24px; height: 24px; line-height: 24px; text-align: center;
    }
    .leaflet-container a.leaflet-popup-close-button:hover { color: #ef4444; }

    .loader {
        border: 3px solid rgba(16, 185, 129, 0.1);
        border-top: 3px solid #10b981;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    /* Footer should be below map and scrollable */
    footer {
        width: 100%;
        margin-top: 0;
        flex-shrink: 0;
    }

    .card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .badge-active {
        background: #d1fae5;
        color: #047857;
        border: 1px solid #a7f3d0;
    }
    
    .badge-closed {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }

    .tab-btn {
        position: relative;
        font-weight: 600;
        font-size: 14px;
        padding: 10px 16px;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.3s ease;
    }

    .tab-btn.active {
        color: #10b981;
    }

    .tab-btn.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #10b981;
        border-radius: 3px 3px 0 0;
    }

    .stat-card {
        background: white;
        border-radius: 12px;
        padding: 16px;
        border: 1px solid #e5e7eb;
        text-align: center;
    }

    .stat-value {
        font-size: 20px;
        font-weight: 800;
        color: #111827;
    }

    .stat-label {
        font-size: 11px;
        color: #6b7280;
        margin-top: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Wrapper untuk layout yang proper */
    main {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 64px);
    }

    /* Map section */
    #mapContainer {
        flex: 1;
        overflow: hidden;
    }
</style>

<div id="pageWrapper" style="display: flex; flex-direction: column; min-height: 100vh;">
    <div id="mapContainer" class="distributor-page">
    <!-- SIDEBAR -->
    <aside class="w-full md:w-[380px] bg-white border-r border-gray-200 z-[1000] flex flex-col h-full absolute md:relative transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out" id="sidebar">
        
        <!-- SEARCH & ACTIONS -->
        <div class="p-4 bg-white border-b border-gray-200 space-y-3 z-10">
            <div class="relative group">
                <input type="text" id="searchBox" placeholder="Cari nama atau lokasi..." 
                    class="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-2.5 text-gray-400 text-sm group-focus-within:text-emerald-500"></i>
            </div>

            <div class="grid grid-cols-2 gap-2">
                <button onclick="getLocation()" class="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 active:scale-95 transition-all border border-emerald-100">
                    <i class="fa-solid fa-location-crosshairs text-sm"></i>
                    <span>Disekitar</span>
                </button>
                <button onclick="toggleDetailPanel()" class="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 active:scale-95 transition-all border border-blue-100">
                    <i class="fa-solid fa-chart-simple text-sm"></i>
                    <span>Statistik</span>
                </button>
            </div>

            <div class="flex border-b border-gray-200 overflow-x-auto -mx-4 px-4">
                <button onclick="filterByStatus('all')" class="tab-btn active" data-filter="all">Semua</button>
                <button onclick="filterByStatus('active')" class="tab-btn" data-filter="active">
                    <i class="fa-solid fa-circle text-[6px] mr-1.5" style="vertical-align: middle;"></i>Buka
                </button>
                <button onclick="filterByStatus('closed')" class="tab-btn" data-filter="closed">
                    <i class="fa-solid fa-circle text-[6px] mr-1.5" style="vertical-align: middle;"></i>Tutup
                </button>
            </div>
        </div>

        <!-- STATS -->
        <div class="px-4 py-2 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 grid grid-cols-3 gap-1.5">
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

        <!-- LIST CONTAINER (Reduced height for 2+ cards visible) -->
        <div class="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50" id="mitraList">
            <div class="flex flex-col items-center justify-center h-40 text-gray-400">
                <div class="loader mb-4"></div>
                <p class="text-sm font-medium">Memuat data...</p>
            </div>
        </div>
    </aside>

    <!-- DETAIL PANEL -->
    <div id="detailPanel" class="hidden fixed bottom-0 md:bottom-auto left-0 right-0 md:left-auto md:right-0 md:top-16 md:w-80 h-96 md:h-[calc(100vh-64px)] bg-white border-t md:border-t-0 md:border-l border-gray-200 z-50 md:z-10 flex flex-col shadow-2xl md:shadow-lg">
        <div class="px-6 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
            <h2 class="text-lg font-bold text-gray-800">Statistik</h2>
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
                        <div class="text-xs text-emerald-600 font-medium mt-1">Total</div>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                        <div class="text-2xl font-bold text-green-700" id="statActive">0</div>
                        <div class="text-xs text-green-600 font-medium mt-1">Buka</div>
                    </div>
                    <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center border border-red-200">
                        <div class="text-2xl font-bold text-red-700" id="statClosed">0</div>
                        <div class="text-xs text-red-600 font-medium mt-1">Tutup</div>
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="font-semibold text-gray-700 text-sm uppercase tracking-wide">Top 5 Kota</h3>
                <div id="citiesList" class="space-y-2">
                    <div class="h-20 flex items-center justify-center text-gray-400">
                        <p class="text-sm">Memuat...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MAP -->
    <main class="flex-1 relative h-full overflow-hidden">
        <button onclick="toggleSidebar()" class="absolute top-4 left-4 z-[999] bg-white p-2.5 rounded-lg shadow-lg md:hidden text-emerald-600 hover:bg-gray-50 active:scale-95 transition border border-gray-200">
            <i class="fa-solid fa-bars text-lg"></i>
        </button>
        
        <div id="map"></div>
    </main>
</div>
</div>

<script>
    // Log for debugging
    console.log('📄 Page loaded: distributor.php');
    console.log('🌍 API Base URL will auto-detect');
</script>

<?php include 'footer.php'; ?>
