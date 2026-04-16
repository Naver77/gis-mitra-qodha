// --- INTERFACES ---
export interface MitraProperties {
  id: string;
  nama: string;
  jenis: string;
  alamat: string;
  kota: string;
  hp: string;
  status_aktif: string;
}

// Standar format spasial internasional (Bagus untuk dibahas di Skripsi GIS)
export interface GeoJSONFeature {
  type: "Feature";
  properties: MitraProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  distance?: number | null;
}

// --- DATA DUMMY ---
export const mockGeoJSON: { features: GeoJSONFeature[] } = {
  features: [
    { type: "Feature", properties: { id: "1", nama: "Qodha Pusat", jenis: "Distributor", alamat: "Jl. Raya Serpong No.10, Tangerang Selatan", kota: "Tangerang", hp: "6281717302223", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.6647, -6.2886] } },
    { type: "Feature", properties: { id: "2", nama: "Agen Berkah Wangi", jenis: "Agen", alamat: "Jl. Margonda Raya No. 45, Depok", kota: "Depok", hp: "6281234567890", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.8330, -6.3731] } },
    { type: "Feature", properties: { id: "3", nama: "Toko Harum Mekar", jenis: "Reseller", alamat: "Pasar Tanah Abang Blok A", kota: "Jakarta Pusat", hp: "628987654321", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.8166, -6.1873] } },
    { type: "Feature", properties: { id: "4", nama: "Agen Bekasi Sentosa", jenis: "Agen", alamat: "Jl. Ahmad Yani, Bekasi Barat", kota: "Bekasi", hp: "628111222333", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.9896, -6.2415] } },
  ]
};

// --- ALGORITMA HAVERSINE ---
// Rumus menghitung jarak lengkung bumi
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // Radius bumi dalam meter
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dp/2) * Math.sin(dp/2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl/2) * Math.sin(dl/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
};