/**
 * Konstanta lebar teks heading dalam satuan `em` pada font Pixelify Sans Bold (weight 700).
 *
 * CARA MENGUKUR ULANG DI BROWSER:
 * 1. Pasang teks target di elemen dengan styling:
 *    font-family: 'Pixelify Sans', sans-serif;
 *    font-weight: 700;
 *    font-size: 100px;
 *    display: inline-block;
 *    (dengan struktur WaveText: tiap karakter span display inline-block, white-space pre)
 * 2. Ambil lebar rendered: `el.getBoundingClientRect().width`
 * 3. Konstanta K = lebar / 100
 *
 * Hasil pengukuran empiris di Google Chrome headless:
 * - "Maintenance": 672.3px / 100 = 6.723em
 * - "Pemeliharaan": 697.2px / 100 = 6.972em
 * - "Perbaikan": 525.2px / 100 = 5.252em
 * - "404": 181.0px / 100 = 1.810em
 */
export const MAINTENANCE_EM_WIDTH = 6.723
export const PEMELIHARAAN_EM_WIDTH = 6.972
export const PERBAIKAN_EM_WIDTH = 5.252
export const NOT_FOUND_EM_WIDTH = 1.81

export const HEADING_EM_WIDTHS: Record<string, number> = {
  Maintenance: MAINTENANCE_EM_WIDTH,
  Pemeliharaan: PEMELIHARAAN_EM_WIDTH,
  Perbaikan: PERBAIKAN_EM_WIDTH,
  "404": NOT_FOUND_EM_WIDTH,
}

/**
 * Rata-rata lebar karakter dalam satuan `em` untuk font Pixelify Sans Bold (weight 700).
 * Digunakan sebagai estimasi dinamis otomatis jika ada teks heading baru di luar kamus resmi.
 */
export const ESTIMATED_EM_PER_CHAR = 0.59

/**
 * Menghitung lebar teks heading dalam satuan `em`:
 * 1. Jika `emWidth` diberikan secara eksplisit, gunakan nilai tersebut.
 * 2. Jika heading cocok dengan entri terukur di `HEADING_EM_WIDTHS`, gunakan nilai empiris presisi.
 * 3. Jika teks baru tidak ada di kamus, gunakan estimasi dinamis `panjang_karakter * 0.59em` (min. 1.8em).
 */
export function resolveHeadingEmWidth(
  heading: string,
  explicitEmWidth?: number
): number {
  if (typeof explicitEmWidth === "number" && explicitEmWidth > 0) {
    return explicitEmWidth
  }
  const trimmed = heading.trim()
  if (trimmed in HEADING_EM_WIDTHS) {
    return HEADING_EM_WIDTHS[trimmed]
  }
  // Pencarian case-insensitive
  const lower = trimmed.toLowerCase()
  for (const [key, width] of Object.entries(HEADING_EM_WIDTHS)) {
    if (key.toLowerCase() === lower) {
      return width
    }
  }
  // Estimasi proporsional dinamis berbasis panjang karakter
  return Math.max(
    1.8,
    Math.round(trimmed.length * ESTIMATED_EM_PER_CHAR * 1000) / 1000
  )
}
