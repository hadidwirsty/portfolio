# Portfolio & Interactive CV — Muhammad Hadid Wiransetyo

Situs web portofolio dan kurikulum vitae interaktif untuk **Muhammad Hadid Wiransetyo** (Frontend Web Developer). Dibangun dengan Next.js App Router, React 19, TypeScript, Tailwind CSS v4, dan komponen primitif berbasis shadcn/ui (`base-nova`).

---

## ✨ Fitur Utama

- **Bilingual (ID / EN)**: Sistem internasionalisasi zero-dependency berbasis React Context yang mulus dengan auto-detect bahasa peramban dan penyimpanan preferensi lokal.
- **Dark / Light Mode**: Dukungan tema gelap dan terang instan via `next-themes` dan transisi CSS, lengkap dengan shortcut keyboard `D` untuk berpindah tema secara cepat.
- **Zero Hydration Mismatch**: Render SSR dan Client teruji 100% konsisten tanpa layout shift atau peringatan hidrasi.
- **Desain Modern & Aksesibel**: Menggunakan tipografi Google Fonts (*Inter*, *Geist Mono*, dan *Fraunces*), token warna OKLCH, dan kepatuhan semantik HTML & ARIA.
- **Unduh Dokumen CV**: Tombol unduh langsung untuk berkas CV PDF resmi.

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Versi |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.6 |
| **Runtime & Library** | React & React DOM | 19.2.4 |
| **Language** | TypeScript (Strict Mode) | ^5 |
| **Styling** | Tailwind CSS v4 + tw-animate-css | ^4 |
| **Primitives** | shadcn/ui (`base-nova` style) + `@base-ui/react` | ^4.16.1 / ^1.7.0 |
| **Icons** | Lucide React | ^1.28.0 |
| **Theme** | next-themes | ^0.4.6 |
| **Package Manager** | pnpm | 11.20.0 |

---

## 📁 Struktur Direktori

```
cv/
├── app/                  # Next.js App Router (layout, homepage, globals.css)
├── components/           # UI Components
│   ├── sections/         # Bagian-bagian CV (Hero, Experience, Projects, Skills, dll.)
│   ├── ui/               # Primitif komponen shadcn/ui (Button, Badge, Card, Separator)
│   └── ...               # Header, Footer, ThemeToggle, LanguageToggle
├── lib/                  # Data & Utilities
│   ├── cv-data.ts        # Single source of truth untuk seluruh konten CV (Bilingual)
│   ├── language-context.tsx # Provider & hook i18n
│   └── utils.ts          # Helper class merging (clsx + tailwind-merge)
└── public/               # Asset statis (foto profil, berkas CV PDF)
```

---

## 🚀 Perintah Pengembangan

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (v20+) dan [pnpm](https://pnpm.io/) (v11+).

```bash
# Menjalankan dev server lokal
pnpm dev

# Menjalankan pemeriksaan tipe TypeScript
pnpm typecheck

# Menjalankan linter ESLint
pnpm lint

# Memformat kode dengan Prettier
pnpm format

# Membangun bundle produksi
pnpm build

# Menjalankan aplikasi hasil build produksi
pnpm start
```

---

## 📄 Lisensi & Hak Cipta

© 2026 Muhammad Hadid Wiransetyo. Hak cipta dilindungi undang-undang.

