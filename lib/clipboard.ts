/**
 * Copies a given text string to the system clipboard in a browser environment.
 * Prioritizes the standard W3C Navigator Clipboard API, and gracefully falls back
 * to an iOS-safe, selection-restoring document.execCommand strategy if required.
 * Safe for Server-Side Rendering (returns false when window is undefined).
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!text || typeof window === "undefined") {
    return false
  }

  // Modern W3C Clipboard API (requires secure context in modern browsers)
  if (
    window.isSecureContext &&
    navigator?.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Permission rejected, user denied prompt, or restricted iframe: proceed to fallback
    }
  }

  // Resilient fallback for non-secure contexts, older browsers, or restrictive sandboxes
  try {
    const selection = document.getSelection()
    const previousRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.setAttribute("readonly", "")
    textArea.setAttribute("aria-hidden", "true")

    // Prevent scrolling, page layout jumps, and auto-zoom on iOS Safari (requires font >= 16px)
    textArea.style.position = "fixed"
    textArea.style.top = "0"
    textArea.style.left = "-9999px"
    textArea.style.opacity = "0"
    textArea.style.fontSize = "16px"
    textArea.style.pointerEvents = "none"

    document.body.appendChild(textArea)
    textArea.focus({ preventScroll: true })
    textArea.select()

    const successful =
      typeof document.execCommand === "function" && document.execCommand("copy")

    document.body.removeChild(textArea)

    // Restore prior user text selection so user interaction is undisturbed
    if (selection) {
      selection.removeAllRanges()
      if (previousRange) {
        selection.addRange(previousRange)
      }
    }

    return Boolean(successful)
  } catch {
    return false
  }
}
