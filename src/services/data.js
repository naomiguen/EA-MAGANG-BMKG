// src/data/useCaseData.js

export const appData = [
  {
    id: "eoffice",
    title: "E-Office BMKG",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/eoffice.png",
    description: "Aplikasi ini fokus pada pengelolaan persuratan dinas (Tata Naskah Dinas Elektronik) secara digital.",
    diagramUrl: "/ucd/E-Office-BMKG.drawio.svg", 
    useCaseDetails: {
      "11": { title: "Login", description: "Pegawai masuk ke sistem menggunakan akun SSO BMKG." },
      "22": { title: "Melakukan Presensi", description: "Fitur untuk melakukan absen masuk dan pulang secara real-time berdasarkan lokasi dan jam yang telah ditentukan." },
      "33": { title: "Lihat Laporan Presensi", description: "Melihat rekapitulasi kehadiran pegawai dalam kurun waktu tertentu." },
      "44": { title: "Unduh DRH", description: "Mengunduh dokumen Daftar Riwayat Hidup pegawai secara otomatis." },
      "555": { title: "Data Kepegawaian", description: "Menampilkan informasi detail jabatan, pangkat, dan unit kerja." },
      "66": { title: "Data Kinerja", description: "Memantau capaian kinerja harian dan penilaian SKP." },
      "77": { title: "Data Keluarga", description: "Menampilkan data anggota keluarga yang terdaftar di sistem." },
      "88": { title: "Data Kompetensi", description: "Menampilkan riwayat pelatihan, sertifikasi, dan pendidikan." },
      "10": { title: "Cuti Tahunan", description: "Informasi sisa kuota cuti dan status pengajuan cuti pegawai." }
    }
  },
  {
    id: "soft",
    title: "BMKGSoft",
    description: "Aplikasi ini berfungsi menggantikan pencatatan manual (Buku ME-48), melakukan perhitungan parameter cuaca secara otomatis (koreksi barometer, kelembaban, dll), serta mengubah data menjadi format sandi baku (SYNOP, METAR) sebelum dikirimkan melalui sistem CMSS.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logobmkg.png",
    diagramUrl: "/ucd/ucd-bmkgsoft.svg",
    useCaseDetails: {
      "01": { title: "Login", description: "Otentikasi pengguna (Observer, Admin, Forecaster) untuk masuk ke dalam sistem BMKGSoft." },
      "02": { title: "Input Data Sinoptik (SYNOP)", description: "Memasukkan data pengamatan cuaca permukaan secara jam-jaman untuk keperluan sandi SYNOP." },
      "03": { title: "Input Data Penerbangan (METAR/SPECI)", description: "Memasukkan data cuaca khusus bandara untuk laporan rutin (METAR) atau cuaca buruk (SPECI) demi keselamatan penerbangan." },
      "04": { title: "Input Data Angin Atas (PIBAL)", description: "Mencatat hasil pengamatan arah dan kecepatan angin lapisan atas menggunakan balon pilot." },
      "05": { title: "Auto-fill Data AWS", description: "Fitur otomatisasi pengisian data formulir yang ditarik langsung dari sensor Automatic Weather Station (AWS)." },
      "06": { title: "Input Data Klimatologi", description: "Memasukkan data unsur iklim seperti penguapan (Open Pan) dan lamanya penyinaran matahari." },
      "07": { title: "Verifikasi Data Observasi", description: "Proses validasi dan pengecekan kualitas data (Quality Control) sebelum data dikirim atau disimpan permanen." },
      "08": { title: "Melihat Grafik Meteorogram", description: "Menampilkan visualisasi tren perubahan unsur cuaca (suhu, tekanan, angin) dalam bentuk grafik time-series." },
      "09": { title: "Melihat Data Tabel Harian", description: "Menampilkan rekapitulasi seluruh data pengamatan dalam satu hari penuh dalam format tabelaris (FKL)." },
      "10": { title: "Manajemen User", description: "Pengaturan akun pengguna, peran (role), dan hak akses untuk keamanan aplikasi." },
      "11": { title: "Kelola Metadata Stasiun", description: "Pengaturan informasi dasar stasiun seperti koordinat, elevasi, dan daftar peralatan yang terpasang." }
    }
  },
  {
    id: "syn",
    title: "Synergie",
    description: "Aplikasi ini digunakan sebagai alat bantu analisis meteorologi untuk menyusun berbagai produk layanan cuaca, antara lain pembuatan prakiraan cuaca, penyusunan produk penerbangan, dan analisis data satelit & radar",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logobmkg.png",
    diagramUrl: "/ucd/ucd-synergie.svg",
    useCaseDetails: {
      // --- Bagian Atas (Forecaster/Prakirawan) ---
      "01": { title: "Melakukan visualisasi peta cuaca", description: "Menampilkan lapisan (layer) data meteorologi seperti citra satelit, radar, dan model cuaca di atas peta digital interaktif." },
      "02": { title: "Monitoring dashboard operasional", description: "Memantau ringkasan status cuaca terkini dan parameter kritis stasiun dalam satu tampilan layar terpusat (widget view)." },
      "03": { title: "Monitoring peringatan dini", description: "Melacak wilayah yang terdeteksi memiliki potensi cuaca ekstrem (warning/alert) berdasarkan ambang batas parameter tertentu." },
      "04": { title: "Monitoring cuaca penerbangan", description: "Memantau kondisi cuaca spesifik di area bandara (Aerodrome) dan jalur penerbangan untuk mendukung keselamatan navigasi udara." },
      "05": { title: "Melihat buletin cuaca", description: "Membaca dan menganalisis data pengamatan mentah berupa teks sandi (SYNOP, METAR, SPECI) yang dikirim dari stasiun lain." },
      "06": { title: "Menjalankan makro analysis", description: "Mengeksekusi serangkaian perintah otomatis (script) untuk membuka kombinasi peta dan data analisis rutin dengan satu kali klik." },

      // --- Bagian Bawah (Admin) ---
      "07": { title: "Mengelola preferensi sistem", description: "Mengatur konfigurasi global aplikasi seperti penetapan zona waktu, satuan pengukuran default, dan hak akses pengguna." },
      "08": { title: "Konfigurasi sumber data eksternal", description: "Menghubungkan aplikasi Synergie dengan server data luar (seperti WMS/Web Map Service) untuk menambah lapisan informasi peta." },
      "09": { title: "Mengelola peta dasar", description: "Menambah, menghapus, atau memperbarui peta latar belakang (Basemap) seperti peta topografi, jalan, atau batas administrasi." },
      "10": { title: "Melakukan konversi unit", description: "Menggunakan alat bantu utilitas sistem untuk mengubah satuan parameter cuaca (misal: Knots ke km/jam) secara akurat." },
      "11": { title: "Akses konsol sistem", description: "Membuka antarmuka baris perintah (Command Line Interface) untuk keperluan maintenance, debugging, atau pengaturan tingkat lanjut." }
    }
  },
  {
    id: "nowcasting",
    title: "Nowcasting",
    description: "Aplikasi ini digunaakan untuk peringatan dini cuaca jangka sangat pendek yang digunakan oleh unit Data dan Informasi (Datin) untuk mendeteksi potensi cuaca ekstrem.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logobmkg.png",
    diagramUrl: "/ucd/UC-nowcasting.svg",
    useCaseDetails: {
      "a": { title: "Share Peringatan", description: "Pengunjung umum dapat membagikan informasi peringatan melalui media sosial atau platform lain" },
      "b": { title: "Melihat Informasi Tanya Jawab", description: "Pengunjung umum dapat melihat informasi tanya jawab (FAQ) yang tersedia di sistem" },
      "c": { title: "Filter Berdasarkan Wilayah", description: "Pengunjung umum dapat memfilter informasi atau data berdasarkan wilayah geografis tertentu" },
      "d": { title: "Melihat Detail Peringatan Dini", description: "Pengunjung umum dapat melihat informasi detail tentang peringatan dini bencana atau cuaca" },
      "e": { title: "Manajemen User", description: "Admin dapat mengelola data pengguna sistem termasuk menambah, mengubah, atau menghapus akun pengguna" },
      "f": { title: "Backup Data", description: "Admin dapat melakukan backup data sistem secara berkala untuk keamanan dan pemulihan data" },
      "g": { title: "Login", description: "Admin dan Prakirawan dapat masuk ke sistem menggunakan kredensial yang valid" },
      "h": { title: "Menentukan Waktu Berlaku Peringatan", description: "Prakirawan dapat menentukan dan mengatur waktu berlaku suatu peringatan cuaca atau bencana" },
      "i": { title: "Publish Peringatan", description: "Prakirawan dapat mempublikasikan peringatan cuaca atau bencana kepada publik" },
      "j": { title: "Update Peringatan", description: "Prakirawan dapat memperbarui informasi peringatan yang sudah dipublikasikan" },
      "k": { title: "Monitoring Cuaca Real-time", description: "Prakirawan dapat memonitor kondisi cuaca secara real-time untuk analisis dan pengambilan keputusan" },
      "l": { title: "Melihat Peta Peringatan", description: "Pengunjung umum dapat melihat peta yang menampilkan lokasi dan jenis peringatan cuaca" },
      "m": { title: "Mencari Lokasi", description: "Pengunjung umum dapat mencari lokasi tertentu pada peta untuk melihat informasi cuaca" },
      "n": { title: "Melihat Wilayah Nowcasting Aktif", description: "Pengunjung umum dapat melihat wilayah yang sedang aktif dalam sistem nowcasting" },
      "o": { title: "Melihat Infografis Nowcasting", description: "Pengunjung umum dapat melihat infografis yang menjelaskan data nowcasting secara visual" },
      "p": { title: "Download Infografis", description: "Pengunjung umum dapat mengunduh infografis nowcasting untuk keperluan pribadi" },
      "q": { title: "Input Data Nowcasting", description: "Prakirawan dapat memasukkan data nowcasting ke dalam sistem untuk analisis dan publikasi" },
      "r": { title: "Drawing Polygon Area", description: "Prakirawan dapat menggambar area polygon pada peta untuk menentukan wilayah peringatan" },
      "s": { title: "Validasi Data Radar", description: "Prakirawan dapat memvalidasi data radar yang masuk untuk memastikan akurasi informasi" },
      "t": { title: "Membuat Peringatan Dini Baru", description: "Prakirawan dapat membuat peringatan dini baru berdasarkan analisis data cuaca terkini" },
      "u": { title: "Menentukan Wilayah Peringatan Dini", description: "Prakirawan dapat menentukan wilayah geografis yang akan menerima peringatan dini" },
    }
  },
  {
    id: "sapk",
    title: "MY SAPK BKN",
    description: "Aplikasi  dari BKN untuk memudahkan PNS mengakses data kepegawaian, layanan, hingga pemutakhiran data mandiri secara daring, mencakup profil PNS, KPE Virtual, notifikasi layanan kenaikan pangkat/pensiun, serta data pendukung lainnya seperti BPJS dan Taspen, demi menciptakan data kepegawaian nasional yang lebih akurat. ",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logo-sapk-bkn.png",
    diagramUrl: "/ucd/ucd-my-sapk-bkn.svg",
    useCaseDetails: {
      // --- Bagian Kiri (Pegawai ASN) ---
      "01": { title: "Update riwayat CPNS/PNS", description: "Memperbarui atau memperbaiki data Surat Keputusan (SK) pengangkatan Calon PNS dan PNS jika terdapat kesalahan input." },
      "02": { title: "Update riwayat Diklat/Kursus", description: "Menambahkan data sertifikat pelatihan fungsional, teknis, atau struktural yang baru saja diikuti untuk pengembangan kompetensi." },
      "03": { title: "Update riwayat golongan", description: "Memperbarui data kepangkatan terakhir (Golongan/Ruang) sesuai dengan SK Kenaikan Pangkat terbaru." },
      "04": { title: "Update riwayat jabatan", description: "Memutakhirkan informasi jabatan struktural atau fungsional saat ini jika terjadi mutasi, promosi, atau rotasi." },
      "05": { title: "Update riwayat keluarga", description: "Menambahkan atau mengubah data pasangan (suami/istri) dan anak guna keperluan administrasi tunjangan keluarga." },
      "06": { title: "Update riwayat pendidikan", description: "Mencatat gelar pendidikan formal terbaru yang diperoleh melalui Tugas Belajar atau Izin Belajar." },
      "07": { title: "Update riwayat penghargaan", description: "Memasukkan data tanda jasa atau Satyalancana Karya Satya yang diterima dari pemerintah." },
      "08": { title: "Update riwayat organisasi", description: "Menambahkan pengalaman keaktifan dalam organisasi profesi atau kemasyarakatan yang relevan." },
      "09": { title: "Melihat riwayat pengajuan", description: "Memantau status usulan pemutakhiran data (apakah masih 'Input', 'Verifikasi Instansi', atau sudah 'Disetujui')." },
      "10": { title: "Melihat profil saya", description: "Menampilkan ringkasan data diri utama pegawai (NIP, Nama, Unit Kerja) dalam satu kartu identitas digital." },
      "11": { title: "Melihat notifikasi", description: "Menerima pesan sistem mengenai status persetujuan atau penolakan atas data yang telah diajukan." },
      "12": { title: "Mengelola dokumen saya", description: "Mengunggah dan menyimpan arsip digital dokumen penting (KTP, KK, SK, NPWP) ke penyimpanan cloud BKN." },
      "13": { title: "Melihat kompetensi dan performa", description: "Menampilkan skor hasil asesmen kompetensi (CAT) dan nilai kinerja tahunan (SKP) yang terintegrasi." },
      "14": { title: "Membaca berita terbaru", description: "Mengakses informasi terkini, regulasi baru, dan pengumuman resmi terkait kepegawaian dari BKN Pusat." },

      // --- Bagian Kanan (Verifikator Instansi & Pusat) ---
      "15": { title: "Verifikasi usulan PDM", description: "Admin instansi memeriksa kesesuaian data dan dokumen yang diajukan pegawai sebelum diteruskan ke database nasional." },
      "16": { title: "Monitoring progres PDM instansi", description: "Memantau statistik persentase pegawai yang sudah menyelesaikan Pemutakhiran Data Mandiri di lingkup instansi." },
      "17": { title: "Persetujuan akhir", description: "Otorisasi final oleh BKN Pusat untuk perubahan data yang bersifat krusial/sensitif (seperti Tanggal Lahir atau TMT Pangkat)." }
    }
  },
  {
    id: "sakti",
    title: "SAKTI (Sistem Aplikasi Keuangan Tingkat Instansi)",
    description: "Aplikasi terintegrasi dari Kementerian Keuangan untuk mengelola seluruh siklus keuangan negara bagi Satuan Kerja (Satker) pemerintah, mencakup perencanaan, pelaksanaan, hingga pertanggungjawaban anggaran secara digital, mengintegrasikan semua modul keuangan dalam satu sistem dengan konsep single database dan single entry point untuk meningkatkan efisiensi, transparansi, dan akuntabilitas pengelolaan APBN. ",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logosakti.png",
    diagramUrl: "/ucd/SAKTI.drawio.svg",
    useCaseDetails: {
      "111": { title: "Mendaftarkan User dan Role", description: "Mengelola data user, pendaftaran role, dan hak akses aplikasi." },
      "222": { title: "Melakukan Pencadangan Data", description: "Melakukan pencadangan dan pemulihan data referensi serta transaksi." },
      "333": { title: "Menyusun draf RKAKL, SBK, KBJM ", description: "Penyusunan Rencana Kerja Anggaran, yaitu draf RKAKL, SBK, dan KPJM." },
      "444": { title: "Mengajukan Revisi Anggaran", description: "Melakukan proses revisi anggaran dengan fitur locking pagu." },
      "555": { title: "Menyusun Dokumen Pelaksanaan Anggaran", description: "Menyusun dokumen pelaksanaan, yaitu mengelola DIPA dan POK." },
      "666": { title: "Mengelola Data Penerima Pembayaran", description: "Manajemen Supplier: Mengelola data penerima pembayaran untuk didaftarkan ke SPAN melalui KPPN." },
      "7777": { title: "Mengelola Data Kontrak", description: "Manajemen Kontrak: Mengelola data perikatan dengan pihak ketiga." },
      "777": { title: "Mencatat Berita Acara Serah Terima", description: "Mencatat Berita Acara Serah Terima untuk mengakui aset dan utang saat serah terima barang/jasa." },
      "888": { title: "Membuat Surat Perintaan Pembayaran", description: "Membuat Surat Permintaan Pembayaran (SPP) berdasarkan komitmen yang ada." },
      "999": { title: "Menerbitkan Surat Perintah Membayar (SPM)", description: "Memvalidasi dan menerbitkan Surat Perintah Membayar untuk diajukan ke KPPN." },
      "100": { title: "Mencatat Transaksi Uang Persediaan (UP)", description: "Menatausahakan Uang Persediaan (UP) dan Tambahan Uang Persediaan (TUP)." },
      "101": { title: "Memungut dan Menyetor Pajak", description: "Melakukan pemotongan atau pungutan pajak atas transaksi." },
      "102": { title: "Mencetak Laporan Pertanggungjawaban (LPJ)", description: "Menghasilkan Laporan Pertanggungjawaban (LPJ) Bendahara." },
      "103": { title: "Mencatat Setoran PNBP", description: "Mencatat bukti setoran pendapatan dan pengembalian belanja." },
      "104": { title: "Melakukan Rekonsiliasi Data", description: "Melakukan proses rekonsiliasi data dengan KPPN dan konsolidasi laporan." },
      "105": { title: "Mencetak Laporan Keuangan (LRA/Neraca)", description: "Menghasilkan Laporan Operasional (LO), Laporan Perubahan Ekuitas (LPE), Neraca, dan Laporan Realisasi Anggaran (LRA)." },
      "106": { title: "Mencatat Barang Persediaan Masuk", description: "Melakukan pencatatan barang masuk dengan metode perpetual." },
      "107": { title: "Mencatat Barang Pemakaian (Keluar)", description: "Melakukan pencatatan barang keluar dengan metode perpetual." },
      "108": { title: "Menilai Persediaan", description: "Menilai aset barang menggunakan metode Harga Beli Terakhir atau Rata-rata (Average)." },
      "109": { title: "Mencatat Transaksi Mutasi BMN", description: "Mencatat semua transaksi mutasi BMN (Perolehan, Perubahan, Penghapusan)." },
      "110": { title: "Menghitung Penyusutan Aset Tetap", description: "Melakukan penghitungan penyusutan aset tetap dengan metode Garis Lurus." },
    }
  },
  {
    id: "saiba",
    title: "SAIBA (Sistem Akuntansi Instansi)",
    description: "Aplikasi  dari BKN untuk memudahkan PNS mengakses data kepegawaian, layanan, hingga pemutakhiran data mandiri secara daring, mencakup profil PNS, KPE Virtual, notifikasi layanan kenaikan pangkat/pensiun, serta data pendukung lainnya seperti BPJS dan Taspen, demi menciptakan data kepegawaian nasional yang lebih akurat. ",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logosaibe.jpg",
    diagramUrl: "/ucd/SAIBAA.drawio.svg",
    useCaseDetails: {
      "UC-001": { title: "Melengkapi Data Profil Satuan Kerja", description: "Operator mengisi dan memperbarui identitas satuan kerja seperti kode satker, nama instansi, alamat, dan informasi administratif lain. Data ini menjadi dasar identifikasi laporan keuangan dan wajib konsisten dengan data pusat.." },
      "UC-002": { title: "Mengambil Data Keuangan", description: "Fitur ini digunakan untuk mengambil atau memasukkan data keuangan ke dalam sistem SAIBA. Data keuangan yang diambil mencakup transaksi pendapatan dan belanja yang akan diolah menggunakan prinsip akuntansi berbasis akrual. Data ini menjadi dasar dalam proses pencatatan dan penyusunan laporan keuangan." },
      "UC-003": { title: "Menarik Data Aset", description: "Fitur ini digunakan untuk menarik data aset tetap dari sistem lain, seperti SIMAK, ke dalam sistem SAIBA. Data aset yang diperoleh akan digunakan untuk pencatatan aset dan penyusunan neraca pada laporan keuangan satuan kerja." },
      "UC-004": { title: "Login Sistem", description: "Fitur ini digunakan untuk melakukan autentikasi pengguna sebelum masuk ke dalam aplikasi SAIBA. Operator harus memasukkan username dan kata sandi yang valid agar dapat mengakses seluruh fungsi sistem sesuai dengan hak akses yang dimilikinya. Fitur ini memastikan bahwa hanya pengguna yang berwenang yang dapat mengelola data keuangan satuan kerja." },
      "UC-005": { title: "Memposting Data", description: "Fitur ini digunakan untuk memposting data transaksi yang telah diinput ke dalam sistem ke buku besar. Proses posting menandakan bahwa data keuangan telah diproses secara resmi dan siap digunakan dalam penyusunan laporan keuangan." },
      "UC-006": { title: "Mencetak Laporan Keuangan", description: "Fitur ini digunakan untuk mencetak laporan keuangan yang dihasilkan oleh sistem SAIBA, seperti laporan realisasi anggaran dan neraca. Laporan yang dicetak dapat digunakan sebagai arsip atau bahan pelaporan internal." },
      "UC-007": { title: "Mengirim Data ke Pusat", description: "Fitur ini digunakan untuk mengirimkan data keuangan satuan kerja ke sistem pusat. Pengiriman data dilakukan sebagai bagian dari proses konsolidasi laporan keuangan dan pertanggungjawaban keuangan kepada instansi yang lebih tinggi." },
      "UC-008": { title: "Melihat Laporan", description: "Fitur ini digunakan oleh kepala satuan kerja untuk melihat laporan keuangan yang telah disusun oleh sistem. Kepala satuan kerja hanya dapat melihat informasi laporan tanpa melakukan perubahan terhadap data keuangan." },
      "UC-009": { title: "Mendownload Laporan", description: "Fitur ini digunakan oleh kepala satuan kerja untuk mengunduh laporan keuangan dalam format tertentu. Laporan yang diunduh dapat digunakan untuk keperluan evaluasi, pelaporan, atau dokumentasi." },
      "UC-010": { title: "Menyediakan Data", description: "Fitur ini menggambarkan peran sistem eksternal, yaitu SAS dan SIMAK, dalam menyediakan data yang dibutuhkan oleh sistem SAIBA. Data yang disediakan akan diintegrasikan dan diolah lebih lanjut untuk mendukung proses akuntansi dan pelaporan keuangan." }
    }  
  },
  {
    id: "simakbmn",
    title: "SIMAK-BMN (Sistem Informasi Manajemen dan Akuntansi Barang Milik Negara)",
    description: "Aplikasi terpadu dari Kementerian Keuangan untuk mengelola, mencatat, dan melaporkan seluruh siklus hidup Barang Milik Negara (BMN) di instansi pemerintah, mulai dari pengadaan, mutasi, hingga penghapusan untuk mendukung penyusunan laporan keuangan yang akuntabel dan akurat melalui proses komputarisasi data aset negara.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logo-simak-bmn.png",
    diagramUrl: "/ucd/ucd-simak-bmn.svg",
    useCaseDetails: {
      // --- Bagian Kiri (Operator BMN - Transaksi & Laporan) ---
      "01": { title: "Input saldo awal BMN", description: "Memasukkan data nilai aset dari periode sebelumnya sebagai pembuka pembukuan tahun berjalan." },
      "02": { title: "Input perolehan BMN", description: "Mencatat aset yang baru didapat, baik melalui pembelian, hibah masuk, atau transfer masuk." },
      "03": { title: "Input konstruksi dalam pengerjaan (KDP)", description: "Mencatat aset berupa bangunan atau gedung yang proses pembangunannya belum selesai pada tahun berjalan." },
      "04": { title: "Input perubahan BMN", description: "Mengupdate data aset yang mengalami perubahan nilai akibat renovasi, penilaian kembali (revaluasi), atau koreksi." },
      "05": { title: "Input penghapusan BMN", description: "Mengeluarkan aset dari daftar inventaris aktif karena dijual (lelang), dimusnahkan, atau diserahkan ke pihak lain." },
      "06": { title: "Input usulan barang rusak/hilang", description: "Melaporkan status barang yang rusak berat atau hilang untuk diproses penghapusannya dari neraca." },
      "07": { title: "Input penghentian BMN", description: "Mengubah status aset menjadi tidak aktif sementara waktu (penghentian dari penggunaan operasional)." },
      "08": { title: "Cek kartu identitas barang (KIB)", description: "Mengelola dan memverifikasi dokumen identitas untuk aset besar seperti Tanah (KIB A), Gedung (KIB C), dll." },
      "09": { title: "Kelola daftar barang ruangan (DBR)", description: "Memetakan lokasi aset ke dalam ruangan spesifik dan mencetak daftar inventaris per ruangan." },
      "10": { title: "Mencetak label aset", description: "Mencetak stiker kode barang (barcode) untuk ditempelkan pada fisik aset sebagai penanda inventaris." },
      "11": { title: "Monitoring history aset", description: "Melacak riwayat lengkap siklus hidup aset, mulai dari perolehan, mutasi, hingga perbaikan yang pernah dilakukan." },
      "12": { title: "Mencetak laporan BMN", description: "Menghasilkan laporan rutin pengelolaan barang milik negara (Intrakomptabel) untuk periode semesteran atau tahunan." },
      "13": { title: "Mencetak laporan posisi di neraca", description: "Menyajikan data nilai aset dalam format akuntansi untuk kebutuhan penyusunan Neraca Keuangan Satker." },
      "14": { title: "Mencetak catatan atas laporan", description: "Menghasilkan narasi penjelasan (CaLK) terkait angka-angka yang tersaji dalam laporan BMN." },
      "15": { title: "Menerima data dari SAKTI", description: "Melakukan integrasi data (ADK) dari aplikasi SAKTI untuk menarik data detail belanja modal/kwitansi pembelian." },
      "16": { title: "Mengirim data ke UAPPB-W / E-Rekon", description: "Mengirimkan ADK hasil rekonsiliasi BMN ke tingkat wilayah atau mengunggahnya ke portal rekonsiliasi Kemenkeu." },

      // --- Bagian Kanan (Administrator/Setup - Konfigurasi) ---
      "17": { title: "Manajemen pengguna", description: "Pengaturan akun user, password, dan hak akses operator aplikasi SIMAK BMN." },
      "18": { title: "Konfigurasi identitas laporan (setup logo)", description: "Mengatur kop surat dan logo instansi yang akan tampil otomatis pada setiap cetakan laporan." },
      "19": { title: "Pemutakhiran kode Satker", description: "Memperbarui referensi kode satuan kerja jika terjadi perubahan nomenklatur atau organisasi." },
      "20": { title: "Pemutakhiran hierarki organisasi", description: "Mengatur struktur pelaporan berjenjang (UAKPB melapor ke UAPPB-W dan UAPB mana)." },
      "21": { title: "Mapping kantor pelayanan", description: "Menentukan kantor KPKNL dan KPPN mitra kerja tempat satker melakukan pelaporan dan rekonsiliasi." },
      "22": { title: "Update referensi wilayah", description: "Memperbarui kode lokasi provinsi/kabupaten/kota sesuai aturan Kemendagri terbaru." },
      "23": { title: "Update referensi kode barang", description: "Memperbarui kamus kode aset (katalog barang) sesuai aturan kodifikasi terbaru dari DJKN." },
      "24": { title: "Cek masa manfaat dan penyusutan", description: "Melihat tabel referensi umur ekonomis aset yang digunakan sistem untuk menghitung penyusutan otomatis." }
    }
  },
  {
    id: "sprint",
    title: "SPRINT (Sistem Pengelolaan Rekening Terintegrasi)",
    description: "Aplikasi SPRINT adalah aplikasi yang digunakan untuk menatausahakan rekening pemerintah baik rekening pengeluaran, penerimaan maupun rekening lainnya. Aplikasi ini terintegrasi dengan sistem perbankan dan juga digunakan untuk melakukan pelaporan pertanggungjawaban rekening pemerintah",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logo-sprint.png",
    diagramUrl: "/ucd/SPRINT.drawio.svg",
    useCaseDetails: {
      "1": { title: "Login", description: "Pegawai masuk ke sistem menggunakan akun." },
      "2": { title: "Input Data Rekening Baru", description: "Fitur untuk mengajukan permohonan pembukaan rekening." },
      "3": { title: "Input Data Rekening yang Akan Ditutup", description: "Fitur untuk mengajukan penutupan rekening" },
      "5": { title: "Approve Pembukaan/Penutupan", description: "Memverifikasi permohonan pengajuan rekening apakah di terima atau di tolak" },
      "6": { title: "Unduh Surat Persetujuan/Penolakan Pembukaan Rekening", description: "Mengunduh Surat Persetujuan/Penolakan atas permohonan pembukaan rekening yang telah di approve oleh KPA" },
      "7": { title: "Melaporkan Pembukaan Rekening", description: "Fitur untuk melaporkan rekening yang telah dibuka" },
      "8": { title: "Mengunggah File ADK LPJ", description: "Fitur untuk mengunggah file ADK (Ardip Dokumen Komputer) LPJ dengan mengisi jenis LPJ yang akan diupload (penerimaan/pengeluaran), bulan periode pelaporan, dan pilih ADK yang akan diupload. " },
      "9": { title: "Monitoring Kelengkapan Dokumen", description: "Untuk monitoring kelengkapan dokumen pengelolaan rekening" },
      "10": { title: "Monitoring Rekening", description: "Untuk monitoring rekening yang dikelola dan tercatat pada database Kementerian Keuangan" }
    }
  },
  {
    id: "siman",
    title: "SIMAN (Sistem Informasi Manajemen Aset Negara)",
    description: "Aplikasi digital dari Kementerian Keuangan (DJKN) untuk mengelola seluruh siklus Barang Milik Negara (BMN) secara terintegrasi dan transparan, mulai dari perencanaan hingga penghapusan.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logo-siman.png",
    diagramUrl: "/ucd/ucd-siman.svg",
    useCaseDetails: {
      // --- Bagian Kiri (Operator BMN) ---
      "01": { title: "Melakukan registrasi dan aktivasi akun SIMAN", description: "Proses pendaftaran awal dan pengaktifan akun pengguna untuk dapat mengakses fitur-fitur dalam aplikasi SIMAN." },
      "02": { title: "Request akun pengguna baru", description: "Mengajukan permohonan pembuatan akun tambahan untuk staf atau operator baru di lingkungan satker." },
      "03": { title: "Mengelola profil instansi/satker", description: "Memperbarui informasi identitas satuan kerja, alamat, kontak, dan struktur organisasi." },
      "04": { title: "Melakukan reset kode autentikator/OTP", description: "Fitur pemulihan keamanan untuk mereset kode One-Time Password jika pengguna mengalami gagal login berulang." },
      "05": { title: "Update data detail aset tanah", description: "Melengkapi atribut aset tanah meliputi dokumen kepemilikan, Nomor Induk Bidang (NIB), dan data Geospasial (IGT)." },
      "06": { title: "Update data bangunan", description: "Memperbarui spesifikasi teknis bangunan seperti Luas Dasar, Koefisien Dasar Bangunan (KDB), dan koordinat letak bangunan." },
      "07": { title: "Mencetak Label BMN", description: "Menghasilkan label fisik berisi kode batang (Barcode/QR) untuk ditempelkan pada fisik aset." },
      "08": { title: "Mengelola ruangan", description: "Manajemen data ruangan, pendataan lantai, serta pencetakan Daftar Barang Ruangan (DBR) dan Daftar Barang Lainnya (DBL)." },
      "09": { title: "Melakukan mutasi barang antar ruangan", description: "Mencatat perpindahan lokasi fisik aset dari satu ruangan ke ruangan lain dalam satu satker." },
      "10": { title: "Menyusun usulan RKBMN", description: "Membuat Rencana Kebutuhan Barang Milik Negara (Pengadaan/Pemeliharaan) untuk tahun anggaran mendatang." },
      "11": { title: "Upload dokumen kelengkapan RKBMN", description: "Mengunggah dokumen pendukung seperti TOR dan RAB sebagai syarat pengajuan usulan kebutuhan aset." },
      "12": { title: "Mengirim data usulan RKBMN", description: "Melakukan submit data usulan perencanaan kebutuhan ke tingkat banding atau kantor pusat." },
      "13": { title: "Merekam dan membuat Laporan Wasdal", description: "Menyusun laporan Pengawasan dan Pengendalian (Wasdal) aset untuk periode Semester I, II, dan Tahunan." },
      "14": { title: "Mencatat tindak lanjut perbaikan aset", description: "Mendokumentasikan tindakan perbaikan yang dilakukan atas aset yang ditemukan tidak sesuai standar saat wasdal." },
      "15": { title: "Merekam Berita Acara (BA) Wasdal", description: "Membuat dokumen formal Berita Acara hasil pelaksanaan pengawasan dan pengendalian BMN." },
      "16": { title: "Upload dokumen pendukung Wasdal", description: "Mengunggah bukti fisik, foto dokumentasi, dan surat terkait pelaporan Wasdal." },

      // --- Bagian Kanan (KUPT/Kepala Kantor) ---
      "17": { title: "Validasi Usulan RKBMN", description: "Persetujuan dan pengesahan oleh Kepala Kantor atas rencana kebutuhan aset yang diajukan operator." },
      "18": { title: "Validasi Laporan Wasdal", description: "Pemeriksaan dan persetujuan akhir terhadap laporan hasil pengawasan dan pengendalian aset." },
      "19": { title: "Monitoring status penetapan (PSP) aset", description: "Memantau progres persetujuan Penetapan Status Penggunaan (PSP) aset yang diajukan ke pengelola barang." }
    }
  },
  {
    id: "spreso",
    title: "SPRESO (Sistem Presensi Online)",
    description: "Aplikasi ini adalah backend (sistem pusat) yang mengolah data kehadiran pegawai untuk menentukan besaran uang Tunjangan Kinerja (Tukin) dan Uang Makan yang akan diterima setiap bulan.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logo-espreso.jpeg",
    diagramUrl: "/ucd/ucd-spreso.svg",
    useCaseDetails: {
      // --- Bagian Kiri (Karyawan Biro Umum) ---
      "01": { title: "Mengelola data kepegawaian", description: "Melakukan input, update, dan verifikasi master data seluruh pegawai termasuk riwayat jabatan dan golongan." },
      "02": { title: "Mengelola data pelaksana tugas (PLT)", description: "Mencatat dan memperbarui status pegawai yang menjabat sebagai Pelaksana Tugas untuk penyesuaian hak tunjangan." },
      "03": { title: "Melakukan perhitungan tunjangan kinerja", description: "Sistem mengkalkulasi besaran Tukin secara otomatis berdasarkan capaian kinerja dan rekap kehadiran." },
      "04": { title: "Melakukan perhitungan uang makan", description: "Menghitung total uang makan yang diterima pegawai berdasarkan jumlah hari hadir (WFO) yang tercatat di mesin absensi." },
      "05": { title: "Melakukan perhitungan potongan tunjangan", description: "Menerapkan aturan pengurangan tunjangan akibat keterlambatan, pulang cepat, atau ketidakhadiran tanpa keterangan (Alpa)." },
      "06": { title: "Membuat laporan (generate laporan)", description: "Menghasilkan rekapitulasi pembayaran tunjangan dan presensi bulanan sebagai dokumen pertanggungjawaban." },
      "07": { title: "Export data laporan", description: "Mengunduh hasil laporan yang telah digenerate ke dalam format Excel atau PDF untuk arsip dan proses pencairan dana." },

      // --- Bagian Kanan (Pegawai) ---
      "08": { title: "Melakukan presensi mobile", description: "Pegawai melakukan absensi masuk dan pulang menggunakan aplikasi di HP berbasis lokasi (GPS) dan swafoto (Selfie)." },
      "09": { title: "Menerima hasil perhitungan gaji/tukin", description: "Pegawai melihat informasi final nominal gaji dan tunjangan kinerja yang akan ditransfer ke rekening setelah dipotong pajak/denda." }
    }
  },
  {
    id: "simas",
    title: "SIMAS (Sistem Informasi Manajemen Aparatur Sipil Negara)",
    description: "Aplikasi berbasis web yang berfungsi untuk mengelola data kepegawaian secara internal. Sistem ini dirancang untuk mengotomatisasi proses bisnis pengelolaan SDM di lingkungan BMKG, melengkapi aplikasi nasional seperti MyASN (BKN).",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/00%20Logo%202a.png",
    diagramUrl: "/ucd/ucd-simas.svg",
    useCaseDetails: {
      // --- Bagian Kiri (Agendaris / Admin TU) ---
      "01": { title: "Melakukan pengajuan cuti online", description: "Mengisi formulir permohonan izin, sakit, atau cuti tahunan secara digital untuk diajukan kepada pejabat berwenang." },
      "02": { title: "Mengajukan perubahan DRH", description: "Mengusulkan pemutakhiran atau perbaikan data Daftar Riwayat Hidup (seperti pendidikan, keluarga, pangkat) yang belum sesuai." },
      "03": { title: "Melihat DRH lengkap", description: "Menampilkan profil lengkap pegawai (Curriculum Vitae) yang mencakup seluruh riwayat karir dan data pribadi dalam sistem." },
      "04": { title: "Melihat status pengajuan", description: "Memantau progres usulan cuti atau perubahan data, apakah masih dalam antrian verifikasi, disetujui, atau ditolak." },
      "05": { title: "Melihat info ulang tahun pegawai", description: "Fitur dashboard yang menampilkan notifikasi daftar rekan kerja satu unit yang sedang berulang tahun pada hari ini." },

      // --- Bagian Kanan (Approver / Pejabat Penyetuju) ---
      "06": { title: "Melakukan verifikasi cuti", description: "Pejabat berwenang memeriksa sisa kuota cuti dan memberikan persetujuan (Approve) atau penolakan atas ajuan cuti bawahan." },
      "07": { title: "Melakukan verifikasi ubah DRH", description: "Memvalidasi kebenaran data dan dokumen pendukung perubahan riwayat hidup sebelum data tersebut diperbarui secara permanen di database." }
    }
  },
  {
    id: "info",
    title: "Info BMKG",
    description: "Aplikasi pengawasan yang digunakan untuk memastikan seluruh peralatan operasional meteorologi dan infrastruktur jaringan berfungsi dengan baik secara real-time.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logobmkg.png",
    diagramUrl: "/ucd/Info-Bmkg-.drawio.svg",
    useCaseDetails: {
      "UC-001": { title: "Melihat Prakiraan Cuaca", description: "User atau Masyarakat dapat melihat prakiraan cuaca ketika membuka aplikasi." },
      "UC-002": { title: "Melihat Tingkat Kelembapan", description: "Fitur untuk melihat Tingkat kelembapan di suatu daerah kelurahan / desa." },
      "UC-003": { title: "Melihat Grafik Temperatur", description: "Fitur untuk melihat grafik temperatur di suatu daerah kelurahan / desa" },
      "UC-004": { title: "Melihat Kecepatan Angin", description: "Fitur untuk melihat kecepatan angin di suatu daerah kelurahan / desa " },
      "UC-005": { title: "Melihat Arah Angin", description: " Fitur untuk melihat arah angin di suatu daerah kelurahan / desa " },
      "UC-006": { title: "Melihat Info Gempa Bumi", description: "Fitur untuk melihat info gempa bumi di Indonesia" },
      "UC-007": { title: "Memilih Kelurahan / desa", description: "Fitur untuk memilih kelurahan / desa agar user / masyarakat lebih mudah melihat prakiraan cuaca" },
      "UC-008": { title: "Melihat Kualitas Udara", description: "Fitur untuk melihat Tingkat kualitas udara (dalam bentuk presentase) di kota-kota Indonesia" },
      "UC-009": { title: "Melihat Radar", description: "Fitur untuk melihat hasil radar terhadap kondisi di suatu kota, untuk melihat Tingkat intensitas suatu wilayah" },
      "UC-010": { title: "Menerima Notifikasi", description: "Jika ada bencana yang akan datang, user akan menerima notifikasi peringatan." },
      "UC-011": { title: "Menganalisis Data Dari Sistem Radar", description: "Admin akan menganalisis data yang didapatkan dari radar sebelum di kirimkan ke aplikasi untuk mencegah kesalahan pengiriman notifikasi peringatan bencana ke masyarakat" },
      "UC-012": { title: "Memverifikasi Data Dari Sistem Radar", description: "Setelah menganalisis data yang diterima dari radar, admin akan memverifikasi data sebelum dikirimkan ke aplikasi Info BMKG" },
      "UC-013": { title: "Mengisi Data Gempa Bumi", description: "Admin akan mengisi data seperti lokasi gempa bumi, kekuatan gempa, kedalaman gempa, waktu gempa, dan jarak dari lokasi." },
      "UC-014": { title: "Memperbarui Prakiraan Cuaca", description: "Admin perlu memantau data prakiraan cuaca dan memperbaruinya berdasarkan data yang didapatkan dari radar" },
      "UC-015": { title: "Menyediakan Data Geolokasi", description: "Sistem GPS akan menyediakan data geolokasi berdasarkan tempat user berada ketika membuka aplikasi." },
      "UC-016": { title: "Memvalidasi Lokasi untuk Notifikasi", description: "Sistem GPS akan memvalidasi lokasi user agar applikasi Info BMKG tidak keliru saat mengirimkan notifikasi bencana." },
    }
  },
  // {
  //   id: "gpp",
  //   title: "GPP (Gaji PNS Pusat)",
  //   description: "Aplikasi untuk menghitung berapa rupiah gaji yang akan diterima pegawai sebelum datanya dikirim ke SAKTI untuk dibayar.",
  //   logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logo-gpp.png",
  //   diagramUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/GPP.drawio.png",
  // },
  {
    id: "wigos",
    title: "WIGOS (WMO Integrated Global Observing System)",
    description: "Aplikasi dengan integrasi global yang dikembangkan oleh Organisasi Meteorologi Dunia (WMO) untuk menyatukan seluruh sistem pengamatan cuaca, iklim, dan hidrologi dari berbagai negara anggota ke dalam satu kerangka kerja yang terstandarisasi.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logobmkg.png",
    diagramUrl: "/ucd/UC-WIGOS.svg",
  },
  {
    id: "srikandi",
    title: "Srikandi",
    description: "Aplikasi dengan integrasi global yang dikembangkan oleh Organisasi Meteorologi Dunia (WMO) untuk menyatukan seluruh sistem pengamatan cuaca, iklim, dan hidrologi dari berbagai negara anggota ke dalam satu kerangka kerja yang terstandarisasi.",
    logoUrl: "https://hfctpsuwjytwyhrdoggb.supabase.co/storage/v1/object/public/usecase/logobmkg.png",
    diagramUrl: "/ucd/UC-SRIKANDI.svg",
    useCaseDetails: {
      "1A": { title: "Memasukkan nama instansi", description: " " },
      "1B": { title: "Membuat unit kerja sesuai struktur organisasi", description: "Membuat unit kerja di dalam aplikasi SRIKANDI sesuai struktur organisasi instansi;" },
      "1C": { title: "Memasukkan nama admin instansi", description: " " },
      "1D": { title: "Membuat akun unit dan akun user (pejabat dan pegawai)", description: "Admin instansi membuat akun Unit Kearsipan/Pusdatin, pencatat surat, sekretaris, dan akun pengguna/user (pejabat dan pegawai) di lingkungan instansi" },
      "1E": { title: "Membuat User dan Password untuk admin instansi", description: " " },
      "1F": { title: "Membuat pengaturan logo instansi", description: "Membuat pengaturan logo instansi menggunakan format (PNG)" },
      "1G": { title: "Melakukan reset password untuk admin instansi", description: "Admin nasional dapat mereset akun admin instansi" },
      "1H": { title: "Melakukan reset password", description: "Admin instansi dapat mereset password" },
      "1I": { title: "Registrasi surat dinas", description: "Melakukan Registrasi surat dinas dari eksternal/surat masuk baik dalam bentuk hard copy, email, whatsapp atau media sosial lainnya." },
      "1J": { title: "Mengatur kolom isian naskah", description: "Membuat pengaturan kolom isian: jenis naskah, sifat naskah, tingkat urgensi, dan instruksi serta disposisi pimpinan" },
      "1K": { title: "Mengatur penomoran naskah", description: "Membuat pengaturan penomoran naskah dinas otomatis" },
      "1L": { title: "Mengklasifikasi arsip fasilitatif dan substantif", description: "Membuat klasifikasi arsip fasilitatif dan substantif berdasarkan peraturan Klasifikasi Arsip yang berlaku di instansi" },
      "1M": { title: "Mengatur daftar verifikator, daftar penandatanganan, dan tujuan naskah", description: "melakukan pengaturan daftar verifikator, daftar penandatangan, dan tujuan naskah untuk seluruh akun pengguna/user yang berada dalam unit kerjanya" },
      "1N": { title: "mengupload template naskah dinas", description: "Membuat dan melakukan upload template naskah dinas sesuai Tata Naskah Dinas yang berlaku di instansi dengan menggunakan forman (DOCX)" },
      "1O": { title: "Menghapus arsip elektronik yang sudah diberkaskan", description: "Melakukan pemusnahan terhadap arsip elektronik yang telah diberkaskan dalam aplikasi SRIKANDI." },
      "1P": { title: "Membuat konsep surat", description: "Membuat konsep surat, mengirim dan menerima naskah dinas" },
      "1Q": { title: "Melakukan disposisi naskah dinas", description: "Memberikan disposisi atau menindaklajuti naskah dinas" },
      "1R": { title: "Melakukan verifikasi naskah dinas", description: "Melakukan verifikasi naskah dinas sesuai kewenangan user" },
      "1S": { title: "Menandatangani naskah dinas", description: "Menandatangani naskah dinas sesuai kewenangan user" },
      "1T": { title: "Menyetujui naskah dinas", description: "user dapat menyetujui naskah dinas yang diterima" },
      "1U": { title: "Menolak naskah dinas", description: "User dapat menolak surat yang salah"}
    }
  },
];

