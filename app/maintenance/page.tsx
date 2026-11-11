import type { Metadata } from "next"

import { MaintenanceView } from "@/components/maintenance-view"

export const metadata: Metadata = {
  title: "Maintenance — Muhammad Hadid Wiransetyo",
  robots: {
    index: false,
    follow: false,
  },
}

export default function MaintenancePage() {
  return <MaintenanceView />
}
