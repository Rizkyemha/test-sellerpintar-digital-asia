# Website Manajemen Artikel

Proyek ini adalah sebuah aplikasi web untuk manajemen artikel yang dibuat sebagai bagian dari tes seleksi untuk posisi **Junior Developer**. Aplikasi ini memiliki dua peran pengguna: **User** dan **Admin**, dengan fitur yang berbeda untuk setiap peran. Proyek ini dibangun dengan Next.js (App Router) dan terhubung dengan API eksternal untuk mengelola data.

## Live Demo

Anda dapat mengakses versi live dari aplikasi ini yang telah di-deploy di sini:

[https://test-sellerpintar-digital-asia.vercel.app/](https://test-sellerpintar-digital-asia.vercel.app/) ---

## Fitur Utama

### Fitur untuk User 👤

-  **Autentikasi:**
   -  Register & Login dengan validasi form.
   -  Logout yang aman.
   -  Pengalihan halaman otomatis setelah berhasil login/register.
-  **Daftar Artikel:**
   -  Melihat semua artikel dengan **pagination** (9 item per halaman).
   -  **Filter** artikel berdasarkan kategori yang tersedia.
   -  **Pencarian** artikel secara _real-time_ dengan _debounce_ (300-500ms) untuk optimasi performa.
-  **Detail Artikel:**
   -  Melihat konten lengkap dari sebuah artikel.
   -  Menampilkan hingga 3 **artikel lain** dari kategori yang sama sebagai rekomendasi.

### Fitur untuk Admin 👑

-  **Autentikasi:**
   -  Sistem Register, Login, dan Logout yang terpisah untuk Admin.
-  **Manajemen Kategori:**
   -  Melihat daftar kategori dengan **pagination** (10 item per halaman).
   -  **Pencarian** kategori dengan _debounce_.
   -  **Membuat** kategori baru dengan validasi form.
   -  **Mengedit** kategori yang sudah ada dengan validasi form.
-  **Manajemen Artikel:**
   -  Melihat daftar semua artikel dengan **filter**, **pencarian**, dan **pagination** (10 item per halaman).
   -  **Membuat** artikel baru dengan validasi form.
   -  Fitur **preview** sebelum artikel dipublikasikan.
   -  **Mengedit** artikel yang sudah ada, lengkap dengan validasi dan fitur preview.

---

## Teknologi yang Digunakan 🛠️

-  **Framework:** [Next.js](https://nextjs.org/) (App Router, SSR & CSR)
-  **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/)
-  **State Management:** React Hooks (useState, useEffect, useContext)
-  **Fetching API:** [Axios](https://axios-http.com/)
-  **Form Validation:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
-  **Icons:** [Lucide React](https://lucide.dev/)
-  **Version Control:** Git & GitHub
-  **Deployment:** Vercel / Netlify

---

### Prasyarat

Pastikan Anda sudah menginstal:

-  Node.js (v18.0 atau lebih tinggi)
-  npm / yarn / pnpm
