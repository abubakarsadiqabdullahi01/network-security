"use client"

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFile, getAnalysis } from '@/lib/virusTotalApi'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { IoReloadCircle } from "react-icons/io5"
import { toast } from "sonner"
import { ScanResults } from "@/components/scan-results"

export const FileScannerComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const queryClient = useQueryClient()

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onMutate: () => {
      setIsUploading(true)
    },
    onSuccess: (data) => {
      setAnalysisId(data.data.id)
      queryClient.invalidateQueries({ queryKey: ['analysis', data.data.id] })
      toast.success("File uploaded successfully")
      setIsUploading(false)
    },
    onError: (error: any) => {
      console.error('Upload error:', error)
      toast.error(`Error uploading file: ${error.message}`)
      setIsUploading(false)
    },
  })

  const { data: analysisData, isLoading: isAnalysisLoading, error: analysisError } = useQuery({
    queryKey: ['analysis', analysisId],
    queryFn: () => getAnalysis(analysisId!),
    enabled: !!analysisId,
    refetchInterval: (data) => 
      data?.data?.attributes?.status === 'completed' ? false : 5000,
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = () => {
    if (file) {
      uploadMutation.mutate(file)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="file" onChange={handleFileChange} />
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploadMutation.isPending}
              className="w-full"
            >
              {uploadMutation.isPending ? (
                <>
                  <IoReloadCircle className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload and Scan'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(isUploading || isAnalysisLoading) && <LoadingState />}
      
      {!isUploading && !isAnalysisLoading && analysisError ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error fetching the scan results. Please try again.
          </AlertDescription>
        </Alert>
      ) : !isUploading && !isAnalysisLoading && analysisData ? (
        <ScanResults 
          results={analysisData.data.attributes.results}
          stats={analysisData.data.attributes.stats}
          fileInfo={analysisData.meta.file_info}
          status={analysisData.data.attributes.status}
        />
      ) : null}
    </div>
  )
}

function LoadingState() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

