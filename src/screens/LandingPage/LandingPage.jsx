import React, { useState, useEffect } from "react";

// Import Gambar Anda di sini
import BackgroundHero from '../../assets/images/bgmotor3.png';
import BackgroundDefinisi from '../../assets/images/bgmotor3.png';
import MentalImage from '../../assets/images/bgmotor3.png';
import KendaraanImage from '../../assets/images/Budaya5.webp';
import GearImage from '../../assets/images/Budaya5.webp';
import CuacaImage from '../../assets/images/Budaya5.webp';
import LingkunganImage from '../../assets/images/Budaya5.webp';
import AturanImage from '../../assets/images/Budaya5.webp';
import KecepatanImage from '../../assets/images/Budaya5.webp';
import JalanImage from '../../assets/images/Budaya5.webp';

export const LandingPage = () => {
  const [currentFactor, setCurrentFactor] = useState(0);

  const safetyFactors = [
    { id: 1, name: "Kesiapan Mental & Fisik", image: MentalImage, description: "Kondisi tubuh dan emosi sangat menentukan respons Anda di jalan. Hindari berkendara saat mengantuk, sakit, terlalu lelah, atau sedang dalam kondisi stres dan emosi tinggi." },
    { id: 2, name: "Kelayakan Kendaraan", image: KendaraanImage, description: "Lakukan pengecekan rutin sebelum berangkat. Pastikan tekanan angin ban pas, fungsi rem maksimal, lampu menyala terang, dan klakson berfungsi dengan baik." },
    { id: 3, name: "Perlengkapan Keselamatan", image: GearImage, description: "Gunakan helm berstandar SNI/internasional, jaket tebal yang melindungi dari angin dan benturan, sarung tangan, celana panjang, serta sepatu yang menutupi mata kaki." },
    { id: 4, name: "Faktor Cuaca", image: CuacaImage, description: "Cuaca buruk seperti hujan deras atau kabut menurunkan jarak pandang dan membuat jalanan licin. Kurangi kecepatan dan jaga jarak aman ekstra saat cuaca tidak bersahabat." },
    { id: 5, name: "Kesadaran Lingkungan", image: LingkunganImage, description: "Fokus seratus persen pada kondisi jalan. Sadari pergerakan pejalan kaki, kendaraan yang tiba-tiba berhenti, jalan berlubang, dan hindari menggunakan ponsel saat berkendara." },
    { id: 6, name: "Peraturan Lalu Lintas", image: AturanImage, description: "Peraturan dan rambu lalu lintas dibuat untuk keteraturan. Patuhi batas kecepatan, lampu merah, dan marka jalan. Pelanggaran kecil bisa berakibat fatal." },
    { id: 7, name: "Manajemen Kecepatan", image: KecepatanImage, description: "Kendalikan kecepatan sesuai dengan batasan dan kepadatan lalu lintas. Kecepatan yang terkontrol memberikan Anda waktu lebih banyak untuk bermanuver atau mengerem." },
    { id: 8, name: "Karakteristik Jalan", image: JalanImage, description: "Kenali rute yang Anda lewati. Berhati-hatilah pada tikungan tajam, jalanan menurun curam, jalan berpasir, atau area rawan kecelakaan. Sesuaikan gaya berkendara." },
  ];

  const nextFactor = () => {
    setCurrentFactor((prev) => (prev === safetyFactors.length - 1 ? 0 : prev + 1));
  };

  const prevFactor = () => {
    setCurrentFactor((prev) => (prev === 0 ? safetyFactors.length - 1 : prev - 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none !important;
          }
          .hide-scrollbar {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>

      {/* Kontainer Utama */}
      <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-y-auto overflow-x-hidden hide-scrollbar snap-y snap-mandatory bg-[#0b3848] text-white scroll-smooth">

        {/* ================= SECTION 1: HERO ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-start overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover z-0" alt="Hero Safety Riding" src={BackgroundHero} />
          <div className="absolute inset-0 bg-[#0b3848]/30 z-10"></div>
          
          {/* Ubah text-center jadi text-left, items-center jadi items-start, sesuaikan padding kiri */}
          <div className="relative z-20 text-left px-6 sm:px-16 lg:px-28 max-w-5xl flex flex-col items-start w-full">
            
            {/* Efek glow disesuaikan sedikit agar lebih pas di rata kiri */}
            <div className="absolute inset-x-0 -top-8 -bottom-8 bg-[#0b3848] opacity-20  rounded-r-full blur-2xl -ml-10"></div>
            
            <h1 className="relative text-5xl sm:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight drop-shadow-lg">
              Panduan <br/> Keselamatan <br/> Berkendara
            </h1>
            
            <p className="relative text-xl sm:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
              Jadilah pahlawan di jalan raya. Lindungi dirimu, hormati sesama, dan pahami ilmunya.
            </p>
            
            {/* Teks scroll ke bawah dibuat lebih rapi dengan ikon panah */}
            <div className="relative mt-12 flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white/60 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              Scroll ke bawah
            </div>

          </div>
        </section>

        {/* ================= SECTION 2: DEFINISI ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-center overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover z-0" alt="Definisi Background" src={BackgroundDefinisi} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3848] via-[#0b3848]/80 to-transparent z-10"></div>

          <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl font-display font-bold mb-8">Apa itu <br/><span className="text-amber-400">Safety Riding?</span></h2>
            <div className="max-w-2xl text-lg sm:text-xl text-white/90 leading-relaxed font-sans space-y-4 text-justify">
              <p>Keselamatan berkendara bukan sekadar mematuhi aturan demi menghindari tilang. Ini adalah pola pikir dan perilaku proaktif untuk melindungi semua pengguna jalan.</p>
              <p>Seorang pengendara yang aman selalu mengantisipasi potensi bahaya, memahami kapasitas kendaraannya, dan menempatkan keselamatan bersama sebagai prioritas utama di atas segalanya.</p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 & FOOTER ================= */}
        {/* Section 3 dibungkus dengan overflow-y-auto agar memiliki scroll internal sendiri */}
        <section className="h-screen w-full snap-start snap-always overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth bg-[#0b3848] relative">
          
          {/* Container internal yang menyatukan Slider dan Footer */}
          <div className="flex flex-col w-full min-h-screen relative">
            
            {/* --- THE SLIDER BLOCK (Ukurannya dikunci persis 1 layar / 100vh) --- */}
            <div className="h-screen w-full relative isolate flex items-center justify-center overflow-hidden shrink-0">
              
              <img 
                key={safetyFactors[currentFactor].id}
                className="absolute inset-0 w-full h-full object-cover z-0 animate-fade-in" 
                alt={safetyFactors[currentFactor].name} 
                src={safetyFactors[currentFactor].image} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b3848] via-[#0b3848]/60 to-[#0b3848]/30 z-10"></div>

              <button 
                onClick={prevFactor}
                className="absolute left-4 sm:left-12 z-30 p-4 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm"
                aria-label="Previous Factor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 sm:w-12 sm:h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="relative z-20 w-full max-w-5xl mx-auto px-16 sm:px-24 flex flex-col items-center text-center mt-32 sm:mt-48">
                <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold tracking-widest uppercase">
                  Faktor {currentFactor + 1} dari {safetyFactors.length}
                </div>
                
                <h3 className="text-4xl sm:text-6xl font-display font-bold mb-6 drop-shadow-lg">
                  {safetyFactors[currentFactor].name}
                </h3>
                
                <p className="text-lg sm:text-2xl text-white/90 font-sans max-w-3xl leading-relaxed drop-shadow-md">
                  {safetyFactors[currentFactor].description}
                </p>
              </div>

              <button 
                onClick={nextFactor}
                className="absolute right-4 sm:right-12 z-30 p-4 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm"
                aria-label="Next Factor"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 sm:w-12 sm:h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 flex justify-center space-x-3">
                {safetyFactors.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentFactor(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentFactor === index ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white'}`}
                  />
                ))}
              </div>

              {/* Indikator scroll kecil untuk memberitahu ada footer di bawah */}
              <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center text-white/30 text-xs animate-pulse">
                Scroll untuk info
              </div>
            </div>

            {/* --- THE FOOTER --- */}
            {/* Footer kini menjadi elemen biasa di bawah slider tanpa sifat "snap" */}
            <footer className="w-full bg-[#051e27] py-8 flex flex-col items-center justify-center text-sm text-white/60 shrink-0 border-t border-white/10 relative z-40">
              <p>&copy; 2026 Panduan Keselamatan Berkendara.</p>
              <p className="mt-1">Dibuat untuk meningkatkan kesadaran berlalu lintas.</p>
            </footer>

          </div>
        </section>

      </div>
    </>
  );
};