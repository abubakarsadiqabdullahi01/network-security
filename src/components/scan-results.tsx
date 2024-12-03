"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Loader2 } from 'lucide-react'

interface ScanResult {
  method: string
  engine_name: string
  engine_version: string
  engine_update: string
  category: string
  result: string | null
}

interface ScanResults {
  [key: string]: ScanResult
}

interface ScanStats {
  malicious: number
  suspicious: number
  undetected: number
  harmless: number
  timeout: number
  "confirmed-timeout": number
  failure: number
  "type-unsupported": number
}

interface FileInfo {
  sha256: string
  md5: string
  sha1: string
  size: number
}

interface ScanResultsProps {
  results: ScanResults
  stats: ScanStats
  fileInfo: FileInfo
  status: string
}

function CardTitle({ status, children }: { status: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{children}</h3>
      <Badge variant={status === "completed" ? "success" : "secondary"} className="flex items-center gap-2">
        {status === "queued" && <Loader2 className="h-3 w-3 animate-spin" />}
        {status}
      </Badge>
    </div>
  );
}

export function ScanResults({ results, stats, fileInfo, status }: ScanResultsProps) {
  const totalScans = Object.keys(results).length
  const safePercentage = (stats.undetected / totalScans) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle status={status}>Scan Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Stats */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Safety Score</span>
            <span>{Math.round(safePercentage)}% Safe</span>
          </div>
          <Progress value={safePercentage} className="h-2" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <StatCard title="Total Scans" value={totalScans} />
            <StatCard title="Clean" value={stats.undetected} variant="success" />
            <StatCard title="Malicious" value={stats.malicious} variant="destructive" />
            <StatCard title="Suspicious" value={stats.suspicious} variant="warning" />
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">File Details</TabsTrigger>
            <TabsTrigger value="scans">Scan Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-2">
              <DetailRow label="MD5" value={fileInfo.md5} />
              <DetailRow label="SHA-1" value={fileInfo.sha1} />
              <DetailRow label="SHA-256" value={fileInfo.sha256} />
              <DetailRow label="File Size" value={`${(fileInfo.size / 1024).toFixed(2)} KB`} />
            </div>
          </TabsContent>

          <TabsContent value="scans">
            <ScrollArea className="h-[400px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scanner</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(results).map(([name, result]) => (
                    <TableRow key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(result.category)}>
                          {result.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{result.engine_version || 'N/A'}</TableCell>
                      <TableCell>{result.engine_update}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function StatCard({ 
  title, 
  value, 
  variant = "default" 
}: { 
  title: string
  value: number
  variant?: "default" | "success" | "destructive" | "warning"
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-medium">{title}</div>
        <div className={`text-2xl font-bold ${getTextColor(variant)}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="font-mono text-sm break-all">{value}</span>
    </div>
  )
}

function getBadgeVariant(category: string): "default" | "success" | "destructive" | "warning" {
  switch (category) {
    case "undetected":
      return "success"
    case "malicious":
      return "destructive"
    case "suspicious":
      return "warning"
    default:
      return "default"
  }
}

function getTextColor(variant: string): string {
  switch (variant) {
    case "success":
      return "text-green-600"
    case "destructive":
      return "text-red-600"
    case "warning":
      return "text-yellow-600"
    default:
      return "text-foreground"
  }
}

