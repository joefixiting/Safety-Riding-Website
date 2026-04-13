import React, { useState, useEffect } from "react";

// Import Gambar Anda di sini
import BackgroundHero from '../../assets/images/bg1.png';
import BackgroundDefinisi from '../../assets/images/bg2.png';
import MentalImage from '../../assets/images/bg3.png';
import KendaraanImage from '../../assets/images/bg4.png';
import GearImage from '../../assets/images/bg5.png';
import CuacaImage from '../../assets/images/bg6.png';
import LingkunganImage from '../../assets/images/bg7.png';
import AturanImage from '../../assets/images/bg8.png';
import KecepatanImage from '../../assets/images/bg9.png';
import JalanImage from '../../assets/images/bg10.png';

// Import Gambar Background Baru untuk Tips dan Quiz
import BgTips from '../../assets/images/bg11.png';
import BgQuiz from '../../assets/images/bg12.png';

// Import gambar khusus untuk media Pop-Up
import MediaAturan from '../../assets/images/aturan.png'; 
import MediaAPD from '../../assets/images/apd.png'; 

export const LandingPage = () => {
  // ================= STATE =================
  const [currentFactor, setCurrentFactor] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // ================= DATA FAKTOR (Background & Judul) =================
  const safetyFactors = [
    { id: 1, name: "Jenis Kelamin", image: MentalImage },
    { id: 2, name: "Pengetahuan", image: KendaraanImage },
    { id: 3, name: "Pengalaman Kecelakaan", image: GearImage },
    { id: 4, name: "Training Berkendara", image: CuacaImage },
    { id: 5, name: "Motivasi", image: LingkunganImage },
    { id: 6, name: "Penggunaan APD", image: AturanImage },
    { id: 7, name: "Kondisi Kendaraan", image: KecepatanImage },
    { id: 8, name: "Dukungan Keluarga", image: JalanImage },
  ];

  // Data Pembantu untuk Kondisi Kendaraan (Faktor 7)
  const kondisiKendaraan = [
    { title: "1. Alat Kendali", points: ["Rem: Berfungsi baik, tidak blong, dan pakem.", "Kopling: Tidak terlalu keras/longgar, perpindahan halus.", "Gas: Kembali otomatis saat dilepas (tidak nyangkut)."] },
    { title: "2. Ban", points: ["Tidak gundul (masih memiliki alur/tapak).", "Tekanan angin sesuai standar pabrikan.", "Tidak retak, benjol, atau bocor.", "Seimbang depan dan belakang."] },
    { title: "3. Lampu Sein", points: ["Semua lampu menyala normal.", "Kedipan stabil (tidak terlalu cepat/lambat).", "Warna lampu kuning tua standar."] },
    { title: "4. Klakson", points: ["Berfungsi dengan baik dan suara jelas.", "Tidak lemah atau mati sebagai peringatan."] },
    { title: "5. Spion", points: ["Wajib 2 spion (kiri dan kanan).", "Posisi pas untuk melihat kondisi belakang.", "Tidak retak atau buram."] },
    { title: "6. Bahan Bakar & Oli", points: ["BBM cukup untuk perjalanan.", "Oli cukup dan tidak kotor berlebihan.", "Tidak ada kebocoran pada mesin."] },
    { title: "7. Rantai", points: ["Tidak terlalu kendor/kencang.", "Terlumasi dengan baik.", "Tidak berisik berlebihan."] },
  ];

  // ================= DATA TIPS & QUIZ =================
  const tipsData = [
    { 
      title: "Sebelum Berkendara", icon: "🔍",
      points: ["Cek tekanan ban dan fungsi rem", "Pastikan lampu dan klakson menyala", "Gunakan helm SNI klik dengan benar", "Bawa surat-surat (SIM & STNK) lengkap", "Berdoa sebelum memulai perjalanan"] 
    },
    { 
      title: "Saat Berkendara", icon: "🛵",
      points: ["Jaga jarak aman dengan kendaraan lain", "Patuhi rambu dan lampu lalu lintas", "Gunakan lampu sein saat berbelok", "Fokus penuh, dilarang main ponsel", "Kendalikan emosi dan bersabar"] 
    },
    { 
      title: "Sesudah Berkendara", icon: "🛑",
      points: ["Parkir di tempat yang aman dan rata", "Pastikan mencabut kunci kontak", "Kunci ganda motor jika diperlukan", "Cek kembali barang bawaan Anda", "Istirahatkan mesin motor"] 
    }
  ];

  const quizQuestions = [
    { q: "Apa yang dimaksud dengan safety riding?", options: ["Cara mempercepat kendaraan", "Upaya meningkatkan keselamatan berkendara", "Cara menghemat bahan bakar"], answer: 1 },
    { q: "Tujuan utama safety riding adalah…", options: ["Menambah kecepatan berkendara", "Mencegah kecelakaan lalu lintas", "Mengurangi kemacetan"], answer: 1 },
    { q: "Siapa yang paling banyak terlibat kecelakaan menurut data?", options: ["Perempuan", "Laki-laki", "Anak-anak"], answer: 1 },
    { q: "Salah satu teknik berkendara aman adalah…", options: ["Menambah kecepatan terus", "Menjaga jarak aman", "Mengabaikan rambu"], answer: 1 },
    { q: "Mengapa penting memahami risiko di jalan?", options: ["Agar bisa ngebut", "Agar lebih waspada terhadap bahaya", "Agar cepat sampai"], answer: 1 },
    { q: "Pengalaman kecelakaan dapat membuat driver…", options: ["Lebih ceroboh", "Lebih berhati-hati", "Tidak peduli"], answer: 1 },
    { q: "Manfaat mengikuti training berkendara adalah…", options: ["Menambah risiko kecelakaan", "Mengurangi angka kecelakaan", "Membuat berkendara lebih cepat"], answer: 1 },
    { q: "Motivasi tinggi pada driver akan membuat…", options: ["Mengabaikan aturan", "Lebih disiplin dalam berkendara aman", "Berkendara sembarangan"], answer: 1 },
    { q: "Contoh APD saat berkendara adalah…", options: ["Helm dan sepatu", "Sandal dan topi", "Kacamata saja"], answer: 0 },
    { q: "Dukungan keluarga dalam safety riding berupa…", options: ["Membiarkan berkendara bebas", "Mengingatkan untuk berkendara aman", "Menyuruh ngebut"], answer: 1 },
  ];

  const socialMediaLinks = [
    { name: "Whatsapp", href: "https://wa.me/6285875203185" },
    { name: "Email", href: "mailto:distakinaura.osh25@gmail.com" },
  ];

  // ================= FUNGSI HANDLER =================
  const nextFactor = () => setCurrentFactor((prev) => (prev === safetyFactors.length - 1 ? 0 : prev + 1));
  const prevFactor = () => setCurrentFactor((prev) => (prev === 0 ? safetyFactors.length - 1 : prev - 1));

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[currentQ].answer) setScore(score + 1);
    if (currentQ < quizQuestions.length - 1) setCurrentQ(currentQ + 1);
    else setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

// ================= RENDER KONTEN FAKTOR DINAMIS =================
  const renderFactorContent = () => {
    switch(currentFactor) {
      case 0:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Menurut data Pusat Informasi Kriminal Nasional (Pusiknas Bareskim Polri) 2025, jumlah kecelakaan lalu lintas di Indonesia saat ini mencapai 65.355 dimana jumlah pengemudi yang menggunakan sepeda motor mencapai 665.709 dari 872.135 pengemudi atau dapat dikatakan bahwa sepeda motor menjadi penyumbang tertinggi dari angka kecelakaan lalu lintas. Dari total pengemudi tersebut, 75% merupakan laki-laki dan 19% merupakan perempuan. Hal ini menunjukkan bahwa laki-laki menunjukkan kecenderungan lebih tinggi untuk terlibat dalam kecelakaan lalu lintas apabila dibandingkan dengan perempuan.
          </p>
        );
      case 1:
        return (
          <div className="relative w-full flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 w-full text-left mt-4 max-h-[55vh] md:max-h-[60vh] overflow-y-auto hide-scrollbar pb-4 px-2">
              <div className="bg-black/50 border border-white/20 p-5 sm:p-8 rounded-2xl hover:bg-black/70 backdrop-blur-md transition cursor-pointer flex flex-col shadow-xl" onClick={() => setModalImage(MediaAturan)}>
                <h4 className="font-bold text-amber-400 text-base sm:text-xl mb-4 sm:mb-6">1. Aturan Lalu Lintas</h4>
                <div className="relative w-full h-32 sm:h-48 overflow-hidden rounded-xl bg-black/50 group">
                  <img src={MediaAturan} alt="Aturan Lalu Lintas" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/60 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-white font-bold tracking-wide">🔍 Klik Perbesar</span>
                  </div>
                </div>
              </div>
              <div className="bg-black/50 border border-white/20 p-5 sm:p-8 rounded-2xl backdrop-blur-md shadow-xl">
                <h4 className="font-bold text-amber-400 text-base sm:text-xl mb-4 sm:mb-6">2. Teknik Berkendara Aman</h4>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-lg text-white/90">
                  <p>- Mengatur kecepatan sesuai kondisi jalan</p>
                  <p>- Menjaga jarak aman</p>
                  <p>- Fokus dan waspada saat berkendara</p>
                  <p>- Berkendara secara defensif untuk mengantisipasi kesalahan dari pengendara lain</p>
                </div>
              </div>
              <div className="bg-black/50 border border-white/20 p-5 sm:p-8 rounded-2xl backdrop-blur-md shadow-xl">
                <h4 className="font-bold text-amber-400 text-base sm:text-xl mb-4 sm:mb-6">3. Risiko dan Bahaya</h4>
                <p className="text-xs sm:text-lg text-white/90 text-justify leading-relaxed">
                  Driver perlu memahami berbagai potensi bahaya, seperti jalan berlubang, kendaraan lain yang tidak tertib, serta kondisi cuaca. Dengan mengetahui risiko tersebut, driver dapat lebih waspada dan mengantisipasi kemungkinan terjadinya kecelakaan.
                </p>
              </div>
            </div>
            {/* Indikator scroll kotak khusus di HP */}
            <div className="flex md:hidden flex-col items-center justify-center text-white/70 text-[10px] animate-bounce pointer-events-none mt-2">
              <span>Geser kotak ke bawah</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mt-0.5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </div>
        );
      case 2:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Dalam konteks keselamatan berkendara, pengalaman kecelakaan menjadi salah satu sumber pembelajaran yang penting bagi seorang pengemudi. Pengalaman tersebut dapat menimbulkan kesadaran dan pemahaman baru tentang risiko di jalan serta pentingnya mematuhi aturan keselamatan. Pengemudi yang pernah mengalami kecelakaan cenderung memiliki tingkat kehati-hatian lebih tinggi dan memperhatikan faktor keselamatan dalam berkendara.
          </p>
        );
      case 3:
        return (
          <div className="text-left font-sans text-white/90 drop-shadow-md space-y-4 sm:space-y-6">
            <p className="text-base sm:text-xl lg:text-2xl text-justify leading-relaxed">Salah satu upaya yang dilakukan untuk meningkatkan awareness pengemudi yaitu dengan mengikuti pelatihan atau training berkendara aman. Manfaat dari mengikuti training berkendara aman yaitu:</p>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg lg:text-xl leading-relaxed">
              <p>1. Menekan angka kecelakaan. Apabila angka kecelakaan berkurang, maka produktivitas dapat tetap tinggi karena tidak ada waktu kerja yang hilang akibat kecelakaan.</p>
              <p>2. Mengurangi pengeluaran untuk biaya pemulihan dan perawatan. Sehingga training berkendara aman perlu untuk diikuti oleh pengemudi untuk tercipta perilaku berkendara yang aman dan selamat.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Motivasi merupakan dorongan dari dalam diri seseorang yang memengaruhi sikap dan perilaku dalam berkendara. Dalam konteks safety riding, motivasi berperan penting dalam menentukan sejauh mana driver memiliki keinginan untuk berkendara secara aman dan mematuhi aturan lalu lintas. Driver dengan motivasi tinggi cenderung lebih disiplin, didasari kesadaran pentingnya keselamatan diri dan tanggung jawab terhadap penumpang. Sebaliknya, motivasi rendah dapat menyebabkan pengabaian keselamatan.
          </p>
        );
      case 5:
        return (
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md mb-6 sm:mb-8">
              Alat Pelindung Diri atau APD ketika berkendara adalah alat wajib yang digunakan untuk meminimalisir cedera saat kecelakaan dan menghindari tindak pidana hukum pada saat berkendara di jalan raya. Berikut merupakan APD ketika berkendara:
            </p>
            <div className="relative w-56 h-36 sm:w-[28rem] sm:h-[18rem] overflow-hidden rounded-2xl cursor-pointer border-2 border-white/20 hover:border-amber-400 group shadow-2xl" onClick={() => setModalImage(MediaAPD)}>
              <img src={MediaAPD} alt="APD Berkendara" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="bg-amber-400 text-slate-900 font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base">Klik untuk Detail</span>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="w-full text-left flex flex-col items-center">
            <p className="text-xs sm:text-lg text-white/80 mb-4 sm:mb-6 text-center px-4 w-full">Sesuai dengan UU No. 22 Tahun 2009 dan PP No. 55 Tahun 2012 tentang Kendaraan.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-h-[45vh] sm:max-h-[55vh] overflow-y-auto hide-scrollbar pb-4 px-1 sm:px-2 w-full">
              {kondisiKendaraan.map((item, idx) => (
                <div key={idx} className="bg-black/50 border border-white/20 p-4 sm:p-6 rounded-2xl w-full sm:w-[46%] lg:w-[30%] backdrop-blur-md shadow-xl">
                  <h4 className="font-bold text-amber-400 text-sm sm:text-lg mb-2 sm:mb-4">{item.title}</h4>
                  <div className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm text-white/90">
                    {item.points.map((pt, i) => (
                      <p key={i}>- {pt}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Indikator scroll kotak khusus di HP */}
            <div className="flex md:hidden flex-col items-center justify-center text-white/70 text-[10px] animate-bounce pointer-events-none mt-3">
              <span>Geser kotak ke bawah</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mt-0.5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </div>
        );
      case 7:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Dukungan keluarga merupakan salah satu faktor eksternal yang dapat memengaruhi perilaku seseorang dalam berkendara. Dukungan ini dapat berupa perhatian, pengawasan, serta pengingat untuk selalu mengutamakan keselamatan. Adanya dukungan keluarga meningkatkan kesadaran dan rasa tanggung jawab driver, karena merasa diperhatikan. Kurangnya dukungan dapat membuat individu mengabaikan aspek keselamatan. Oleh karena itu, peran keluarga sangat penting dalam membentuk perilaku berkendara yang aman.
          </p>
        );
      default:
        return null;
    }
  };

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

      {/* ================= MODAL GAMBAR ================= */}
      {modalImage && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setModalImage(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-red-500 rounded-full p-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={modalImage} alt="Preview Detail" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/20 cursor-default" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Kontainer Utama */}
      <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-y-auto overflow-x-hidden hide-scrollbar snap-y snap-mandatory bg-[#0b3848] text-white scroll-smooth">

        {/* ================= SECTION 1: HERO ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-start overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center z-0" alt="Hero Safety Riding" src={BackgroundHero} />
          <div className="absolute inset-0 bg-[#0b3848]/30 z-10"></div>
          <div className="relative z-20 text-left px-6 sm:px-16 lg:px-28 max-w-5xl flex flex-col items-start w-full">
            <div className="absolute inset-x-0 -top-8 -bottom-8 bg-[#0b3848] opacity-20 rounded-r-full blur-2xl -ml-10"></div>
            <h1 className="relative text-4xl sm:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              Pandan <br/> Keselamatan <br/> Berkendara
            </h1>
            <p className="relative text-base sm:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
              Jadilah pahlawan di jalan raya. Lindungi dirimu, hormati sesama, dan pahami ilmunya.
            </p>
            <div className="relative mt-8 sm:mt-12 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              Scroll ke bawah
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: DEFINISI ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-start overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center z-0" alt="Definisi Background" src={BackgroundDefinisi} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3848] via-[#0b3848]/80 to-transparent z-10"></div>
          <div className="relative z-20 w-full max-w-5xl px-6 sm:px-16 lg:px-28 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-6xl font-display font-bold mb-4 sm:mb-8 drop-shadow-lg">
              Apa itu <br/><span className="text-amber-400">Safety Riding?</span>
            </h2>
            <div className="max-w-2xl text-base sm:text-xl text-white/90 leading-relaxed font-sans space-y-3 sm:space-y-4 text-justify drop-shadow-md">
              <p>Safety riding merupakan upaya pencegahan yang dilakukan guna menekan tingkat bahaya serta meningkatkan keamanan ketika berkendara sehingga tercipta suatu kondisi yang aman.</p>
              <p>Safety riding berperan dalam mencegah terjadinya kecelakaan lalu lintas serta melindungi keselamatan pengendara, penumpang, dan pengguna jalan lainnya.</p>
              <p>Dengan menerapkan perilaku berkendara yang aman, seperti mematuhi aturan lalu lintas, menjaga kecepatan, serta menggunakan alat pelindung diri, pengendara dapat mengurangi risiko terjadinya kecelakaan maupun meminimalkan tingkat keparahan cedera apabila kecelakaan terjadi.</p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: 8 FAKTOR ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex items-center justify-center overflow-hidden shrink-0">
          <img 
            key={safetyFactors[currentFactor].id}
            className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center z-0 animate-fade-in" 
            alt={safetyFactors[currentFactor].name} 
            src={safetyFactors[currentFactor].image} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b3848] via-[#0b3848]/80 to-[#0b3848]/50 z-10"></div>

          <button onClick={prevFactor} className="absolute left-2 sm:left-6 z-30 p-2 sm:p-5 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 sm:w-12 sm:h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>

          <div className="relative z-20 w-full max-w-7xl mx-auto px-10 sm:px-16 flex flex-col items-center text-center mt-6 sm:mt-12">
            <div className="inline-block px-4 sm:px-5 py-1 sm:py-2 mb-4 sm:mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-base font-semibold tracking-widest uppercase shadow-md">
              Faktor {currentFactor + 1} dari {safetyFactors.length}
            </div>
            
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-8 drop-shadow-xl text-amber-400">{safetyFactors[currentFactor].name}</h3>
            
            <div className="w-full">
              {renderFactorContent()}
            </div>
          </div>

          <button onClick={nextFactor} className="absolute right-2 sm:right-6 z-30 p-2 sm:p-5 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 sm:w-12 sm:h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>

          {/* Indikator scroll global dihapus dari sini */}

          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex justify-center space-x-2 sm:space-x-4">
            {safetyFactors.map((_, index) => (
              <button key={index} onClick={() => setCurrentFactor(index)} className={`h-2 sm:h-4 rounded-full transition-all duration-300 ${currentFactor === index ? 'bg-amber-400 w-6 sm:w-12' : 'bg-white/50 hover:bg-white w-2 sm:w-4'}`} />
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: TIPS BERKENDARA ================= */}
        <section className="h-screen w-full snap-start snap-always relative isolate flex flex-col items-center justify-center px-6 py-8 overflow-hidden shrink-0">
          <img className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center z-0" alt="Tips Background" src={BgTips} />
          <div className="absolute inset-0 bg-[#082833]/80 z-10"></div>

          <div className="relative z-20 text-center mb-6 md:mb-16">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">Tips Berkendara</h2>
            <p className="text-base sm:text-lg text-white/70">Terapkan 3 fase ini agar selamat sampai tujuan.</p>
          </div>
          
          <div className="relative z-20 w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-h-[65vh] md:max-h-[70vh] overflow-y-auto hide-scrollbar pb-10 md:pb-4">
            {tipsData.map((tips, idx) => (
              <div key={idx} className="bg-black/40 border border-white/20 rounded-2xl p-5 sm:p-8 hover:bg-black/60 transition-colors backdrop-blur-md flex flex-col shadow-xl">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{tips.icon}</div>
                <h3 className="text-lg sm:text-2xl font-bold text-amber-400 mb-2 sm:mb-4">{tips.title}</h3>
                <div className="space-y-2 sm:space-y-3 text-white/90 font-sans text-xs sm:text-base flex-grow">
                  {tips.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start">
                      <span className="mr-2 sm:mr-3 text-amber-400 font-bold">-</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* === INDIKATOR SCROLL KOTAK (HANYA MUNCUL DI HP) === */}
          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-30 flex md:hidden flex-col items-center justify-center text-white/70 text-[10px] animate-bounce pointer-events-none">
            <span>Geser kotak ke bawah</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mt-1 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </section>

        {/* ================= SECTION 5: QUIZ & FOOTER ================= */}
        <section className="h-screen w-full snap-start snap-always overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth relative">
          <div className="flex flex-col w-full min-h-screen relative isolate">
            
            <img className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center z-0 fixed" alt="Quiz Background" src={BgQuiz} />
            <div className="absolute inset-0 bg-[#051e27]/80 z-10 fixed"></div>

            {/* --- QUIZ AREA --- */}
            <div className="h-screen w-full relative flex flex-col items-center justify-center px-4 shrink-0 z-20">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white drop-shadow-lg">Quiz Berkendara</h2>
                <p className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-lg">Yuk kita cek apakah kalian sudah cukup memahami isi dari website ini!</p>
              </div>

              <div className="w-full max-w-3xl bg-black/50 border border-white/20 backdrop-blur-xl rounded-3xl p-5 sm:p-12 shadow-2xl">
                {!showResult ? (
                  <div className="animate-fade-in">
                    <div className="flex justify-between text-amber-400 text-xs sm:text-sm font-bold mb-4 sm:mb-6 uppercase tracking-wider">
                      <span>Pertanyaan {currentQ + 1} / 10</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-6 sm:mb-8 leading-relaxed">
                      {quizQuestions[currentQ].q}
                    </h3>
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      {quizQuestions[currentQ].options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-900 border border-white/10 transition-all font-sans text-sm sm:text-base text-white font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center animate-fade-in py-6 sm:py-8">
                    <h3 className="text-xl sm:text-3xl font-bold text-white mb-4">Hasil Evaluasi Anda</h3>
                    <div className="text-5xl sm:text-6xl font-display font-bold mb-6">
                      {score} <span className="text-2xl sm:text-3xl text-white/50">/ 10</span>
                    </div>
                    
                    {score > 5 ? (
                      <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 text-base sm:text-xl font-bold mb-6 sm:mb-8">
                        ✅ STATUS: AMAN
                      </div>
                    ) : (
                      <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-red-500/20 text-red-400 border border-red-500 text-base sm:text-xl font-bold mb-6 sm:mb-8">
                        ⚠️ STATUS: TIDAK AMAN
                      </div>
                    )}
                    
                    <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 max-w-md mx-auto">
                      {score > 5 
                        ? "Luar biasa! Pemahaman Anda tentang keselamatan berkendara sangat baik. Pertahankan saat di jalan raya." 
                        : "Pemahaman Anda masih kurang. Jangan ragu untuk membaca kembali panduan di atas demi keselamatan bersama."}
                    </p>

                    <button onClick={resetQuiz} className="px-6 py-3 sm:px-8 sm:py-4 bg-amber-400 text-slate-900 rounded-full font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 text-sm sm:text-base">
                      Ulangi Quiz
                    </button>
                  </div>
                )}
              </div>

              {/* === INDIKATOR SCROLL INFO DI BAWAH QUIZ === */}
              <div className="absolute bottom-4 left-0 right-0 z-30 flex flex-col items-center justify-center text-white/60 text-[10px] sm:text-sm animate-bounce cursor-default">
                <span>Scroll ke bawah untuk info</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </div>

            </div>

            {/* --- THE FOOTER --- */}
            <footer className="w-full bg-black/80 backdrop-blur-md py-8 px-6 sm:py-10 sm:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center md:items-start text-xs sm:text-sm text-white/60 shrink-0 border-t border-white/10 relative z-40 gap-6 sm:gap-8">
              <div className="text-center md:text-left">
                <h4 className="font-bold text-base sm:text-lg text-amber-400">PANDUAN KESELAMATAN BERKENDARA</h4>
                <p className="mt-1 sm:mt-2 text-white/80">Dibuat oleh Dista Kinaura Putri Ariesta</p>
                <p className="mt-2 sm:mt-4 text-white/50">&copy; 2026 Panduan Keselamatan Berkendara</p>
              </div>
              <nav className="text-center md:text-left">
                <p className="font-bold text-white mb-2 sm:mb-3 tracking-wide">Terhubung dengan saya:</p>
                <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2">
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