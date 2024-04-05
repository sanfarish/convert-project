# Expense Manager by Faris Hasan

Expense Manager adalah aplikasi web-based untuk membuat dan menyimpan catatan harian transaksi uang dengan fasilitas:

* Mencatat transaksi dengan waktu harian, sampai hitungan menit.
* Dibagi menjadi 3 jenis transaksi, yaitu pemasukan (income), pengeluaran (expense), dan transfer antar akun.
* Memperlihatkan jumlah total transaksi baik pemasukan maupun pengeluaran.
* Memperlihatkan jumlah total saldo akun baik aset (assets) maupun beban (liabilities).
* Saldo akun otomatis bertambah/berkurang seiring adanya transaksi.
* Pemasukan dan pengeluaran dibagi menjadi tiap-tiap kategori untuk memudahkan pencatatan.
![pic](./public/screenshots/front.png)
Project for BINAR FSW Bootcamp Wave 42 Challenge Gold by Faris Hasan.

## Versions

### 1.0.0

* First Release

### 1.0.1

* Modifikasi kode javascript bagian client (peningkatan efisiensi).
* Debug file knex seed (error jika dijalankan saat sudah ada data).
* Penambahan informasi pada file readme.

### 1.0.2

* Debug kode javascript bagian client (edit expense categories).
* Modifikasi judul pada kode html.

### 1.0.3

* Penambahan favicon.
* Modifikasi file knex seed.

### 1.0.4

* Debug file knex seed.

## Getting Ready

Sebelum menggunakan, install dulu aplikasi yg dibutuhkan karena Expense Manager telah berhasil digunakan dalam environment berikut:

1. Windows 10 64-bit version 10.0.19045 Build 19045 dan keatas.
2. Node.js v20.10.0 & NPM 10.2.3
3. PostgreSQL 16.2. (pastikan berisi database default (`postgres`) serta port, dan password yang diisi adalah default (`5432` dan `admin`)).
4. Browser chromium-based version 122.0.6261.112 (Chrome, Brave, dll.)
5. Koneksi internet (untuk download modul npm).

## Installation

1. Pull atau download zip seluruh file dan masukkan kedalam folder yang sama.
2. Untuk install data yg dibutuhkan dan menyalakan server, jalankan file `Expense Manager - Start.bat` dan biarkan menyala di background.[1]
3. Jalankan file `\views\index.html` di browser (klik dua kali).
4. Selesai, aplikasi siap digunakan.

5. (Optional) Untuk mengisi data dummy, buka file `Expense Manager - Dummy.bat`.[2]
6. (Optional) Untuk menghapus semua table beserta datanya (reset), tutup file `Expense Manager - Start.bat`, lalu buka file `Expense Manager - Rollback.bat`.[2]

* [1] (TROUBLESHOOT) JANGAN klik apapun di bagian layar server agar server tidak berhenti (boleh scroll) dan jika tersentuh, tekan `Enter` pada keyboard lalu biarkan dan jangan sentuh lagi.
* [2] (WARNING) Menjalankan file tersebut akan menghapus semua data yang sebelumnya sudah dibuat, gunakan dengan hati-hati.

## Usage

Sebelum membuat transaksi, buat akun dan kategori terlebih dahulu.

### - Add Account

1. Untuk membuat akun, buka halaman `Accounts` dan tekan `Add Account`.
2. Isi nama akun yg diinginkan dan tekan `Add` (contoh: Cash, Bank BNI, Gopay, dsb.).
3. Ulangi langkah 2 & 3 untuk menambah beberapa akun.
![pic](./public/screenshots/accounts.png)

### - Add income categories & expense categories

1. Untuk membuat kategori, buka halaman `Settings` dan pilih `Add Income Category` untuk menambah kategori income.
2. Isi nama kategori yang diinginkan dan tekan `Add` (contoh: Gaji, Upah Freelance, Orang Tua).
3. Untuk menambah kategori expense, pilih `Add Expense Category` dan ulangi langkah 7 (contoh: Kebutuhan, Hobi, Sedekah).
![pic](./public/screenshots/category.png)

### - Add transactions

1. Untuk membuat transaksi, buka halaman `Transactions` dan tekan `Add Transactions`.
2. Isi form sesuai dengan yang diinginkan (income untuk pemasukan, expense untuk pengeluaran, transfer untuk pemindahan uang).
3. Tekan `Add` untuk menambahkan transaksi.
![pic](./public/screenshots/transactions.png)

### - Edit transactions, accounts, & categories

1. Tekan `Edit` pada data yang ingin diubah, lalu modifikasi isi dari data tersebut.
2. Tekan `Save` untuk menyimpan perubahan data.
![pic](./public/screenshots/edit.png)

### - Delete transactions, accounts, & categories

1. Tekan `Delete` pada data yang ingin dihapus.[3]
![pic](./public/screenshots/delete.png)

* [3] (INFO) Untuk akun dan kategori, data yang bisa dihapus hanya data yang tidak digunakan oleh transaksi. Jika ingin menghapus akun/kategori yang sudah digunakan di transaksi, hapus/ubah semua transaksi yang menggunakan data tersebut.

## Feature

### Plus (+)

+ Database yang digunakan adalah postgres (default).
+ Data ditahan jika input kosong atau 0.
+ Nama pada data akun maupun kategori tidak bisa sama persis (anti-duplicate).
+ Tampilan khas dashboard dan layar penuh (tidak overflow-y/scroll).
+ Kode bagian server rapi dan efisien.
+ Bisa di gunakan di resolusi layar 1024x1024 keatas.

### Minus (-)

- Belum responsif.
- Belum bisa mengubah balance pada data akun.
- Huruf maksimal yang bisa diisi untuk "Notes" adalah 50. Jika lebih maka akan ada error.
- Angka maksimal yang bisa diisi untuk "Amount" adalah 2,147,483,647. Jika lebih maka akan ada error.
- Kode css & javascript bagian client masih berantakan dan tidak efisien.
- Data transaksi tidak diurutkan secara waktu jika data memiliki tanggal dan waktu sama.
- Tampilan kurang menarik dan kurang rapi.
- Fungsi REST API pada bagian server masih kurang (query, error handling, dll.)

## Special Thanks

* Allah swt. and prophet Muhammad saw.
* Family and friends
* Binar Academy
* Kak Samsul Rijal as Facilitator
* All participants in every forum discussions