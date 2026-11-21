import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

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
  calculateCategoryCoords,
  calculateCategoryTooltipCoords,
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
    /dark:\[fill:url\(#folder-front-grad-dark\)\]/,
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
    /max-w-\[360px\][\s\S]*?sm:max-w-\[430px\][\s\S]*?lg:max-w-\[450px\]/,
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

  // Active pinned id state
  assert.match(
    source,
    /const \[activePinnedId,\s*setActivePinnedId\]\s*=\s*React\.useState<string \| null>\(\s*null\s*\)/,
    "must maintain single activePinnedId state defaulting to null"
  )

  // Global Escape key listener
  assert.match(
    source,
    /e\.key === ["']Escape["']/,
    "must listen for Escape key to close active folder"
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
  assert.match(
    source,
    /calculateCategoryTooltipCoords\(/,
    "must compute anchor coordinates via calculateCategoryTooltipCoords"
  )
  assert.match(
    source,
    /-translate-x-1\/2\s+-translate-y-full/,
    "must anchor bottom-center of tooltip above target point"
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
    /STATE_DATA_PLACEMENTS[\s\S]*?"tanstack-query":[\s\S]*?y:\s*-178[\s\S]*?zustand:[\s\S]*?y:\s*-115[\s\S]*?redux:[\s\S]*?y:\s*-210[\s\S]*?"react-hook-form":[\s\S]*?y:\s*-185[\s\S]*?zod:[\s\S]*?y:\s*-125/,
    "State & Data placements must feature non-linear multi-depth expanded scatter (zustand at lower-tier y: -115, redux at peak y: -210)"
  )

  // Category 04 (Testing & Web Security) organic multi-tier expanded placements
  assert.match(
    source,
    /TESTING_SECURITY_PLACEMENTS[\s\S]*?vitest:[\s\S]*?y:\s*-125[\s\S]*?jest:[\s\S]*?y:\s*-195[\s\S]*?rtl:[\s\S]*?y:\s*-210[\s\S]*?cypress:[\s\S]*?y:\s*-115[\s\S]*?jwt:[\s\S]*?y:\s*-168/,
    "Testing & Security placements must feature non-linear multi-depth expanded scatter"
  )

  // Category 05 (Cross-Framework Engineering) organic multi-tier expanded placements
  assert.match(
    source,
    /CROSS_FRAMEWORK_PLACEMENTS[\s\S]*?vue:[\s\S]*?y:\s*-178[\s\S]*?nuxt:[\s\S]*?y:\s*-115[\s\S]*?angular:[\s\S]*?y:\s*-210[\s\S]*?blazor:[\s\S]*?y:\s*-185[\s\S]*?nodejs:[\s\S]*?y:\s*-125/,
    "Cross-Framework placements must feature non-linear multi-depth expanded scatter"
  )

  // Category 06 (Developer Tools & Cloud) organic multi-tier expanded placements
  assert.match(
    source,
    /DEV_TOOLS_CLOUD_PLACEMENTS[\s\S]*?git:[\s\S]*?y:\s*-125[\s\S]*?vite:[\s\S]*?y:\s*-195[\s\S]*?postman:[\s\S]*?y:\s*-210[\s\S]*?aws:[\s\S]*?y:\s*-115[\s\S]*?"vs-code":[\s\S]*?y:\s*-168/,
    "Developer Tools & Cloud placements must feature non-linear multi-depth expanded scatter"
  )
})

test("tech stack sticker registry maps all technologies with zero broken asset paths", () => {
  assert.ok(
    fs.existsSync(STICKER_REGISTRY_PATH),
    "lib/tech-stack-sticker-assets.ts must exist"
  )

  // Verify total registered keys in TECH_STICKER_REGISTRY (31 canonical active + aliases: tailwind, web-security, auth0, gitlab = 35)
  assert.strictEqual(
    Object.keys(TECH_STICKER_REGISTRY).length,
    35,
    "TECH_STICKER_REGISTRY must define exactly 35 technologies including verified aliases"
  )

  // Verify all 31 technologies from TECH_CATEGORIES are registered
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
    31,
    "Canonical technology stack must contain exactly 31 technologies across 6 categories"
  )

  // Explicit verification for Category 02 UI & Design System pixel stickers
  const uiCategory = TECH_CATEGORIES.find((c) => c.id === "ui-styling")
  assert.ok(uiCategory, "ui-styling category must exist")
  assert.strictEqual(
    uiCategory.techs.length,
    5,
    "ui-styling must have exactly 5 technologies"
  )
  const expectedUiIds = ["ant-design", "base-ui", "ng-zorro", "radix", "shadcn"]
  assert.deepStrictEqual(
    uiCategory.techs.map((t) => t.id),
    expectedUiIds,
    "ui-styling must contain ant-design, base-ui, ng-zorro, radix, and shadcn in order"
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
    5,
    "state-data must have exactly 5 technologies"
  )
  const expectedStateIds = [
    "tanstack-query",
    "zustand",
    "redux",
    "react-hook-form",
    "zod",
  ]
  assert.deepStrictEqual(
    stateCategory.techs.map((t) => t.id),
    expectedStateIds,
    "state-data must contain tanstack-query, zustand, redux, react-hook-form, and zod in order"
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
    5,
    "testing-security must have exactly 5 technologies"
  )
  const expectedTestingIds = ["vitest", "jest", "rtl", "cypress", "jwt"]
  assert.deepStrictEqual(
    testingCategory.techs.map((t) => t.id),
    expectedTestingIds,
    "testing-security must contain vitest, jest, rtl, cypress, and jwt in order"
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
    5,
    "cross-framework must have exactly 5 technologies"
  )
  const expectedFrameworkIds = ["vue", "nuxt", "angular", "blazor", "nodejs"]
  assert.deepStrictEqual(
    frameworkCategory.techs.map((t) => t.id),
    expectedFrameworkIds,
    "cross-framework must contain vue, nuxt, angular, blazor, and nodejs in order"
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
    5,
    "dev-tools-cloud must have exactly 5 technologies"
  )
  const expectedToolsIds = ["git", "vite", "postman", "aws", "vs-code"]
  assert.deepStrictEqual(
    toolsCategory.techs.map((t) => t.id),
    expectedToolsIds,
    "dev-tools-cloud must contain git, vite, postman, aws, and vs-code in order"
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
  assert.match(source, /<TickerStrip \/>/, "must provide bottom TickerStrip")
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

test("controlled scatter generator supports all 6 categories across 31 technologies", () => {
  assert.strictEqual(
    TECH_CATEGORIES.length,
    6,
    "must support exactly 6 categories"
  )
  assert.strictEqual(
    SIX_ITEM_FORMATIONS.length >= 4,
    true,
    "must define at least 4 curated formations for 6-item categories"
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
    31,
    "must verify all 31 technologies across all categories"
  )
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

test("controlled scatter preserves deterministic resting positions when closed and respects reduced motion", () => {
  const cat = TECH_CATEGORIES[0] // Frontend
  const tech = cat.techs[0] // TypeScript

  // 1. Closed state always returns deterministic resting placement regardless of activeScatterPositions
  const restingCoords1 = calculateCategoryCoords(
    tech.id,
    0,
    cat.techs.length,
    cat.id,
    false, // isRevealed = false
    false
  )
  const restingCoords2 = calculateCategoryCoords(
    tech.id,
    0,
    cat.techs.length,
    cat.id,
    false, // isRevealed = false
    false,
    { [tech.id]: { x: 99, y: -200, rotate: 12, zIndex: 30 } } // dummy active positions
  )

  assert.deepStrictEqual(
    restingCoords1,
    restingCoords2,
    "closed state must ignore active scatter positions and strictly use canonical resting coordinates"
  )
  assert.strictEqual(restingCoords1.x, -115)
  assert.strictEqual(restingCoords1.y, -74)
  assert.strictEqual(restingCoords1.rotate, -8)

  // 2. Reduced motion suppresses rotation to 0 and clamps vertical movement to -115
  const reducedMotionCoords = calculateCategoryCoords(
    tech.id,
    0,
    cat.techs.length,
    cat.id,
    true, // isRevealed = true
    true // shouldReduceMotion = true
  )
  assert.strictEqual(
    reducedMotionCoords.rotate,
    0,
    "reduced motion must zero out rotation"
  )
  assert.strictEqual(
    reducedMotionCoords.y,
    -115,
    "reduced motion must restrict vertical elevation to -115"
  )
})

test("tooltip coordinates dynamically follow active session sticker positions", () => {
  const cat = TECH_CATEGORIES[1] // UI & Styling
  const tech = cat.techs[2] // NG-ZORRO

  const customLayout = generateControlledScatterLayout(cat, 3)
  const activePos = customLayout[tech.id]

  const tooltipCoords = calculateCategoryTooltipCoords(
    tech.id,
    2,
    cat.techs.length,
    cat.id,
    true,
    false,
    customLayout
  )

  // Tooltip must be centered horizontally on the sticker and offset 56px above
  assert.strictEqual(
    tooltipCoords.x,
    activePos.x,
    "tooltip X must match active sticker X"
  )
  assert.strictEqual(
    tooltipCoords.y,
    activePos.y - 56,
    "tooltip Y must be exactly 56px above active sticker Y"
  )
})

test("technology physical folder component integrates controlled scatter lifecycle and state stability", () => {
  assert.ok(
    fs.existsSync(PHYSICAL_FOLDER_PATH),
    "technology-physical-folder.tsx must exist"
  )
  const source = fs.readFileSync(PHYSICAL_FOLDER_PATH, "utf-8")

  // Controlled scatter generator import
  assert.match(
    source,
    /generateControlledScatterLayout/,
    "must import generateControlledScatterLayout"
  )

  // Session state and ref tracking
  assert.match(
    source,
    /const\s+\[sessionIndex,\s*setSessionIndex\]\s*=\s*React\.useState\(0\)/,
    "must track sessionIndex via React.useState"
  )
  assert.match(
    source,
    /const\s+prevRevealedRef\s*=\s*React\.useRef\(false\)/,
    "must track prevRevealedRef to detect closed-to-open transitions"
  )

  // Memoized session layout
  assert.match(
    source,
    /const\s+activeScatterPositions\s*=\s*React\.useMemo\(/,
    "must memoize activeScatterPositions for the open session"
  )

  // Event handlers trigger session layout only when transitioning from closed to open
  assert.match(
    source,
    /if\s*\(!isRevealed\)\s*\{\s*setSessionIndex\(\(prev\)\s*=>\s*prev\s*\+\s*1\)/,
    "must advance sessionIndex only when transitioning from closed to open"
  )
})
