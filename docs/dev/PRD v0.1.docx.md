# PRD v0.1

### Aplikasi Otomasi Dinas Luar, Surat Tugas, dan SPPD

Dinas Kesehatan Kabupaten Kotawaringin Barat

### 1. Ringkasan Eksekutif

Aplikasi ini dirancang untuk mengotomatisasi proses perencanaan, pengusulan, verifikasi berjenjang, penerbitan Surat Tugas, penerbitan SPPD bila ada biaya perjalanan dinas, pelaksanaan tugas, unggah bukti hasil tugas, pelaporan, dan monitoring pertanggungjawaban.

Sistem akan digunakan oleh:

1. Dinas Kesehatan Kabupaten Kotawaringin Barat.

2. UPTD/faskes, termasuk Puskesmas, Labkesda, Instalasi Farmasi, dan unit

lain yang ditetapkan.

3. Pejabat struktural/fungsional sebagai pemohon, verifikator, approver, penerbit

surat, pengelola keuangan, dan pemantau kinerja.

4. Admin teknis Tim SIK.

5. Auditor internal, Inspektorat, atau pejabat pengawasan sesuai kewenangan.

Aplikasi dibangun menggunakan AWCMS-Micro dengan pendekatan modular sebagai plugin khusus, misalnya:

awcms-micro-duty-travel

Nama aplikasi operasional yang dapat dipilih:

1. SiPerdin Dinkes Kobar — Sistem Perjalanan Dinas.

2. SiTugas Kobar — Sistem Surat Tugas dan Bukti Tugas.

3. SIMPATIK-DL — Sistem Manajemen Perjalanan dan Tugas Dinas Luar.

4. Kobar DutyFlow — nama internal teknis.

5. e-STPD Dinkes Kobar — Elektronik Surat Tugas dan Perjalanan Dinas.

Rekomendasi nama awal: SiPerdin Dinkes Kobar, karena mudah dipahami oleh ASN dan faskes.

### 2. Latar Belakang

Saat ini proses dinas luar umumnya masih menghadapi beberapa masalah klasik:

1. Usulan kegiatan belum sepenuhnya terdokumentasi sejak tahap

perencanaan.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 1

2. Alur persetujuan masih bergantung pada komunikasi manual.

3. Status usulan sering tidak terlihat secara real-time.

4. Surat Tugas dan SPPD berpotensi dibuat berulang secara manual.

5. Arsip bukti kegiatan tersebar di WhatsApp, Google Drive, dokumen fisik, atau

komputer masing-masing pegawai.

6. Pertanggungjawaban hasil tugas dan bukti perjalanan belum selalu terhubung

langsung dengan dokumen penugasan.

7. Monitoring beban perjalanan dinas, biaya, personel, lokasi, kegiatan, dan

output belum optimal.

8. Proses faskes memiliki struktur approval berbeda dengan Dinas, sehingga

perlu workflow fleksibel.

Aplikasi ini menjadi solusi dengan prinsip:

1. Semua usulan tercatat.

2. Semua approval memiliki jejak audit.

3. Surat Tugas dan SPPD diterbitkan dari data yang sudah diverifikasi.

4. Setiap tugas wajib memiliki bukti hasil tugas.

5. Data perjalanan dinas dapat dimonitor untuk akuntabilitas, evaluasi, dan

perbaikan manajemen.

### 3. Tujuan Produk

3. 1 Tujuan Umum

Membangun aplikasi internal pemerintah daerah untuk mengelola proses dinas luar dan perjalanan dinas secara tertib, transparan, akuntabel, terdokumentasi, dan sesuai tata naskah serta aturan perjalanan dinas Pemerintah Kabupaten Kotawaringin Barat.

3. 2 Tujuan Khusus

1. Mengotomatisasi proses usulan dinas luar dari pegawai/unit.

2. Menyediakan workflow verifikasi berjenjang untuk Dinas dan faskes.

3. Menerbitkan Surat Tugas sesuai format tata naskah Pemerintah Daerah.

4. Menerbitkan SPPD untuk perjalanan dinas yang memiliki komponen biaya.

5. Membedakan Surat Tugas tanpa biaya dan Surat Tugas dengan SPPD.

6. Menyediakan unggah bukti hasil tugas pada setiap aktivitas.

7. Mengintegrasikan data dengan struktur organisasi, jabatan, unit kerja, dan

DPA/kegiatan bila diperlukan.

8. Menyediakan dashboard monitoring status usulan, realisasi tugas, biaya,

bukti, dan keterlambatan pertanggungjawaban.

9. Menyediakan audit trail untuk pengawasan internal.

10. Menyiapkan fondasi integrasi dengan SRIKANDI, TTE/BSrE,

SIPD/penatausahaan keuangan, SIMPEG/e-Kinerja, dan sistem internal lain.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 2

### 4. Ruang Lingkup

4. 1 Termasuk dalam Scope

1. Pengajuan rencana dinas luar.

2. Pengajuan Surat Tugas tanpa biaya.

3. Pengajuan Surat Tugas dengan SPPD.

4. Verifikasi berjenjang untuk Dinas.

5. Verifikasi berjenjang untuk faskes.

6. Penerbitan nomor Surat Tugas.

7. Penerbitan dokumen Surat Tugas PDF.

8. Penerbitan SPPD PDF.

9. Pencatatan komponen biaya perjalanan dinas.

10. Pencatatan DPA/sub kegiatan/rekening belanja.

11. Upload bukti pelaksanaan tugas.

12. Upload laporan hasil tugas.

13. Validasi bukti oleh atasan/operator.

14. Dashboard monitoring.

15. Audit trail.

16. Role dan permission.

17. Template dokumen.

18. API internal.

19. Export Excel/PDF.

20. QR code validasi dokumen.

4. 2 Tidak Termasuk MVP Awal

1. Pembayaran otomatis ke rekening pegawai.

2. Integrasi penuh dengan SIPD RI jika API belum tersedia.

3. TTE tersertifikasi langsung jika kerja sama BSrE belum siap.

4. Mobile app native Android/iOS.

5. Deteksi otomatis fraud berbasis AI tingkat lanjut.

6. Integrasi e-Kinerja otomatis penuh.

Namun seluruh kebutuhan tersebut harus disiapkan dalam arsitektur agar dapat ditambahkan pada fase berikutnya.

### 5. Definisi Utama

Istilah Definisi Operasional Dinas luar Aktivitas pegawai di luar kantor/unit kerja dalam rangka pelaksanaan tugas kedinasan. Surat Tugas Naskah dinas yang memerintahkan pegawai/pihak lain melaksanakan tugas tertentu.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 3

Istilah Definisi Operasional SPPD/SPD Surat Perintah Perjalanan Dinas sebagai dasar perjalanan dinas yang memiliki pembiayaan sesuai ketentuan. ST tanpa biaya Surat Tugas yang tidak menimbulkan pembayaran biaya perjalanan dinas. ST dengan SPPD Surat Tugas yang dilanjutkan dengan dokumen SPPD dan komponen biaya. Bukti hasil tugas Dokumen, foto, notulen, laporan, daftar hadir, materi, berita acara, atau output lain sebagai bukti pelaksanaan tugas. Verifikator Pejabat/pegawai yang memeriksa kelengkapan, kesesuaian, dan kewenangan usulan. Approver Pejabat berwenang yang menyetujui penerbitan Surat Tugas/SPPD. Unit pemohon Bidang, sekretariat, seksi, subbag, faskes, atau unit kerja pengusul. Pelaksana tugas Pegawai/pihak yang ditugaskan.

### 6. Stakeholder

Stakeholder Kepentingan Kepala Dinas Kontrol akhir, kebijakan, persetujuan, monitoring seluruh dinas luar. Sekretaris Dinas Validasi administrasi, koordinasi sekretariat, tata naskah, dan kontrol lintas bidang. Kepala Bidang Validasi teknis kegiatan bidang. Atasan langsung Validasi kebutuhan tugas dan kelayakan pegawai yang ditugaskan. Subbag Umum/Kepegawaian Tata naskah, nomor surat, arsip, data pegawai.

Subbag Keuangan Validasi anggaran, SPPD, biaya, pertanggungjawaban. Tim SIK Pengembangan, integrasi, keamanan, dashboard, maintenance. Kepala Faskes Persetujuan akhir untuk level faskes sesuai kewenangan. Kepala TU faskes Administrasi, dokumen, arsip, dan koordinasi internal faskes. Pegawai/pelaksana Mengajukan, melaksanakan, dan mengunggah bukti tugas. Inspektorat/auditor Audit kepatuhan, jejak proses, dan bukti pertanggungjawaban. Diskominfo/SPBE Tata kelola SPBE, keamanan, interoperabilitas, infrastruktur. BPKAD/BKAD Validasi kesesuaian pengelolaan keuangan daerah dan standar biaya.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 4

### 7. Pembanding Aplikasi Serupa

Aplikasi/Praktik Pembanding Kekuatan Kelemahan/ Keterbatasan Pelajaran untuk Dinkes Kobar SRIKANDI Kuat untuk tata naskah dinas elektronik, role, penomoran, arsip, TTE, dan korespondensi.

Tidak spesifik sebagai sistem manajemen perjalanan dinas operasional dengan kontrol biaya, bukti tugas, dan workflow faskes.

Sistem usulan harus bisa ekspor/arsip ke SRIKANDI atau mengikuti pola naskah dinas SRIKANDI.

e-SPPD Provinsi Kalimantan Utara

Menekankan SPT/SPPD satu pintu dan pembatasan penerbitan bila administrasi perjalanan sebelumnya belum selesai.

Implementasi spesifik provinsi dan tidak otomatis cocok dengan struktur Dinkes/faskes Kobar.

Perlu rule blocking: tidak boleh mengajukan SPPD baru bila laporan/bukti perjalanan sebelumnya belum selesai, dengan pengecualian pejabat berwenang.

Sistem e-SPPD berbasis web vendor

Fokus pada penomoran surat, penerbitan SPT, SPPD, kwitansi, pembiayaan, dan pelaporan.

Risiko vendor lock-in dan belum tentu sesuai AWCMS-Micro.

Fitur pembiayaan, kwitansi, dan laporan perlu dimasukkan ke fase lanjutan.

SIPD RI/Penatausaha an

Menjadi rujukan pengelolaan keuangan daerah dan pelaksanaan/p enatausahaan anggaran.

Tidak dirancang sebagai aplikasi operasional harian dinas luar internal per OPD.

Data SPPD harus siap dipetakan ke DPA, sub kegiatan, rekening, dan bukti penatausahaan.

Aplikasi SPPD hasil penelitian akademik/web internal

Umumnya memudahkan pembuatan SPPD, laporan perjalanan, dan arsip.

Biasanya belum lengkap untuk multi-level approval, tata naskah pemda, ABAC, QR validation, dan integrasi SPBE.

Dinkes Kobar perlu membangun sistem yang bukan hanya cetak dokumen, tetapi end-to-end workflow.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 5

Aplikasi/Praktik Pembanding Kekuatan Kelemahan/ Keterbatasan Pelajaran untuk Dinkes Kobar Google Form/Spreadsh eet manual

Cepat dibuat dan murah. Lemah pada audit trail, role approval, validasi, keamanan, nomor surat, dan arsip resmi.

Bisa dipakai sebagai fase transisi pendataan, tetapi bukan solusi utama.

Kesimpulan pembanding: aplikasi yang dibutuhkan Dinkes Kobar sebaiknya bukan sekadar “pencetak Surat Tugas/SPPD”, tetapi workflow engine perjalanan dinas dan bukti tugas yang terhubung dengan tata naskah, pembiayaan, bukti output, dan audit.

### 8. Proses Bisnis Umum

8. 1 Proses Inti

1. Perencanaan

o Unit mengidentifikasi kebutuhan tugas luar. o Menentukan dasar kegiatan: undangan, disposisi, program kerja, surat permintaan, jadwal pembinaan, monitoring, rapat, pelatihan, rujukan kegiatan, atau kebutuhan mendesak. o Menentukan jenis: tanpa biaya atau dengan SPPD. o Menentukan pelaksana, lokasi, tanggal, estimasi durasi, output, dan kebutuhan biaya.

2. Pengajuan

o Pemohon mengisi form. o Melampirkan dasar kegiatan. o Memilih peserta/pelaksana tugas. o Memilih sumber anggaran bila dengan SPPD. o Mengajukan ke atasan langsung.

3. Verifikasi Berjenjang

o Atasan langsung memeriksa kebutuhan, jadwal, pegawai, dan beban tugas. o Pejabat teknis memeriksa kesesuaian substansi. o Pejabat administrasi/keuangan memeriksa tata naskah, anggaran, dan biaya. o Pejabat akhir menyetujui penerbitan.

4. Penerbitan Dokumen

o Sistem menghasilkan Surat Tugas. o Bila berbiaya, sistem menghasilkan SPPD dan rincian biaya.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 6

o Nomor surat ditetapkan sesuai aturan penomoran. o Dokumen diberi QR code validasi.

5. Pelaksanaan Tugas

o Pelaksana menjalankan tugas. o Bila perlu, melakukan check-in lokasi, upload foto, daftar hadir, materi, notulen, atau dokumen pendukung.

6. Pelaporan dan Bukti

o Pelaksana wajib mengunggah laporan hasil tugas. o Bukti minimal disesuaikan dengan jenis tugas. o Untuk SPPD, bukti dapat mencakup SPPD yang ditandatangani tujuan, tiket, boarding pass, bukti penginapan, pengeluaran riil, dan dokumen lain sesuai aturan.

7. Verifikasi Hasil

o Atasan/operator memeriksa bukti. o Jika kurang lengkap, dikembalikan. o Jika lengkap, status menjadi selesai/arsip.

8. Monitoring dan Evaluasi

o Dashboard menampilkan jumlah usulan, status approval, perjalanan aktif, biaya, keterlambatan bukti, unit paling aktif, dan output kegiatan. o Data dapat digunakan untuk evaluasi manajemen.

### 9. Workflow Dinas Kesehatan

9. 1 Alur Normal Dinkes

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 7

flowchart TD A[Pegawai/Unit Mengajukan Usulan] --> B[Atasan Langsung Verifikasi] B -->|Setuju| C[Kepala Bidang/Kabid Verifikasi Teknis] B -->|Revisi/Tolak| A C -->|Setuju| D[Sekretaris Verifikasi Administrasi] C -->|Revisi/Tolak| A D -->|Tanpa Biaya| E[Kadis Menyetujui Surat Tugas] D -->|Dengan SPPD| F[Verifikasi Keuangan/Anggaran] F --> G[Kadis Menyetujui ST + SPPD] E --> H[Nomor Surat dan PDF Surat Tugas Terbit] G --> I[Nomor Surat, PDF Surat Tugas, PDF SPPD Terbit] H --> J[Pelaksanaan Tugas] I --> J J --> K[Upload Bukti dan Laporan Hasil] K --> L[Verifikasi Bukti] L -->|Lengkap| M[Selesai dan Arsip] L -->|Kurang| K

9. 2 Approval Dinkes

Tahap Role Fokus Pemeriksaan 1 Atasan langsung Kebutuhan tugas, ketersediaan pegawai, jadwal, relevansi tugas. 2 Kabid Kesesuaian program/kegiatan bidang, prioritas teknis, output. 3 Sekretaris Administrasi, tata naskah, koordinasi lintas bidang, kelayakan penerbitan. 4A Keuangan Hanya untuk SPPD: anggaran, standar biaya, DPA, komponen biaya. 4B Kadis Persetujuan akhir dan otorisasi penerbitan.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 8

Tahap Role Fokus Pemeriksaan 5 Operator surat Nomor surat, format dokumen, arsip digital. 6 Pelaksana Laporan hasil dan bukti tugas. 7 Atasan/operator Validasi bukti dan penyelesaian administrasi.

## 10. Workflow Faskes

### 10.1 Alur Normal Faskes

flowchart TD A[Pegawai Faskes Mengajukan Usulan] --> B[Atasan Langsung Verifikasi] B -->|Setuju| C[Atasan Seksi/Program/Koordinator Verifikasi] B -->|Revisi/Tolak| A C -->|Jika Ada Struktur Bidang Internal| D[Atasan Bidang/Koordinator Bidang Verifikasi] C -->|Jika Tidak Ada| E[Kepala TU/Administrasi Verifikasi] D --> E E --> F[Kepala Faskes Menyetujui] F --> G[Surat Tugas Terbit] F --> H[Jika Berbiaya, SPPD/Rincian Biaya Terbit Sesuai Kewenangan] G --> I[Pelaksanaan Tugas] H --> I I --> J[Upload Bukti dan Laporan] J --> K[Verifikasi Bukti] K -->|Lengkap| L[Selesai dan Arsip] K -->|Kurang| J

### 10.2 Approval Faskes

Tahap Role Fokus Pemeriksaan 1 Atasan langsung Kebutuhan tugas dan kesiapan pegawai.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 9

Tahap Role Fokus Pemeriksaan 2 Atasan seksi/program Kesesuaian program UKM/UKP/jejaring layanan. 3 Atasan bidang/koordinator bila ada Validasi teknis tambahan sesuai struktur faskes. 4 Kepala TU/operator administrasi Format, nomor, arsip, dan kelengkapan dokumen. 5 Kepala Faskes Persetujuan akhir penerbitan Surat Tugas/SPPD sesuai kewenangan. 6 Keuangan BLUD/BOK/JKN bila relevan Validasi sumber biaya dan bukti pertanggungjawaban.

### 11. Jenis Pengajuan

11. 1 Surat Tugas Tanpa Biaya

Digunakan untuk:

1. Rapat lokal tanpa klaim biaya.

2. Koordinasi internal.

3. Monitoring singkat tanpa komponen biaya.

4. Kegiatan dalam kantor lain yang tidak memerlukan biaya transport/uang

harian.

5. Tugas luar yang dibiayai pihak penyelenggara atau tidak membebani

APBD/BLUD.

Output:

1. Surat Tugas.

2. Laporan hasil tugas.

3. Bukti kegiatan.

Tidak menghasilkan:

1. Rincian biaya perjalanan.

2. SPPD.

3. Proses pertanggungjawaban keuangan.

11. 2 Surat Tugas dengan SPPD

Digunakan untuk:

1. Perjalanan luar daerah.

2. Perjalanan dalam daerah yang memenuhi ketentuan pembiayaan.

3. Diklat/pelatihan.

4. Pembinaan, monitoring, supervisi, atau kegiatan lain yang memerlukan biaya.

5. Kegiatan yang dibiayai DPA/BLUD/BOK/JKN/sumber sah lainnya.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 10

Output:

1. Surat Tugas.

2. SPPD/SPD.

3. Rincian biaya.

4. Laporan hasil tugas.

5. Bukti pertanggungjawaban.

11. 3 Tugas Mendadak/Urgent

Digunakan untuk:

1. Kejadian luar biasa.

2. Rujukan/evakuasi/penanganan kasus.

3. Permintaan mendadak pimpinan.

4. Supervisi kritis.

5. Kegiatan lintas sektor yang harus segera dihadiri.

Aturan khusus:

1. Wajib alasan urgensi.

2. Boleh diajukan backdate terbatas oleh role khusus.

3. Wajib persetujuan pejabat berwenang.

4. Wajib bukti tambahan kronologi.

5. Masuk laporan khusus untuk audit.

### 12. Business Rules

12. 1 Rule Umum

1. Semua Surat Tugas harus berasal dari usulan yang tercatat di sistem.

2. Surat Tugas tidak boleh diterbitkan sebelum approval minimum terpenuhi.

3. SPPD tidak boleh diterbitkan tanpa Surat Tugas.

4. Setiap pelaksanaan tugas wajib memiliki bukti hasil.

5. Usulan dapat dikembalikan untuk revisi pada setiap tahap.

6. Setiap perubahan setelah approval harus tercatat sebagai revisi versi.

7. Pembatalan tugas harus memiliki alasan.

8. Surat Tugas dan SPPD harus memiliki nomor unik.

9. Dokumen final tidak boleh diubah tanpa mekanisme addendum/revisi.

10. Semua aksi penting wajib masuk audit trail.

12. 2 Rule Validasi Jadwal

1. Pegawai tidak boleh memiliki dua tugas luar pada waktu yang sama, kecuali

role admin memberi override dengan alasan.

2. Sistem memberi peringatan jika pegawai sedang cuti, sakit, WFH, atau dinas

lain.

3. Tanggal berangkat tidak boleh melebihi tanggal kembali.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 11

4. Durasi perjalanan dihitung otomatis.

5. Tugas pada hari libur memerlukan alasan dan approval tambahan.

12. 3 Rule Keuangan/SPPD

1. Komponen biaya hanya muncul jika jenis pengajuan adalah ST + SPPD.

2. Standar biaya harus mengacu pada SSH/SBU yang berlaku.

3. Komponen biaya minimal:

o uang harian; o transport; o penginapan bila ada; o representasi bila berhak; o biaya riil bila diatur.

4. Sistem harus mencatat sumber dana:

o APBD; o BLUD; o BOK; o JKN; o sumber lain yang sah.

5. Sistem memberi peringatan bila pagu kegiatan tidak cukup.

6. Sistem memberi peringatan bila pelaksana memiliki pertanggungjawaban

perjalanan sebelumnya yang belum selesai.

7. Dokumen biaya tidak boleh final sebelum divalidasi role keuangan.

12. 4 Rule Bukti Hasil Tugas

Setiap tugas wajib memiliki minimal:

1. Laporan hasil tugas.

2. Foto atau dokumen pendukung.

3. Output kegiatan sesuai tujuan.

4. Catatan tindak lanjut.

5. Validasi atasan/operator.

Untuk SPPD, bukti tambahan dapat berupa:

1. SPPD yang sudah ditandatangani pejabat/tempat tujuan.

2. Tiket/boarding pass.

3. Bukti transport.

4. Bukti penginapan.

5. Daftar hadir.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 12

6. Undangan.

7. Surat keterangan/sertifikat.

8. Kuitansi/pengeluaran riil.

9. Dokumentasi kegiatan.

10. Laporan perjalanan dinas.

### 13. Kebutuhan Fungsional

13. 1 Modul Master Data

1. Master OPD/unit.

2. Master faskes.

3. Master pegawai.

4. Master jabatan.

5. Master struktur approval.

6. Master program/kegiatan/sub kegiatan.

7. Master rekening belanja.

8. Master standar biaya.

9. Master lokasi/tujuan.

10. Master template naskah.

11. Master nomor surat.

12. Master kategori tugas.

13. Master jenis bukti.

14. Master sumber dana.

15. Master kendaraan/transport.

13. 2 Modul Pengajuan

Fitur:

1. Buat usulan baru.

2. Pilih jenis: ST tanpa biaya atau ST + SPPD.

3. Pilih dasar kegiatan.

4. Upload undangan/disposisi/dokumen dasar.

5. Isi tujuan tugas.

6. Isi tanggal dan lokasi.

7. Pilih pelaksana.

8. Isi output yang diharapkan.

9. Pilih sumber anggaran bila berbiaya.

10. Simpan draft.

11. Submit ke approval.

12. Revisi usulan.

13. Batalkan usulan.

14. Duplikasi usulan lama sebagai draft baru.

15. Riwayat versi usulan.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 13

13. 3 Modul Approval

Fitur:

1. Inbox approval.

2. Detail pengajuan.

3. Approve.

4. Reject.

5. Return for revision.

6. Tambah catatan verifikasi.

7. Delegasi approval.

8. Approval massal terbatas.

9. Notifikasi approval.

10. Riwayat approval.

13. 4 Modul Surat Tugas

Fitur:

1. Generate nomor surat.

2. Generate dokumen PDF.

3. Preview dokumen.

4. Revisi draft sebelum final.

5. Finalisasi dokumen.

6. QR code validasi.

7. Arsip dokumen.

8. Cetak.

9. Download.

10. Kirim link dokumen.

11. TTE-ready.

12. Integrasi/ekspor ke SRIKANDI bila diperlukan.

13. 5 Modul SPPD

Fitur:

1. Generate SPPD dari Surat Tugas.

2. Isi pejabat pemberi perintah.

3. Isi pelaksana perjalanan.

4. Isi maksud perjalanan.

5. Isi alat angkut.

6. Isi tempat berangkat dan tujuan.

7. Isi lama perjalanan.

8. Isi tanggal berangkat/kembali.

9. Isi pembebanan anggaran.

10. Isi keterangan lain.

11. Generate rincian biaya.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 14

12. Generate pengeluaran riil.

13. Generate kuitansi bila fase lanjutan.

14. QR code validasi.

15. Arsip SPPD.

13. 6 Modul Bukti dan Laporan

Fitur:

1. Upload laporan hasil tugas.

2. Upload foto.

3. Upload PDF/Word/Excel.

4. Upload daftar hadir.

5. Upload materi.

6. Upload sertifikat.

7. Upload notulen.

8. Upload berita acara.

9. Upload SPPD bertanda tangan tujuan.

10. Upload bukti transport.

11. Upload bukti penginapan.

12. Upload bukti biaya riil.

13. Validasi bukti oleh atasan/operator.

14. Return bukti jika kurang lengkap.

15. Lock arsip setelah selesai.

13. 7 Modul Dashboard

Dashboard minimal:

1. Total usulan bulan ini.

2. Usulan menunggu approval.

3. Usulan disetujui.

4. Surat Tugas terbit.

5. SPPD terbit.

6. Tugas sedang berjalan.

7. Tugas selesai.

8. Tugas belum upload bukti.

9. Tugas terlambat pertanggungjawaban.

10. Total estimasi biaya.

11. Realisasi biaya.

12. Top unit pengusul.

13. Top lokasi tujuan.

14. Beban perjalanan per pegawai.

15. Rekap per bidang/faskes.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 15

13. 8 Modul Laporan

Laporan minimal:

1. Rekap Surat Tugas per bulan.

2. Rekap SPPD per bulan.

3. Rekap biaya per kegiatan.

4. Rekap biaya per sumber dana.

5. Rekap tugas per pegawai.

6. Rekap tugas per bidang/faskes.

7. Rekap tugas tanpa bukti.

8. Rekap tugas terlambat pertanggungjawaban.

9. Rekap tujuan perjalanan.

10. Rekap output/tindak lanjut.

11. Rekap monitoring pembinaan faskes.

12. Export Excel.

13. Export PDF.

14. Print-ready.

13. 9 Modul Notifikasi

Channel:

1. In-app notification.

2. Email.

3. WhatsApp gateway pada fase lanjutan.

4. Telegram pada fase lanjutan.

Trigger:

1. Usulan baru.

2. Approval dibutuhkan.

3. Usulan dikembalikan.

4. Usulan ditolak.

5. Usulan disetujui.

6. Surat terbit.

7. Bukti belum diunggah.

8. Bukti dikembalikan.

9. Deadline pertanggungjawaban mendekat.

10. Deadline terlewati.

### 14. Role dan Permission

Role Hak Akses Utama Super Admin Semua konfigurasi sistem. Admin Tim SIK Konfigurasi teknis, user, role, audit teknis.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 16

Role Hak Akses Utama Admin OPD Master data OPD, template, nomor, unit. Admin Faskes Master data faskes, pegawai faskes, arsip faskes. Pegawai/Pemohon Buat usulan, revisi, upload bukti miliknya. Atasan Langsung Verifikasi usulan bawahan. Kabid Verifikasi teknis bidang. Sekretaris Verifikasi administrasi Dinas. Kadis Approval akhir Dinas. Kepala Faskes Approval akhir faskes. Keuangan Validasi anggaran, biaya, SPPD, pertanggungjawaban. Operator Surat Nomor, template, dokumen final. Auditor/Inspektorat View-only, audit trail, laporan, sampling bukti. Viewer Pimpinan Dashboard dan laporan strategis.

### 15. Status Lifecycle

Status Arti Draft Usulan belum diajukan. Submitted Usulan sudah diajukan. Returned Dikembalikan untuk revisi. Rejected Ditolak. Supervisor Verified Disetujui atasan langsung. Technical Verified Disetujui pejabat teknis/Kabid/Koordinator. Secretary Verified Disetujui Sekretaris/Kepala TU. Finance Verified Komponen biaya disetujui keuangan. Final Approved Disetujui pejabat akhir. Document Issued Surat Tugas/SPPD sudah terbit. In Progress Tugas sedang/akan dilaksanakan. Evidence Submitted Bukti sudah diunggah. Evidence Returned Bukti dikembalikan. Evidence Verified Bukti diterima. Completed Tugas selesai lengkap. Archived Arsip final dikunci. Cancelled Dibatalkan.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 17

## 16. Data Model Awal

### 16.1 Tabel Utama

1. duty_requests

2. duty_request_participants

3. duty_request_destinations

4. duty_request_approvals

5. duty_request_budget_lines

6. duty_documents

7. duty_sppd

8. duty_sppd_costs

9. duty_evidences

10. duty_reports

11. duty_settlements

12. duty_numbering_sequences

13. duty_templates

14. duty_audit_logs

15. duty_notifications

### 16.2 Tabel Master

1. org_units

2. health_facilities

3. employees

4. positions

5. approval_chains

6. approval_chain_steps

7. budget_programs

8. budget_activities

9. budget_sub_activities

10. budget_accounts

11. cost_standards

12. locations

13. funding_sources

14. transport_modes

### 16.3 Relasi Inti

erDiagram duty_requests ||--o{ duty_request_participants : has duty_requests ||--o{ duty_request_destinations : has duty_requests ||--o{ duty_request_approvals : has duty_requests ||--o{ duty_documents : generates duty_requests ||--o{ duty_evidences : requires duty_requests ||--o{ duty_reports : has duty_requests ||--o{ duty_request_budget_lines : uses duty_documents ||--o| duty_sppd : may_generate

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 18

duty_sppd ||--o{ duty_sppd_costs : has org_units ||--o{ employees : contains health_facilities ||--o{ employees : contains approval_chains ||--o{ approval_chain_steps : contains

### 17. Template Dokumen

17. 1 Surat Tugas

Field minimal:

1. Kop naskah dinas.

2. Nomor.

3. Dasar.

4. Menugaskan.

5. Nama, NIP, pangkat/golongan, jabatan.

6. Maksud tugas.

7. Tempat tujuan.

8. Tanggal pelaksanaan.

9. Ketentuan pelaksanaan.

10. Penutup.

11. Pejabat penandatangan.

12. QR code validasi.

13. Metadata dokumen.

17. 2 SPPD

Field minimal:

1. Pejabat berwenang memberi perintah.

2. Nama pelaksana.

3. Pangkat/golongan.

4. Jabatan.

5. Maksud perjalanan dinas.

6. Alat angkut.

7. Tempat berangkat.

8. Tempat tujuan.

9. Lama perjalanan.

10. Tanggal berangkat.

11. Tanggal kembali.

12. Pembebanan anggaran.

13. Instansi.

14. Mata anggaran.

15. Keterangan lain.

16. Pengesahan tempat tujuan bila diperlukan.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 19

17. QR code validasi.

17. 3 Laporan Hasil Tugas

Field minimal:

1. Nomor Surat Tugas.

2. Nama pelaksana.

3. Waktu pelaksanaan.

4. Lokasi.

5. Tujuan kegiatan.

6. Uraian pelaksanaan.

7. Hasil yang dicapai.

8. Kendala.

9. Tindak lanjut.

10. Lampiran bukti.

11. Validasi atasan.

### 18. Kebutuhan Non-Fungsional

18. 1 Keamanan

1. Login aman.

2. MFA/2FA untuk role penting.

3. RBAC dan ABAC.

4. Audit trail immutable.

5. Enkripsi password.

6. Enkripsi data sensitif.

7. Validasi upload file.

8. Antivirus/malware scanning untuk file.

9. Rate limiting.

10. CSRF protection.

11. XSS protection.

12. SQL injection protection.

13. Secure headers.

14. Backup terenkripsi.

15. Principle of least privilege.

18. 2 Ketersediaan

Target awal:

1. Uptime minimal 99% pada jam kerja.

2. Backup harian.

3. Recovery point objective awal: 24 jam.

4. Recovery time objective awal: 4–8 jam.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 20

5. Log error terpusat.

18. 3 Performa

Target awal:

1. Halaman dashboard terbuka kurang dari 3 detik pada jaringan kantor normal.

2. Generate PDF kurang dari 10 detik.

3. Export Excel maksimal 30 detik untuk 10.000 baris.

4. Mendukung minimal 100 pengguna aktif bersamaan pada fase awal.

5. Pagination wajib untuk seluruh daftar data.

18. 4 Usability

1. Mobile responsive.

2. Form bertahap/wizard.

3. Status approval mudah dipahami.

4. Tersedia filter dan pencarian.

5. Tersedia contoh isian.

6. Error message jelas.

7. Tombol tindakan utama konsisten.

8. Tidak menampilkan terlalu banyak field untuk ST tanpa biaya.

9. Bahasa Indonesia formal pemerintahan.

10. Mode akses cepat untuk faskes.

18. 5 Auditability

1. Semua approval tercatat.

2. Semua revisi tercatat.

3. Semua dokumen memiliki versi.

4. Semua bukti memiliki timestamp.

5. Semua perubahan biaya tercatat.

6. Semua override harus memiliki alasan.

7. Auditor dapat melihat riwayat tanpa mengubah data.

### 19. Standar ISO dan Tata Kelola

19. 1 ISO/IEC 27001 dan 27002

Digunakan sebagai acuan Sistem Manajemen Keamanan Informasi:

1. Kebijakan keamanan informasi.

2. Kontrol akses.

3. Manajemen aset.

4. Keamanan SDM.

5. Keamanan operasional.

6. Keamanan komunikasi.

7. Pengembangan sistem aman.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 21

8. Manajemen insiden.

9. Audit dan peningkatan berkelanjutan.

19. 2 ISO/IEC 27005

Digunakan untuk manajemen risiko keamanan informasi:

1. Identifikasi aset.

2. Identifikasi ancaman.

3. Identifikasi kerentanan.

4. Penilaian kemungkinan dan dampak.

5. Perlakuan risiko.

6. Monitoring risiko.

19. 3 ISO/IEC 27701 dan ISO/IEC 29100

Digunakan untuk tata kelola privasi:

1. Data pegawai.

2. NIP.

3. Jabatan.

4. Riwayat perjalanan.

5. Bukti kegiatan.

6. Data lokasi.

7. Dokumen biaya.

19. 4 ISO/IEC 27017 dan 27018

Digunakan jika sistem di-hosting pada cloud:

1. Tanggung jawab cloud provider dan cloud customer.

2. Proteksi data pribadi di cloud.

3. Backup dan retensi.

4. Akses administrator.

5. Isolasi lingkungan.

19. 5 ISO/IEC 27034

Digunakan untuk keamanan aplikasi:

1. Secure coding.

2. Threat modeling.

3. Security testing.

4. Dependency scanning.

5. Secure deployment.

6. Vulnerability management.

19. 6 ISO/IEC 20000

Digunakan untuk manajemen layanan TI:

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 22

1. Helpdesk.

2. SLA.

3. Incident management.

4. Change management.

5. Release management.

6. Service request.

19. 7 ISO/IEC 22301

Digunakan untuk keberlanjutan layanan:

1. Business continuity plan.

2. Disaster recovery plan.

3. Backup.

4. Simulasi pemulihan.

5. Rencana layanan saat internet/koneksi terganggu.

19. 8 ISO/IEC 15408

Digunakan sebagai rujukan high-assurance security requirement jika sistem berkembang menjadi aplikasi strategis daerah:

1. Security target.

2. Protection profile.

3. Evaluation assurance.

4. Functional security requirement.

19. 9 Standar Tambahan

1. ISO 9001 — manajemen mutu.

2. ISO 31000 — manajemen risiko.

3. ISO/IEC 38500 — tata kelola TI.

4. ISO/IEC 25010 — kualitas perangkat lunak.

5. ISO 19011 — audit sistem manajemen.

6. OWASP ASVS — standar keamanan aplikasi web.

7. OWASP Top 10 — kontrol risiko aplikasi web umum.

### 20. Arsitektur Teknis

20. 1 Tech Stack

Basis:

1. AWCMS-Micro.

2. EmDash sebagai upstream CMS/application foundation.

3. TypeScript.

4. Astro untuk template/public bila diperlukan.

5. Plugin khusus awcms-micro-duty-travel.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 23

6. Database sesuai standar AWCMS-Micro.

7. Cloudflare-ready deployment bila diperlukan.

8. GitHub untuk version control dan issue tracking.

20. 2 Modul Plugin

Struktur konseptual:

packages/plugins/awcms-micro-duty-travel/ ├── src/ │ ├── admin/ │ ├── public/ │ ├── api/ │ ├── database/ │ ├── services/ │ ├── workflows/ │ ├── templates/ │ ├── permissions/ │ ├── reports/ │ └── tests/ ├── docs/ ├── README.md └── package.json

20. 3 Prinsip Implementasi

1. Tidak mengubah core EmDash.

2. Mengikuti boundary AWCMS-Micro.

3. Plugin modular.

4. Database migration jelas.

5. i18n siap Indonesia dan Inggris bila diperlukan.

6. Audit trail sejak awal.

7. Testable.

8. Dokumentasi lengkap.

9. Deployment script jelas.

10. API-first untuk integrasi.

### 21. Integrasi yang Disiapkan

Integrasi Tujuan Fase SRIKANDI Arsip/tata naskah/TTE/penomoran bila memungkinkan. Fase 2–3

BSrE/TTE Tanda tangan elektronik tersertifikasi. Fase 2 SIPD/Keuangan Referensi DPA, sub kegiatan, rekening, penatausahaan. Fase 3

SIMPEG/BKPSDM Data pegawai, jabatan, unit. Fase 2 e-Kinerja Konversi output tugas menjadi bahan kinerja. Fase 3

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 24

Integrasi Tujuan Fase WhatsApp Gateway Notifikasi approval dan deadline. Fase 2 Google Drive/S3/R2 Penyimpanan bukti dan backup. Fase 1–2 SATUSEHAT/RME tidak langsung Relevan hanya jika tugas terkait pembinaan/integrasi kesehatan. Opsional

### 22. Acceptance Criteria

22. 1 Pengajuan

1. Pegawai dapat membuat draft usulan.

2. Pegawai dapat memilih ST tanpa biaya atau ST + SPPD.

3. Sistem wajib menolak submit jika field wajib kosong.

4. Sistem menyimpan riwayat pengajuan.

5. Sistem mengirim notifikasi ke approver berikutnya.

22. 2 Approval

1. Approver hanya melihat usulan sesuai kewenangan.

2. Approver dapat menyetujui, menolak, atau mengembalikan.

3. Catatan approval wajib jika menolak/mengembalikan.

4. Sistem mencatat timestamp approval.

5. Status berubah otomatis sesuai tahap.

22. 3 Dokumen

1. Surat Tugas dapat di-generate dari data final.

2. SPPD hanya muncul untuk pengajuan berbiaya.

3. Nomor surat unik.

4. PDF memiliki QR code.

5. Dokumen final terkunci.

22. 4 Bukti

1. Pelaksana dapat upload bukti.

2. Sistem menolak format file berbahaya.

3. Bukti dapat diverifikasi.

4. Bukti kurang dapat dikembalikan.

5. Tugas tidak dapat completed sebelum bukti diterima.

22. 5 Dashboard

1. Pimpinan dapat melihat jumlah usulan dan status.

2. Sekretariat dapat melihat surat yang perlu diterbitkan.

3. Keuangan dapat melihat SPPD dan biaya.

4. Faskes hanya melihat data faskesnya.

5. Auditor dapat melihat audit trail.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 25

### 23. Contoh Implementasi Praktis

Contoh 1 — Rapat Koordinasi Tanpa Biaya

Pegawai Bidang P2P menghadiri rapat koordinasi di aula Setda tanpa klaim biaya.

Alur:

1. Pegawai membuat usulan ST tanpa biaya.

2. Atasan langsung menyetujui.

3. Kabid menyetujui.

4. Sekretaris memverifikasi.

5. Kadis menyetujui.

6. Surat Tugas terbit.

7. Pegawai upload foto kegiatan, undangan, daftar hadir, dan ringkasan hasil.

8. Atasan memverifikasi bukti.

9. Status completed.

Contoh 2 — Pembinaan Puskesmas dengan SPPD

Tim Dinkes melakukan pembinaan RME/SATUSEHAT ke Puskesmas di luar pusat pemerintahan.

Alur:

1. Tim SIK mengajukan ST + SPPD.

2. Melampirkan jadwal pembinaan.

3. Memilih peserta dan lokasi.

4. Mengisi sumber anggaran.

5. Approval atasan, Kabid/Sekretaris, Keuangan, Kadis.

6. ST dan SPPD terbit.

7. Setelah kegiatan, tim upload foto, daftar hadir, berita acara, materi, laporan

hasil, dan tindak lanjut.

8. Keuangan memverifikasi bukti SPPD.

9. Status completed.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 26

Contoh 3 — Faskes Mengikuti Pelatihan

Pegawai Puskesmas mengikuti pelatihan di Dinas Kesehatan.

Alur:

1. Pegawai faskes mengajukan ST.

2. Atasan program memverifikasi.

3. Kepala TU memeriksa administrasi.

4. Kepala Puskesmas menyetujui.

5. ST terbit.

6. Pegawai upload sertifikat, foto, dan laporan singkat.

7. Kepala TU/atasan memverifikasi bukti.

Contoh 4 — Tugas Urgent KLB

Tim surveilans harus turun lapangan mendadak karena sinyal KLB.

Alur:

1. Operator/pegawai membuat pengajuan urgent.

2. Mengisi alasan urgensi.

3. Approval cepat oleh atasan/Kabid/Kadis.

4. ST urgent terbit.

5. Jika berbiaya, SPPD menyusul sesuai ketentuan.

6. Bukti wajib: kronologi, foto, laporan investigasi, daftar kontak, dan

rekomendasi tindak lanjut.

7. Masuk laporan khusus urgent.

Contoh 5 — Tugas Faskes dengan Biaya BLUD/BOK

Pegawai faskes melakukan kunjungan lapangan program UKM dengan sumber dana BOK/BLUD.

Alur:

1. Pegawai membuat usulan ST + SPPD.

2. Atasan langsung memverifikasi.

3. Koordinator program memverifikasi.

4. Kepala TU memeriksa anggaran dan format.

5. Kepala Faskes menyetujui.

6. Dokumen terbit.

7. Pegawai upload bukti kegiatan, laporan, dan bukti biaya.

8. Pengelola keuangan faskes memverifikasi.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 27

### 24. Risiko dan Mitigasi

Risiko Dampak Mitigasi Struktur approval berbeda antar faskes Sistem sulit dipakai merata Approval chain dibuat konfigurabel. Regulasi perjalanan dinas berubah Format dan biaya tidak sesuai Master regulasi/standar biaya dibuat versioned. Pegawai lambat upload bukti Pertanggungjawaban tertunda Reminder otomatis dan blocking pengajuan baru. Nomor surat tidak sinkron Arsip kacau Modul numbering terpusat dan role operator surat. Data pegawai tidak akurat Approval salah Integrasi/sinkronisasi SIMPEG atau master pegawai rutin. Dokumen resmi perlu TTE Dokumen digital belum sepenuhnya sah

Fase integrasi BSrE/SRIKANDI.

Internet faskes terbatas Penggunaan terhambat Form ringan, autosave, dan opsi upload bertahap. Resistensi pengguna Implementasi lambat Pilot, pelatihan, SOP, video tutorial, helpdesk. File bukti terlalu besar Storage membengkak Kompresi, limit file, object storage, lifecycle policy. Audit menemukan override tanpa alasan Risiko kepatuhan Override wajib alasan dan approval tambahan.

### 25. Roadmap Implementasi

Fase 0 — Telaahan dan Validasi Proses Bisnis

Durasi: 1–2 minggu

Output:

1. Telaahan staf.

2. PRD final.

3. SOP awal.

4. Matriks approval Dinas dan faskes.

5. Template Surat Tugas dan SPPD.

6. Daftar regulasi final.

7. Daftar kebutuhan integrasi.

Fase 1 — MVP

Durasi: 4–6 minggu

Output:

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 28

1. Master data.

2. Pengajuan ST tanpa biaya.

3. Pengajuan ST + SPPD sederhana.

4. Approval Dinas.

5. Approval faskes.

6. Generate PDF Surat Tugas.

7. Generate PDF SPPD.

8. Upload bukti.

9. Dashboard dasar.

10. Audit trail.

Fase 2 — Pilot

Durasi: 4 minggu

Pilot:

1. Sekretariat Dinkes.

2. Tim SIK.

3. Satu bidang teknis.

4. Dua faskes representatif.

Output:

1. Feedback pengguna.

2. Perbaikan UX.

3. Penyesuaian template.

4. Penyesuaian approval chain.

5. SOP penggunaan.

Fase 3 — Integrasi dan Keuangan Lanjutan

Durasi: 6–8 minggu

Output:

1. Rincian biaya lebih lengkap.

2. Validasi standar biaya.

3. Export laporan keuangan.

4. Integrasi TTE/SRIKANDI bila siap.

5. Integrasi notifikasi WhatsApp.

6. Monitoring pertanggungjawaban.

Fase 4 — Rollout Kabupaten/Faskes

Durasi: bertahap

Output:

1. Semua faskes aktif.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 29

2. Dashboard pimpinan.

3. Helpdesk.

4. Training.

5. Evaluasi bulanan.

6. Audit sampling.

### 26. KPI Keberhasilan

KPI Target Awal Persentase Surat Tugas dibuat melalui aplikasi 80% dalam 3 bulan pilot.

Waktu rata-rata approval ST tanpa biaya Turun minimal 50%. Waktu rata-rata penerbitan ST + SPPD Turun minimal 40%. Tugas dengan bukti lengkap Minimal 90%. Keterlambatan upload bukti Turun minimal 60%. Dokumen yang dapat ditelusuri QR/audit trail 100%.

Unit/faskes aktif menggunakan aplikasi Minimal 5 unit pilot, lalu bertahap semua. Kepuasan pengguna Minimal 80% puas/cukup puas.

### 27. Kebutuhan Dokumen Pendukung

1. Telaahan staf kepada Kadis.

2. SOP pengajuan Surat Tugas.

3. SOP pengajuan SPPD.

4. SOP verifikasi berjenjang Dinas.

5. SOP verifikasi berjenjang faskes.

6. SOP upload bukti hasil tugas.

7. SOP revisi/pembatalan tugas.

8. SOP admin aplikasi.

9. SOP backup dan restore.

10. SOP keamanan akses.

11. SK Tim Pengelola Aplikasi.

12. SK/Surat Edaran implementasi aplikasi.

13. Format Surat Tugas.

14. Format SPPD.

15. Format laporan hasil tugas.

16. Format checklist bukti.

17. Manual pengguna.

18. Manual admin.

19. Video tutorial singkat.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 30

20. Form evaluasi pilot.

### 28. Rekomendasi Keputusan Awal untuk Kadis

Keputusan yang perlu diminta dari Kadis:

1. Menyetujui penyusunan telaahan staf dan PRD final.

2. Menetapkan aplikasi ini sebagai pilot otomasi administrasi dinas luar Dinkes

Kobar.

3. Menunjuk Tim SIK sebagai pengembang/koordinator teknis.

4. Menunjuk Sekretariat sebagai owner proses bisnis administrasi.

5. Menunjuk Subbag Keuangan sebagai owner validasi SPPD/biaya.

6. Menunjuk perwakilan bidang dan faskes sebagai user pilot.

7. Menugaskan validasi format tata naskah dengan Bagian Hukum/Umum.

8. Menugaskan koordinasi integrasi SPBE dengan Diskominfo.

9. Menugaskan koordinasi keuangan dengan BPKAD/BKAD bila perlu.

10. Menyetujui roadmap pilot selama 2–3 bulan.

### 29. Kesimpulan

Aplikasi ini layak dikembangkan karena menjawab kebutuhan nyata manajemen Dinas Kesehatan dan faskes dalam mengelola tugas luar, Surat Tugas, SPPD, bukti hasil kegiatan, dan pertanggungjawaban secara terintegrasi.

Nilai utama aplikasi:

1. Tertib administrasi.

2. Efisiensi waktu.

3. Transparansi approval.

4. Akuntabilitas biaya.

5. Bukti tugas terdokumentasi.

6. Dashboard pimpinan.

7. Mendukung SPBE.

8. Siap integrasi tata naskah dan TTE.

9. Mengurangi risiko temuan audit.

10. Menjadi fondasi digitalisasi operasional Dinkes Kobar.

Disusun oleh Unggul Cahya Saputra, Koord. Tim SIK & Praktisi AhliWeb.com | halaman 31