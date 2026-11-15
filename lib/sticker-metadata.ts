export type StickerType = "link" | "avatar" | "decorative"

export interface StickerMetadata {
  id: string
  type: StickerType
  name: string
  shape: string
  href?: string
  download?: boolean
}

export const DIE_CUT_FILTER_STYLE =
  "drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 5px 8px rgba(0,0,0,0.22))"

export const NATURAL_STICKER_FILTER_STYLE =
  "drop-shadow(0 4px 8px rgba(0,0,0,0.22))"

export const ALL_STICKERS: StickerMetadata[] = [
  {
    id: "email",
    type: "link",
    name: "Email",
    shape: "envelope",
    href: "mailto:m.hadid.2001@gmail.com",
  },
  {
    id: "github",
    type: "link",
    name: "GitHub",
    shape: "octocat",
    href: "https://github.com/hadidwirsty",
  },
  {
    id: "linkedin",
    type: "link",
    name: "LinkedIn",
    shape: "crest",
    href: "https://linkedin.com/in/hadidwirsty",
  },
  {
    id: "instagram",
    type: "link",
    name: "Instagram",
    shape: "camera",
    href: "https://www.instagram.com/hadidwirsty/",
  },
  {
    id: "threads",
    type: "link",
    name: "Threads",
    shape: "glyph",
    href: "https://www.threads.com/@hadidwirsty",
  },
  {
    id: "website",
    type: "link",
    name: "Website",
    shape: "globe",
    href: "https://hadidwirsty.vercel.app",
  },
  {
    id: "strava",
    type: "link",
    name: "Strava",
    shape: "glyph",
    href: "https://www.strava.com/athletes/hadidwirsty",
  },
  {
    id: "youtube",
    type: "link",
    name: "Youtube",
    shape: "glyph",
    href: "https://www.youtube.com/@hadidwirsty",
  },
  {
    id: "cv",
    type: "link",
    name: "Resume CV",
    shape: "document",
    href: "/cv/Muhammad-Hadid-Wiransetyo-CV-2026.pdf",
    download: true,
  },
  {
    id: "avatar",
    type: "avatar",
    name: "Pixel Avatar",
    shape: "circular",
  },
  {
    id: "open-to-work",
    type: "decorative",
    name: "Open to Work",
    shape: "starburst",
  },
  {
    id: "react",
    type: "decorative",
    name: "React",
    shape: "atom",
  },
  {
    id: "nextjs",
    type: "decorative",
    name: "Next.js",
    shape: "",
  },
  {
    id: "typescript",
    type: "decorative",
    name: "TypeScript",
    shape: "",
  },
  {
    id: "tailwind-css",
    type: "decorative",
    name: "Tailwind CSS",
    shape: "",
  },
]

export function getStickerMetadata(id: string): StickerMetadata | undefined {
  return ALL_STICKERS.find((s) => s.id === id)
}
