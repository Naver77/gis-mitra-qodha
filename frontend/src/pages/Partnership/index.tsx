import { useState } from 'react';

// Import komponen pecahan
import Hero from './sections/Hero';
import PricingHET from './sections/PricingHET';
import PricingTier from './sections/PricingTier';
import Packages from './sections/Packages';
import Benefits from './sections/Benefits';
import MapPreview from './sections/MapPreview';

export interface ProductPrice {
  id: number;
  kategori: string;
  nama_produk: string;
  isi: string;
  qty: number;
  qty2: string;
  satuan: string;
  harga_het: number;
  harga_reseller: number;
  harga_agen: number;
  harga_distributor: number;
}

// Pindahkan dummy data ke luar agar lebih rapi
const dummyData: ProductPrice[] = [
  { id: 1, kategori: 'BUKHUR', nama_produk: 'Bukhur Pouch Premium', isi: '100gr', qty2: '1 Karton', qty: 72, satuan: 'Pcs', harga_het: 25000, harga_reseller: 22000, harga_agen: 21000, harga_distributor: 19000 },
  { id: 2, kategori: 'BUKHUR', nama_produk: 'Bukhur Kaca', isi: '50gr', qty2: '1 Lusin', qty: 12, satuan: 'Pcs', harga_het: 60000, harga_reseller: 45000, harga_agen: 43000, harga_distributor: 40000 },
  { id: 3, kategori: 'BUKHUR', nama_produk: 'Bukhur Kayu', isi: '50gr', qty2: '1 Lusin', qty: 12, satuan: 'Pcs', harga_het: 65000, harga_reseller: 45000, harga_agen: 43000, harga_distributor: 40000 },
  { id: 4, kategori: 'BUKHUR', nama_produk: 'Bukhur Reguler', isi: '20gr', qty2: '1 Lusin', qty: 12, satuan: 'Pcs', harga_het: 40000, harga_reseller: 35000, harga_agen: 33000, harga_distributor: 30000 },
  { id: 5, kategori: 'DUPA', nama_produk: 'Dupa Pelor', isi: 'Isi 40', qty2: '1 Karton', qty: 48, satuan: 'Pcs', harga_het: 20000, harga_reseller: 17000, harga_agen: 16000, harga_distributor: 14000 },
  { id: 6, kategori: 'DUPA', nama_produk: 'Dupa Kerucut', isi: 'Isi 50', qty2: '1 Karton', qty: 48, satuan: 'Pcs', harga_het: 25000, harga_reseller: 22000, harga_agen: 21000, harga_distributor: 20000 },
  { id: 7, kategori: 'DUPA', nama_produk: 'Dupa Maharaja', isi: 'Reguler', qty2: '1 Karton', qty: 72, satuan: 'Pcs', harga_het: 45000, harga_reseller: 36000, harga_agen: 34000, harga_distributor: 32000 },
  { id: 8, kategori: 'PARFUM', nama_produk: 'Parfum Roll On', isi: '6ml', qty2: '1 Lusin', qty: 12, satuan: 'Pcs', harga_het: 15000, harga_reseller: 10000, harga_agen: 8000, harga_distributor: 7000 },
  { id: 9, kategori: 'PARFUM', nama_produk: 'Parfum Sajadah', isi: '250ml', qty2: '1 Karton', qty: 48, satuan: 'Pcs', harga_het: 45000, harga_reseller: 36000, harga_agen: 34000, harga_distributor: 32000 }
];

const Partnership = () => {
  // Masukkan data langsung sebagai nilai awal state
  const [pricelist] = useState<ProductPrice[]>(dummyData);

  return (
    <div className="w-full bg-gray-50">
      <Hero />
      <PricingHET data={pricelist} />
      <PricingTier data={pricelist} />
      <Packages />
      <Benefits />
      <MapPreview />
    </div>
  );
};

export default Partnership;