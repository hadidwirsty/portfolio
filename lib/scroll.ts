/**
 * Pure calculation to determine whether the back-to-top floating button
 * should be displayed based on the current scroll position and threshold.
 */
export function shouldShowBackToTop(scrollY: number, threshold = 400): boolean {
  return scrollY > threshold
}
