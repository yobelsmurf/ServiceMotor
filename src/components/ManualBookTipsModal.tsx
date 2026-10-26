import { useState } from 'react';
import {
  BookOpen,
  AlertTriangle,
  ShieldCheck,
  Droplet,
  Sliders,
  Wind,
  Zap,
  Key,
  CheckCircle2,
  Gauge,
  Flame
} from 'lucide-react';

export const ManualBookTipsView: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'fazzio' | 'general'>('fazzio');

  // Specific Yamaha Fazzio 125 Hybrid (LCF125-F) Guide extracted from the official PDF Manual Book (BEJ-F8199-B1)
  const fazzioSchedule = [
    {
      km: '1.000 KM (1 Bulan)',
      title: 'Servis Perdana (Inreyen)',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      items: [
        'Ganti Oli Mesin (0.80 L SAE 10W-40 JASO MB)',
        'Ganti Oli Transmisi Akhir / Gardan (0.10 L / 100 ml)',
        'Bersihkan Kawat Saringan Oli Mesin pada Baut Penguras B (Torsi 20 N·m)',
        'Pemeriksaan Sistem Diagnostik Yamaha (YDT) & Putaran Langsam Mesin',
        'Pemeriksaan fungsi tuas rem depan & gerak bebas rem belakang'
      ]
    },
    {
      km: '4.000 KM (4 Bulan)',
      title: 'Servis Rutin Pertama',
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
      items: [
        'Ganti Oli Mesin Berkala (0.80 L)',
        'Bersihkan Saringan Udara Wadah V-Belt (Spons CVT) & lumasi oli busa',
        'Bersihkan selang pembuangan saringan udara & rumah CVT',
        'Periksa dan bersihkan busi NGK CR6HSA (Celah 0.6–0.7 mm)',
        'Periksa voltase aki YTZ6V (>12.8 V) & lumasi engsel tuas rem'
      ]
    },
    {
      km: '6.000 - 7.000 KM',
      title: 'Servis Pengapian & Klep',
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
      items: [
        'WAJIB GANTI BARU Busi NGK CR6HSA (Tabel Emisi Halaman 10-2)',
        'Ganti Oli Mesin Berkala (0.80 L)',
        'Bersihkan Kawat Saringan Oli Mesin pada Baut B',
        'Pemeriksaan & Penyetelan Kelonggaran Celah Klep (saat mesin dingin)',
        'Pemeriksaan awal kondisi V-Belt CVT pertama kali (7.000 KM)'
      ]
    },
    {
      km: '10.000 - 12.000 KM',
      title: 'Servis Besar CVT, Gardan & Komstir',
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
      items: [
        'Ganti Oli Mesin (0.80 L) & Ganti Oli Gardan Transmisi Akhir (0.10 L)',
        'Lumasi Sheave Sekunder V-Belt (Pulley Belakang CVT) dengan gemuk',
        'Lumasi Bearing Kemudi (Komstir) dengan Lithium-soap-based grease',
        'Kuras & Ganti Oli Shockbreaker Depan (Fork Oil) untuk menjaga rebound',
        'Periksa & Ganti Saringan Bahan Bakar (Fuel Filter)',
        'Periksa kondisi V-Belt, kampas rem depan cakram & sepatu rem belakang'
      ]
    },
    {
      km: '15.000 KM',
      title: 'Ganti Filter Udara Viscous Paper',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
      items: [
        'WAJIB GANTI BARU Elemen Saringan Udara (Halaman 10-3 & 10-14)',
        'PERINGATAN: Dilarang membersihkan filter kertas dengan udara kompresor!',
        'Ganti Oli Mesin Berkala (0.80 L)',
        'Ganti Busi Baru NGK CR6HSA (Siklus ke-2)',
        'Cek alur keausan ban MAXXIS 110/70-12 (Batas minimal TWI 1.0 mm)'
      ]
    },
    {
      km: '25.000 KM',
      title: 'Ganti Wajib V-Belt CVT (Drive Belt)',
      color: 'border-red-600/50 bg-red-600/15 text-red-300',
      items: [
        'WAJIB GANTI BARU V-Belt CVT (Halaman 10-7: "V-belt harus diganti setiap 25000 km bahkan jika tidak ada aus atau kerusakan")',
        'Ganti Roller & Slider CVT',
        'Kuras & Ganti Minyak Rem DOT 3 / DOT 4 & Ganti Seal Kaliper Rem',
        'Ganti Baterai Koin Smart Key CR2032 (3V)'
      ]
    }
  ];

  const generalTips = [
    {
      title: 'Kenapa Ganti Oli Mesin Matic Sebaiknya Tiap 2.000 KM (Bukan 3.000 - 4.000 KM)?',
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-500/10',
      summary: 'Manual book Bab 10-1 menegaskan jadwal servis harus diperpendek bila beroperasi di iklim panas, berdebu, atau sering macet stop-and-go.',
      details: [
        'Jam Kerja Mesin (Engine Running Hours): Saat terjebak macet 1 jam hanya menempuh 3–5 KM, mesin tetap menyala pada 1.500–2.000 RPM. Panas mesin terus membakar pelumas walaupun angka odometer tidak bertambah banyak.',
        'Kapasitas Oli Motor Matic Sangat Kecil: Rata-rata motor matic 110–125cc (Fazzio, BeAT, Scoopy, Vario) hanya menampung 650 ml – 800 ml oli. Volume oli yang sedikit lebih cepat jenuh arang dan menguap.',
        'Mencegah Oli Kering & Silinder Baret (Ngejim): Mengganti oli per 2.000 KM atau 2 bulan menjamin volume oli tidak sempat tekor ke level kritis. Biaya ganti oli hanya Rp 45rb - Rp 70rb, sedangkan biaya turun mesin akibat piston baret mencapai Rp 1,5 juta - Rp 2,5 juta!'
      ]
    },
    {
      title: 'Kenapa Oli Shock Depan Wajib Ganti Setiap 10.000 KM?',
      icon: <Droplet className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 bg-blue-500/5',
      summary: 'Banyak pemilik motor baru mengganti oli shock saat suspensi sudah rembes/bocor. Ini adalah kekeliruan fatal!',
      details: [
        'Di dalam tabung shockbreaker, oli mengalami gesekan naik-turun ribuan kali setiap hari. Setelah 10.000 km, viskositas oli shock akan encer dan kotor akibat gesekan partikel mikroskopis seal dan dinding tabung.',
        'Oli shock yang encer membuat rebound suspensi liar (motor limbung saat nikung dan jedug saat rem depan ditekan mendadak).',
        'Mengganti oli shock rutin tiap 10.000 km jauh lebih murah (hanya Rp 35rb - Rp 50rb) daripada mengganti as shockbreaker yang baret seharga Rp 350rb - Rp 600rb.'
      ]
    },
    {
      title: 'Peringatan Pabrikan: Dilarang Meniup Filter Udara Kertas Berlapis Oli!',
      icon: <Wind className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 bg-amber-500/5',
      summary: 'Sebagian besar motor modern menggunakan elemen kertas viscous (viscous paper element) dengan pelapis oli perekat debu mikron.',
      details: [
        'Jika filter udara viscous disemprot angin kompresor bertekanan tinggi di tambal ban / bengkel umum, lapisan pori-pori mikron kertas akan pecah robek dan lapisan olinya hilang.',
        'Akibatnya partikel debu pasir silika akan langsung lolos masuk ke ruang silinder dan mengikis dinding liner silinder piston hingga berasap putih!',
        'Manual book mewajibkan: Cukup ketuk-ketuk ringan jika kotor, dan WAJIB ganti baru total di 12.000 - 16.000 km.'
      ]
    },
    {
      title: 'Bahaya Vapor Lock: Kuras Minyak Rem Tiap 20.000 KM / 2 Tahun',
      icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
      color: 'border-red-500/30 bg-red-500/5',
      summary: 'Minyak rem DOT 3/4 bersifat higroskopis, yaitu menyerap uap kelembapan air dari udara sekitar seiring berjalannya waktu.',
      details: [
        'Kandungan air dalam minyak rem akan menurunkan titik didihnya dari ~230°C menjadi di bawah 140°C.',
        'Saat motor melewati turunan panjang atau rem digunakan terus-menerus, panas kaliper akan mendidihkan kandungan air menjadi uap gas di selang rem.',
        'Karena gas bisa dimampatkan, tuas rem akan mendadak terasa kosong (ngempos / rem BLONG seketika). Oleh karena itu, pabrikan mewajibkan kuras total maksimal tiap 2 tahun.'
      ]
    },
    {
      title: 'Kaidah Ganti Oli Gardan CVT: Rumus 2:1',
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/30 bg-purple-500/5',
      summary: 'Transmisi gear box belakang motor matic bertugas mereduksi putaran tinggi pulley CVT menjadi torsi ke velg roda.',
      details: [
        'Gunakan patokan mudah: 2 kali ganti oli mesin = 1 kali ganti oli gardan (sekitar 6.000 - 8.000 km).',
        'Kapasitas oli gardan biasanya 120 ml (BeAT, Vario, Scoopy) hingga 150 ml (NMAX, PCX, Aerox).',
        'Gunakan selalu oli transmisi matic asli pabrikan dengan grade API GL-4 / GL-5.'
      ]
    },
    {
      title: 'Perbedaan Sertifikasi Oli: JASO MB vs JASO MA / MA2',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-500/5',
      summary: 'Jangan salah membeli oli! Kode JASO di botol oli menentukan kecocokan kopling motormu.',
      details: [
        'JASO MB: Oli dengan zat aditif pelicin tinggi khusus untuk Motor Matic (Kopling Kering CVT). Jangan pernah tuang ke motor bebek/sport!',
        'JASO MA / MA2: Oli dengan zat aditif anti-selip khusus untuk Motor Bebek dan Sport yang menggunakan Kopling Basah (Wet Clutch terendam oli).',
        'Jika oli matic (MB) dimasukkan ke motor manual/bebek, kopling akan mengalami selip parah sehingga motor tidak bertenaga.'
      ]
    },
    {
      title: 'Tanda-tanda V-Belt CVT Perlu Segera Diganti Sebelum Putus',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      color: 'border-yellow-500/30 bg-yellow-500/5',
      summary: 'Batas toleransi maksimal usia pakai V-Belt adalah 20.000 - 24.000 km.',
      details: [
        'Gejala 1: Tarikan motor terasa kendur di kecepatan menengah dan akselerasi tidak responsif.',
        'Gejala 2: Terdengar suara decitan (squeaking) karet dari box CVT saat akselerasi mendadak.',
        'Gejala 3: Saat dibalik/ditekuk keluar, terlihat retakan-retakan halus pada gerigi dalam v-belt.',
        'Ganti bersamaan dengan roller dan gemuk CVT untuk hasil tarikan maksimal layaknya motor baru.'
      ]
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header & Section Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Panduan Resmi Buku Manual Pabrikan
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Standar perawatan resmi dari insinyur sepeda motor di Indonesia
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setSelectedSection('fazzio')}
              className={`px-3 py-1.5 rounded-lg font-bold transition active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                selectedSection === 'fazzio'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Yamaha Fazzio 125 (Resmi)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSection('general')}
              className={`px-3 py-1.5 rounded-lg font-bold transition active:scale-95 cursor-pointer ${
                selectedSection === 'general'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tips Umum Semua Motor
            </button>
          </div>
        </div>

        {/* Fazzio Model Card Highlights */}
        {selectedSection === 'fazzio' && (
          <div className="p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-xl space-y-2 text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[10px] uppercase">
                Owner&apos;s Manual BEJ-F8199-B1
              </span>
              <strong className="text-white text-sm">Yamaha Fazzio 125 Hybrid (LCF125-F)</strong>
            </div>
            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
              Panduan di bawah ini disarikan langsung dari <strong>Buku Petunjuk Pemilik Resmi Yamaha Fazzio (LCF125-F Edisi 2024)</strong> Bab 10 (Penyetelan & Perawatan Berkala) dan Bab 12 (Spesifikasi).
            </p>
          </div>
        )}
      </div>

      {/* FAZZIO SPECIAL SHOWCASE */}
      {selectedSection === 'fazzio' && (
        <div className="space-y-4">
          {/* 1. Official Table Schedule Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {fazzioSchedule.map((sch, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-4 transition shadow-lg flex flex-col justify-between ${sch.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-slate-950/80 border border-slate-700">
                      {sch.km}
                    </span>
                    <span className="text-[11px] font-bold text-white truncate">{sch.title}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {sch.items.map((it, itIdx) => (
                      <li key={itIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug text-[11px]">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Emergency Mode & Smart Key Guide (From PDF Page 89 / Chapter 10-33) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Panduan Mode Darurat Smart Key Fazzio (Halaman 10-33)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cara menghidupkan mesin jika remote Smart Key hilang atau kehabisan baterai koin CR2032
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block mb-1">Langkah 1: Masuk Mode Darurat</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Putar main switch ke &quot;OFF&quot;. Tekan knob selama 5 detik hingga lampu indikator smart key berkedip 1 kali, lalu lepas. Ulangi 2 kali lagi hingga lampu menyala 3 detik.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block mb-1">Langkah 2: Input PIN 6-Digit</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Gunakan kartu identitas nomor Fazzio Anda. Tekan dan tahan knob, hitung jumlah kedipan lampu sesuai angka PIN Anda, lalu lepas. Ulangi hingga ke-6 digit selesai.
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block mb-1">Langkah 3: Putar Kontak ke ON</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Lampu indikator akan berkedip 10 detik. Tekan knob 1 kali lagi untuk konfirmasi, lalu putar main switch ke &quot;ON&quot;. Mesin Fazzio Anda siap dinyalakan normal!
                </p>
              </div>
            </div>
          </div>

          {/* 3. Tech Specs Quick Cheat Sheet (From PDF Chapter 12-1) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Data Spesifikasi Pabrikan Yamaha Fazzio 125 (Tabel Resmi)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Oli Mesin Berkala</span>
                <strong className="text-white">0.80 L (10W-40 JASO MB)</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Oli Transmisi Gardan</span>
                <strong className="text-white">0.10 L (100 ml)</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Busi Standar</span>
                <strong className="text-white">NGK / CR6HSA (0.6–0.7 mm)</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Tekanan Ban MAXXIS</span>
                <strong className="text-white">Depan 22 psi / Belakang 33 psi</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Aki Motor</span>
                <strong className="text-white">YTZ6V 12V 5.0Ah (VRLA)</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Baterai Smart Key</span>
                <strong className="text-white">CR2032 3V (Usia ~2 Tahun)</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Tangki Bensin</span>
                <strong className="text-white">5.1 Liter (Cadangan 0.2L)</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Sistem Pendingin</span>
                <strong className="text-white">Pendingin Udara (Air Cooled)</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GENERAL TIPS (Across all bikes) */}
      {selectedSection === 'general' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {generalTips.map((tip, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-4 sm:p-5 transition shadow-lg flex flex-col justify-between ${tip.color}`}
            >
              <div>
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      {tip.summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 mt-2.5 pt-2.5 border-t border-slate-800/80 text-xs text-slate-400">
                  {tip.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="leading-relaxed text-[11px] sm:text-xs">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
