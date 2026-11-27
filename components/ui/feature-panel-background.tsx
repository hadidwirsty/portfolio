import { GradientMotionBackground } from "@/components/ui/gradient-motion-background"
import { cn } from "@/lib/utils"

export function FeaturePanelBackground({ className }: { className?: string }) {
  return (
    <GradientMotionBackground
      seed={77}
      className={cn(
        "feature-panel-background -z-20 bg-transparent duration-500 dark:bg-transparent",
        className
      )}
    />
  )
}
