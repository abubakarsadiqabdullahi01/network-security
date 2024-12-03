"use client"

import { useState } from "react"
import { Search, Loader2 } from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { URLScanResults } from "@/components/url-scan-results"
import { useQuery, useMutation } from "@tanstack/react-query"
import { scanUrl, getAnalysis } from "@/lib/virusTotalApi"
import { toast } from "sonner"

const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
})

type URLFormValues = z.infer<typeof urlSchema>

export const URLScanner = () => {
  const [analysisId, setAnalysisId] = useState<string | null>(null)

  const form = useForm<URLFormValues>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  })

  const { mutate: submitUrl, isLoading: isSubmitting } = useMutation({
    mutationFn: scanUrl,
    onSuccess: (data) => {
      setAnalysisId(data.data.id)
      toast.success("URL submitted for scanning")
    },
    onError: (error) => {
      toast.error("Failed to submit URL for scanning")
      console.error("Scan error:", error)
    },
  })

  const { data: analysisData, isLoading: isAnalyzing } = useQuery({
    queryKey: ['urlAnalysis', analysisId],
    queryFn: () => getAnalysis(analysisId!),
    enabled: !!analysisId,
    refetchInterval: (data) => 
      data?.data?.attributes?.status === 'completed' ? false : 5000,
  })

  const onSubmit = (data: URLFormValues) => {
    submitUrl(data.url)
  }

  const formatResults = (data: any) => {
    if (!data) return null
    
    const { attributes } = data.data
    return {
      url: attributes.url,
      scanDate: new Date(attributes.date * 1000).toLocaleString(),
      statusCode: attributes.last_http_response_code || 0,
      contentType: attributes.last_http_response_content_type || 'Unknown',
      totalScans: Object.keys(attributes.results).length,
      detections: attributes.stats.malicious + attributes.stats.suspicious,
      results: Object.entries(attributes.results).map(([name, result]: [string, any]) => ({
        vendor_name: name,
        result: result.category,
        method: result.method,
      })),
      categories: attributes.categories || [],
      ipAddress: attributes.last_http_response_headers?.['x-served-by'] || undefined,
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>URL Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-4">
                        <Input 
                          placeholder="Enter URL to scan..." 
                          {...field} 
                          className="flex-grow"
                        />
                        <Button 
                          type="submit" 
                          disabled={isSubmitting || isAnalyzing}
                        >
                          {isSubmitting || isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {isSubmitting ? "Submitting..." : "Analyzing..."}
                            </>
                          ) : (
                            <>
                              <Search className="mr-2 h-4 w-4" />
                              Scan URL
                            </>
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      {analysisData && (
        <URLScanResults {...formatResults(analysisData)} />
      )}
    </div>
  )
}

