import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const FOOTER_PATH = path.resolve(process.cwd(), "components/playful-footer.tsx")

test("playful-footer component file exists and exports PlayfulFooter", () => {
  assert.ok(
    fs.existsSync(FOOTER_PATH),
    "components/playful-footer.tsx must exist"
  )
  const source = fs.readFileSync(FOOTER_PATH, "utf-8")

  assert.match(
    source,
    /export (function PlayfulFooter|const PlayfulFooter)/,
    "playful-footer.tsx must export PlayfulFooter"
  )
  assert.match(
    source,
    /use client/,
    "playful-footer.tsx must be a client component"
  )
})

test("playful-footer implements full-bleed 100vh height and rounded top border", () => {
  const source = fs.readFileSync(FOOTER_PATH, "utf-8")

  assert.match(
    source,
    /min-h-dvh|min-h-svh/,
    "playful-footer.tsx must set min-h-dvh or min-h-svh"
  )
  assert.match(
    source,
    /rounded-t-3xl/,
    "playful-footer.tsx must have rounded-t-3xl"
  )
})

test("playful-footer integrates social icons with correct sequence and conditional new platforms", () => {
  const source = fs.readFileSync(FOOTER_PATH, "utf-8")

  // Must import StravaIcon and YoutubeIcon
  assert.match(source, /StravaIcon/)
  assert.match(source, /YoutubeIcon/)

  // Sequence must be: Email -> GitHub -> LinkedIn -> Instagram -> Threads -> Strava -> YouTube
  const emailIdx = source.indexOf("<Mail")
  const githubIdx = source.indexOf("<GithubIcon")
  const linkedinIdx = source.indexOf("<LinkedinIcon")
  const instagramIdx = source.indexOf("<InstagramIcon")
  const threadsIdx = source.indexOf("<ThreadsIcon")
  const stravaIdx = source.indexOf("<StravaIcon")
  const youtubeIdx = source.indexOf("<YoutubeIcon")

  assert.ok(
    emailIdx !== -1 && githubIdx !== -1,
    "Mail and Github must be rendered"
  )
  assert.ok(emailIdx < githubIdx, "Email must come before GitHub")
  assert.ok(githubIdx < linkedinIdx, "GitHub must come before LinkedIn")
  assert.ok(linkedinIdx < instagramIdx, "LinkedIn must come before Instagram")
  assert.ok(instagramIdx < threadsIdx, "Instagram must come before Threads")
  assert.ok(threadsIdx < stravaIdx, "Threads must come before Strava")
  assert.ok(stravaIdx < youtubeIdx, "Strava must come before YouTube")

  // Conditional rendering guards to prevent invalid links
  assert.match(
    source,
    /Boolean\(socialProfile\.strava\?\.href\)/,
    "Strava must only render when href is provided in profile"
  )
  assert.match(
    source,
    /Boolean\(socialProfile\.youtube\?\.href\)/,
    "YouTube must only render when href is provided in profile"
  )

  // Social links must be rendered using Button component with slot rendering
  assert.match(
    source,
    /Button[\s\S]*?render=[\s\S]*?mailto:/,
    "playful-footer must render social links using Button component"
  )
})

test("playful-footer renders giant wordmark and pure skillicons without tile wrappers", () => {
  const source = fs.readFileSync(FOOTER_PATH, "utf-8")

  assert.match(
    source,
    /Hadidwirsty/,
    "playful-footer.tsx must render Hadidwirsty wordmark"
  )
  assert.match(
    source,
    /6\.169/,
    "playful-footer.tsx must use 6.169 em width constant for wordmark"
  )
  assert.match(
    source,
    /nextjs.*?(\.png|\.svg)/,
    "playful-footer.tsx must include nextjs tech icon"
  )
  // Ensure no decorative chip or avatar stickers are left in footer
  assert.strictEqual(
    source.includes('id: "chip"'),
    false,
    "Say hi chip sticker must be removed from footer"
  )
})

test("playful-footer includes 5 balanced nav links and excludes Resume", () => {
  const source = fs.readFileSync(FOOTER_PATH, "utf-8")

  // Balanced 3-column layout
  assert.match(source, /grid-cols-1.*?md:grid-cols-3/)

  // Exactly 5 nav links
  assert.match(source, /href:\s*"\/"/)
  assert.match(source, /href:\s*"\/about"/)
  assert.match(source, /href:\s*"\/portfolio"/)
  assert.match(source, /href:\s*"\/contact"/)
  assert.match(source, /href:\s*"\/stack"/)

  // Exclude resume link from footer navigation
  assert.strictEqual(
    /href:\s*cvFile/.test(source),
    false,
    "Resume link must be removed from footer nav"
  )
})

test("playful-footer implements responsive layout adjustments and LetterRoll interactions", () => {
  const source = fs.readFileSync(FOOTER_PATH, "utf-8")

  // Item 1: Avatar rendered directly without circular wrapper
  assert.match(
    source,
    /pixel-art-avatar-chibi-suit-portrait\.png[\s\S]*?size-12[\s\S]*?sm:size-14/,
    "Avatar must be rendered directly without circular container with size-12 sm:size-14"
  )
  assert.strictEqual(
    source.includes(
      "size-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
    ),
    false,
    "Circular avatar container must be removed"
  )

  // Item 2: Nav links grid-cols-1 on mobile, 3:2 column flow on md:, and 2 rows on lg:
  assert.match(
    source,
    /grid-cols-1[\s\S]*?md:grid-flow-col[\s\S]*?md:grid-rows-3[\s\S]*?lg:grid-rows-2/,
    "Nav links must use 1 column on mobile, 3:2 column flow on md:, and 2 rows on lg:"
  )

  // Item 3 & 6: LetterRoll integrated on nav links and copy email label
  assert.match(
    source,
    /import\s*\{[^}]*LetterRoll[^}]*\}\s*from\s*["']@\/components\/ui\/letter-roll["']/,
    "LetterRoll must be imported from components/ui/letter-roll"
  )
  assert.match(
    source,
    /<LetterRoll[\s\S]*?text=\{profile\.email\}/,
    "LetterRoll must be applied to copy email label text"
  )

  // Item 4: Tablet height optimization (not forced full height on tablet)
  assert.match(
    source,
    /min-h-dvh[\s\S]*?md:(?:h-auto[\s\S]*?md:min-h-0|min-h-0[\s\S]*?md:h-auto)[\s\S]*?lg:min-h-dvh/,
    "Footer height must be full on mobile/desktop but auto/compact on tablet"
  )

  // Item 5: Mobile tech logos size and distributed positions
  assert.match(
    source,
    /size-8[\s\S]*?sm:size-14[\s\S]*?lg:size-18/,
    "Tech logos must use smaller size-8 on mobile and sm:size-14 lg:size-18"
  )
  assert.match(
    source,
    /left-\[8%\]\s+top-\[22%\]/,
    "Next.js logo must be positioned at 8% left on mobile"
  )
  assert.match(
    source,
    /left-\[86%\]\s+top-\[22%\]/,
    "Tailwind logo must be positioned at 86% left on mobile"
  )
})
