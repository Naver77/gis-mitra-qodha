import React from 'react';

const Education: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <span className="text-brand-green font-bold tracking-widest text-sm uppercase bg-green-50 px-3 py-1 rounded-full">Edukasi & Manfaat</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Kenapa Harus <span className="text-brand-gold">Aromaterapi?</span></h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Aroma bukan sekadar wewangian, tapi kunci ketenangan. Simak bagaimana aromaterapi dapat meningkatkan kualitas istirahat dan fokus ibadah Anda.
            </p>
            <ul className="space-y-4 mt-6">
              <li className="flex items-center gap-3"><i className="fa-solid fa-check-circle text-brand-green text-xl"></i><span className="text-gray-700 font-medium">Relaksasi pikiran & tubuh</span></li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check-circle text-brand-green text-xl"></i><span className="text-gray-700 font-medium">Meningkatkan fokus & mood</span></li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-check-circle text-brand-green text-xl"></i><span className="text-gray-700 font-medium">Sunnah yang menghidupkan suasana</span></li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition duration-500">
              <div className="aspect-video w-full bg-gray-900">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/Y0tF0nTD2fU?rel=0&modestbranding=1" title="Manfaat Aromaterapi" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;