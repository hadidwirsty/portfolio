import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import {
  CORE_STACK,
  TECH_CATEGORIES,
  TECH_STACK_HERO,
} from "../../lib/tech-stack-data.ts"
import {
  TECH_STICKER_REGISTRY,
  getTechStickerAsset,
} from "../../lib/tech-stack-sticker-assets.ts"
import {
  generateControlledScatterLayout,
  validateScatterLayout,
  SCATTER_BOUNDS,
  SIX_ITEM_FORMATIONS,
  FIVE_ITEM_FORMATIONS,
  fitScatterToArea,
  scatterSessionAfterReveal,
  stickerHalfExtent,
  tooltipBridgeHeight,
} from "../../components/stack/controlled-scatter.ts"

const DATA_PATH = path.resolve(process.cwd(), "lib/tech-stack-data.ts")
const STICKER_REGISTRY_PATH = path.resolve(
  process.cwd(),
  "lib/tech-stack-sticker-assets.ts"
)
const HERO_PATH = path.resolve(
  process.cwd(),
  "components/stack/tech-stack-hero.tsx"
)
const FOLDER_PATH = path.resolve(
  process.cwd(),
  "components/stack/technology-folder.tsx"
)
const PROTOTYPE_PATH = path.resolve(
  process.cwd(),
  "components/stack/frontend-folder-prototype.tsx"
)
const PHYSICAL_FOLDER_PATH = path.resolve(
  process.cwd(),
  "components/stack/technology-physical-folder.tsx"
)
const GRID_PATH = path.resolve(
  process.cwd(),
  "components/stack/technology-folder-grid.tsx"
)
const PAGE_PATH = path.resolve(process.cwd(), "app/stack/page.tsx")

test("tech stack data defines exactly 4 core technologies and 6 verified categories", () => {
  assert.ok(fs.existsSync(DATA_PATH), "lib/tech-stack-data.ts must exist")

  // 1. Core Stack
  assert.strictEqual(
    CORE_STACK.length,
    4,
    "Core stack must contain exactly 4 technologies"
  )
  const coreNames = CORE_STACK.map((c) => c.name)
  assert.deepStrictEqual(
    coreNames,
    ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    "Core stack must be TypeScript, React, Next.js, and Tailwind CSS"
  )
  for (const item of CORE_STACK) {
    assert.ok(item.role.id.length > 0, `${item.name} must have ID role text`)
    assert.ok(item.role.en.length > 0, `${item.name} must have EN role text`)
  }

  // 2. Tech Categories
  assert.strictEqual(
    TECH_CATEGORIES.length,
    6,
    "Must define exactly 6 technology folder categories"
  )
  const indices = TECH_CATEGORIES.map((cat) => cat.index)
  assert.deepStrictEqual(
    indices,
    ["01", "02", "03", "04", "05", "06"],
    "Indices must be 01 through 06 sequentially"
  )

  for (const cat of TECH_CATEGORIES) {
    assert.ok(cat.title.id.length > 0, `Category ${cat.id} must have ID title`)
    assert.ok(cat.title.en.length > 0, `Category ${cat.id} must have EN title`)
    assert.ok(
      cat.description.id.length > 0,
      `Category ${cat.id} must have ID description`
    )
    assert.ok(
      cat.description.en.length > 0,
      `Category ${cat.id} must have EN description`
    )
    assert.ok(
      cat.techs.length >= 3,
      `Category ${cat.id} must have at least 3 technologies`
    )

    for (const tech of cat.techs) {
      assert.ok(tech.name.length > 0, "Tech item must have a name")
      assert.ok(
        tech.verifiedIn.length > 0,
        `${tech.name} must specify verified projects/sources`
      )
    }
  }

  // 3. Section Titles & Descriptions
  assert.strictEqual(TECH_STACK_HERO.sectionIndex, "01 / TECHNOLOGIES")
  assert.ok(TECH_STACK_HERO.title.id.length > 0)
  assert.ok(TECH_STACK_HERO.title.en.length > 0)
})

test("tech stack hero renders KineticHeading, subtitle, and always-visible core stack", () => {
  assert.ok(fs.existsSync(HERO_PATH), "tech-stack-hero.tsx must exist")
  const source = fs.readFileSync(HERO_PATH, "utf-8")

  // Kinetic heading integration with peek="0" to eliminate negative margin collision
  assert.match(
    source,
    /<KineticHeading[\s\S]*?text=\{title\}[\s\S]*?motionKey="stack"[\s\S]*?peek="0"/,
    "must render KineticHeading with peek=0"
  )

  // Subtitle styling
  assert.match(
    source,
    /font-sans text-sm[\s\S]*?text-muted-foreground[\s\S]*?sm:text-base/,
    "must render comfortable responsive body subtitle"
  )

  // Core stack rendering
  assert.match(
    source,
    /CORE_STACK\.map/,
    "must map over CORE_STACK technologies"
  )

  // Dark mode subtle border convention: border-border/50 -> hover:border-border
  assert.match(
    source,
    /border-border\/50[\s\S]*?hover:border-border/,
    "must follow dark-mode subtle border standards"
  )
})

test("frontend folder prototype implements theme-aware physical folder with GradientMotionBackground, dedicated tooltip overlay and high sticker exposure", () => {
  assert.ok(
    fs.existsSync(PROTOTYPE_PATH),
    "frontend-folder-prototype.tsx must exist"
  )
  const source = fs.readFileSync(PROTOTYPE_PATH, "utf-8")

  // GradientMotionBackground integration on back folder plate
  assert.match(
    source,
    /import\s*\{\s*GradientMotionBackground\s*\}\s*from\s*["']@\/components\/ui\/gradient-motion-background["']/,
    "must reuse existing GradientMotionBackground component"
  )
  assert.match(
    source,
    /<GradientMotionBackground[\s\S]*?seed=\{42\}[\s\S]*?speed=\{28\}[\s\S]*?blurAmount=\{45\}/,
    "must configure GradientMotionBackground with canonical parameters (seed 42, speed 28, blur 45)"
  )
  assert.match(
    source,
    /clipPathUnits=["']objectBoundingBox["']/,
    "must define normalized SVG clipPath for responsive silhouette clipping"
  )
  assert.match(
    source,
    /style=\{\{\s*clipPath:\s*["']url\(#folder-back-clip-norm\)["']\s*\}\}/,
    "must mask animated background strictly to folder silhouette"
  )

  // Front pocket theme-aware gradients and depth shadows
  assert.match(
    source,
    /id=["']folder-front-grad-dark["']/,
    "must define dark mode front pocket gradient"
  )
  assert.match(
    source,
    /id=["']folder-front-grad-light["']/,
    "must define light mode front pocket gradient"
  )
  assert.match(
    source,
    /dark:(?:\[fill:url\(#folder-front-grad-dark\)\]|fill-\[url\(#folder-front-grad-dark\)\])/,
    "must apply dark front pocket fill gradient override on dark mode"
  )

  // Design system border compliance: stroke-border/50 -> group-hover:stroke-border
  assert.match(
    source,
    /stroke-border\/50[\s\S]*?group-hover:stroke-border/,
    "must adhere to design system border standard for interactive folder"
  )

  // Dedicated tooltip overlay layer at z-40 anchored directly above hovered sticker
  assert.match(
    source,
    /DEDICATED TOOLTIP OVERLAY[\s\S]*?z-40/,
    "must render tooltip in dedicated overlay layer at z-40 above front pocket"
  )
  assert.match(
    source,
    /calculateTooltipCoords\(/,
    "must compute anchor coordinates via calculateTooltipCoords"
  )
  assert.match(
    source,
    /-translate-x-1\/2\s+-translate-y-full/,
    "must anchor bottom-center of tooltip above target point"
  )
  assert.match(
    source,
    /bg-popover\/95[\s\S]*?text-popover-foreground/,
    "must use theme-aware popover tokens for tooltip"
  )

  // Calibrated resting sticker positions with ~88-92% artwork exposure
  assert.match(
    source,
    /typescript:\s*\{[\s\S]*?resting:\s*\{[^}]*y:\s*-74/,
    "must elevate resting TypeScript sticker for high exposure"
  )
  assert.match(
    source,
    /javascript:\s*\{[\s\S]*?resting:\s*\{[^}]*y:\s*-64/,
    "must elevate resting JavaScript sticker for high exposure"
  )
  assert.match(
    source,
    /react:\s*\{[\s\S]*?resting:\s*\{[^}]*y:\s*-72/,
    "must elevate resting React sticker for high exposure"
  )

  // Enlarged physical folder geometry (dominates grid cell)
  assert.match(
    source,
    /max-w-(?:\[360px\]|90)[\s\S]*?sm:max-w-(?:\[430px\]|107\.5)[\s\S]*?lg:max-w-(?:\[450px\]|112\.5)/,
    "must slightly enlarge folder width to 430-450px on desktop"
  )
  assert.match(
    source,
    /h-80[\s\S]*?sm:h-86[\s\S]*?lg:h-90/,
    "must enlarge folder height proportionally"
  )

  // Enlarged pixel-art sticker sizing (size-18 sm:size-20 lg:size-22, apparent ~88-100px)
  assert.match(
    source,
    /size-18\s+object-contain[\s\S]*?sm:size-20\s+lg:size-22/,
    "must enlarge stickers to apparent size of ~88-100px"
  )

  // Minimal front pocket typography (Title + Subtitle only)
  assert.match(
    source,
    /<h3[^>]*>[\s\S]*?Frontend[\s\S]*?<\/h3>/,
    "must display minimal primary title 'Frontend'"
  )
  assert.match(
    source,
    /Languages & Frameworks/,
    "must display quiet secondary label 'Languages & Frameworks'"
  )
  assert.match(
    source,
    /Bahasa & Framework/,
    "must display quiet localized label 'Bahasa & Framework'"
  )

  // Removal of visual clutter from visible UI
  assert.doesNotMatch(
    source,
    /01\s*\/\s*TOOLKIT/,
    "must REMOVE '01 / TOOLKIT' label from visible UI to prevent seam collision"
  )
  assert.doesNotMatch(
    source,
    /\{toolsCount\}\s*\{lang === ["']id["'] \? ["']Teknologi["'] : ["']Technologies["']\}/,
    "must REMOVE redundant count badge from visible front pocket"
  )
  assert.doesNotMatch(
    source,
    /PROTOTYPE/,
    "must REMOVE 'PROTOTYPE' stage badge"
  )

  // Pixel-art sticker integration: verified local assets mapped 1:1
  const STICKER_MAPPINGS: Record<string, string> = {
    typescript: "/images/pixel-art-sticker/typescript-icon-sticker.png",
    javascript: "/images/pixel-art-sticker/javascript-icon-sticker.png",
    react: "/images/pixel-art-sticker/react-icon-sticker.png",
    nextjs: "/images/pixel-art-sticker/nextjs-icon-sticker.png",
    html5: "/images/pixel-art-sticker/html-icon-sticker.png",
    css3: "/images/pixel-art-sticker/css-icon-sticker.png",
  }

  for (const [techId, assetPath] of Object.entries(STICKER_MAPPINGS)) {
    const fullDiskPath = path.resolve(process.cwd(), "public" + assetPath)
    assert.ok(
      fs.existsSync(fullDiskPath),
      `Sticker file for ${techId} must exist at ${assetPath}`
    )
    assert.match(
      source,
      new RegExp(`${techId}:\\s*["']${assetPath}["']`),
      `must map ${techId} to authentic local sticker ${assetPath}`
    )
  }

  // Elimination of dark boxed tile containers and borders
  assert.doesNotMatch(
    source,
    /bg-zinc-900\/95 dark:bg-zinc-900/,
    "must NOT use dark boxed tile background"
  )
  assert.doesNotMatch(
    source,
    /rounded-2xl p-2\.5/,
    "must NOT use rounded-2xl tile container with padding"
  )

  // Transparent pixel-art rendering fidelity
  assert.match(
    source,
    /image-rendering:\s*pixelated/,
    "must preserve crisp pixel-art edges via image-rendering:pixelated"
  )
  assert.match(
    source,
    /drop-shadow-\[0_4px_8px_rgba\(0,0,0,0\.35\)\]/,
    "must apply object-level drop shadow to sticker artwork"
  )

  // Organic 2D scatter coordinates with multiple vertical tiers
  assert.match(
    source,
    /STICKER_PLACEMENTS/,
    "must define STICKER_PLACEMENTS with per-technology spatial mappings"
  )

  // Hover scatter + click-to-pin state model
  assert.match(
    source,
    /const isRevealed = isPinned \|\| isHovered/,
    "must activate reveal state either on hover or when pinned"
  )
  assert.match(source, /onMouseEnter=\{\(\) => setIsHovered\(true\)\}/)
  assert.match(source, /onMouseLeave=/)

  // Accessible semantics without invalid nested buttons
  assert.match(
    source,
    /className="sr-only"[\s\S]*?\{tech\.name\}/,
    "must provide screen-reader accessible technology names"
  )
  assert.match(
    source,
    /aria-label=\{ariaLabel\}/,
    "must announce category and technology list on main interactive card"
  )

  // Deterministic motion physics
  assert.doesNotMatch(
    source,
    /\bMath\.random\s*\(/,
    "must NOT use Math.random()"
  )
  assert.match(source, /stiffness:\s*300/, "must use standard spring stiffness")
  assert.match(source, /damping:\s*24/, "must use standard spring damping")
  assert.match(
    source,
    /useReducedMotion\(\)/,
    "must respect prefers-reduced-motion"
  )
})

test("technology folder grid rolls out TechnologyPhysicalFolder to all 6 categories", () => {
  assert.ok(fs.existsSync(GRID_PATH), "technology-folder-grid.tsx must exist")
  const source = fs.readFileSync(GRID_PATH, "utf-8")

  // Rolls out TechnologyPhysicalFolder to all categories
  assert.match(
    source,
    /<TechnologyPhysicalFolder/,
    "must render TechnologyPhysicalFolder across all categories"
  )

  // Eliminates legacy dashboard card from active /stack route
  assert.doesNotMatch(
    source,
    /<TechnologyFolder\b/,
    "must NOT render legacy TechnologyFolder on active /stack grid"
  )

  // 3-tier responsive grid
  assert.match(
    source,
    /grid grid-cols-1[\s\S]*?sm:grid-cols-2[\s\S]*?lg:grid-cols-3/,
    "must define 1-col mobile, 2-col tablet, 3-col desktop layout"
  )
})

test("technology physical folder component implements unified silhouette, masked gradient, and dedicated tooltip", () => {
  assert.ok(
    fs.existsSync(PHYSICAL_FOLDER_PATH),
    "technology-physical-folder.tsx must exist"
  )
  const source = fs.readFileSync(PHYSICAL_FOLDER_PATH, "utf-8")

  // Silhouette-masked GradientMotionBackground
  assert.match(
    source,
    /<GradientMotionBackground/,
    "must integrate GradientMotionBackground inside physical folder"
  )
  assert.match(
    source,
    /clipPathUnits=["']objectBoundingBox["']/,
    "must define normalized SVG clipPath for responsive silhouette clipping"
  )

  // Design system border standard
  assert.match(
    source,
    /stroke-border\/50[\s\S]*?group-hover:stroke-border/,
    "must adhere to design system border standard"
  )

  // Dedicated tooltip overlay layer at z-40
  assert.match(
    source,
    /DEDICATED TOOLTIP OVERLAY[\s\S]*?z-40/,
    "must render dedicated tooltip overlay at z-40 above pocket"
  )
  // Dual-path theme-aware front pocket: dark mode MUST be dark, light mode MUST be light
  assert.match(
    source,
    /fill=\{`url\(#folder-front-grad-light-\$\{category\.id\}\)`\}[\s\S]*?dark:hidden/,
    "light mode pocket path must use light gradient and dark:hidden"
  )
  assert.match(
    source,
    /fill=\{`url\(#folder-front-grad-dark-\$\{category\.id\}\)`\}[\s\S]*?hidden[\s\S]*?dark:block/,
    "dark mode pocket path must use dark gradient and hidden dark:block"
  )

  // Optical size normalization for fallback emblems
  assert.match(
    source,
    /relative flex size-18 items-center justify-center[\s\S]*?sm:size-20 lg:size-22/,
    "fallback wrapper must match full sticker size-18 sm:size-20 lg:size-22 bounding box"
  )
  assert.match(
    source,
    /size-15 text-foreground sm:size-17 lg:size-19/,
    "shadcn vector emblem must be optically scaled"
  )
  assert.match(
    source,
    /text-3xl font-black tracking-tighter text-amber-500 sm:text-4xl lg:text-\[44px\]/,
    "zustand emblem must use bold typographic presence"
  )
  assert.match(
    source,
    /text-4xl font-black text-\[#3068b7\] sm:text-5xl lg:text-6xl/,
    "zod emblem must use bold typographic presence"
  )

  // Minimal typography without clutter
  assert.doesNotMatch(
    source,
    /01\s*\/\s*TOOLKIT/,
    "must NOT include '01 / TOOLKIT' label on physical pocket"
  )
  assert.doesNotMatch(source, /PROTOTYPE/, "must NOT include 'PROTOTYPE' badge")
})

test("technology physical folder defines expressive multi-layer resting stacks for 4-item and 5-item categories", () => {
  assert.ok(
    fs.existsSync(PHYSICAL_FOLDER_PATH),
    "technology-physical-folder.tsx must exist"
  )
  const source = fs.readFileSync(PHYSICAL_FOLDER_PATH, "utf-8")

  // 4-item preset multi-layer vertical offsets (at least 14px difference between tiers)
  assert.match(
    source,
    /FOUR_ITEM_PRESETS[\s\S]*?y:\s*-76[\s\S]*?y:\s*-64[\s\S]*?y:\s*-80[\s\S]*?y:\s*-68/,
    "4-item preset must define multi-layer vertical offsets (-76, -64, -80, -68) preventing flat horizontal seam lines"
  )

  // 5-item preset multi-layer vertical offsets (at least 18px difference between tiers)
  assert.match(
    source,
    /FIVE_ITEM_PRESETS[\s\S]*?y:\s*-76[\s\S]*?y:\s*-64[\s\S]*?y:\s*-82[\s\S]*?y:\s*-66[\s\S]*?y:\s*-74/,
    "5-item preset must define tiered multi-layer vertical offsets (-76, -64, -82, -66, -74)"
  )

  // Preserves Frontend canonical 6-item placements exactly
  assert.match(
    source,
    /typescript:\s*\{[\s\S]*?resting:\s*\{[^}]*y:\s*-74/,
    "must preserve Frontend canonical TypeScript resting position"
  )
  assert.match(
    source,
    /react:\s*\{[\s\S]*?resting:\s*\{[^}]*y:\s*-72/,
    "must preserve Frontend canonical React resting position"
  )

  // Category 02 (UI & Design) organic multi-tier expanded placements (non-linear abstract scatter like Frontend)
  assert.match(
    source,
    /UI_STYLING_PLACEMENTS[\s\S]*?"ant-design":[\s\S]*?y:\s*-125[\s\S]*?"base-ui":[\s\S]*?y:\s*-195[\s\S]*?"ng-zorro":[\s\S]*?y:\s*-210[\s\S]*?radix:[\s\S]*?y:\s*-115[\s\S]*?shadcn:[\s\S]*?y:\s*-168/,
    "UI & Design placements must feature non-linear multi-depth expanded scatter (radix at lower-tier y: -115, ng-zorro at peak y: -210)"
  )

  // Category 03 (State & Data) organic multi-tier expanded placements (asymmetrical abstract scatter)
  assert.match(
    source,
    /STATE_DATA_PLACEMENTS[\s\S]*?"tanstack-query":[\s\S]*?y:\s*-178[\s\S]*?zustand:[\s\S]*?y:\s*-115[\s\S]*?redux:[\s\S]*?y:\s*-210[\s\S]*?"react-hook-form":[\s\S]*?y:\s*-185[\s\S]*?"tanstack-table":[\s\S]*?y:\s*-188[\s\S]*?recharts:[\s\S]*?y:\s*-130/,
    "State & Data placements must feature non-linear multi-depth expanded scatter (zustand at lower-tier y: -115, redux at peak y: -210)"
  )

  // Category 04 (Testing & Web Security) organic multi-tier expanded placements
  assert.match(
    source,
    /TESTING_SECURITY_PLACEMENTS[\s\S]*?vitest:[\s\S]*?y:\s*-125[\s\S]*?jest:[\s\S]*?y:\s*-195[\s\S]*?rtl:[\s\S]*?y:\s*-210[\s\S]*?cypress:[\s\S]*?y:\s*-115[\s\S]*?jwt:[\s\S]*?y:\s*-168[\s\S]*?zod:[\s\S]*?y:\s*-130/,
    "Testing & Security placements must feature non-linear multi-depth expanded scatter"
  )

  // Category 05 (Cross-Framework Engineering) organic multi-tier expanded placements
  assert.match(
    source,
    /CROSS_FRAMEWORK_PLACEMENTS[\s\S]*?vue:[\s\S]*?y:\s*-178[\s\S]*?nuxt:[\s\S]*?y:\s*-115[\s\S]*?angular:[\s\S]*?y:\s*-210[\s\S]*?blazor:[\s\S]*?y:\s*-185[\s\S]*?nodejs:[\s\S]*?y:\s*-125[\s\S]*?rxjs:[\s\S]*?y:\s*-130/,
    "Cross-Framework placements must feature non-linear multi-depth expanded scatter"
  )

  // Category 06 (Developer Tools & Cloud) organic multi-tier expanded placements
  assert.match(
    source,
    /DEV_TOOLS_CLOUD_PLACEMENTS[\s\S]*?git:[\s\S]*?y:\s*-125[\s\S]*?vite:[\s\S]*?y:\s*-195[\s\S]*?postman:[\s\S]*?y:\s*-210[\s\S]*?aws:[\s\S]*?y:\s*-115[\s\S]*?"vs-code":[\s\S]*?y:\s*-168[\s\S]*?gitlab:[\s\S]*?y:\s*-130/,
    "Developer Tools & Cloud placements must feature non-linear multi-depth expanded scatter"
  )
})

test("tech stack sticker registry maps all technologies with zero broken asset paths", () => {
  assert.ok(
    fs.existsSync(STICKER_REGISTRY_PATH),
    "lib/tech-stack-sticker-assets.ts must exist"
  )

  // Verify total registered keys in TECH_STICKER_REGISTRY (36 canonical active + aliases: web-security, auth0 = 38)
  assert.strictEqual(
    Object.keys(TECH_STICKER_REGISTRY).length,
    38,
    "TECH_STICKER_REGISTRY must define exactly 38 technologies including verified aliases"
  )

  // Verify all 36 technologies from TECH_CATEGORIES are registered
  let totalTechs = 0
  for (const cat of TECH_CATEGORIES) {
    totalTechs += cat.techs.length
    for (const tech of cat.techs) {
      const asset = getTechStickerAsset(tech.id)
      assert.ok(
        asset,
        `Asset info must exist for technology ${tech.id} (${tech.name})`
      )
      assert.strictEqual(
        asset.techId,
        tech.id,
        `Asset techId must match canonical ID ${tech.id}`
      )

      // If marked as available, file must physically exist
      if (asset.status === "PIXEL_STICKER_AVAILABLE") {
        assert.ok(
          asset.stickerPath,
          `Sticker path must be defined for ${tech.id}`
        )
        const fullDiskPath = path.resolve(
          process.cwd(),
          "public" + asset.stickerPath
        )
        assert.ok(
          fs.existsSync(fullDiskPath),
          `Sticker asset for ${tech.id} must exist at ${asset.stickerPath}`
        )
      } else {
        // Fallbacks must declare non-broken fallbackKind
        assert.ok(
          ["vector", "text", "conceptual"].includes(asset.fallbackKind),
          `Fallback kind for ${tech.id} must be valid`
        )
      }
    }
  }

  assert.strictEqual(
    totalTechs,
    36,
    "Canonical technology stack must contain exactly 36 technologies across 6 categories"
  )

  // Explicit verification for Category 02 UI & Design System pixel stickers
  const uiCategory = TECH_CATEGORIES.find((c) => c.id === "ui-styling")
  assert.ok(uiCategory, "ui-styling category must exist")
  assert.strictEqual(
    uiCategory.techs.length,
    6,
    "ui-styling must have exactly 6 technologies"
  )
  const expectedUiIds = [
    "ant-design",
    "base-ui",
    "ng-zorro",
    "radix",
    "shadcn",
    "tailwind",
  ]
  assert.deepStrictEqual(
    uiCategory.techs.map((t) => t.id),
    expectedUiIds,
    "ui-styling must contain ant-design, base-ui, ng-zorro, radix, shadcn, and tailwind in order"
  )
  for (const id of expectedUiIds) {
    const asset = getTechStickerAsset(id)
    assert.strictEqual(
      asset.status,
      "PIXEL_STICKER_AVAILABLE",
      `${id} must have authentic pixel sticker available`
    )
    assert.strictEqual(asset.fallbackKind, "sticker")
  }

  // Explicit verification for Category 03 State & Data Management pixel stickers
  const stateCategory = TECH_CATEGORIES.find((c) => c.id === "state-data")
  assert.ok(stateCategory, "state-data category must exist")
  assert.strictEqual(
    stateCategory.techs.length,
    6,
    "state-data must have exactly 6 technologies"
  )
  const expectedStateIds = [
    "tanstack-query",
    "zustand",
    "redux",
    "react-hook-form",
    "tanstack-table",
    "recharts",
  ]
  assert.deepStrictEqual(
    stateCategory.techs.map((t) => t.id),
    expectedStateIds,
    "state-data must contain tanstack-query, zustand, redux, react-hook-form, tanstack-table, and recharts in order"
  )
  for (const id of expectedStateIds) {
    const asset = getTechStickerAsset(id)
    assert.strictEqual(
      asset.status,
      "PIXEL_STICKER_AVAILABLE",
      `${id} must have authentic pixel sticker available`
    )
    assert.strictEqual(asset.fallbackKind, "sticker")
  }

  // Explicit verification for Category 04 Testing & Web Security pixel stickers
  const testingCategory = TECH_CATEGORIES.find(
    (c) => c.id === "testing-security"
  )
  assert.ok(testingCategory, "testing-security category must exist")
  assert.strictEqual(
    testingCategory.techs.length,
    6,
    "testing-security must have exactly 6 technologies"
  )
  const expectedTestingIds = ["vitest", "jest", "rtl", "cypress", "jwt", "zod"]
  assert.deepStrictEqual(
    testingCategory.techs.map((t) => t.id),
    expectedTestingIds,
    "testing-security must contain vitest, jest, rtl, cypress, jwt, and zod in order"
  )
  for (const id of expectedTestingIds) {
    const asset = getTechStickerAsset(id)
    assert.strictEqual(
      asset.status,
      "PIXEL_STICKER_AVAILABLE",
      `${id} must have authentic pixel sticker available`
    )
    assert.strictEqual(asset.fallbackKind, "sticker")
  }

  // Explicit verification for Category 05 Cross-Framework Engineering pixel stickers
  const frameworkCategory = TECH_CATEGORIES.find(
    (c) => c.id === "cross-framework"
  )
  assert.ok(frameworkCategory, "cross-framework category must exist")
  assert.strictEqual(
    frameworkCategory.techs.length,
    6,
    "cross-framework must have exactly 6 technologies"
  )
  const expectedFrameworkIds = [
    "vue",
    "nuxt",
    "angular",
    "blazor",
    "nodejs",
    "rxjs",
  ]
  assert.deepStrictEqual(
    frameworkCategory.techs.map((t) => t.id),
    expectedFrameworkIds,
    "cross-framework must contain vue, nuxt, angular, blazor, nodejs, and rxjs in order"
  )
  for (const id of expectedFrameworkIds) {
    const asset = getTechStickerAsset(id)
    assert.strictEqual(
      asset.status,
      "PIXEL_STICKER_AVAILABLE",
      `${id} must have authentic pixel sticker available`
    )
    assert.strictEqual(asset.fallbackKind, "sticker")
  }

  // Explicit verification for Category 06 Developer Tools & Cloud pixel stickers
  const toolsCategory = TECH_CATEGORIES.find((c) => c.id === "dev-tools-cloud")
  assert.ok(toolsCategory, "dev-tools-cloud category must exist")
  assert.strictEqual(
    toolsCategory.techs.length,
    6,
    "dev-tools-cloud must have exactly 6 technologies"
  )
  const expectedToolsIds = [
    "git",
    "vite",
    "postman",
    "aws",
    "vs-code",
    "gitlab",
  ]
  assert.deepStrictEqual(
    toolsCategory.techs.map((t) => t.id),
    expectedToolsIds,
    "dev-tools-cloud must contain git, vite, postman, aws, vs-code, and gitlab in order"
  )
  for (const id of expectedToolsIds) {
    const asset = getTechStickerAsset(id)
    assert.strictEqual(
      asset.status,
      "PIXEL_STICKER_AVAILABLE",
      `${id} must have authentic pixel sticker available`
    )
    assert.strictEqual(asset.fallbackKind, "sticker")
  }
})

test("technology folder (legacy) remains functional for categories 02-06", () => {
  assert.ok(fs.existsSync(FOLDER_PATH), "technology-folder.tsx must exist")
  const source = fs.readFileSync(FOLDER_PATH, "utf-8")

  // Keyboard and screen reader accessibility
  assert.match(source, /role="button"/, "card must have role button")
  assert.match(source, /tabIndex=\{0\}/, "card must be keyboard focusable")
  assert.match(
    source,
    /aria-expanded=\{isOpen\}/,
    "card must declare aria-expanded"
  )
  assert.match(
    source,
    /aria-controls=/,
    "card must link to animated content via aria-controls"
  )
  assert.match(
    source,
    /onKeyDown=\{handleKeyDown\}/,
    "card must handle Enter and Space keys"
  )

  // Front pocket SVG tab silhouette
  assert.match(
    source,
    /<path[\s\S]*?d=["']M 0 30 L 140 30/,
    "must render SVG curved front pocket silhouette"
  )
})

test("app/stack/page.tsx integrates VexooSubpageShell, new Toolkit folders, and CertificationFolderGrid", () => {
  assert.ok(fs.existsSync(PAGE_PATH), "app/stack/page.tsx must exist")
  const source = fs.readFileSync(PAGE_PATH, "utf-8")

  // VexooSubpageShell integration
  assert.match(
    source,
    /<VexooSubpageShell currentSectionKey="stack"/,
    "must wrap content in VexooSubpageShell with stack section key"
  )

  // TechStackHero mounted
  assert.match(source, /<TechStackHero \/>/, "must mount TechStackHero")

  // TechnologyFolderGrid mounted
  assert.match(
    source,
    /<TechnologyFolderGrid \/>/,
    "must mount TechnologyFolderGrid"
  )

  // Unified Section 02 Learning Archive mounted
  assert.match(
    source,
    /<CertificationFolderGrid \/>/,
    "must mount CertificationFolderGrid for Section 02"
  )

  // PlayfulFooter and TickerStrip
  assert.match(source, /<PlayfulFooter \/>/, "must provide PlayfulFooter")
  assert.match(
    source,
    /<TickerStrip showPauseControl \/>/,
    "must provide bottom TickerStrip"
  )
})

test("calculateTooltipCoords anchors directly above each of the 6 technology stickers", () => {
  const source = fs.readFileSync(PROTOTYPE_PATH, "utf-8")

  // Function signature and export
  assert.match(
    source,
    /export\s+function\s+calculateTooltipCoords\s*\(/,
    "must export calculateTooltipCoords"
  )
  assert.match(
    source,
    /const\s+verticalOffset\s*=\s*56/,
    "must offset tooltip by 56px above sticker center"
  )
  assert.match(
    source,
    /x:\s*coords\.x,\s*y:\s*coords\.y\s*-\s*verticalOffset/,
    "must center horizontally on sticker and offset vertically"
  )

  // Verify all 6 technology placements exist and compute valid above-sticker anchors
  const techIds = [
    "typescript",
    "javascript",
    "react",
    "nextjs",
    "html5",
    "css3",
  ]
  for (const id of techIds) {
    assert.match(
      source,
      new RegExp(`${id}:\\s*\\{[\\s\\S]*?resting:[\\s\\S]*?expanded:`),
      `must define resting and expanded placements for ${id}`
    )
  }
})

test("controlled scatter generator supports all 6 categories across 36 technologies", () => {
  assert.strictEqual(
    TECH_CATEGORIES.length,
    6,
    "must support exactly 6 categories"
  )
  assert.strictEqual(
    SIX_ITEM_FORMATIONS.length,
    4,
    "must define exactly 4 curated formations for 6-item categories"
  )
  assert.strictEqual(
    FIVE_ITEM_FORMATIONS.length >= 4,
    true,
    "must define at least 4 curated formations for 5-item categories"
  )

  let totalItems = 0
  for (const category of TECH_CATEGORIES) {
    totalItems += category.techs.length
    for (let session = 0; session < 8; session++) {
      const layout = generateControlledScatterLayout(category, session)

      // All category technologies must be mapped
      assert.strictEqual(
        Object.keys(layout).length,
        category.techs.length,
        `all items in ${category.id} must have positions`
      )

      for (const tech of category.techs) {
        const pos = layout[tech.id]
        assert.ok(pos, `position must exist for ${tech.id}`)

        // Safe bounds
        assert.ok(
          pos.x >= SCATTER_BOUNDS.minX && pos.x <= SCATTER_BOUNDS.maxX,
          `X (${pos.x}) must be within [${SCATTER_BOUNDS.minX}, ${SCATTER_BOUNDS.maxX}] for ${tech.id}`
        )
        assert.ok(
          pos.y >= SCATTER_BOUNDS.minY && pos.y <= SCATTER_BOUNDS.maxY,
          `Y (${pos.y}) must be within [${SCATTER_BOUNDS.minY}, ${SCATTER_BOUNDS.maxY}] for ${tech.id}`
        )
        assert.ok(
          pos.rotate >= SCATTER_BOUNDS.minRotate &&
            pos.rotate <= SCATTER_BOUNDS.maxRotate,
          `Rotate (${pos.rotate}) must be within [${SCATTER_BOUNDS.minRotate}, ${SCATTER_BOUNDS.maxRotate}] for ${tech.id}`
        )
        assert.ok(
          pos.zIndex >= 20,
          `zIndex (${pos.zIndex}) must be at least 20`
        )
      }

      // Safe collision spacing
      assert.strictEqual(
        validateScatterLayout(layout),
        true,
        `layout for ${category.id} session ${session} must satisfy collision spacing`
      )
    }
  }

  assert.strictEqual(
    totalItems,
    36,
    "must verify all 36 technologies across all categories"
  )
})

test("balanced 6x6 technology composition across all 6 physical folders", () => {
  // 1. Exactly 6 categories
  assert.strictEqual(
    TECH_CATEGORIES.length,
    6,
    "Must define exactly 6 categories"
  )

  // 2. Each category has exactly 6 technologies
  for (const cat of TECH_CATEGORIES) {
    assert.strictEqual(
      cat.techs.length,
      6,
      `Category ${cat.id} must contain exactly 6 technologies`
    )
  }

  // 3. Exactly 36 unique technology IDs
  const allIds = TECH_CATEGORIES.flatMap((c) => c.techs.map((t) => t.id))
  assert.strictEqual(allIds.length, 36, "Total technologies must equal 36")
  assert.strictEqual(
    new Set(allIds).size,
    36,
    "All 36 technology IDs must be strictly unique across categories"
  )

  // 4. Folder 01 Frontend membership remains unchanged
  const cat01 = TECH_CATEGORIES.find((c) => c.id === "frontend-development")!
  assert.deepStrictEqual(
    cat01.techs.map((t) => t.id),
    ["typescript", "javascript", "react", "nextjs", "html5", "css3"],
    "Folder 01 must maintain exact canonical frontend technologies"
  )

  // 5. Folder 02 UI & Design includes Tailwind CSS
  const cat02 = TECH_CATEGORIES.find((c) => c.id === "ui-styling")!
  assert.ok(
    cat02.techs.some((t) => t.id === "tailwind"),
    "Folder 02 must include tailwind"
  )

  // 6. Folder 03 State & Data includes TanStack Table and Recharts; Zod is NOT in Folder 03
  const cat03 = TECH_CATEGORIES.find((c) => c.id === "state-data")!
  assert.ok(
    cat03.techs.some((t) => t.id === "tanstack-table"),
    "Folder 03 must include tanstack-table"
  )
  assert.ok(
    cat03.techs.some((t) => t.id === "recharts"),
    "Folder 03 must include recharts"
  )
  assert.ok(
    !cat03.techs.some((t) => t.id === "zod"),
    "Folder 03 must NOT contain zod (moved to Folder 04)"
  )

  // 7. Folder 04 Testing & Security includes Zod
  const cat04 = TECH_CATEGORIES.find((c) => c.id === "testing-security")!
  assert.ok(
    cat04.techs.some((t) => t.id === "zod"),
    "Folder 04 must include zod"
  )

  // 8. Folder 05 Cross-Framework includes RxJS
  const cat05 = TECH_CATEGORIES.find((c) => c.id === "cross-framework")!
  assert.ok(
    cat05.techs.some((t) => t.id === "rxjs"),
    "Folder 05 must include rxjs"
  )

  // 9. Folder 06 Tools & Cloud includes GitLab
  const cat06 = TECH_CATEGORIES.find((c) => c.id === "dev-tools-cloud")!
  assert.ok(
    cat06.techs.some((t) => t.id === "gitlab"),
    "Folder 06 must include gitlab"
  )

  // 10. Exclusions: ngrx, github-actions, auth0, antigravity-ide NOT present
  const excludedIds = [
    "ngrx",
    "github-actions",
    "auth0",
    "antigravity",
    "antigravity-ide",
  ]
  for (const excl of excludedIds) {
    assert.ok(
      !allIds.includes(excl),
      `Excluded item '${excl}' must NOT be in any active folder`
    )
  }

  // 11. All 36 stickers physically exist on disk
  for (const id of allIds) {
    const asset = getTechStickerAsset(id)
    assert.strictEqual(
      asset.status,
      "PIXEL_STICKER_AVAILABLE",
      `${id} must have authentic pixel sticker`
    )
    assert.ok(asset.stickerPath, `${id} must have stickerPath defined`)
    const fullPath = path.resolve(process.cwd(), "public" + asset.stickerPath)
    assert.ok(
      fs.existsSync(fullPath),
      `Sticker for ${id} must exist at ${fullPath}`
    )
  }
})

test("controlled scatter produces distinct, collision-free organic arrangements on consecutive sessions", () => {
  for (const category of TECH_CATEGORIES) {
    for (let s = 0; s < 6; s++) {
      const current = generateControlledScatterLayout(category, s)
      const next = generateControlledScatterLayout(category, s + 1)

      // Verify consecutive sessions are not identical
      let differentCount = 0
      for (const tech of category.techs) {
        const p1 = current[tech.id]
        const p2 = next[tech.id]
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
        if (dist >= 15 || Math.abs(p1.rotate - p2.rotate) >= 3) {
          differentCount++
        }
      }

      assert.ok(
        differentCount >= Math.min(4, category.techs.length),
        `consecutive sessions ${s} and ${s + 1} in ${category.id} must visibly rearrange at least 4 items (got ${differentCount})`
      )
    }
  }
})

test("controlled scatter preserves canonical closed resting placements across sessions", () => {
  const category = TECH_CATEGORIES[0]
  const tech = category.techs[0]
  const resting = () =>
    getStickerPlacement(tech.id, 0, category.techs.length, category.id).resting
  assert.deepEqual(resting(), { x: -115, y: -74, rotate: -8, zIndex: 11 })
  fitScatterToArea(
    category,
    3,
    { width: 320, height: 264, sticker: 72, labelHeight: 22 },
    false
  )
  assert.deepEqual(resting(), { x: -115, y: -74, rotate: -8, zIndex: 11 })
})

test("measured tooltip bands and pointer bridges do not cover another sticker", () => {
  for (const area of [
    { width: 56, height: 264, sticker: 72, labelHeight: 54 },
    { width: 220, height: 264, sticker: 72, labelHeight: 38 },
    { width: 306, height: 280, sticker: 88, labelHeight: 22 },
    { width: 320, height: 264, sticker: 72, labelHeight: 22 },
  ]) {
    for (const category of TECH_CATEGORIES) {
      for (const reducedMotion of [false, true]) {
        for (let session = 1; session <= 4; session++) {
          const layout = fitScatterToArea(
            category,
            session,
            area,
            reducedMotion
          )
          const items = Object.values(layout.positions)
          for (const item of items) {
            const labelTop = item.tooltipY - area.labelHeight
            assert.ok(labelTop >= -area.height - layout.extraHeight + 6 - 1e-9)
            const bridgeBottom =
              item.tooltipY + tooltipBridgeHeight(item, area.sticker)
            const bridgeHalf = Math.min(12, area.sticker * item.scale) / 2

            for (const neighbor of items) {
              const half = stickerHalfExtent(
                area.sticker,
                neighbor.rotate,
                neighbor.hoverScale
              )
              const top = neighbor.y - half
              const bottom = neighbor.y + half
              // Test the label using the entire card width, so any horizontal clamp is safe.
              assert.ok(
                item.tooltipY <= top - 6 + 1e-9 || labelTop >= bottom + 6 - 1e-9
              )
              if (neighbor === item) continue
              assert.ok(
                bridgeBottom <= top + 1e-9 ||
                  item.tooltipY >= bottom - 1e-9 ||
                  Math.abs(item.x - neighbor.x) >= bridgeHalf + half - 1e-9
              )
            }
          }
        }
      }
    }
  }
})

test("responsive scatter fits all six hover footprints for each formation and reserves additional height if needed", () => {
  for (const category of TECH_CATEGORIES) {
    for (const width of [56, 96, 155, 220, 260, 288, 320, 360, 430]) {
      for (const sticker of [72, 80, 88]) {
        const area = {
          width,
          height: sticker === 88 ? 280 : 264,
          sticker,
          labelHeight: 22,
        }
        for (const reducedMotion of [false, true]) {
          for (
            let session = 0;
            session < SIX_ITEM_FORMATIONS.length;
            session++
          ) {
            const layout = fitScatterToArea(
              category,
              session,
              area,
              reducedMotion
            )
            assert.deepEqual(
              layout,
              fitScatterToArea(category, session, area, reducedMotion)
            )
            const items = Object.values(layout.positions)
            assert.equal(items.length, 6)
            if (width === 96) assert.ok(layout.extraHeight > 0)

            for (const [index, item] of items.entries()) {
              assert.ok(Object.values(item).every(Number.isFinite))
              const half = stickerHalfExtent(
                sticker,
                item.rotate,
                item.hoverScale
              )
              if (width >= sticker + 16) assert.ok(item.scale >= 1 - 1e-9)
              assert.ok(Math.abs(item.x) + half <= width / 2 - 8 + 1e-9)
              assert.ok(
                item.y - half >=
                  -area.height -
                    layout.extraHeight +
                    area.labelHeight +
                    12 -
                    1e-9
              )
              assert.ok(item.y + half <= -72 + 1e-9)
              for (const other of items.slice(0, index)) {
                const min =
                  half +
                  stickerHalfExtent(sticker, other.rotate, other.hoverScale) +
                  10 -
                  1e-9
                assert.ok(
                  Math.abs(item.x - other.x) >= min ||
                    Math.abs(item.y - other.y) >= min
                )
              }
            }
          }
        }
      }
    }
  }
})

test("four spatial formations survive tight two- and three-column layouts, with a stable one-column fallback", () => {
  const cases = [
    { width: 220, height: 264, sticker: 72, labelHeight: 22, columns: 2 },
    { width: 260, height: 264, sticker: 72, labelHeight: 22, columns: 3 },
    { width: 294, height: 264, sticker: 80, labelHeight: 22, columns: 3 },
    { width: 306, height: 280, sticker: 88, labelHeight: 22, columns: 3 },
    { width: 430, height: 280, sticker: 88, labelHeight: 22, columns: 3 },
    { width: 56, height: 264, sticker: 72, labelHeight: 54, columns: 1 },
  ]
  for (const category of TECH_CATEGORIES) {
    for (const area of cases) {
      const still = fitScatterToArea(category, 1, area, true)
      const footprints = new Set<string>()
      const heights = new Set<number>()
      for (let session = 1; session <= 4; session++) {
        assert.deepEqual(fitScatterToArea(category, session, area, true), still)
        const normal = fitScatterToArea(category, session, area, false)
        heights.add(normal.extraHeight)
        footprints.add(
          JSON.stringify(
            Object.values(normal.positions)
              .map(({ x, y }) => [Math.round(x), Math.round(y)])
              .sort()
          )
        )
      }
      assert.equal(
        footprints.size,
        area.columns === 1 ? 1 : 4,
        `${category.id} at ${area.width}px`
      )
      assert.equal(heights.size, 1)
      for (const item of Object.values(still.positions)) {
        assert.equal(item.rotate, 0)
        assert.equal(item.hoverScale, item.scale)
      }
    }
  }
})

// Node strips types from .ts files. Use the installed ESLint TSX loader for
// the actual components, with the same project alias used by Next.js.
const requireFromTest = createRequire(import.meta.url)
const jitiPath = requireFromTest.resolve("jiti", {
  paths: [requireFromTest.resolve("eslint")],
})
const loadTsx = requireFromTest(jitiPath).createJiti(import.meta.url, {
  jsx: true,
  fsCache: false,
  alias: { "@": process.cwd() },
})
const { updateFolderInteraction: transition, previewedFolder } = loadTsx(
  GRID_PATH
) as typeof import("../../components/stack/technology-folder-grid")
const { TechnologyPhysicalFolder, updateTechnologyLabel, getStickerPlacement } =
  loadTsx(
    PHYSICAL_FOLDER_PATH
  ) as typeof import("../../components/stack/technology-physical-folder")
const { LanguageProvider } = loadTsx(
  "@/lib/language-context"
) as typeof import("../../lib/language-context")

const closed = { pinned: null, hover: null }
const frontend = TECH_CATEGORIES[0]

test("scatter session advances only on a genuine reveal, including preview-to-pin and reopening", () => {
  const id = frontend.id
  let folders = closed as ReturnType<typeof transition>
  let session = 0
  const revealed = () =>
    folders.pinned === id || previewedFolder(folders) === id
  const dispatch = (type: "enter" | "leave" | "activate" | "dismiss") => {
    const before = revealed()
    folders = transition(folders, { type, id })
    session = scatterSessionAfterReveal(session, before, revealed())
  }

  dispatch("enter")
  assert.equal(session, 1)
  const area = { width: 320, height: 264, sticker: 72, labelHeight: 22 }
  const preview = fitScatterToArea(frontend, session, area, false)
  dispatch("activate")
  dispatch("leave")
  assert.equal(session, 1)
  assert.deepEqual(fitScatterToArea(frontend, session, area, false), preview)
  dispatch("dismiss")
  assert.equal(session, 1)
  assert.equal(revealed(), false)
  dispatch("activate")
  assert.equal(session, 2)
  assert.notDeepEqual(fitScatterToArea(frontend, session, area, false), preview)
})

test("rendered subtitle tokens meet 4.5:1 across both opaque pocket gradients", () => {
  const html = renderToStaticMarkup(
    createElement(
      LanguageProvider,
      null,
      createElement(TechnologyPhysicalFolder, {
        category: frontend,
        isRevealed: false,
        onInteraction: () => {},
      })
    )
  )
  const colors = html.match(
    /text-\[(#[a-f0-9]{6})\][^"]*dark:text-\[(#[a-f0-9]{6})\]/
  )
  assert.ok(colors)
  const luminance = (hex: string) =>
    [0.2126, 0.7152, 0.0722].reduce((sum, weight, index) => {
      const channel =
        Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255
      return (
        sum +
        weight *
          (channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4)
      )
    }, 0)
  const gradients = [
    ...html.matchAll(
      /<linearGradient id="folder-front-grad-(dark|light)-[^"]*"[^>]*>(.*?)<\/linearGradient>/g
    ),
  ]
  assert.equal(gradients.length, 2)
  for (const [, theme, svg] of gradients) {
    const text = luminance(colors[theme === "light" ? 1 : 2])
    const stops = [...svg.matchAll(/stop-color="(#[a-f0-9]{6})"/g)]
    assert.equal(stops.length, 2)
    for (const [, color] of stops) {
      const background = luminance(color)
      const ratio =
        (Math.max(text, background) + 0.05) /
        (Math.min(text, background) + 0.05)
      assert.ok(ratio >= 4.5, `${theme} ${color}: ${ratio}`)
    }
  }
})

test("ticker pause is exposed as a native toggle only in the opt-in ticker", () => {
  const { TickerStrip } = loadTsx(
    "@/components/ticker-strip"
  ) as typeof import("../../components/ticker-strip")
  const render = (showPauseControl: boolean) =>
    renderToStaticMarkup(
      createElement(
        LanguageProvider,
        null,
        createElement(TickerStrip, { showPauseControl })
      )
    )
  const stack = render(true)
  assert.match(
    stack,
    /<button type="button" aria-label="Jeda teks berjalan" aria-pressed="false"/
  )
  assert.ok(stack.includes("animation-play-state:paused"))
  assert.ok(!render(false).includes("<button"))
})

test("a preview pins on activation and a second activation closes it under a stationary pointer", () => {
  const id = frontend.id
  const preview = transition(closed, { type: "enter", id })
  assert.equal(previewedFolder(preview), id)
  const pinned = transition(preview, { type: "activate", id })
  assert.equal(pinned.pinned, id)
  const dismissed = transition(pinned, { type: "activate", id })
  assert.equal(dismissed.pinned, null)
  assert.equal(
    previewedFolder(transition(dismissed, { type: "enter", id })),
    null
  )
})

test("Escape dismisses both pin and hover-only preview until a new pointer visit", () => {
  const id = frontend.id
  for (const type of ["activate", "enter"] as const) {
    const open = transition(closed, { type, id })
    const dismissed = transition(open, { type: "dismiss", id })
    assert.equal(dismissed.pinned, null)
    assert.equal(previewedFolder(dismissed), null)
    if (type === "enter") {
      assert.equal(
        previewedFolder(transition(dismissed, { type: "enter", id })),
        null
      )
    }
    const outside = transition(dismissed, { type: "leave", id })
    assert.equal(
      previewedFolder(transition(outside, { type: "enter", id })),
      id
    )
  }
})

test("a second folder can preview alongside one pin and replace the pin without reopening the old folder", () => {
  const id = frontend.id
  const other = TECH_CATEGORIES[1].id
  const pinned = transition(closed, { type: "activate", id })
  const both = transition(pinned, { type: "enter", id: other })
  assert.equal(both.pinned, id)
  assert.equal(previewedFolder(both), other)
  assert.equal(transition(both, { type: "dismiss", id: other }).pinned, id)
  const switched = transition(both, { type: "activate", id: other })
  assert.equal(switched.pinned, other)
  assert.equal(previewedFolder(switched), null)
  assert.deepEqual(transition(switched, { type: "leave", id }), switched)
})

test("dismissing one folder preserves the other folder's pin or preview", () => {
  const id = frontend.id
  const other = TECH_CATEGORIES[1].id
  const pinned = transition(closed, { type: "activate", id })
  const both = transition(pinned, { type: "enter", id: other })

  const dismissedPin = transition(both, { type: "dismiss", id })
  assert.equal(dismissedPin.pinned, null)
  assert.equal(previewedFolder(dismissedPin), other)

  const dismissedPreview = transition(both, { type: "dismiss", id: other })
  assert.equal(dismissedPreview.pinned, id)
  assert.equal(previewedFolder(dismissedPreview), null)
  assert.deepEqual(
    transition(dismissedPreview, { type: "enter", id: other }),
    dismissedPreview
  )
})

test("sticker focus and tap selection outlive pointer exit, allow another hover label, and clear on close", () => {
  const focused = updateTechnologyLabel(
    { hovered: "react", focused: null },
    { type: "focus", id: "css3" }
  )
  assert.deepEqual(focused, { hovered: null, focused: "css3" })
  const hovered = updateTechnologyLabel(focused, { type: "hover", id: "html5" })
  assert.equal(hovered.hovered ?? hovered.focused, "html5")
  const left = updateTechnologyLabel(hovered, { type: "leave" })
  assert.equal(left.hovered ?? left.focused, "css3")
  assert.deepEqual(updateTechnologyLabel(left, { type: "blur" }), {
    hovered: null,
    focused: null,
  })
  assert.deepEqual(updateTechnologyLabel(hovered, { type: "close" }), {
    hovered: null,
    focused: null,
  })
})

test("rendered native disclosure and six independently named stickers expose the correct tab order in both states", () => {
  for (const isRevealed of [false, true]) {
    const folder = createElement(TechnologyPhysicalFolder, {
      category: frontend,
      isRevealed,
      onInteraction: () => {},
    })
    const html = renderToStaticMarkup(
      createElement(LanguageProvider, null, folder)
    )
    const stageId = `tech-folder-stage-${frontend.id}`
    assert.match(html, /<article[^>]*><button type="button"/)
    assert.ok(
      html.includes(`aria-expanded="${isRevealed}" aria-controls="${stageId}"`)
    )
    assert.ok(html.includes(`id="${stageId}" aria-hidden="${!isRevealed}"`))
    assert.ok(html.indexOf("</button>") < html.indexOf("<ul"))
    assert.equal((html.match(/<li[ >]/g) ?? []).length, 6)
    for (const tech of frontend.techs) {
      assert.ok(
        html.includes(
          `aria-labelledby="tech-name-${tech.id}" tabindex="${isRevealed ? 0 : -1}"`
        ),
        tech.name
      )
      assert.ok(
        html.includes(
          `id="tech-name-${tech.id}" class="sr-only">${tech.name}</span>`
        )
      )
    }
    assert.equal((html.match(/alt=""/g) ?? []).length, 6)
  }
})

test("canonical pixel-art sticker promotion verifies canonical paths and blazor-server mapping", () => {
  // 1. Blazor Server mapping
  const blazorAsset = getTechStickerAsset("blazor")
  assert.strictEqual(
    blazorAsset.stickerPath,
    "/images/pixel-art-sticker/blazor-server-icon-sticker.png",
    "blazor must map to blazor-server-icon-sticker.png"
  )
  const blazorFile = path.resolve(
    process.cwd(),
    "public" + blazorAsset.stickerPath
  )
  assert.ok(
    fs.existsSync(blazorFile),
    "blazor-server-icon-sticker.png must exist in public/"
  )

  // 2. Recharts mapping
  const rechartsAsset = getTechStickerAsset("recharts")
  assert.strictEqual(
    rechartsAsset.stickerPath,
    "/images/pixel-art-sticker/recharts-icon-sticker.png",
    "recharts must map to recharts-icon-sticker.png"
  )
  const rechartsFile = path.resolve(
    process.cwd(),
    "public" + rechartsAsset.stickerPath
  )
  assert.ok(
    fs.existsSync(rechartsFile),
    "recharts-icon-sticker.png must exist in public/"
  )

  // 3. TanStack Table mapping
  const tableAsset = getTechStickerAsset("tanstack-table")
  assert.strictEqual(
    tableAsset.stickerPath,
    "/images/pixel-art-sticker/tanstack-table-icon-sticker.png",
    "tanstack-table must map to tanstack-table-icon-sticker.png"
  )
  const tableFile = path.resolve(
    process.cwd(),
    "public" + tableAsset.stickerPath
  )
  assert.ok(
    fs.existsSync(tableFile),
    "tanstack-table-icon-sticker.png must exist in public/"
  )

  // 4. DotNet asset preserved as separate reserved asset
  const dotnetFile = path.resolve(
    process.cwd(),
    "public/images/pixel-art-sticker/dotnet-icon-sticker.png"
  )
  assert.ok(
    fs.existsSync(dotnetFile),
    "dotnet-icon-sticker.png must remain preserved"
  )
})

test("Phase 2.7B content refinement verifies sanitized evidence, shadcn/ui name, and hero copy", () => {
  // 1. Exact 6x6 category membership & 36 unique technology IDs
  assert.strictEqual(
    TECH_CATEGORIES.length,
    6,
    "must have exactly 6 categories"
  )
  for (const cat of TECH_CATEGORIES) {
    assert.strictEqual(
      cat.techs.length,
      6,
      `category ${cat.id} must contain exactly 6 technologies`
    )
  }
  const allIds = TECH_CATEGORIES.flatMap((c) => c.techs.map((t) => t.id))
  assert.strictEqual(allIds.length, 36, "must have exactly 36 technologies")
  assert.strictEqual(
    new Set(allIds).size,
    36,
    "all 36 technology IDs must be unique"
  )

  // 2. Correct shadcn/ui display name
  const shadcnTech = TECH_CATEGORIES.flatMap((c) => c.techs).find(
    (t) => t.id === "shadcn"
  )
  assert.ok(shadcnTech, "shadcn tech must exist")
  assert.strictEqual(
    shadcnTech.name,
    "shadcn/ui",
    "shadcn display name must be 'shadcn/ui'"
  )
  const shadcnAsset = getTechStickerAsset("shadcn")
  assert.strictEqual(
    shadcnAsset.name,
    "shadcn/ui",
    "shadcn asset display name must be 'shadcn/ui'"
  )

  // 3. Hero bilingual copy
  assert.strictEqual(
    TECH_STACK_HERO.description.id,
    "Teknologi, framework, dan praktik pengembangan yang mendukung pekerjaan saya.",
    "Hero ID copy must reflect engineering practices without phantom learning archive promise"
  )
  assert.strictEqual(
    TECH_STACK_HERO.description.en,
    "The tools, frameworks, and engineering practices behind my work.",
    "Hero EN copy must reflect engineering practices without phantom learning archive promise"
  )

  // 4. Category 05 English wording
  const crossCat = TECH_CATEGORIES.find((c) => c.id === "cross-framework")
  assert.ok(crossCat, "cross-framework category must exist")
  assert.match(
    crossCat.description.en,
    /^Engineering experience on nationwide enterprise applications/,
    "cross-framework description.en must use 'Engineering experience' instead of 'Architectural experience'"
  )

  // 5. TypeScript verifiedIn: no numeric 'All Projects' claim, only specific public references
  const tsTech = TECH_CATEGORIES.flatMap((c) => c.techs).find(
    (t) => t.id === "typescript"
  )
  assert.ok(tsTech, "typescript tech must exist")
  for (const item of tsTech.verifiedIn) {
    assert.ok(
      !item.toLowerCase().includes("all 13") &&
        !item.toLowerCase().includes("all projects"),
      `typescript verifiedIn must not claim '${item}'`
    )
  }
  assert.ok(
    tsTech.verifiedIn.includes("HiBlow Fleet"),
    "typescript verifiedIn must reference HiBlow Fleet"
  )
  assert.ok(
    tsTech.verifiedIn.includes("Telkomsigma"),
    "typescript verifiedIn must preserve Telkomsigma context"
  )

  // 6. React verifiedIn: referential integrity to public project allowlist
  const reactTech = TECH_CATEGORIES.flatMap((c) => c.techs).find(
    (t) => t.id === "react"
  )
  assert.ok(reactTech, "react tech must exist")
  const publicAllowedProjects = [
    "HiBlow Fleet",
    "MONARA",
    "Alisa",
    "Alisa 2.0",
    "IS-WARE",
    "WBS",
    "WBS Internal",
    "Info Tender",
    "Bulk Orders",
    "Netmonk",
    "Netmonk Analytics",
  ]
  for (const ref of reactTech.verifiedIn) {
    assert.ok(
      publicAllowedProjects.includes(ref),
      `react verifiedIn item '${ref}' must be in public allowed projects`
    )
  }
  assert.ok(
    reactTech.verifiedIn.includes("HiBlow Fleet"),
    "react verifiedIn must reference HiBlow Fleet"
  )

  // 7. AWS Cloud learning context
  const awsTech = TECH_CATEGORIES.flatMap((c) => c.techs).find(
    (t) => t.id === "aws"
  )
  assert.ok(awsTech, "aws tech must exist")
  assert.deepStrictEqual(
    awsTech.verifiedIn,
    [
      "Dicoding — Belajar Dasar AWS Cloud",
      "Cloud Practitioner Essentials (S3 & EC2 Fundamentals)",
    ],
    "aws verifiedIn must reflect verified learning context"
  )
})
