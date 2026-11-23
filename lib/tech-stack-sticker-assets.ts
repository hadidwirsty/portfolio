/**
 * Typed Registry for Technology Pixel-Art Sticker Assets and Fallbacks.
 * Sourced directly from verified filesystem assets in public/images/pixel-art-sticker/
 * and authentic vector representations in components/stack/tech-icon.tsx.
 */

export type StickerAssetStatus =
  | "PIXEL_STICKER_AVAILABLE"
  | "GENUINE_FALLBACK_AVAILABLE"
  | "CONCEPTUAL_ITEM"
  | "ASSET_MISSING"

export interface TechStickerAssetInfo {
  techId: string
  name: string
  category: string
  status: StickerAssetStatus
  stickerPath?: string
  fallbackKind: "sticker" | "vector" | "conceptual" | "text"
  suggestedFilename?: string
  missingReason?: string
}

export const TECH_STICKER_REGISTRY: Record<string, TechStickerAssetInfo> = {
  // =========================================================
  // Category 01: Frontend Core & Frameworks
  // =========================================================
  typescript: {
    techId: "typescript",
    name: "TypeScript",
    category: "frontend-development",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/typescript-icon-sticker.png",
    fallbackKind: "sticker",
  },
  javascript: {
    techId: "javascript",
    name: "JavaScript",
    category: "frontend-development",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/javascript-icon-sticker.png",
    fallbackKind: "sticker",
  },
  react: {
    techId: "react",
    name: "React",
    category: "frontend-development",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/react-icon-sticker.png",
    fallbackKind: "sticker",
  },
  nextjs: {
    techId: "nextjs",
    name: "Next.js",
    category: "frontend-development",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/nextjs-icon-sticker.png",
    fallbackKind: "sticker",
  },
  html5: {
    techId: "html5",
    name: "HTML5",
    category: "frontend-development",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/html-icon-sticker.png",
    fallbackKind: "sticker",
  },
  css3: {
    techId: "css3",
    name: "CSS3",
    category: "frontend-development",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/css-icon-sticker.png",
    fallbackKind: "sticker",
  },

  // =========================================================
  // Category 02: UI & Design Systems
  // =========================================================
  tailwind: {
    techId: "tailwind",
    name: "Tailwind CSS",
    category: "ui-styling",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/tailwind-css-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "ant-design": {
    techId: "ant-design",
    name: "Ant Design",
    category: "ui-styling",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/ant-design-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "base-ui": {
    techId: "base-ui",
    name: "Base UI",
    category: "ui-styling",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/base-ui-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "ng-zorro": {
    techId: "ng-zorro",
    name: "NG-ZORRO",
    category: "ui-styling",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/ng-zorro-icon-sticker.png",
    fallbackKind: "sticker",
  },
  radix: {
    techId: "radix",
    name: "Radix UI",
    category: "ui-styling",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/radix-ui-icon-sticker.png",
    fallbackKind: "sticker",
  },
  shadcn: {
    techId: "shadcn",
    name: "shadcn/ui",
    category: "ui-styling",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/shadcn-icon-sticker.png",
    fallbackKind: "sticker",
  },

  // =========================================================
  // Category 03: State & Data Management
  // =========================================================
  "tanstack-query": {
    techId: "tanstack-query",
    name: "TanStack Query",
    category: "state-data",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/tanstack-query-icon-sticker.png",
    fallbackKind: "sticker",
  },
  zustand: {
    techId: "zustand",
    name: "Zustand",
    category: "state-data",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/zustand-icon-sticker.png",
    fallbackKind: "sticker",
  },
  redux: {
    techId: "redux",
    name: "Redux",
    category: "state-data",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/redux-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "react-hook-form": {
    techId: "react-hook-form",
    name: "React Hook Form",
    category: "state-data",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/react-hook-form-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "tanstack-table": {
    techId: "tanstack-table",
    name: "TanStack Table",
    category: "state-data",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/tanstack-table-icon-sticker.png",
    fallbackKind: "sticker",
  },
  recharts: {
    techId: "recharts",
    name: "Recharts",
    category: "state-data",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/recharts-icon-sticker.png",
    fallbackKind: "sticker",
  },

  // =========================================================
  // Category 04: Testing & Web Security
  // =========================================================
  vitest: {
    techId: "vitest",
    name: "Vitest",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/vitest-icon-sticker.png",
    fallbackKind: "sticker",
  },
  jest: {
    techId: "jest",
    name: "Jest",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/jest-icon-sticker.png",
    fallbackKind: "sticker",
  },
  rtl: {
    techId: "rtl",
    name: "Testing Library",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/testing-library-icon-sticker.png",
    fallbackKind: "sticker",
  },
  cypress: {
    techId: "cypress",
    name: "Cypress",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/cypress-icon-sticker.png",
    fallbackKind: "sticker",
  },
  jwt: {
    techId: "jwt",
    name: "JSON Web Token",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/jwt-icon-sticker.png",
    fallbackKind: "sticker",
  },
  zod: {
    techId: "zod",
    name: "Zod",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/zod-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "web-security": {
    techId: "web-security",
    name: "Web Security",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/jwt-icon-sticker.png",
    fallbackKind: "sticker",
  },
  auth0: {
    techId: "auth0",
    name: "Auth0",
    category: "testing-security",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/auth0-icon-sticker.png",
    fallbackKind: "sticker",
  },

  // =========================================================
  // Category 05: Cross-Framework Engineering
  // =========================================================
  vue: {
    techId: "vue",
    name: "Vue.js",
    category: "cross-framework",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/vuejs-icon-sticker.png",
    fallbackKind: "sticker",
  },
  nuxt: {
    techId: "nuxt",
    name: "Nuxt 3",
    category: "cross-framework",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/nuxt-icon-sticker.png",
    fallbackKind: "sticker",
  },
  angular: {
    techId: "angular",
    name: "Angular 18",
    category: "cross-framework",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/angular-icon-sticker.png",
    fallbackKind: "sticker",
  },
  blazor: {
    techId: "blazor",
    name: "Blazor Server",
    category: "cross-framework",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/blazor-server-icon-sticker.png",
    fallbackKind: "sticker",
  },
  nodejs: {
    techId: "nodejs",
    name: "Node.js",
    category: "cross-framework",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/nodejs-icon-sticker.png",
    fallbackKind: "sticker",
  },
  rxjs: {
    techId: "rxjs",
    name: "RxJS",
    category: "cross-framework",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/rxjs-icon-sticker.png",
    fallbackKind: "sticker",
  },

  // =========================================================
  // Category 06: Developer Tools & Cloud
  // =========================================================
  git: {
    techId: "git",
    name: "Git",
    category: "dev-tools-cloud",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/git-icon-sticker.png",
    fallbackKind: "sticker",
  },
  vite: {
    techId: "vite",
    name: "Vite",
    category: "dev-tools-cloud",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/vite-icon-sticker.png",
    fallbackKind: "sticker",
  },
  postman: {
    techId: "postman",
    name: "Postman",
    category: "dev-tools-cloud",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/postman-icon-sticker.png",
    fallbackKind: "sticker",
  },
  aws: {
    techId: "aws",
    name: "AWS Cloud",
    category: "dev-tools-cloud",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/aws-icon-sticker.png",
    fallbackKind: "sticker",
  },
  "vs-code": {
    techId: "vs-code",
    name: "VS Code",
    category: "dev-tools-cloud",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/vs-code-icon-sticker.png",
    fallbackKind: "sticker",
  },
  gitlab: {
    techId: "gitlab",
    name: "GitLab",
    category: "dev-tools-cloud",
    status: "PIXEL_STICKER_AVAILABLE",
    stickerPath: "/images/pixel-art-sticker/gitlab-icon-sticker.png",
    fallbackKind: "sticker",
  },
}

/**
 * Helper to retrieve sticker asset info safely by technology ID.
 */
export function getTechStickerAsset(techId: string): TechStickerAssetInfo {
  return (
    TECH_STICKER_REGISTRY[techId] ?? {
      techId,
      name: techId,
      category: "unknown",
      status: "ASSET_MISSING",
      fallbackKind: "text",
      missingReason: "Unregistered technology ID.",
    }
  )
}
