import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

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

  // STATE untuk melacak apakah user sudah pernah menggeser slider
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // STATE UNTUK KUIS & SERTIFIKAT
  const [userName, setUserName] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  // ================= DATA FAKTOR (Background & Judul) =================
  // Menambahkan slide intro di urutan pertama (id: 0)
  const safetyFactors = [
    { id: 0, name: "Faktor-Faktor yang Berhubungan dengan Perilaku Safety Riding", image: BackgroundDefinisi, isIntro: true },
    { id: 1, name: "Jenis Kelamin", image: MentalImage },
    { id: 2, name: "Pengetahuan", image: KendaraanImage },
    { id: 3, name: "Pengalaman Kecelakaan", image: GearImage },
    { id: 4, name: "Training Berkendara", image: CuacaImage },
    { id: 5, name: "Motivasi", image: LingkunganImage },
    { id: 6, name: "Penggunaan APD", image: AturanImage },
    { id: 7, name: "Kondisi Kendaraan", image: KecepatanImage },
    { id: 8, name: "Dukungan Keluarga", image: JalanImage },
  ];

  // Data Pembantu untuk Kondisi Kendaraan
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
    { 
      q: "Saat sedang mengantar penumpang, Anda melihat rambu berbentuk lingkaran biru dengan gambar panah putih yang menunjuk ke arah kiri (Rambu Perintah Mengikuti Arah Kiri). Apa yang harus Anda lakukan sebagai driver yang patuh aturan? ", 
      options: [
        "Segera berbelok ke kanan jika merasa jalan di kiri sedang macet.", 
        "Boleh lurus terus asalkan tidak ada petugas kepolisian yang berjaga.", 
        "Wajib mengikuti lajur ke arah kiri sesuai instruksi rambu demi ketertiban dan keselamatan bersama. ", 
        "Berhenti sejenak di bawah rambu tersebut untuk menunggu penumpang lain. ", 
        "Menyalakan lampu hazard dan tetap melaju lurus dengan kecepatan tinggi."
      ], 
      answer: 2
    },
    { 
      q: "Menurut standar kelayakan kendaraan, jika lampu sein (rating) motor berkedip lebih cepat dari biasanya atau tidak menyala sama sekali, hal ini melanggar standar keselamatan karena...", 
      options: [
        "Warna lampu sein boleh diganti menjadi putih atau biru asalkan terang.", 
        "Lampu sein yang berkedip cepat menandakan aki dalam kondisi sangat baik.", 
        "Hanya wajib menggunakan lampu sein saat malam hari.", 
        "Lampu sein wajib berkedip stabil dan berwarna kuning tua sebagai alat komunikasi utama dengan pengendara lain.", 
        "Kedipan lampu sein tidak berpengaruh selama klakson berfungsi."
      ], 
      answer: 3 
    },
    { 
      q: "Seorang driver antar jemput bernama Budi merasa enggan memakai helm saat menjemput penumpang di area perumahan karena jaraknya dekat. Namun, setelah ditegur oleh penumpangnya dan mengingat keselamatan dirinya, Budi akhirnya memakai helm. Faktor apa yang sedang memengaruhi Budi?", 
      options: [
        "Pengalaman Kecelakaan", 
        "Faktor Jenis Kelamin", 
        "Dukungan Keluarga secara langsung", 
        "Training Berkendara", 
        "Motivasi internal yang sebelumnya rendah, namun meningkat karena kesadaran akan tanggung jawab terhadap keselamatan."
      ], 
      answer: 4 
    },
    { 
      q: "Anda akan melakukan perjalanan panjang mengantar penumpang di siang hari. Berdasarkan materi, selain helm SNI dan membawa jas hujan, pakaian pelindung apa yang wajib digunakan dan mengapa?", 
      options: [
        "Memakai kaus tipis agar tidak kepanasan.", 
        "Memakai sandal jepit agar kaki lebih leluasa saat harus mengerem mendadak.", 
        "Memakai jaket tebal tertutup untuk melindungi tubuh dari gesekan dan cuaca, serta sepatu yang menutupi kaki untuk melindungi dari benturan jalan.", 
        "Hanya memakai helm saja sudah cukup karena memenuhi aturan hukum dasar.", 
        "Memakai seragam bebas asalkan membawa alat perkakas darurat."
      ], 
      answer: 2 
    },
    { 
      q: "Mengapa pengalaman kecelakaan di masa lalu dapat memengaruhi tingkat keselamatan berkendara seorang driver saat ini?", 
      options: [
        "Karena pengalaman tersebut dapat menimbulkan kesadaran dan pemahaman baru tentang risiko di jalan, sehingga driver cenderung memiliki kehati-hatian yang lebih tinggi.", 
        "Karena driver tersebut akan dilarang mengemudi lagi selamanya.", 
        "Karena driver akan menjadi lebih agresif di jalan raya untuk menebus kesalahan sebelumnya.", 
        "Karena pihak asuransi akan memantau driver tersebut setiap hari.", 
        "Karena driver tersebut otomatis akan selalu menghindari jalan raya besar."
      ], 
      answer: 0 
    },
    { 
      q: "Saat melakukan pengecekan motor sebelum bekerja, Anda menemukan bahwa alur ban depan sudah gundul dan rantai motor mengeluarkan suara berisik yang berlebihan. Apa tindakan yang harus dilakukan?", 
      options: [
        "Menambahkan oli ke dalam mesin agar suara berisik rantai hilang.", 
        "Tetap bekerja karena ban gundul justru membuat laju motor lebih cepat di jalan aspal kering.", 
        "Mengabaikannya asalkan rem dan lampu sein masih berfungsi normal.", 
        "Cukup membawa alat perkakas darurat di jok motor tanpa harus memperbaiki komponen.", 
        "Menunda pekerjaan dan segera mengganti ban yang tidak botak serta melumasi/menyetel tegangan rantai agar tidak membahayakan keselamatan."
      ], 
      answer: 4 
    },
    { 
      q: "Selain APD fisik, ada kelengkapan administratif (persuratan) yang sifatnya wajib dibawa saat berkendara sebagai bukti legalitas pengendara. Kelengkapan tersebut adalah...", 
      options: [
        "Kartu Tanda Penduduk (KTP) dan Kartu Keluarga (KK).", 
        "Surat Izin Mengemudi (SIM) dan Surat Tanda Nomor Kendaraan (STNK).", 
        "Surat Izin Mengemudi (SIM) dan Bukti Pembayaran Asuransi.", 
        "Surat Keterangan Catatan Kepolisian (SKCK).", 
        "Sertifikat Training Berkendara Aman."
      ], 
      answer: 1 
    },
    { 
      q: "Andi adalah seorang driver yang selalu ditelepon oleh ibunya setiap pagi untuk mengingatkan agar ia tidak mengebut dan selalu memakai helm pelindung. Secara bertahap, Andi menjadi driver yang sangat tertib. Bagaimana dukungan keluarga membentuk perilaku ini?", 
      options: [
        "Keluarga memaksa Andi dengan ancaman hukuman finansial.", 
        "Keluarga mendaftarkan Andi ke sekolah balap motor resmi.", 
        "Dukungan keluarga memberikan perhatian dan pengawasan yang meningkatkan kesadaran serta rasa tanggung jawab Andi untuk selalu mengutamakan keselamatan.", 
        "Dukungan keluarga membuat Andi merasa terlalu diawasi sehingga ia tidak fokus bekerja.", 
        "Keluarga menjamin bahwa Andi tidak akan pernah mengalami kecelakaan."
      ], 
      answer: 2 
    },
    { 
      q: "Apa tujuan utama bagi seorang driver untuk memahami dan memiliki pengetahuan mengenai berbagai risiko bahaya di jalan (seperti jalan berlubang, cuaca, atau pengendara tidak tertib)?", 
      options: [
        "Agar driver bisa menuntut pihak pemerintah jika terjadi kerusakan jalan.", 
        "Agar driver dapat berkendara secara lebih cepat tanpa ragu.", 
        "Agar driver bisa memilih orderan hanya di jalan yang mulus dan lurus.", 
        "Agar driver menjadi lebih waspada, bisa berkendara secara defensif, dan mampu mengantisipasi kemungkinan terjadinya kecelakaan.", 
        "Agar driver bisa memarahi pengendara lain yang melakukan kesalahan."
      ], 
      answer: 3 
    },
    { 
      q: "Saat mengendarai motor berjenis manual, Anda merasakan bahwa putaran gas (throttle) tidak kembali otomatis saat dilepas (tersangkut) dan tuas rem terasa sangat keras. Apa dampaknya jika hal ini tidak segera ditangani?", 
      options: [
        "Motor akan menjadi lebih irit bensin karena putaran gas tertahan.", 
        "Hal ini sangat berbahaya karena motor bisa melaju tidak terkendali (gas nyangkut) dan rem yang keras/tidak pakem akan menyebabkan gagal berhenti saat darurat.", 
        "Kecepatan motor menjadi lebih stabil saat berada di jalan tol.", 
        "Tidak berdampak besar asalkan pengemudi pandai memainkan tuas kopling.", 
        "Menandakan bahwa tali gas dan kanvas rem dalam kondisi baru dan masih kaku."
      ], 
      answer: 1 
    }
  ];

  const socialMediaLinks = [
    { name: "Whatsapp", href: "https://wa.me/6285875203185" },
    { name: "Email", href: "mailto:distakinaura.osh25@gmail.com" },
  ];

  // ================= FUNGSI HANDLER =================
  const nextFactor = () => {
    setHasInteracted(true);
    setCurrentFactor((prev) => (prev === safetyFactors.length - 1 ? 0 : prev + 1));
  };
  
  const prevFactor = () => {
    setHasInteracted(true);
    setCurrentFactor((prev) => (prev === 0 ? safetyFactors.length - 1 : prev - 1));
  };

  const startQuiz = (e) => {
    e.preventDefault();
    if (userName.trim().length > 2) {
      setIsQuizStarted(true);
    }
  };

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[currentQ].answer) setScore(score + 1);
    
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

  const generateCertificate = () => {
    setIsGeneratingCert(true);
    
    setTimeout(() => {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      doc.setDrawColor(251, 191, 36); 
      doc.setLineWidth(5);
      doc.rect(10, 10, 277, 190);
      doc.setDrawColor(11, 56, 72); 
      doc.setLineWidth(1);
      doc.rect(15, 15, 267, 180);

      doc.setTextColor(11, 56, 72);
      doc.setFontSize(40);
      doc.setFont("helvetica", "bold");
      doc.text("SERTIFIKAT KELULUSAN", 148, 60, { align: "center" });

      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.text("Diberikan dengan bangga kepada:", 148, 85, { align: "center" });

      doc.setTextColor(251, 191, 36); 
      doc.setFontSize(36);
      doc.setFont("helvetica", "bolditalic");
      doc.text(userName.toUpperCase(), 148, 110, { align: "center" });

      doc.setDrawColor(200, 200, 200);
      doc.line(70, 115, 227, 115);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      const text = `Telah berhasil menyelesaikan dan meraih nilai sempurna (10/10) \npada Evaluasi Panduan Keselamatan Berkendara (Safety Riding). \nSemoga selalu menjadi pelopor keselamatan di jalan raya.`;
      doc.text(text, 148, 135, { align: "center" });

      const today = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
      doc.setFontSize(12);
      doc.text(`Tanggal Lulus: ${today}`, 148, 175, { align: "center" });

      doc.save(`Sertifikat_SafetyRiding_${userName.replace(/\s+/g, '_')}.pdf`);
      setIsGeneratingCert(false);
    }, 1000); 
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
        // Slide 1 adalah Intro, tidak ada konten tambahan
        return null;
      case 1:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Menurut data Pusat Informasi Kriminal Nasional (Pusiknas Bareskim Polri) 2025, jumlah kecelakaan lalu lintas di Indonesia saat ini mencapai 65.355 dimana jumlah pengemudi yang menggunakan sepeda motor mencapai 665.709 dari 872.135 pengemudi atau dapat dikatakan bahwa sepeda motor menjadi penyumbang tertinggi dari angka kecelakaan lalu lintas. Dari total pengemudi tersebut, 75% merupakan laki-laki dan 19% merupakan perempuan. Hal ini menunjukkan bahwa laki-laki menunjukkan kecenderungan lebih tinggi untuk terlibat dalam kecelakaan lalu lintas apabila dibandingkan dengan perempuan.
          </p>
        );
      case 2:
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
      case 3:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Dalam konteks keselamatan berkendara, pengalaman kecelakaan menjadi salah satu sumber pembelajaran yang penting bagi seorang pengemudi. Pengalaman tersebut dapat menimbulkan kesadaran dan pemahaman baru tentang risiko di jalan serta pentingnya mematuhi aturan keselamatan. Pengemudi yang pernah mengalami kecelakaan cenderung memiliki tingkat kehati-hatian lebih tinggi dan memperhatikan faktor keselamatan dalam berkendara.
          </p>
        );
      case 4:
        return (
          <div className="text-left font-sans text-white/90 drop-shadow-md space-y-4 sm:space-y-6">
            <p className="text-base sm:text-xl lg:text-2xl text-justify leading-relaxed">Salah satu upaya yang dilakukan untuk meningkatkan awareness pengemudi yaitu dengan mengikuti pelatihan atau training berkendara aman. Manfaat dari mengikuti training berkendara aman yaitu:</p>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg lg:text-xl leading-relaxed">
              <p>1. Menekan angka kecelakaan. Apabila angka kecelakaan berkurang, maka produktivitas dapat tetap tinggi karena tidak ada waktu kerja yang hilang akibat kecelakaan.</p>
              <p>2. Mengurangi pengeluaran untuk biaya pemulihan dan perawatan. Sehingga training berkendara aman perlu untuk diikuti oleh pengemudi untuk tercipta perilaku berkendara yang aman dan selamat.</p>
            </div>
          </div>
        );
      case 5:
        return (
          <p className="text-base sm:text-xl lg:text-2xl text-white/90 font-sans leading-relaxed text-justify drop-shadow-md">
            Motivasi merupakan dorongan dari dalam diri seseorang yang memengaruhi sikap dan perilaku dalam berkendara. Dalam konteks safety riding, motivasi berperan penting dalam menentukan sejauh mana driver memiliki keinginan untuk berkendara secara aman dan mematuhi aturan lalu lintas. Driver dengan motivasi tinggi cenderung lebih disiplin, didasari kesadaran pentingnya keselamatan diri dan tanggung jawab terhadap penumpang. Sebaliknya, motivasi rendah dapat menyebabkan pengabaian keselamatan.
          </p>
        );
      case 6:
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
      case 7:
        return (
          <div className="w-full text-left flex flex-col items-center">
            <p className="text-xs sm:text-lg text-white/80 mb-4 sm:mb-6 text-center px-4 w-full">Sesuai dengan UU No. 22 Tahun 2009 dan PP No. 55 Tahun 2012 tentang Kendaraan.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-h-[45vh] sm:max-h-[50vh] overflow-y-auto hide-scrollbar pb-4 px-1 sm:px-2 w-full">
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
      case 8:
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
            
            {/* === BADGE ESTIMASI WAKTU BACA DI SINI === */}
            <div className="relative inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-amber-400 shadow-lg animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Cukup baca 5 menit untuk siap jadi pahlawan di jalan raya!
            </div>

            <h1 className="relative text-4xl sm:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              Panduan <br/> Keselamatan <br/> Berkendara
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

        {/* ================= SECTION 3: 9 FAKTOR ================= */}
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

          <div className="relative z-20 w-full max-w-7xl mx-auto px-10 sm:px-16 flex flex-col items-center text-center mt-2 sm:mt-6">
            
            {!safetyFactors[currentFactor].isIntro && (
              <div className="inline-block px-4 sm:px-5 py-1 sm:py-2 mb-2 sm:mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-base font-semibold tracking-widest uppercase shadow-md">
                Faktor {currentFactor} dari {safetyFactors.length - 1}
              </div>
            )}
            
            <h3 className={`font-display font-bold drop-shadow-xl ${safetyFactors[currentFactor].isIntro ? 'text-4xl sm:text-6xl lg:text-7xl text-white mb-8 sm:mb-12 max-w-4xl leading-tight' : 'text-3xl sm:text-5xl lg:text-6xl text-amber-400 mb-2 sm:mb-4'}`}>
              {safetyFactors[currentFactor].name}
            </h3>
            
            {/* === TEKS INSTRUKSI (Hanya muncul jika di faktor 1 dan belum pernah digeser) === */}
            {currentFactor === 0 && !hasInteracted && (
              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4 text-white/80 animate-pulse text-xs sm:text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" /> 
                </svg>
                <span>Klik tanda panah untuk melihat faktor-faktor</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </div>
            )}
            
            <div className="w-full">
              {renderFactorContent()}
            </div>
          </div>

          <button onClick={nextFactor} className="absolute right-2 sm:right-6 z-30 p-2 sm:p-5 text-white hover:text-amber-400 transition-colors bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 sm:w-12 sm:h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>

          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex justify-center space-x-2 sm:space-x-4">
            {safetyFactors.map((_, index) => (
              <button 
                key={index} 
                onClick={() => {
                  setCurrentFactor(index);
                  setHasInteracted(true); 
                }} 
                className={`h-2 sm:h-4 rounded-full transition-all duration-300 ${currentFactor === index ? 'bg-amber-400 w-6 sm:w-12' : 'bg-white/50 hover:bg-white w-2 sm:w-4'}`} 
              />
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
                <p className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-lg">Jawab semua benar (10/10) untuk mendapatkan E-Sertifikat!</p>
              </div>

              {/* DITAMBAHKAN max-h-[80vh] overflow-y-auto hide-scrollbar AGAR BISA SCROLL */}
              <div className="w-full max-w-3xl bg-black/50 border border-white/20 backdrop-blur-xl rounded-3xl p-5 sm:p-12 shadow-2xl min-h-[300px] max-h-[80vh] overflow-y-auto hide-scrollbar flex flex-col justify-start sm:justify-center">
                
                {/* STATE 1: BELUM MEMULAI KUIS (INPUT NAMA) */}
                {!isQuizStarted && !showResult && (
                  <form onSubmit={startQuiz} className="flex flex-col items-center animate-fade-in w-full max-w-md mx-auto">
                    <div className="text-6xl mb-6">🏆</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">Siap Menguji Pengetahuan Anda?</h3>
                    <p className="text-sm text-white/60 mb-6 text-center">Masukkan nama lengkap Anda. Nama ini akan dicetak pada Sertifikat Kelulusan jika Anda berhasil menjawab semua soal dengan benar.</p>
                    
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama lengkap Anda..." 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-center text-lg mb-6"
                    />
                    
                    <button 
                      type="submit"
                      disabled={userName.trim().length < 3}
                      className="w-full px-8 py-4 bg-amber-400 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-full font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 text-base sm:text-lg uppercase tracking-wide"
                    >
                      Mulai Quiz
                    </button>
                  </form>
                )}

                {/* STATE 2: KUIS BERLANGSUNG */}
                {isQuizStarted && !showResult && (
                  <div className="animate-fade-in w-full">
                    <div className="flex justify-between items-center text-amber-400 text-xs sm:text-sm font-bold mb-4 sm:mb-6 uppercase tracking-wider">
                      <span>Pertanyaan {currentQ + 1} / 10</span>
                      <span className="text-white/50 bg-white/10 px-3 py-1 rounded-full">{userName}</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-6 sm:mb-8 leading-relaxed">
                      {quizQuestions[currentQ].q}
                    </h3>
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      {quizQuestions[currentQ].options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-900 border border-white/10 transition-all font-sans text-sm sm:text-base text-white font-medium group"
                        >
                          <span className="inline-block w-6 h-6 rounded-full border border-current mr-3 text-center leading-5 text-sm group-hover:bg-slate-900 group-hover:text-amber-400">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STATE 3: HASIL KUIS */}
                {showResult && (
                  <div className="text-center animate-fade-in py-2 sm:py-6 flex flex-col items-center">
                    <h3 className="text-xl sm:text-3xl font-bold text-white mb-4">Hasil Evaluasi: <span className="text-amber-400">{userName}</span></h3>
                    
                    <div className="text-6xl sm:text-7xl font-display font-bold mb-6">
                      {score} <span className="text-2xl sm:text-3xl text-white/50">/ 10</span>
                    </div>
                    
                    {score === 10 ? (
                      <>
                        <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 text-base sm:text-xl font-bold mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
                          🎉 LULUS! SANGAT AMAN
                        </div>
                        <p className="text-sm sm:text-base text-white/80 mb-8 max-w-md mx-auto">
                          Sempurna! Anda memiliki pemahaman yang luar biasa tentang keselamatan berkendara. Unduh sertifikat kelulusan Anda di bawah ini.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                          <button 
                            onClick={generateCertificate} 
                            disabled={isGeneratingCert}
                            className="px-6 py-3 sm:px-8 sm:py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                          >
                            {isGeneratingCert ? (
                              <span className="animate-spin text-xl">⏳</span>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            )}
                            {isGeneratingCert ? "Memproses..." : "Unduh Sertifikat PDF"}
                          </button>
                          <button onClick={() => { setIsQuizStarted(false); resetQuiz(); setUserName(""); }} className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors">
                            Selesai
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-red-500/20 text-red-500 border border-red-500 text-base sm:text-xl font-bold mb-4">
                          {score === 0 ? "❌ SANGAT TIDAK AMAN" : "⚠️ TIDAK LULUS"}
                        </div>
                        <p className="text-sm sm:text-base text-white/80 mb-8 max-w-md mx-auto">
                          {score === 0 
                            ? "Sangat disayangkan, Anda gagal menjawab semua soal. Silakan baca materi kembali dari awal demi keselamatan Anda." 
                            : "Pemahaman Anda masih kurang. Anda harus mendapatkan nilai sempurna (10) untuk mendapatkan sertifikat."}
                        </p>
                        <button onClick={resetQuiz} className="px-6 py-3 sm:px-8 sm:py-4 bg-amber-400 text-slate-900 rounded-full font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 w-full sm:w-auto">
                          Ulangi Quiz
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* === INDIKATOR SCROLL INFO DI BAWAH QUIZ HANYA MUNCUL SETELAH SELESAI === */}
              {showResult && (
                <div className="absolute bottom-4 left-0 right-0 z-30 flex flex-col items-center justify-center text-white/60 text-[10px] sm:text-sm animate-bounce cursor-default">
                  <span>Scroll ke bawah untuk info</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-amber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              )}

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