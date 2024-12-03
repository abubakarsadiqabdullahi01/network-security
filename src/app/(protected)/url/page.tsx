import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { URLScanner } from "@/components/dashboard/url-scanner"

export default function URLPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="URL Analysis"
        text="Scan and analyze URLs for potential security threats."
      />
      <URLScanner />
    </DashboardShell>
  )
}

