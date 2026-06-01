import fs from 'fs';
import path from 'path';

// 1. Definisikan tipe data / interface agar TypeScript tidak protes
interface GeoJsonFeature {
  properties?: {
    WADMKK?: string;
    [key: string]: unknown;
  };
}

export function getOfficialCities(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'public/assets/geojson/batas_kabupaten.geojson');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const geoJson = JSON.parse(fileContents);

    const rawCities = geoJson.features
      // 2. Ganti kata 'any' menjadi 'GeoJsonFeature'
      .map((feature: GeoJsonFeature) => feature.properties?.WADMKK)
      .filter((city: string | null | undefined) => city && city.trim() !== '');

    const uniqueCities = Array.from(new Set(rawCities)).sort();
    
    return uniqueCities as string[];
  } catch (error) {
    console.error("Gagal mengekstrak kota dari GeoJSON:", error);
    return [];
  }
}