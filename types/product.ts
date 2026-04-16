export interface Product {
  id_produk: string | number;
  nama_produk: string;
  nama_kategori: string;
  harga: number;
  gender?: string | null; 
  gambar?: string | null;
  rating?: number;
  terjual?: number;
}