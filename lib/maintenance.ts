/**
 * Konfigurasi Pemeliharaan (Maintenance Mode)
 *
 * File ini adalah Satu Sumber Kebenaran (Single Source of Truth) untuk mengatur
 * visibilitas halaman portofolio selama masa perombakan desain.
 *
 * PANDUAN PENGELOLAAN:
 * 1. Membuka kembali satu halaman tertentu:
 *    - Cukup hapus path yang diinginkan dari array `HIDDEN_PATHS` di bawah ini
 *      (misal: hapus "/about" agar halaman /about bisa diakses kembali).
 * 2. Mematikan seluruh status pemeliharaan (semua halaman aktif):
 *    - Set Environment Variable `SHOW_ALL_PAGES=true` di dashboard Vercel / file .env.
 *    - Untuk pengujian build produksi lokal: `SHOW_ALL_PAGES=true pnpm start`.
 * 3. Mode Pengembangan Lokal (pnpm dev):
 *    - Secara otomatis SEMUA halaman tetap tampil normal (`isMaintenanceActive() === false`)
 *      sehingga proses perombakan desain tidak terganggu.
 */

export const HIDDEN_PATHS = [
  "/about",
  "/portfolio",
  "/contact",
  "/stack",
] as const

export type HiddenPath = (typeof HIDDEN_PATHS)[number]

/**
 * Mengecek apakah mode pemeliharaan sedang aktif.
 * Aktif HANYA di lingkungan produksi (`NODE_ENV === "production"`)
 * DAN jika `SHOW_ALL_PAGES !== "true"`.
 */
export function isMaintenanceActive(): boolean {
  if (process.env.NODE_ENV !== "production") {
    return false
  }
  return process.env.SHOW_ALL_PAGES !== "true"
}

/**
 * Memeriksa apakah suatu pathname cocok dengan daftar rute yang disembunyikan
 * atau merupakan sub-rute di bawahnya (misal: `/portfolio/project-1`).
 *
 * Memastikan tidak salah mencocokkan awalan serupa (misal: `/stacks` TIDAK AKAN cocok dengan `/stack`).
 */
export function isPageHidden(pathname: string): boolean {
  if (!pathname) return false

  // Normalisasi: hilangkan trailing slash kecuali jika root "/"
  const cleanPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname

  const normalized = cleanPath.toLowerCase()

  return HIDDEN_PATHS.some((hiddenPath) => {
    const target = hiddenPath.toLowerCase()
    return normalized === target || normalized.startsWith(`${target}/`)
  })
}
