import React from 'react';

// Mengimpor semua pecahan (sections) yang sudah Anda buat
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Categories from './sections/Categories';
import BestSeller from './sections/BestSeller';
import Education from './sections/Education';
import Values from './sections/Values';

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Memanggil komponen satu per satu secara berurutan */}
      <Hero />
      <Stats />
      <Categories />
      <BestSeller />
      <Education />
      <Values />
    </div>
  );
};

export default Home;