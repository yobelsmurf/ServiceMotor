import type { MotorcycleBrand } from '../types/motor';

export const MOTORCYCLE_BRANDS: MotorcycleBrand[] = [
  {
    id: 'yamaha',
    name: 'Yamaha (YIMM)',
    country: 'Jepang',
    badgeColor: '#2563EB', // Blue
    popularModels: [
      {
        id: 'yamaha-fazzio',
        brandId: 'yamaha',
        name: 'Fazzio 125 Hybrid (LCF125-F)',
        codeName: 'LCF125-F',
        manualBookCode: 'BEJ-F8199-B1 (Edisi Resmi 2024)',
        type: 'matic',
        cc: 125,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        gearOilCapacityLiters: 0.10,
        recommendedOilViscosity: '10W-40 API SG+ JASO MB (Yamalube Power Matic)',
        sparkPlugSpec: 'NGK / CR6HSA (Celah 0.6–0.7 mm)',
        batteryModel: 'YTZ6V (12V 5.0Ah VRLA)',
        tireSpecFront: '110/70-12 47L MAXXIS (22 psi / 150 kPa)',
        tireSpecRear: '110/70-12 47L MAXXIS (33 psi / 225 kPa)',
        hasVerifiedManualBook: true
      },
      {
        id: 'yamaha-grand-filano',
        brandId: 'yamaha',
        name: 'Grand Filano 125 Hybrid',
        codeName: 'LTS125',
        type: 'matic',
        cc: 125,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        gearOilCapacityLiters: 0.10,
        recommendedOilViscosity: '10W-40 JASO MB (Yamalube Power Matic)',
        sparkPlugSpec: 'NGK / CR6HSA',
        batteryModel: 'YTZ6V (12V 5.0Ah)',
        hasVerifiedManualBook: true
      },
      {
        id: 'yamaha-nmax-155',
        brandId: 'yamaha',
        name: 'NMAX 155 Connected/Turbo',
        type: 'matic',
        cc: 155,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.90,
        gearOilCapacityLiters: 0.15,
        recommendedOilViscosity: '10W-40 (Yamalube Power Matic / Super Matic)'
      },
      {
        id: 'yamaha-aerox-155',
        brandId: 'yamaha',
        name: 'Aerox 155 Connected VVA',
        type: 'matic',
        cc: 155,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.90,
        gearOilCapacityLiters: 0.15,
        recommendedOilViscosity: '10W-40 (Yamalube Super Matic)'
      },
      {
        id: 'yamaha-mio-gear',
        brandId: 'yamaha',
        name: 'Gear 125 / Mio M3 125',
        type: 'matic',
        cc: 125,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        gearOilCapacityLiters: 0.10,
        recommendedOilViscosity: '10W-40 (Yamalube Matic)'
      },
      {
        id: 'yamaha-xmax-250',
        brandId: 'yamaha',
        name: 'XMAX 250 Connected',
        type: 'matic',
        cc: 250,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.50,
        recommendedOilViscosity: '10W-40 (Yamalube RS4GP / Super Matic)'
      },
      {
        id: 'yamaha-jupiter-z1',
        brandId: 'yamaha',
        name: 'Jupiter Z1 115 FI',
        type: 'bebek',
        cc: 115,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '20W-40 / 10W-40 (Yamalube Silver)'
      },
      {
        id: 'yamaha-mx-king',
        brandId: 'yamaha',
        name: 'MX King 150 VVA',
        type: 'bebek',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.00,
        recommendedOilViscosity: '10W-40 (Yamalube Sport)'
      },
      {
        id: 'yamaha-r15',
        brandId: 'yamaha',
        name: 'YZF-R15 V3 / V4 Connected',
        type: 'sport',
        cc: 155,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.85,
        recommendedOilViscosity: '10W-40 (Yamalube RS4GP)'
      },
      {
        id: 'yamaha-xsr-155',
        brandId: 'yamaha',
        name: 'XSR 155 Heritage',
        type: 'sport',
        cc: 155,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.85,
        recommendedOilViscosity: '10W-40 (Yamalube Super Sport)'
      },
      {
        id: 'yamaha-wr-155r',
        brandId: 'yamaha',
        name: 'WR 155R Dual Purpose',
        type: 'trail',
        cc: 155,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.85,
        recommendedOilViscosity: '10W-40 (Yamalube Super Sport)'
      }
    ]
  },
  {
    id: 'honda',
    name: 'Honda (AHM)',
    country: 'Jepang',
    badgeColor: '#DC2626', // Red
    popularModels: [
      {
        id: 'honda-beat',
        brandId: 'honda',
        name: 'BeAT (110cc eSP)',
        type: 'matic',
        cc: 110,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.65,
        recommendedOilViscosity: '10W-30 (MPX2 / SPX2)'
      },
      {
        id: 'honda-vario-125',
        brandId: 'honda',
        name: 'Vario 125 eSP',
        type: 'matic',
        cc: 125,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-30 (MPX2 / SPX2)'
      },
      {
        id: 'honda-vario-160',
        brandId: 'honda',
        name: 'Vario 160 eSP+',
        type: 'matic',
        cc: 160,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-30 (SPX2 Synthetic)'
      },
      {
        id: 'honda-scoopy',
        brandId: 'honda',
        name: 'Scoopy (110cc eSP)',
        type: 'matic',
        cc: 110,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.65,
        recommendedOilViscosity: '10W-30 (MPX2)'
      },
      {
        id: 'honda-pcx-160',
        brandId: 'honda',
        name: 'PCX 160 eSP+',
        type: 'matic',
        cc: 160,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-30 (SPX2 Synthetic)'
      },
      {
        id: 'honda-adv-160',
        brandId: 'honda',
        name: 'ADV 160 eSP+',
        type: 'matic',
        cc: 160,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-30 (SPX2 Synthetic)'
      },
      {
        id: 'honda-supra-x-125',
        brandId: 'honda',
        name: 'Supra X 125 FI',
        type: 'bebek',
        cc: 125,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.70,
        recommendedOilViscosity: '10W-30 (MPX1 / SPX1)'
      },
      {
        id: 'honda-revo-x',
        brandId: 'honda',
        name: 'Revo X 110 FI',
        type: 'bebek',
        cc: 110,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-30 (MPX1)'
      },
      {
        id: 'honda-cbr-150r',
        brandId: 'honda',
        name: 'CBR 150R DOHC 6-Speed',
        type: 'sport',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.10,
        recommendedOilViscosity: '10W-30 (SPX1 Full Synthetic)'
      },
      {
        id: 'honda-cb150r',
        brandId: 'honda',
        name: 'CB150R Streetfire',
        type: 'sport',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.10,
        recommendedOilViscosity: '10W-30 (SPX1)'
      },
      {
        id: 'honda-crf-150l',
        brandId: 'honda',
        name: 'CRF 150L',
        type: 'trail',
        cc: 150,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 1.00,
        recommendedOilViscosity: '10W-30 (MPX1 / SPX1)'
      }
    ]
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    country: 'Jepang',
    badgeColor: '#0284C7', // Sky Blue
    popularModels: [
      {
        id: 'suzuki-burgman-125',
        brandId: 'suzuki',
        name: 'Burgman Street 125 EX',
        type: 'matic',
        cc: 125,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.65,
        recommendedOilViscosity: '10W-40 (Ecstar Scooter)'
      },
      {
        id: 'suzuki-nex-ii',
        brandId: 'suzuki',
        name: 'Nex II / Address FI',
        type: 'matic',
        cc: 115,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.65,
        recommendedOilViscosity: '10W-40 (Ecstar Scooter)'
      },
      {
        id: 'suzuki-satria-f150',
        brandId: 'suzuki',
        name: 'Satria F150 DOHC FI',
        type: 'bebek',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.30,
        recommendedOilViscosity: '10W-40 (Ecstar 9000 Full Synth)'
      },
      {
        id: 'suzuki-gsx-r150',
        brandId: 'suzuki',
        name: 'GSX-R150 / GSX-S150',
        type: 'sport',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.30,
        recommendedOilViscosity: '10W-40 (Ecstar 9000)'
      }
    ]
  },
  {
    id: 'kawasaki',
    name: 'Kawasaki',
    country: 'Jepang',
    badgeColor: '#16A34A', // Green
    popularModels: [
      {
        id: 'kawasaki-klx-150',
        brandId: 'kawasaki',
        name: 'KLX 150 / D-Tracker 150',
        type: 'trail',
        cc: 150,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 1.20,
        recommendedOilViscosity: '10W-40 (Kawasaki Genuine Oil)'
      },
      {
        id: 'kawasaki-ninja-250',
        brandId: 'kawasaki',
        name: 'Ninja 250 FI / ZX-25R',
        type: 'sport',
        cc: 250,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 2.00,
        recommendedOilViscosity: '10W-40 (Kawasaki Vent-Vert Full Synth)'
      },
      {
        id: 'kawasaki-w175',
        brandId: 'kawasaki',
        name: 'W175 Retro Classic',
        type: 'sport',
        cc: 177,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 1.00,
        recommendedOilViscosity: '10W-40 (Kawasaki Semi Synth)'
      }
    ]
  },
  {
    id: 'vespa',
    name: 'Vespa & Piaggio',
    country: 'Italia',
    badgeColor: '#D97706', // Amber/Yellow
    popularModels: [
      {
        id: 'vespa-sprint-150',
        brandId: 'vespa',
        name: 'Sprint / Primavera 150 i-Get ABS',
        type: 'matic',
        cc: 150,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 1.30,
        recommendedOilViscosity: '5W-40 / 10W-40 (Castrol Power1 / Eni)'
      },
      {
        id: 'vespa-gts-150',
        brandId: 'vespa',
        name: 'GTS Super 150 i-Get / 300 HPE',
        type: 'matic',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.30,
        recommendedOilViscosity: '5W-40 (Eni i-Ride Full Synthetic)'
      }
    ]
  },
  {
    id: 'custom',
    name: 'Merek / Model Lainnya',
    country: 'Universal',
    badgeColor: '#6B7280', // Gray
    popularModels: [
      {
        id: 'custom-matic',
        brandId: 'custom',
        name: 'Motor Matic Umum (CVT)',
        type: 'matic',
        cc: 125,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-30 / 10W-40 API SL/SN JASO MB'
      },
      {
        id: 'custom-bebek',
        brandId: 'custom',
        name: 'Motor Bebek / Moped Umum',
        type: 'bebek',
        cc: 110,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 0.80,
        recommendedOilViscosity: '10W-40 / 20W-40 API SL JASO MA'
      },
      {
        id: 'custom-sport',
        brandId: 'custom',
        name: 'Motor Sport / Kopling Manual',
        type: 'sport',
        cc: 150,
        engineCooling: 'liquid',
        hasRadiator: true,
        oilCapacityLiters: 1.00,
        recommendedOilViscosity: '10W-40 API SN JASO MA2'
      },
      {
        id: 'custom-trail',
        brandId: 'custom',
        name: 'Motor Trail / Adventure',
        type: 'trail',
        cc: 150,
        engineCooling: 'air',
        hasRadiator: false,
        oilCapacityLiters: 1.00,
        recommendedOilViscosity: '10W-40 API SL/SN JASO MA'
      }
    ]
  }
];

export const MOTORCYCLE_TYPES: { type: 'matic' | 'bebek' | 'sport' | 'trail'; label: string; desc: string; icon: string }[] = [
  {
    type: 'matic',
    label: 'Matic / Skutik',
    desc: 'Transmisi CVT, Sabuk V-Belt, Oli Gardan & Roller (Fazzio, NMAX, Aerox, BeAT, Vario)',
    icon: 'Zap'
  },
  {
    type: 'bebek',
    label: 'Bebek / Moped',
    desc: 'Kopling sentrifugal semi-otomatis, Rantai roda (Jupiter Z1, MX King, Supra X, Satria)',
    icon: 'GitFork'
  },
  {
    type: 'sport',
    label: 'Sport / Manual',
    desc: 'Kopling tangan manual, Transmisi 5/6 Speed, Rantai (R15, XSR, CBR, Ninja, GSX)',
    icon: 'Flame'
  },
  {
    type: 'trail',
    label: 'Trail / Adventure',
    desc: 'Dual-purpose, Suspensi long travel, Pelindung mesin (WR 155R, KLX, CRF 150L)',
    icon: 'Compass'
  }
];
