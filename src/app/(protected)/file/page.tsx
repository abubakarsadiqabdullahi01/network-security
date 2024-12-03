'use client'

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FileScannerComponent } from "@/components/dashboard/FileScannerComponent"

export default function FilePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="File Scanner"
        text="Upload and scan files."
      />
      <div className="grid gap-6 p-5">
        <FileScannerComponent />
      </div>
    </DashboardShell>
  )
}

