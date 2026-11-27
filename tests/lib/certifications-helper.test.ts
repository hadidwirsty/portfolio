import test from "node:test"
import assert from "node:assert"
import { certifications } from "../../lib/cv-data.ts"
import {
  filterCertifications,
  getCertificationCounts,
  getIssuerCategory,
  issuerCategories,
} from "../../lib/certifications-helper.ts"

test("getIssuerCategory correctly identifies issuer categories", () => {
  assert.strictEqual(getIssuerCategory("Dicoding Indonesia"), "dicoding")
  assert.strictEqual(getIssuerCategory("LinkedIn Learning"), "linkedin")
  assert.strictEqual(getIssuerCategory("English First"), "other")
  assert.strictEqual(
    getIssuerCategory("Pusat Bahasa FIB, Universitas Gadjah Mada"),
    "other"
  )
  assert.strictEqual(getIssuerCategory("FHCI BUMN"), "other")
})

test("filterCertifications returns all records for 'all'", () => {
  const all = filterCertifications(certifications, "all")
  assert.deepEqual(all, certifications)
})

test("getCertificationCounts categorizes properly", () => {
  const counts = getCertificationCounts(certifications)
  assert.strictEqual(counts.all, 19)
  assert.strictEqual(counts.dicoding, 15)
  assert.strictEqual(counts.linkedin, 2)
  assert.strictEqual(counts.other, 2)
})

test("issuerCategories contains bilingual labels", () => {
  assert.strictEqual(issuerCategories.length, 4)
  for (const cat of issuerCategories) {
    assert.ok(cat.id)
    assert.ok(cat.label.id)
    assert.ok(cat.label.en)
  }
})
