import test from "node:test"
import assert from "node:assert"
import { certifications } from "../../lib/cv-data.ts"
import {
  filterCertifications,
  getCertificationCounts,
} from "../../lib/certifications-helper.ts"

test("certifications data has all required attributes", () => {
  assert.strictEqual(certifications.length, 19)
  for (const cert of certifications) {
    assert.ok(cert.name)
    assert.doesNotMatch(cert.name, /\bAcEPT\b/)
    assert.ok(cert.issuer)
    assert.ok(cert.period)
  }
})

test("certifications filtering yields valid slices", () => {
  const counts = getCertificationCounts(certifications)
  assert.strictEqual(counts.all, 19)
  const dicoding = filterCertifications(certifications, "dicoding")
  assert.strictEqual(dicoding.length, 15)
  const linkedin = filterCertifications(certifications, "linkedin")
  assert.strictEqual(linkedin.length, 2)
  const other = filterCertifications(certifications, "other")
  assert.strictEqual(other.length, 2)
})
