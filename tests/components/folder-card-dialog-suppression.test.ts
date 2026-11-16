import { test } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

const FOLDER_CARD_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/folder-bento-card.tsx"
)
const PORTFOLIO_CARD_FOLDER_PATH = path.resolve(
  process.cwd(),
  "components/portfolio/portfolio-card-folder.tsx"
)

test("folder-bento-card defines isDialogOpen in FolderBentoCardProps interface", () => {
  const source = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  assert.match(
    source,
    /isDialogOpen\?:\s*boolean/,
    "FolderBentoCardProps must accept optional isDialogOpen boolean prop"
  )
})

test("portfolio-card-folder passes isDialogOpen state to all FolderBentoCards", () => {
  const source = fs.readFileSync(PORTFOLIO_CARD_FOLDER_PATH, "utf-8")

  assert.match(
    source,
    /isDialogOpen=\{dialogOpen && selectedProject\?\.id === project\.id\}/,
    "portfolio-card-folder must synchronize isDialogOpen with dialogOpen and selectedProject.id for featured and additional projects"
  )
})

test("Regression: Hover -> Open Dialog -> Close -> Resting (suppression prevents stuck reveal)", () => {
  const source = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  // Checks isSuppressed state tracking
  assert.match(
    source,
    /const \[isSuppressed,\s*setIsSuppressed\] = React\.useState\(false\)/,
    "must initialize isSuppressed state to track hover suppression lifecycle"
  )

  // Enforces hover suppression while modal is open
  assert.match(
    source,
    /if \(isDialogOpen\) {[\s\S]*?setIsSuppressed\(true\)/,
    "must enforce hover suppression when modal is open"
  )

  // handleSelect suppresses hover immediately on card click
  assert.match(
    source,
    /const handleSelect = \(\) => {[\s\S]*?setIsSuppressed\(true\)[\s\S]*?setIsHovered\(false\)[\s\S]*?setIsFocused\(false\)[\s\S]*?onSelectProject\(project\)/,
    "handleSelect must immediately suppress hover and clear active state before onSelectProject"
  )

  // isLifted accounts for suppression and dialog state
  assert.match(
    source,
    /!isDialogOpen[\s\S]*?!isSuppressed/,
    "isLifted must check dialog and suppression state directly"
  )
})

test("Regression: Modal closed when pointer is still over card keeps hover suppressed", () => {
  const source = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  // handlePointerEnter ignores enter when suppressed
  assert.match(
    source,
    /const handlePointerEnter = \(\) => {[\s\S]*?if \(isSuppressed \|\| isDialogOpen\) return/,
    "handlePointerEnter must ignore mouse enter when suppression is active or dialog is open"
  )
})

test("Regression: Hover is only re-enabled after genuine pointer leave and re-enter", () => {
  const source = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  // handlePointerLeave ignores overlay leave when dialog is open, but clears suppression when dialog is closed
  assert.match(
    source,
    /const handlePointerLeave = \(\) => {[\s\S]*?if \(isDialogOpen\) {[\s\S]*?setIsHovered\(false\)[\s\S]*?return[\s\S]*?setIsSuppressed\(false\)/,
    "handlePointerLeave must not clear suppression while dialog is open, and must clear suppression on genuine leave after dialog is closed"
  )
})

test("Regression: Keyboard focus restoration does not trigger reveal, but keeps focus ring visible", () => {
  const source = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  // handleFocus ignores programmatic restoration when suppressed
  assert.match(
    source,
    /const handleFocus = \(\) => {[\s\S]*?if \(isSuppressed \|\| isDialogOpen\) {[\s\S]*?setIsFocused\(false\)[\s\S]*?return/,
    "handleFocus must reject programmatic focus restoration from dialog close"
  )

  // Focus ring CSS remains active via focus-visible
  assert.match(
    source,
    /focus-visible:ring-2 focus-visible:ring-primary/,
    "must preserve visible focus ring on article element"
  )

  // handleBlur resets focus and clears suppression when navigating away via keyboard
  assert.match(
    source,
    /const handleBlur = \(\) => {[\s\S]*?setIsFocused\(false\)[\s\S]*?if \(!isDialogOpen\) {[\s\S]*?setIsSuppressed\(false\)/,
    "handleBlur must clear suppression when focus leaves card after dialog closed"
  )
})

test("Regression: Reduced motion honors user preferences without stuck animations", () => {
  const source = fs.readFileSync(FOLDER_CARD_PATH, "utf-8")

  assert.match(
    source,
    /const isLifted =[\s\S]*?\(isHovered \|\| isFocused\)[\s\S]*?!shouldReduceMotion/,
    "isLifted must be strictly false when shouldReduceMotion is true"
  )
  assert.match(
    source,
    /animate=\{\{[\s\S]*?y: isLifted \? \d+ : 0[\s\S]*?\}\}/,
    "pocket must remain at y: 0 when isLifted is false"
  )
})
