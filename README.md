<div align="center">

# Portfolio & Interactive CV — Muhammad Hadid Wiransetyo

**Frontend Engineer** berbasis di Semarang, Indonesia.  
Membangun antarmuka web yang rapi, cepat, dan tahan lama.

[![Website](https://img.shields.io/badge/Live_Demo-hadidwirsty.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://hadidwirsty.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

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

- 🕹️ **Vexoo Retro-Futuristic Bento Dashboard:** Antarmuka beranda interaktif bertema retro-futuristik dilengkapi dengan efek ASCII Water Reveal, Matrix/Scanline visual, kartu keahlian teknis interaktif, status metrik karier, dan pratinjau proyek unggulan.
- 🛡️ **Next.js 16 Proxy Maintenance Mode & 404 Kustom (Zero Data Leakage):** Mekanisme *routing* level proxy (`proxy.ts`) yang melindungi subhalaman yang sedang dalam perombakan desain (`/about`, `/portfolio`, `/contact`, `/stack`) di lingkungan produksi. Menyajikan status HTTP 503 untuk bot/SEO dan HTTP 200 untuk navigasi klien Next.js (RSC) tanpa merusak router peramban. Dilengkapi opsi bypass via environment variable `SHOW_ALL_PAGES=true` untuk pengujian pratinjau Vercel.
- 🌊 **Animasi Gelombang CSS Murni & Container Queries:** Komponen status kustom (`/maintenance` & `/not-found`) menggunakan tipografi piksel (*Pixelify Sans*) yang meregang proporsional terhadap kartu dengan Tailwind v4 `@container` (`100cqw`) dan animasi CSS murni `WaveText` (`@keyframes wave-y`) tanpa layout shift JavaScript.
- 🌐 **Sistem Bilingual Zero-Dependency (ID / EN):** Arsitektur internasionalisasi kustom berbasis React Context tanpa dependensi eksternal (`lib/language-context.tsx`). Dilengkapi auto-detect preferensi bahasa peramban dan sinkronisasi `localStorage`.
- 🌓 **Mode Gelap / Terang Instan:** Transisi tema mulus tanpa *flash* (FOUC) menggunakan `next-themes` dan kelas CSS `.dark`. Dilengkapi pintasan keyboard (shortcut) tombol <kbd>D</kbd> untuk mengganti tema seketika.
- ⚡ **Zero Hydration Mismatch:** Penerapan Server Components dan Client Components yang presisi menghasilkan perenderan SSR dan Client 100% konsisten, dengan mitigasi khusus terhadap ekstensi peramban seluler pihak ketiga.
- 🎨 **Desain Sistem Modern & Aksesibel:** Pemanfaatan ruang warna modern OKLCH via Tailwind CSS v4, tipografi 4 Google Fonts (*Inter*, *Geist Mono*, *Fraunces*, dan *Pixelify Sans*), serta kepatuhan standar aksesibilitas WAI-ARIA.
- 🧪 **Comprehensive Unit Test Suite:** 48 pengujian unit terverifikasi menggunakan Node.js test runner bawaan (`node --test`), menguji logika filter data, helper clipboard, kepatuhan rute maintenance, hingga kalkulasi lebar tipografi status.
- 📄 **Pipeline CV PDF Otomatis:** Sistem pembuatan dokumen CV PDF cetak A4 presisi berbasis template HTML/CSS, Headless Google Chrome, dan verifikasi metadata `pypdf` yang memisahkan varian publik web dan varian lamaran kerja privat.

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 16.2.6 (App Router) | Turbopack compilation, Next.js 16 Proxy (`proxy.ts`), & SSG prerendering |
| **UI Runtime** | React & React DOM 19.2.4 | React 19 primitives & Server/Client boundaries |
| **Bahasa** | TypeScript ^5 | Strict mode aktif dengan type-safety menyeluruh |
| **Styling** | Tailwind CSS v4 + tw-animate-css | Sintaks modern `@theme`, token OKLCH, container queries, tanpa `tailwind.config.ts` |
| **Animasi** | Framer Motion ^14.10.1 + Pure CSS Keyframes | Animasi bento dashboard, transisi interaktif, dan gelombang teks piksel |
| **Primitif UI** | shadcn/ui (`base-nova` style) | Komponen primitif berbasis `@base-ui/react` |
| **Tipografi** | Google Fonts via `next/font/google` | Inter (Sans), Geist Mono (Code), Fraunces (Editorial Serif), Pixelify Sans (Retro) |
| **Ikon** | Lucide React | Ikon SVG modular & custom brand icons |
| **Tema** | next-themes | Class-based dark mode management |
| **Package Manager** | pnpm 11.20.0 | Deterministic lockfile v9 |
| **Testing** | Node.js Test Runner (v20+) | Pengujian unit mandiri via `--experimental-strip-types` (48 tests passing) |

---

## 📁 Struktur Direktori

```
cv/
├── app/                  # Next.js App Router (layout root, font setup, homepage)
│   ├── about/            # Sub-rute Tentang / About (dalam perombakan desain)
│   ├── contact/          # Sub-rute Kontak (dalam perombakan desain)
│   ├── portfolio/        # Sub-rute Portofolio proyek (dalam perombakan desain)
│   ├── stack/            # Sub-rute Stack teknologi (dalam perombakan desain)
│   ├── maintenance/      # Halaman status Maintenance mode produksi
│   ├── not-found.tsx     # Halaman status 404 kustom
│   ├── globals.css       # Token OKLCH Tailwind v4 & keyframes animasi wave-y
│   ├── layout.tsx        # Setup 4 font Google, ThemeProvider, LanguageProvider
│   └── page.tsx          # Halaman beranda utama (VexooDashboard)
├── components/           # Komponen antarmuka modular
│   ├── ui/               # Primitif shadcn/ui & komponen animasi (WaveText, LetterRoll, Switch)
│   ├── sections/         # 8 Seksi konten CV klasik (Hero, Experience, Projects, Skills, dll.)
│   ├── vexoo-dashboard.tsx # Dashboard interaktif bento grid retro-futuristik
│   ├── status-page.tsx   # Komponen dasar halaman status responsif (@container + 100cqw)
│   ├── maintenance-view.tsx # Konten tampilan pemeliharaan bilingual
│   ├── not-found-view.tsx   # Konten tampilan 404 bilingual
│   └── ...               # SubpageHeader, ThemeSwitch, LanguageToggle, SiteFooter
├── lib/                  # Data layer & utilitas inti
│   ├── cv-data.ts        # Single source of truth seluruh isi portofolio (Bilingual, ~1155 baris)
│   ├── maintenance.ts    # Konfigurasi rute tersembunyi & pemeriksa status maintenance
│   ├── status-heading.ts # Kalkulasi empiris lebar em (K) heading piksel status page
│   ├── language-context.tsx # Custom bilingual context provider & useT() hook
│   └── utils.ts          # Utility cn() (clsx + tailwind-merge)
├── proxy.ts              # Next.js 16 Proxy handler (maintenance URL rewrite & bypass)
├── tests/                # Test suite unit testing (48 pengujian lolos via pnpm test)
│   ├── components/       # Pengujian unit komponen antarmuka
│   ├── hooks/            # Pengujian kustom hooks
│   └── lib/              # Pengujian unit lib (maintenance, data, helper, clipboard)
└── public/               # Aset statis publik
    ├── images/           # Foto profil resmi & avatar piksel
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

# 3. Jalankan development server (seluruh halaman terbuka untuk dikerjakan)
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda.

### Perintah Kualitas Kode & Pengujian

```bash
# Menjalankan unit test suite (48 tests)
pnpm test

# Validasi tipe TypeScript
pnpm typecheck

# Audit kode dengan ESLint
pnpm lint

# Format kode otomatis dengan Prettier
pnpm format

# Kompilasi build produksi
pnpm build

# Menjalankan server produksi lokal (menguji maintenance mode)
pnpm start

# Menjalankan server produksi lokal dengan seluruh halaman terbuka
SHOW_ALL_PAGES=true pnpm start
```

---

## 👤 Kontak & Profil

- **Nama:** Muhammad Hadid Wiransetyo
- **Peran:** Frontend Engineer
- **Lokasi:** Semarang, Indonesia
- **Situs Web:** [hadidwirsty.vercel.app](https://hadidwirsty.vercel.app)
- **LinkedIn:** [linkedin.com/in/hadidwirsty](https://linkedin.com/in/hadidwirsty)
- **GitHub:** [github.com/hadidwirsty](https://github.com/hadidwirsty)
- **Email:** [m.hadid.2001@gmail.com](mailto:m.hadid.2001@gmail.com)

---

## 📄 Lisensi & Hak Cipta

© 2026 Muhammad Hadid Wiransetyo. Seluruh hak cipta dilindungi undang-undang.
