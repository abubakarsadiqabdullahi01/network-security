import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SecurityStatus } from "@/components/dashboard/security-status"
import { ThreatMap } from "@/components/dashboard/threat-map"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Network Security Dashboard",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome to your Network Security Dashboard."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SecurityStatus className="col-span-4" />
        <RecentActivity className="col-span-3" />
      </div>
      <ThreatMap className="mt-4" />
    </DashboardShell>
  )
}

