<div align="center">

# Portfolio & Interactive CV — Muhammad Hadid Wiransetyo

**Frontend Engineer** berbasis di Yogyakarta, Indonesia.  
Membangun antarmuka web yang rapi, cepat, dan tahan lama.

[![Website](https://img.shields.io/badge/Live_Demo-hadidwirsty.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://hadidwirsty.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<p align="center">
  <a href="https://hadidwirsty.vercel.app"><strong>Kunjungi Situs Web »</strong></a>
  <br />
  <br />
  <a href="https://hadidwirsty.vercel.app/cv/Muhammad-Hadid-Wiransetyo-CV-2026.pdf">Unduh CV (English)</a>
  ·
  <a href="https://hadidwirsty.vercel.app/cv/Muhammad-Hadid-Wiransetyo-CV-2026-ID.pdf">Unduh CV (Bahasa Indonesia)</a>
  ·
  <a href="https://linkedin.com/in/hadidwirsty">LinkedIn</a>
  ·
  <a href="mailto:m.hadid.2001@gmail.com">Kirim Email</a>
</p>

</div>

---

## 🌟 Sekilas Proyek

Repositori ini memuat kode sumber untuk situs web portofolio personal dan kurikulum vitae interaktif **Muhammad Hadid Wiransetyo**. Dibangun menggunakan **Next.js 16 (App Router)**, **React 19**, **TypeScript** (*strict mode*), dan **Tailwind CSS v4** dengan filosofi rekayasa perangkat lunak modern: performa tinggi, aksesibilitas semantik, zero hydration mismatch, dan pemisahan arsitektur data yang terstruktur.

---

## ✨ Fitur Unggulan

- 🌐 **Sistem Bilingual Zero-Dependency (ID / EN):** Arsitektur internasionalisasi kustom berbasis React Context tanpa dependensi eksternal (`lib/language-context.tsx`). Dilengkapi auto-detect preferensi bahasa peramban dan sinkronisasi `localStorage`.
- 🌓 **Mode Gelap / Terang Instan:** Transisi tema mulus tanpa *flash* (FOUC) menggunakan `next-themes` dan kelas CSS `.dark`. Dilengkapi pintasan keyboard (shortcut) tombol <kbd>D</kbd> untuk mengganti tema seketika.
- ⚡ **Zero Hydration Mismatch:** Penerapan Server Components dan Client Components yang presisi menghasilkan perenderan SSR dan Client 100% konsisten tanpa *layout shift* (CLS).
- 🎨 **Desain Sistem Modern & Aksesibel:** Pemanfaatan ruang warna modern OKLCH via Tailwind CSS v4, tipografi Google Fonts (*Inter*, *Geist Mono*, dan *Fraunces* serif accent), serta kepatuhan standar aksesibilitas WAI-ARIA.
- 📄 **Pipeline CV PDF Otomatis:** Sistem pembuatan dokumen CV PDF cetak A4 presisi berbasis template HTML/CSS, Headless Google Chrome, dan verifikasi metadata `pypdf` yang terpisah antara varian publik web dan varian lamaran kerja privat.

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 16.2.6 (App Router) | Turbopack compilation & SSG prerendering |
| **UI Runtime** | React & React DOM 19.2.4 | React 19 primitives & Server/Client boundaries |
| **Bahasa** | TypeScript ^5 | Strict mode aktif dengan type-safety menyeluruh |
| **Styling** | Tailwind CSS v4 + tw-animate-css | Sintaks modern `@theme`, token OKLCH, tanpa `tailwind.config.ts` |
| **Primitif UI** | shadcn/ui (`base-nova` style) | Komponen primitif berbasis `@base-ui/react` |
| **Ikon** | Lucide React | Ikon SVG modular & custom brand icons |
| **Tema** | next-themes | Class-based dark mode management |
| **Package Manager** | pnpm 11.20.0 | Deterministic lockfile v9 |

---

## 📁 Struktur Direktori

```
cv/
├── app/                  # Next.js App Router (layout root, font setup, homepage)
├── components/           # Komponen antarmuka pengguna
│   ├── sections/         # 8 Seksi utama CV (Hero, Experience, Projects, Skills, dll.)
│   ├── ui/               # Komponen primitif shadcn/ui (Button, Badge, Card, Separator)
│   └── ...               # Header, Footer, LanguageToggle, ThemeToggle
├── lib/                  # Data layer & utilitas
│   ├── cv-data.ts        # Single source of truth untuk seluruh isi portofolio (Bilingual)
│   ├── language-context.tsx # Custom bilingual context provider & useT() hook
│   └── utils.ts          # Utility cn() (clsx + tailwind-merge)
└── public/               # Aset statis publik
    ├── images/           # Foto profil resmi
    └── cv/               # Berkas CV PDF publik resmi (ID & EN)
```

---

## 🚀 Menjalankan Secara Lokal

Pastikan komputer Anda telah terpasang **Node.js (v20+)** dan **pnpm (v11+)**.

```bash
# 1. Clone repositori
git clone https://github.com/hadidwirsty/portfolio.git
cd portfolio

# 2. Pasang dependensi
pnpm install

# 3. Jalankan development server
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda.

### Perintah Kualitas Kode

```bash
# Validasi tipe TypeScript
pnpm typecheck

# Audit kode dengan ESLint
pnpm lint

# Format kode otomatis dengan Prettier
pnpm format

# Kompilasi build produksi
pnpm build

# Menjalankan server produksi lokal
pnpm start
```

---

## 👤 Kontak & Profil

- **Nama:** Muhammad Hadid Wiransetyo
- **Peran:** Frontend Engineer
- **Lokasi:** Yogyakarta, Indonesia
- **Situs Web:** [hadidwirsty.vercel.app](https://hadidwirsty.vercel.app)
- **LinkedIn:** [linkedin.com/in/hadidwirsty](https://linkedin.com/in/hadidwirsty)
- **GitHub:** [github.com/hadidwirsty](https://github.com/hadidwirsty)
- **Email:** [m.hadid.2001@gmail.com](mailto:m.hadid.2001@gmail.com)

---

## 📄 Lisensi & Hak Cipta

© 2026 Muhammad Hadid Wiransetyo. Seluruh hak cipta dilindungi undang-undang.
