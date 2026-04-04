import React, { useState, useEffect } from "react";

// Import Gambar Anda di sini
import BackgroundHero from '../../assets/images/bgmotor3.png';
import BackgroundDefinisi from '../../assets/images/bgmotor2.png';
import MentalImage from '../../assets/images/bgmotor3.png';
import KendaraanImage from '../../assets/images/bgmotor3.png';
import GearImage from '../../assets/images/bgmotor3.png';
import CuacaImage from '../../assets/images/bgmotor3.png';
import LingkunganImage from '../../assets/images/bgmotor3.png';
import AturanImage from '../../assets/images/bgmotor3.png';
import KecepatanImage from '../../assets/images/bgmotor3.png';
import JalanImage from '../../assets/images/bgmotor3.png';

export const LandingPage = () => {
  // ================= STATE UNTUK SLIDER FAKTOR =================
  const [currentFactor, setCurrentFactor] = useState(0);

  // ================= STATE UNTUK QUIZ =================
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // ================= DATA =================
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

  const tipsData = [
    { 
      title: "Sebelum Berkendara", 
      icon: "🔍",
      points: [
        "Cek tekanan ban dan fungsi rem",
        "Pastikan lampu dan klakson menyala",
        "Gunakan helm SNI klik dengan benar",
        "Bawa surat-surat (SIM & STNK) lengkap",
        "Berdoa sebelum memulai perjalanan"
      ] 
    },
    { 
      title: "Saat Berkendara", 
      icon: "🛵",
      points: [
        "Jaga jarak aman dengan kendaraan lain",
        "Patuhi rambu dan lampu lalu lintas",
        "Gunakan lampu sein saat berbelok",
        "Fokus penuh, dilarang main ponsel",
        "Kendalikan emosi dan bersabar"
      ] 
    },
    { 
      title: "Sesudah Berkendara", 
      icon: "🛑",
      points: [
        "Parkir di tempat yang aman dan rata",
        "Pastikan mencabut kunci kontak",
        "Kunci ganda motor jika diperlukan",
        "Cek kembali barang bawaan Anda",
        "Istirahatkan mesin motor"
      ] 
    }
  ];

  const quizQuestions = [
    { q: "Apa fungsi utama helm saat berkendara?", options: ["Melindungi kepala dari benturan", "Gaya dan penampilan", "Menghindari tilang polisi"], answer: 0 },
    { q: "Kapan waktu yang tepat menyalakan lampu sein?", options: ["Saat berjalan lurus cepat", "Sebelum berbelok atau pindah jalur", "Hanya saat berhenti di pinggir jalan"], answer: 1 },
    { q: "Mengapa harus menjaga jarak aman antar kendaraan?", options: ["Agar bisa mengobrol dengan pengendara lain", "Menghemat bahan bakar motor", "Memberi ruang dan waktu untuk mengerem mendadak"], answer: 2 },
    { q: "Apa yang paling fatal jika dilakukan saat berkendara?", options: ["Menggunakan ponsel", "Mendengarkan suara mesin", "Membuka kaca helm"], answer: 0 },
    { q: "Jika jalanan basah karena hujan deras, yang harus dilakukan adalah?", options: ["Menambah kecepatan agar cepat sampai", "Mengurangi kecepatan dan hindari rem mendadak", "Menyalakan lampu hazard sambil jalan"], answer: 1 },
    { q: "Apa arti lampu kuning menyala pada traffic light?", options: ["Persiapan untuk berhenti dan berhati-hati", "Tancap gas sebelum lampu merah", "Boleh jalan terus tanpa henti"], answer: 0 },
    { q: "Jenis jas hujan apa yang paling aman digunakan?", options: ["Jas hujan model ponco/kelelawar", "Jas hujan setelan (baju dan celana)", "Menggunakan payung sambil menyetir"], answer: 1 },
    { q: "Apa risiko terbesar berkendara saat mengantuk?", options: ["Microsleep yang memicu kecelakaan fatal", "Menghemat waktu istirahat", "Membuat pengendara lebih rileks"], answer: 0 },
    { q: "Bagaimana posisi jari yang benar saat bersiap mengerem?", options: ["Melepas stang sepenuhnya", "Empat jari bersiap di tuas rem", "Hanya menggunakan ujung satu jari"], answer: 1 },
    { q: "Sebelum mesin dinyalakan, apa hal pertama yang wajib dicek?", options: ["Warna cat motor", "Tekanan ban dan fungsi pengereman", "Kondisi jok motor"], answer: 1 },
  ];

  const socialMediaLinks = [
    { name: "Whatsapp", href: "https://wa.me/6285875203185" },
    { name: "Email", href: "mailto:distakinaura.osh25@gmail.com" },
  ];

  // ================= FUNGSI HANDLER =================
  const nextFactor = () => setCurrentFactor((prev) => (prev === safetyFactors.length - 1 ? 0 : prev + 1));
  const prevFactor = () => setCurrentFactor((prev) => (prev === 0 ? safetyFactors.length - 1 : prev - 1));

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
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
          .hide-scrollbar::-webkit-scrollbar { display: none !important; }
          .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
        `}
      </style>

      {/* Kontainer Utama */}
      <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-y-auto overflow-x-hidden hide-scrollbar snap-y snap-mandatory bg-[#0b3848] text-white scroll-smooth">

        {/* ================= SECTION 1: HERO ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-start overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover z-0" alt="Hero Safety Riding" src={BackgroundHero} />
          <div className="absolute inset-0 bg-[#0b3848]/30 z-10"></div>
          
          <div className="relative z-20 text-left px-6 sm:px-16 lg:px-28 max-w-5xl flex flex-col items-start w-full">
            <div className="absolute inset-x-0 -top-8 -bottom-8 bg-[#0b3848] opacity-20 rounded-r-full blur-2xl -ml-10"></div>
            <h1 className="relative text-5xl sm:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight drop-shadow-lg">
              Panduan <br/> Keselamatan <br/> Berkendara
            </h1>
            <p className="relative text-xl sm:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
              Jadilah pahlawan di jalan raya. Lindungi dirimu, hormati sesama, dan pahami ilmunya.
            </p>
            <div className="relative mt-12 flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white/60 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              Scroll ke bawah
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: DEFINISI ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-start overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover z-0" alt="Definisi Background" src={BackgroundDefinisi} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3848] via-[#0b3848]/80 to-transparent z-10"></div>

          <div className="relative z-20 w-full max-w-5xl px-6 sm:px-16 lg:px-28 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl font-display font-bold mb-8 drop-shadow-lg">
              Apa itu <br/><span className="text-amber-400">Safety Riding?</span>
            </h2>
            <div className="max-w-2xl text-lg sm:text-xl text-white/90 leading-relaxed font-sans space-y-4 text-justify drop-shadow-md">
              <p>Keselamatan berkendara bukan sekadar mematuhi aturan demi menghindari tilang. Ini adalah pola pikir dan perilaku proaktif untuk melindungi semua pengguna jalan.</p>
              <p>Seorang pengendara yang aman selalu mengantisipasi potensi bahaya, memahami kapasitas kendaraannya, dan menempatkan keselamatan bersama sebagai prioritas utama di atas segalanya.</p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: 8 FAKTOR ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-center overflow-hidden shrink-0">
          <img 
            key={safetyFactors[currentFactor].id}
            className="absolute inset-0 w-full h-full object-cover z-0 animate-fade-in" 
            alt={safetyFactors[currentFactor].name} 
            src={safetyFactors[currentFactor].image} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b3848] via-[#0b3848]/80 to-[#0b3848]/40 z-10"></div>

          <button onClick={prevFactor} className="absolute left-4 sm:left-12 z-30 p-4 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 sm:w-12 sm:h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>

          <div className="relative z-20 w-full max-w-5xl mx-auto px-16 sm:px-24 flex flex-col items-center text-center mt-20 sm:mt-32">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold tracking-widest uppercase">
              Faktor {currentFactor + 1} dari {safetyFactors.length}
            </div>
            <h3 className="text-4xl sm:text-6xl font-display font-bold mb-6 drop-shadow-lg">{safetyFactors[currentFactor].name}</h3>
            <p className="text-lg sm:text-2xl text-white/90 font-sans max-w-3xl leading-relaxed drop-shadow-md">{safetyFactors[currentFactor].description}</p>
          </div>

          <button onClick={nextFactor} className="absolute right-4 sm:right-12 z-30 p-4 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 sm:w-12 sm:h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>

          <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center space-x-3">
            {safetyFactors.map((_, index) => (
              <button key={index} onClick={() => setCurrentFactor(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentFactor === index ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white'}`} />
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: TIPS BERKENDARA ================= */}
        <section className="h-screen w-full snap-start snap-always relative flex flex-col items-center justify-center px-6 py-12 bg-[#082833] shrink-0">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Tips Berkendara</h2>
            <p className="text-lg text-white/70">Terapkan 3 fase ini agar selamat sampai tujuan.</p>
          </div>

          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {tipsData.map((tips, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors backdrop-blur-sm flex flex-col">
                <div className="text-4xl mb-4">{tips.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4">{tips.title}</h3>
                <ul className="space-y-3 text-white/80 font-sans text-sm sm:text-base flex-grow">
                  {tips.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start">
                      <span className="mr-3 text-amber-400 font-bold">-</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 5: QUIZ & FOOTER ================= */}
        {/* Section 5 dibungkus overflow-y-auto agar Footer bisa digulir tanpa error */}
        <section className="h-screen w-full snap-start snap-always overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth bg-[#0b3848] relative">
          <div className="flex flex-col w-full min-h-screen relative">
            
            {/* --- QUIZ AREA --- */}
            <div className="h-screen w-full relative flex flex-col items-center justify-center px-4 shrink-0 bg-[#051e27]">
              
              <div className="text-center mb-8">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">Quiz Berkendara</h2>
                <p className="text-white/60 mt-2">Uji pemahaman Anda! Jawab 10 pertanyaan ini.</p>
              </div>

              <div className="w-full max-w-3xl bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-2xl">
                {!showResult ? (
                  <div className="animate-fade-in">
                    <div className="flex justify-between text-amber-400 text-sm font-bold mb-6 uppercase tracking-wider">
                      <span>Pertanyaan {currentQ + 1} / 10</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-relaxed">
                      {quizQuestions[currentQ].q}
                    </h3>
                    <div className="flex flex-col space-y-4">
                      {quizQuestions[currentQ].options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left px-6 py-4 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-900 border border-white/10 transition-all font-sans text-white font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center animate-fade-in py-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Hasil Evaluasi Anda</h3>
                    <div className="text-6xl font-display font-bold mb-6">
                      {score} <span className="text-3xl text-white/50">/ 10</span>
                    </div>
                    
                    {/* Logika Label Aman / Tidak Aman */}
                    {score > 5 ? (
                      <div className="inline-block px-8 py-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 text-xl font-bold mb-8">
                        ✅ STATUS: AMAN
                      </div>
                    ) : (
                      <div className="inline-block px-8 py-3 rounded-full bg-red-500/20 text-red-400 border border-red-500 text-xl font-bold mb-8">
                        ⚠️ STATUS: TIDAK AMAN
                      </div>
                    )}
                    
                    <p className="text-white/70 mb-8 max-w-md mx-auto">
                      {score > 5 
                        ? "Luar biasa! Pemahaman Anda tentang keselamatan berkendara sangat baik. Pertahankan saat di jalan raya." 
                        : "Pemahaman Anda masih kurang. Jangan ragu untuk membaca kembali panduan di atas demi keselamatan bersama."}
                    </p>

                    <button onClick={resetQuiz} className="px-8 py-4 bg-amber-400 text-slate-900 rounded-full font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20">
                      Ulangi Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* --- THE FOOTER --- */}
            <footer className="w-full bg-black py-10 px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center md:items-start text-sm text-white/60 shrink-0 border-t border-white/10 relative z-40 gap-8">
              <div className="text-center md:text-left">
                <h4 className="font-bold text-lg text-amber-400">PANDUAN KESELAMATAN BERKENDARA</h4>
                <p className="mt-2 text-white/80">Dibuat oleh Dista Kinaura Putri Ariesta</p>
                <p className="mt-4 text-white/50">&copy; 2026 Panduan Keselamatan Berkendara</p>
              </div>
              <nav className="text-center md:text-left">
                <p className="font-bold text-white mb-3 tracking-wide">Terhubung dengan saya:</p>
                <div className="flex flex-col items-center md:items-start gap-2">
                  {socialMediaLinks.map((link) => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-amber-400 hover:translate-x-1 transform transition-all duration-300">
                      {link.name}
                    </a>
                  ))}
                </div>
              </nav>
            </footer>

          </div>
        </section>

      </div>
    </>
  );
};