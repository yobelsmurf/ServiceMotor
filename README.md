# CekMotor — Pengingat Servis Sepeda Motor Standar Manual Book

Aplikasi web modern & responsif (PWA ready) untuk mengingatkan jadwal servis berkala sepeda motor berdasarkan **buku panduan resmi (Owner's Service Manual)** seluruh pabrikan motor populer di Indonesia (Honda, Yamaha, Suzuki, Kawasaki, Vespa, serta motor kustom).

---

## 🚀 Fitur Utama

1. **Cek Servis Instan (Quick Service Advisor)**:
   - Pilih Merek Motor (Honda, Yamaha, Suzuki, Kawasaki, Vespa, Lainnya).
   - Pilih Tipe Motor (Matic/Skutik CVT, Bebek/Moped, Sport Manual, Trail).
   - Pilih Model Spesifik (BeAT, Vario, Scoopy, PCX, NMAX, Aerox, Ninja, Satria, KLX, dll.).
   - Masukkan angka Odometer (KM), dilengkapi penggeser (slider) dan tombol penambah (+500, +1.000, +5.000 KM) serta tombol pintas kilometer acuan pabrikan (1.000, 4.000, 8.000, 10.000, 16.000, 24.000 KM).
   - **Langsung menampilkan rekomendasi servis**, tindakan yang harus dilakukan, kutipan manual book, resiko jika ditunda, dan estimasi biaya.

2. **Saran Servis Spesifik Sesuai Permintaan**:
   - 📍 **KM 10.000**: Kuras & Ganti Oli Shockbreaker Depan (Fork Oil), Servis & Pembersihan Ruang CVT, Kalibrasi Throttle Body & Injektor, Cek Komstir.
   - 📍 **KM 1.000**: Servis perdana inreyen & ganti oli mesin pertama.
   - 📍 **KM 3.000 - 4.000**: Ganti oli mesin berkala & cek kampas rem.
   - 📍 **KM 8.000**: Ganti oli transmisi/gardan matic (rumus 2:1) & ganti busi.
   - 📍 **KM 12.000 - 16.000**: Ganti filter udara (tipe *viscous paper* dilarang ditiup kompresor!) & ganti roller CVT.
   - 📍 **KM 20.000 - 24.000**: Ganti Drive Belt (V-Belt CVT) wajib sebelum putus, kuras minyak rem (cegah *vapor lock*), kuras air radiator (*coolant*), ganti paket rantai & gir motor bebek/sport.

3. **Kalkulator Estimasi Biaya Servis**:
   - Menghitung perkiraan biaya suku cadang original + tarif ongkos jasa pasang mekanik (rata-rata bengkel resmi & umum di Indonesia).

4. **Garasi Motor Saya (My Garage)**:
   - Simpan data motor pribadi (nama panggilan, nomor polisi, tipe, KM terkini) di penyimpanan lokal (*LocalStorage*).
   - Beralih antar motor hanya dengan 1 kali klik tanpa perlu input ulang.

5. **Catatan Riwayat Servis (Service Logbook)**:
   - Catat tanggal servis, kilometer pengerjaan, bengkel, item yang diganti, dan total biaya.
   - Melacak riwayat pengeluaran perawatan berkala motormu.

6. **Cetak Checklist Servis (Print / PDF)**:
   - Format cetak rapi siap dibawa ke bengkel resmi atau bengkel langganan dengan kolom tanda tangan mekanik.

7. **Tips & Edukasi Manual Book**:
   - Penjelasan teknis: Kenapa oli shock wajib diganti di 10.000 km, bahaya meniup filter udara dengan kompresor angin, perbedaan oli JASO MB vs JASO MA2, dan bahaya rem blong karena *vapor lock*.

---

## 💻 Cara Menjalankan Aplikasi

Aplikasi saat ini telah aktif di komputer Anda:
- **Di Komputer / Laptop**: Buka browser ke [http://localhost:5173/](http://localhost:5173/)
- **Di Smartphone (HP) melalui Wi-Fi**: Buka browser HP ke `http://192.168.100.113:5173/` (selama HP dan komputer berada di jaringan Wi-Fi yang sama).

### Perintah Mandiri:
```bash
# Menjalankan server pengembangan
npm run dev

# Membangun versi produksi (Build)
npm run build
```
