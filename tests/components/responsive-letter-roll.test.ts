import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "components/ui/responsive-letter-roll.tsx"
)
const LETTER_ROLL_PATH = path.resolve(
  process.cwd(),
  "components/ui/letter-roll.tsx"
)
const DASHBOARD_PATH = path.resolve(
  process.cwd(),
  "components/vexoo-dashboard.tsx"
)
const SHEET_PATH = path.resolve(
  process.cwd(),
  "components/contact/contact-sheet.tsx"
)

test("responsive-letter-roll component exists and exports ResponsiveLetterRoll", () => {
  assert.ok(
    fs.existsSync(COMPONENT_PATH),
    "components/ui/responsive-letter-roll.tsx must exist"
  )
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  assert.match(
    source,
    /export function ResponsiveLetterRoll/,
    "must export ResponsiveLetterRoll"
  )
  assert.match(
    source,
    /export interface ResponsiveLetterRollProps/,
    "must export ResponsiveLetterRollProps"
  )
})

test("letter-roll re-exports ResponsiveLetterRoll for centralized access", () => {
  const source = fs.readFileSync(LETTER_ROLL_PATH, "utf-8")
  assert.match(
    source,
    /ResponsiveLetterRoll/,
    "letter-roll.tsx must export ResponsiveLetterRoll"
  )
})

test("responsive-letter-roll wraps LetterRoll in responsive breakpoint classes", () => {
  const source = fs.readFileSync(COMPONENT_PATH, "utf-8")
  assert.match(source, /sm:hidden/)
  assert.match(source, /hidden sm:block/)
  assert.match(source, /md:hidden/)
  assert.match(source, /hidden md:block/)
  assert.match(source, /lg:hidden/)
  assert.match(source, /hidden lg:block/)
})

test("dashboard uses responsive badge text and Contact uses the full bilingual label", () => {
  const dashboardSource = fs.readFileSync(DASHBOARD_PATH, "utf-8")
  const sheetSource = fs.readFileSync(SHEET_PATH, "utf-8")

  assert.match(
    dashboardSource,
    /ResponsiveLetterRoll/,
    "vexoo-dashboard must integrate ResponsiveLetterRoll"
  )
  assert.match(
    dashboardSource,
    /mobileText=\{openToWorkShortText\}/,
    "vexoo-dashboard must pass mobileText"
  )
  assert.match(
    dashboardSource,
    /desktopText=\{openToWorkText\}/,
    "vexoo-dashboard must pass desktopText"
  )

  assert.match(
    sheetSource,
    /<LetterRoll[^>]*text=\{openToWorkText\}/,
    "Contact must use the full localized availability label at every width"
  )
})
