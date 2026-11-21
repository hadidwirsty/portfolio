import test from "node:test"
import assert from "node:assert/strict"

import { shouldShowStackCertifications } from "../../lib/stack-visibility.ts"

test("shouldShowStackCertifications honors NODE_ENV and SHOW_STACK_CERTIFICATIONS", () => {
  const originalEnv = process.env.NODE_ENV
  const originalFlag = process.env.SHOW_STACK_CERTIFICATIONS
  const envMap = process.env as Record<string, string | undefined>

  try {
    // 1. Local Development without explicit flag -> visible by default
    envMap.NODE_ENV = "development"
    delete process.env.SHOW_STACK_CERTIFICATIONS
    assert.equal(
      shouldShowStackCertifications(),
      true,
      "certifications must be visible by default in development"
    )

    // 2. Production without flag -> hidden by default
    envMap.NODE_ENV = "production"
    delete process.env.SHOW_STACK_CERTIFICATIONS
    assert.equal(
      shouldShowStackCertifications(),
      false,
      "certifications must be hidden by default in production"
    )

    // 3. Production with SHOW_STACK_CERTIFICATIONS=true -> explicitly enabled
    envMap.NODE_ENV = "production"
    process.env.SHOW_STACK_CERTIFICATIONS = "true"
    assert.equal(
      shouldShowStackCertifications(),
      true,
      "certifications must be visible in production when SHOW_STACK_CERTIFICATIONS=true"
    )

    // 4. Production with SHOW_STACK_CERTIFICATIONS=false -> strictly hidden
    envMap.NODE_ENV = "production"
    process.env.SHOW_STACK_CERTIFICATIONS = "false"
    assert.equal(
      shouldShowStackCertifications(),
      false,
      "certifications must be hidden when SHOW_STACK_CERTIFICATIONS=false"
    )

    // 5. Development with SHOW_STACK_CERTIFICATIONS=false -> can be forcibly disabled
    envMap.NODE_ENV = "development"
    process.env.SHOW_STACK_CERTIFICATIONS = "false"
    assert.equal(
      shouldShowStackCertifications(),
      false,
      "explicit false must hide certifications even in development"
    )
  } finally {
    envMap.NODE_ENV = originalEnv
    if (originalFlag === undefined) {
      delete process.env.SHOW_STACK_CERTIFICATIONS
    } else {
      process.env.SHOW_STACK_CERTIFICATIONS = originalFlag
    }
  }
})
