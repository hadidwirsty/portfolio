import test from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import path from "node:path"

test("dialog component exports standard shadcn dialog primitives", () => {
  const dialogFilePath = path.resolve(
    import.meta.dirname,
    "../../components/ui/dialog.tsx"
  )
  assert.ok(fs.existsSync(dialogFilePath), "dialog.tsx must exist")

  const content = fs.readFileSync(dialogFilePath, "utf-8")
  const expectedExports = [
    "Dialog",
    "DialogTrigger",
    "DialogPortal",
    "DialogBackdrop",
    "DialogContent",
    "DialogHeader",
    "DialogFooter",
    "DialogTitle",
    "DialogDescription",
    "DialogClose",
  ]

  for (const exp of expectedExports) {
    assert.ok(
      content.includes(`function ${exp}`) || content.includes(exp),
      `dialog.tsx must export ${exp}`
    )
  }
})
