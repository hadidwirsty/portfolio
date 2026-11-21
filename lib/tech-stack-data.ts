export type Bi = {
  id: string
  en: string
}

function bi(id: string, en: string): Bi {
  return { id, en }
}

export interface TechItem {
  id: string
  name: string
  category: string
  icon?: string
  verifiedIn: string[]
  isCore?: boolean
}

export interface TechCategory {
  id: string
  index: string
  title: Bi
  description: Bi
  techs: TechItem[]
}

export interface CoreStackItem {
  name: string
  icon: string
  role: Bi
}

export const CORE_STACK: CoreStackItem[] = [
  {
    name: "TypeScript",
    icon: "/icons/skills/typescript.svg",
    role: bi("Arsitektur Bertipe Ketat", "Type-Safe Architecture"),
  },
  {
    name: "React",
    icon: "/icons/skills/react.svg",
    role: bi("Komponen Berbasis State", "Component Engine"),
  },
  {
    name: "Next.js",
    icon: "/icons/skills/nextjs.svg",
    role: bi("App Router & SSR/SSG", "App Router & SSR/SSG"),
  },
  {
    name: "Tailwind CSS",
    icon: "/icons/skills/tailwind.svg",
    role: bi("Sistem Desain Modern", "Utility Design System"),
  },
]

export const TECH_STACK_HERO = {
  title: bi("Di Balik Pengembangan.", "Behind the Build."),
  description: bi(
    "Teknologi yang saya gunakan dan proses pembelajaran yang mendukung pekerjaan saya.",
    "The technologies I work with and the learning behind my work."
  ),
  coreHeading: bi("Ekosistem Utama", "Primary Ecosystem"),
  sectionIndex: "01 / TECHNOLOGIES",
  sectionTitle: bi("Teknologi yang Saya Gunakan.", "Inside My Toolkit."),
  sectionSubtitle: bi(
    "Eksplorasi folder teknologi interaktif di bawah untuk melihat alat kerja, pustaka, dan framework yang saya gunakan.",
    "Explore the interactive technology folders below to reveal the tools, libraries, and frameworks I use."
  ),
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend-development",
    index: "01",
    title: bi("Frontend Core & Framework", "Frontend Core & Frameworks"),
    description: bi(
      "Bahasa pemrograman dan framework utama untuk rekayasa antarmuka web modern yang cepat dan terukur.",
      "Core languages and frameworks for engineering high-performance, scalable web interfaces."
    ),
    techs: [
      {
        id: "typescript",
        name: "TypeScript",
        category: "frontend-development",
        icon: "/icons/skills/typescript.svg",
        verifiedIn: ["All 13 Projects", "Telkomsigma", "UGM CS"],
        isCore: true,
      },
      {
        id: "javascript",
        name: "JavaScript",
        category: "frontend-development",
        icon: "/icons/skills/javascript.svg",
        verifiedIn: ["All Projects", "ES6+ Standards"],
      },
      {
        id: "react",
        name: "React",
        category: "frontend-development",
        icon: "/icons/skills/react.svg",
        verifiedIn: ["Monara", "Alisa", "IS-WARE", "Patricia", "WBS"],
        isCore: true,
      },
      {
        id: "nextjs",
        name: "Next.js",
        category: "frontend-development",
        icon: "/icons/skills/nextjs.svg",
        verifiedIn: ["IS-WARE", "Monara", "Portfolio CV"],
        isCore: true,
      },
      {
        id: "html5",
        name: "HTML5",
        category: "frontend-development",
        icon: "/icons/skills/html.svg",
        verifiedIn: ["W3C Semantic Standards"],
      },
      {
        id: "css3",
        name: "CSS3",
        category: "frontend-development",
        icon: "/icons/skills/css.svg",
        verifiedIn: ["Responsive Layouts", "Keyframe Animations"],
      },
    ],
  },
  {
    id: "ui-styling",
    index: "02",
    title: bi("Antarmuka & Desain Sistem", "UI & Design Systems"),
    description: bi(
      "Sistem desain berbasis komponen modular, token warna modern, dan primitif aksesibel.",
      "Component-driven design systems, modern color tokens, and accessible primitives."
    ),
    techs: [
      {
        id: "ant-design",
        name: "Ant Design",
        category: "ui-styling",
        verifiedIn: ["Alisa 2.0 Infomedia", "IMAPS BPJS Kesehatan"],
      },
      {
        id: "base-ui",
        name: "Base UI",
        category: "ui-styling",
        verifiedIn: ["Portfolio CV", "Base Nova Style Primitives"],
      },
      {
        id: "ng-zorro",
        name: "NG-ZORRO",
        category: "ui-styling",
        verifiedIn: ["IMAPS BPJS Kesehatan", "Angular Enterprise UI"],
      },
      {
        id: "radix",
        name: "Radix UI",
        category: "ui-styling",
        verifiedIn: ["Info Tender LPSE", "Accessible Primitives"],
      },
      {
        id: "shadcn",
        name: "Shadcn",
        category: "ui-styling",
        verifiedIn: ["Portfolio CV", "Modern Accessible UI Components"],
      },
    ],
  },
  {
    id: "state-data",
    index: "03",
    title: bi("Manajemen State & Data", "State & Data Management"),
    description: bi(
      "Sinkronisasi cache server, penanganan formulir performa tinggi, dan validasi skema bertipe ketat.",
      "Server cache synchronization, high-performance form state, and strict schema validation."
    ),
    techs: [
      {
        id: "tanstack-query",
        name: "TanStack Query",
        category: "state-data",
        verifiedIn: ["Server state caching across enterprise apps"],
      },
      {
        id: "zustand",
        name: "Zustand",
        category: "state-data",
        verifiedIn: ["Lightweight client state store"],
      },
      {
        id: "redux",
        name: "Redux",
        category: "state-data",
        verifiedIn: ["Netmonk RTK Query dual-token auth"],
      },
      {
        id: "react-hook-form",
        name: "React Hook Form",
        category: "state-data",
        verifiedIn: ["Enterprise form orchestration"],
      },
      {
        id: "zod",
        name: "Zod",
        category: "state-data",
        verifiedIn: ["Schema validation & contract inference"],
      },
    ],
  },
  {
    id: "testing-security",
    index: "04",
    title: bi("Pengujian & Keamanan Web", "Testing & Web Security"),
    description: bi(
      "Pengujian unit otomatis dan hardening keamanan web sisi klien (XSS, CSP, validasi berkas biner).",
      "Automated unit testing and client-side web security hardening (XSS, CSP, binary validation)."
    ),
    techs: [
      {
        id: "vitest",
        name: "Vitest",
        category: "testing-security",
        verifiedIn: ["Frontend automated test suite"],
      },
      {
        id: "jest",
        name: "Jest",
        category: "testing-security",
        verifiedIn: ["JavaScript test runner baseline"],
      },
      {
        id: "rtl",
        name: "Testing Library",
        category: "testing-security",
        verifiedIn: ["Component behavior & DOM integration tests"],
      },
      {
        id: "cypress",
        name: "Cypress",
        category: "testing-security",
        verifiedIn: ["Dicoding React Developer Expert", "E2E Testing"],
      },
      {
        id: "jwt",
        name: "JSON Web Token",
        category: "testing-security",
        verifiedIn: [
          "Metabase Dashboard Embed Security",
          "UGM CS Thesis",
          "Netmonk RTK Query",
        ],
      },
    ],
  },
  {
    id: "cross-framework",
    index: "05",
    title: bi("Pengembangan Lintas Framework", "Cross-Framework Engineering"),
    description: bi(
      "Pengalaman rekayasa aplikasi enterprise berskala nasional di luar ekosistem React.",
      "Architectural experience on nationwide enterprise applications beyond React."
    ),
    techs: [
      {
        id: "vue",
        name: "Vue.js",
        category: "cross-framework",
        icon: "/icons/skills/vue.svg",
        verifiedIn: ["CART Attack Surface Management"],
      },
      {
        id: "nuxt",
        name: "Nuxt 3",
        category: "cross-framework",
        icon: "/icons/skills/nuxt.svg",
        verifiedIn: ["CART Nuxt 3 fullstack modules & Pinia"],
      },
      {
        id: "angular",
        name: "Angular 18",
        category: "cross-framework",
        icon: "/icons/skills/angular.svg",
        verifiedIn: ["IMAPS BPJS Kesehatan (NG-ZORRO, RxJS)"],
      },
      {
        id: "blazor",
        name: "Blazor Server",
        category: "cross-framework",
        verifiedIn: ["PIS MARS .NET 8 C# system"],
      },
      {
        id: "nodejs",
        name: "Node.js",
        category: "cross-framework",
        icon: "/icons/skills/nodejs.svg",
        verifiedIn: [
          "Netmonk Analytics Express REST API",
          "Dicoding Backend Expert",
        ],
      },
    ],
  },
  {
    id: "dev-tools-cloud",
    index: "06",
    title: bi("Peralatan Pengembang & Cloud", "Developer Tools & Cloud"),
    description: bi(
      "Alat kolaborasi kode, bundler berkecepatan tinggi, pengujian REST API, dan komputasi awan.",
      "Code collaboration, high-speed bundlers, REST API testing, and cloud fundamentals."
    ),
    techs: [
      {
        id: "git",
        name: "Git",
        category: "dev-tools-cloud",
        icon: "/icons/skills/git.svg",
        verifiedIn: ["GitLab CI & GitHub daily workflows"],
      },
      {
        id: "vite",
        name: "Vite",
        category: "dev-tools-cloud",
        icon: "/icons/skills/vite.svg",
        verifiedIn: ["Modern frontend build toolchain"],
      },
      {
        id: "postman",
        name: "Postman",
        category: "dev-tools-cloud",
        verifiedIn: ["REST API testing & verification"],
      },
      {
        id: "aws",
        name: "AWS Cloud",
        category: "dev-tools-cloud",
        verifiedIn: ["S3 cloud storage & EC2 fundamentals"],
      },
      {
        id: "vs-code",
        name: "VS Code",
        category: "dev-tools-cloud",
        verifiedIn: ["Primary development environment & TypeScript IDE"],
      },
    ],
  },
]
