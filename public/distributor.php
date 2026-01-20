<?php $page_title = "Peta Distributor"; ?>
<?php include 'header.php'; ?>

<style>
    /* CSS Layout Peta - Tetap disini agar styling halaman spesifik tidak tercampur */
    html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }
    
    .map-layout {
        display: flex;
        height: calc(100vh - 85px); 
        width: 100vw;
        position: relative;
        overflow: hidden;
    }

    .map-sidebar {
        width: 400px;
        height: 100%;
        background: white;
        z-index: 1001;
        box-shadow: 4px 0 24px rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }

    .map-wrapper { flex: 1; position: relative; height: 100%; width: 100%; z-index: 1; }
    #map { height: 100%; width: 100%; background: #e5e7eb; }

    /* Custom Scroll */
    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-track { background: #f9fafb; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .map-sidebar {
            position: absolute; top: 0; left: 0; bottom: 0; width: 100%;
            transform: translateX(-100%);
        }
        .map-sidebar.open { transform: translateX(0); }
        .sidebar-toggle { display: block !important; }
    }
    .sidebar-toggle { display: none; }

    /* --- TAMBAHAN STYLE SAMSUNG LOOK --- */

/* 1. Kustomisasi Popup Leaflet agar lebih luas & bersih */
.leaflet-popup-content-wrapper {
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    padding: 0;
    overflow: hidden;
}
.leaflet-popup-content {
    margin: 0;
    width: 280px !important; /* Lebar fix ala Samsung */
}
.leaflet-container a.leaflet-popup-close-button {
    top: 10px;
    right: 10px;
    color: #999;
    font-size: 18px;
    z-index: 10;
}

/* 2. Style Item Sidebar saat Aktif (Selected) */
.mitra-item.active {
    background-color: #fffbeb; /* Amber-50 */
    border-color: #f59e0b;     /* Brand Gold */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.mitra-item.active h4 {
    color: #b45309; /* Dark Amber */
}
</style>

<div class="map-layout">
    
    <aside id="sidebar" class="map-sidebar">
        <div class="p-5 border-b border-gray-100 bg-white shadow-sm shrink-0">
            <div class="flex justify-between items-center mb-1">
                <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i class="fa-solid fa-map-location-dot text-brand-gold"></i> Lokasi Mitra
                </h1>
                <button onclick="toggleSidebar()" class="md:hidden text-gray-400 hover:text-red-500">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>
            
            <div class="mt-4 space-y-3">
                <div class="relative">
                    <input type="text" id="searchBox" placeholder="Cari Nama / Alamat..." 
                        class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold transition shadow-sm">
                    <i class="fa-solid fa-search absolute left-3.5 top-3 text-gray-400"></i>
                </div>
                
                <div class="flex gap-2 items-center">
                    <select id="radiusFilter" onchange="applyRadiusFilter()" class="py-1.5 px-3 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 focus:ring-brand-gold outline-none">
                        <option value="all">Semua Jarak</option>
                        <option value="5">Max 5 KM</option>
                        <option value="10">Max 10 KM</option>
                        <option value="25">Max 25 KM</option>
                    </select>

                    <div class="flex-1"></div> <button onclick="getLocation()" class="px-3 py-1.5 bg-brand-gold text-white rounded-lg hover:bg-amber-600 transition shadow-sm flex items-center gap-2 text-xs font-bold" title="Cari Terdekat">
                        <i class="fa-solid fa-location-crosshairs"></i> Terdekat
                    </button>
                </div>
                
                <div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <button onclick="filterStatus('all')" data-jenis="all" class="filter-btn active flex-1 py-1.5 text-xs font-bold rounded-lg border border-brand-dark bg-brand-dark text-white transition shadow-md whitespace-nowrap px-3">Semua</button>
                    <button onclick="filterStatus('Agen')" data-jenis="Agen" class="filter-btn flex-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap px-3">Agen</button>
                    <button onclick="filterStatus('Reseller')" data-jenis="Reseller" class="filter-btn flex-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap px-3">Reseller</button>
                </div>
            </div>
        </div>

        <div id="mitraList" class="flex-1 overflow-y-auto custom-scroll p-4 space-y-3 bg-gray-50/50">
            <div class="flex flex-col items-center justify-center h-40 text-gray-400">
                <div class="w-8 h-8 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mb-2"></div>
                <p class="text-xs">Memuat data peta...</p>
            </div>
        </div>

        <div class="p-3 border-t border-gray-100 text-center bg-white text-[10px] text-gray-400 shrink-0">
            &copy; 2026 Qodha WebGIS System
        </div>
    </aside>

    <main class="map-wrapper">
        <button onclick="toggleSidebar()" class="sidebar-toggle absolute top-4 left-4 z-[1000] bg-white p-3 rounded-xl shadow-lg text-brand-dark hover:text-brand-gold transition">
            <i class="fa-solid fa-bars text-lg"></i>
        </button>
        <div id="map"></div>
    </main>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script src="assets/js/map-core.js"></script>

</body>
</html>