"use client"

import { useState } from "react"
import { Upload } from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

const fileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size <= 5000000, {
    message: "File size should be less than 5MB",
  }),
})

type FileFormValues = z.infer<typeof fileSchema>

export const  FileUploader = () => {
  const form = useForm<FileFormValues>({
    resolver: zodResolver(fileSchema),
  })

  const onSubmit = (data: FileFormValues) => {
    // Implement file upload logic here
    console.log("Uploading file:", data.file.name)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
