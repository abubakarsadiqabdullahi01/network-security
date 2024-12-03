"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, AlertCircle, Globe, Clock, Server } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface URLScanResult {
  category: string
  vendor_name: string
  result: "clean" | "suspicious" | "malicious"
  method?: string
}

interface URLScanResultsProps {
  url: string
  scanDate: string
  statusCode: number
  contentType: string
  totalScans: number
  detections: number
  results: URLScanResult[]
  categories: string[]
  ipAddress?: string
}

export function URLScanResults({
  url,
  scanDate,
  statusCode,
  contentType,
  totalScans,
  detections,
  results,
  categories,
  ipAddress
}: URLScanResultsProps) {
  const score = Math.round((detections / totalScans) * 100)
  const threatLevel = detections === 0 ? "clean" : detections < 3 ? "suspicious" : "malicious"

  const chartData = [
    { name: 'Detected', value: detections },
    { name: 'Clean', value: totalScans - detections },
  ]

  const COLORS = ['#ef4444', '#22c55e']

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              URL Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Detection Rate</span>
                  <Badge 
                    variant={threatLevel === "clean" ? "success" : threatLevel === "suspicious" ? "warning" : "destructive"}
                  >
                    {detections}/{totalScans}
                  </Badge>
                </div>
                <Alert variant={threatLevel === "clean" ? "default" : "destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {threatLevel === "clean" 
                      ? "No threats detected" 
                      : `${detections} security vendors flagged this URL`}
                  </AlertTitle>
                  <AlertDescription>
                    {threatLevel === "clean"
                      ? "This URL appears to be safe"
                      : "This URL may be dangerous"}
                  </AlertDescription>
                </Alert>
              </div>
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold"
                      fill={threatLevel === "clean" ? "#22c55e" : "#ef4444"}
                    >
                      {score}%
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Technical Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">URL</span>
                <span className="text-sm font-medium truncate max-w-[250px]">{url}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status Code</span>
                <span className="text-sm font-medium">{statusCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Content Type</span>
                <span className="text-sm font-medium">{contentType}</span>
              </div>
              {ipAddress && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IP Address</span>
                  <span className="text-sm font-medium">{ipAddress}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Analysis</span>
                <span className="text-sm font-medium">{scanDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Security Vendors' Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="detected">Detected</TabsTrigger>
              <TabsTrigger value="clean">Clean</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScrollArea className="h-[400px] rounded-md border mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-2">
                        {result.result === "clean" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : result.result === "suspicious" ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{result.vendor_name}</span>
                      </div>
                      <Badge
                        variant={
                          result.result === "clean"
                            ? "success"
                            : result.result === "suspicious"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {result.result}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

