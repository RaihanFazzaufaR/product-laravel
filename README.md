# Fullstack Product Management App (Laravel & React)

Proyek ini adalah implementasi aplikasi manajemen produk full-stack yang dibuat menggunakan **Laravel** untuk bagian backend REST API dan **React.js (dengan Vite & Tailwind CSS)** untuk bagian frontend.

---

## Daftar Isi

1.  [Tentang Proyek](#tentang-proyek)
2.  [Persyaratan Sistem](#persyaratan-sistem)
3.  [Panduan Instalasi & Menjalankan Proyek](#panduan-instalasi--menjalankan-proyek)
    * [1. Persiapan Umum](#1-persiapan-umum)
    * [2. Backend Laravel Setup](#2-backend-laravel-setup)
    * [3. Frontend React Setup](#3-frontend-react-setup)
4.  [Koneksi Database](#koneksi-database)
5.  [Kontak](#kontak)

---

## Tentang Proyek

Proyek ini dibuat sebagai studi kasus untuk menguji kemampuan dalam membangun API RESTful dengan Laravel dan mengintegrasikannya dengan aplikasi frontend React yang interaktif. Ini mencakup fungsionalitas CRUD (Create, Read, Update, Delete) penuh untuk manajemen produk, dilengkapi dengan fitur pencarian, pagination, dan notifikasi yang responsif.

---

## Persyaratan Sistem

Pastikan sistem Anda memenuhi persyaratan berikut sebelum instalasi:

* **PHP**: Versi 8.3 atau yang lebih tinggi (pengembangan ini menggunakan versi 8.3.3)
* **Composer**: Untuk manajemen dependensi Laravel (pengembangan ini menggunakan versi 2.6.5)
* **Node.js**: Versi 14 atau yang lebih tinggi (pengembangan ini menggunakan versi 22)
* **npm** atau **Yarn**: Untuk manajemen paket JavaScript (pengembangan ini menggunakan npm versi 11.3.0)
* **Database**: MySQL (pengembangan ini menggunakan MySQL versi 11.2.2-MariaDB)

---

## Panduan Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan proyek di lingkungan lokal Anda.

### 1. Persiapan Umum

1.  **Clone Repositori**:
    Kloning repositori proyek ini ke komputer lokal Anda. Jika Anda mendapatkan ini dalam bentuk arsip zip, ekstrak di lokasi pilihan Anda. Struktur proyek seharusnya terlihat seperti ini:
    ```
    .
    ├── Backend/            # Folder backend Laravel
    └── frontend/           # Folder frontend React + Vite
    ```

2.  **Buat Database**:
    Buat database baru di sistem manajemen database Anda (misalnya, phpMyAdmin, MySQL Workbench, DBeaver, atau melalui CLI). Beri nama database sesuai keinginan Anda (misalnya, `product_db`).

### 2. Backend Laravel Setup

1.  **Navigasi ke Folder Backend**:
    Buka terminal atau command prompt dan masuk ke folder `Backend`:
    ```bash
    cd Backend
    ```

2.  **Konfigurasi Environment**:
    Salin file `.env.example` menjadi `.env`:
    ```bash
    cp .env.example .env
    ```
    Buka file `.env` yang baru dibuat dan perbarui detail koneksi database sesuai dengan pengaturan Anda:
    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=product_db  # Ganti dengan nama database yang Anda buat
    DB_USERNAME=root        # Ganti dengan username yang Anda gunakan
    DB_PASSWORD=            # Isi dengan password dari username Anda

    APP_URL=http://localhost:8000 # Pastikan ini diatur dengan benar untuk URL publik gambar
    ```

3.  **Install Dependencies Composer**:
    ```bash
    composer install
    ```

4.  **Generate Application Key**:
    ```bash
    php artisan key:generate
    ```

5.  **Jalankan Migrasi Database**:
    Ini akan membuat tabel `products` di database Anda.
    ```bash
    php artisan migrate --seed
    ```

6.  **Buat Symlink Storage**:
    Ini penting untuk membuat gambar yang diunggah dapat diakses secara publik.
    ```bash
    php artisan storage:link
    ```
    **Catatan untuk `.gitignore`**: Dikarenakan, file `.gitignore` di root proyek backend telah dikonfigurasi, Anda perlu menempatkan gambar default (dengan menggunakan nama `default.jpg` maksimal 2MB) secara manual di `product-api/public/storage/products/` agar sistem dapat melacaknya setelah menjalankan `php artisan storage:link`.

7.  **Jalankan Server Laravel**:
    ```bash
    php artisan serve --port=8000
    ```
    Pastikan Backend API berjalan di `http://localhost:8000`. Biarkan terminal ini tetap terbuka.

### 3. Frontend React Setup

1.  **Navigasi ke Folder Frontend**:
    Buka terminal baru (jangan tutup terminal Laravel Anda) dan masuk ke folder `product-app-frontend`:
    ```bash
    cd frontend      # Atau navigasi ke folder ini jika Anda membuatnya di tempat lain
    ```

2.  **Install Dependencies npm**:
    ```bash
    npm install
    ```

3.  **Jalankan Server Pengembangan React**:
    ```bash
    npm run dev
    ```
    Frontend React akan berjalan di `http://localhost:5173` (atau port lain yang ditunjukkan oleh Vite). Buka URL ini di browser web Anda.

---

## Koneksi Database

Untuk database sudah disediakan pada migration beserta seedernya. Sehingga cukup melakukan eksekusi berikut pada backend:

```bash
    php artisan migrate --seed
```

Dengan ini database sudah siap digunakan (pastikan .env yang Anda buat sudah benar)

---

## Kontak

Untuk pertanyaan, saran, atau kolaborasi lebih lanjut, Anda dapat menghubungi saya melalui:

* **Email** : fazzaufa94raihan@gmail.com
* **Telepon** : +62 822 4451 8877

---