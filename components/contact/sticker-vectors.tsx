import Image from "next/image"

import {
  ALL_STICKERS,
  getStickerMetadata,
  DIE_CUT_FILTER_STYLE,
  NATURAL_STICKER_FILTER_STYLE,
  type StickerMetadata,
  type StickerType,
} from "@/lib/sticker-metadata"

export {
  ALL_STICKERS,
  getStickerMetadata,
  DIE_CUT_FILTER_STYLE,
  NATURAL_STICKER_FILTER_STYLE,
  type StickerMetadata,
  type StickerType,
}

interface StickerVectorProps {
  id: string
  className?: string
}

const DEFAULT_STICKER_CLASS =
  "size-11 sm:size-13 lg:size-15 object-contain pointer-events-none select-none [image-rendering:pixelated]"

export function StickerVector({ id, className }: StickerVectorProps) {
  const imageClass = className
    ? `pointer-events-none select-none [image-rendering:pixelated] ${className}`
    : DEFAULT_STICKER_CLASS

  switch (id) {
    case "email":
      return (
        <Image
          src="/images/pixel-art-sticker/email-icon-sticker.png"
          alt="Email sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "github":
      return (
        <Image
          src="/images/pixel-art-sticker/github-icon-sticker.png"
          alt="GitHub sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "linkedin":
      return (
        <Image
          src="/images/pixel-art-sticker/linkedin-icon-sticker.png"
          alt="LinkedIn sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "instagram":
      return (
        <Image
          src="/images/pixel-art-sticker/instagram-icon-sticker.png"
          alt="Instagram sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "threads":
      return (
        <Image
          src="/images/pixel-art-sticker/threads-icon-sticker.png"
          alt="Threads sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "website":
      return (
        <Image
          src="/images/pixel-art-sticker/www-icon-sticker.png"
          alt="Website sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "cv":
      return (
        <Image
          src="/images/pixel-art-sticker/cv-resume-icon-sticker.png"
          alt="Resume CV sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "avatar":
      return (
        <Image
          src="/images/pixel-art-sticker/avatar-icon-sticker.png"
          alt="Hadidwirsty Pixel Head Avatar sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    case "open-to-work":
      return (
        <Image
          src="/images/pixel-art-sticker/open-to-work-icon-sticker.png"
          alt="Open to Work sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
        />
      )

    case "strava":
      return (
        <Image
          src="/images/pixel-art-sticker/strava-icon-sticker.png"
          alt="Strava sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    case "youtube":
      return (
        <Image
          src="/images/pixel-art-sticker/youtube-icon-sticker.png"
          alt="Youtube sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    case "react":
      return (
        <Image
          src="/images/pixel-art-sticker/react-icon-sticker.png"
          alt="React sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    case "nextjs":
      return (
        <Image
          src="/images/pixel-art-sticker/nextjs-icon-sticker.png"
          alt="Next.js sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    case "typescript":
      return (
        <Image
          src="/images/pixel-art-sticker/typescript-icon-sticker.png"
          alt="Typescript sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    case "tailwind-css":
      return (
        <Image
          src="/images/pixel-art-sticker/tailwind-css-icon-sticker.png"
          alt="Tailwind CSS sticker"
          width={80}
          height={80}
          unoptimized
          draggable={false}
          className={imageClass}
          priority
        />
      )

    default:
      return null
  }
}
