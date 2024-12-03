"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

const searchSchema = z.object({
  searchTerm: z.string().min(1, "Search term is required"),
  eventType: z.string().optional(),
})

type SearchFormValues = z.infer<typeof searchSchema>

const mockResults = [
  { id: 1, event: "Login attempt", source: "192.168.1.100", timestamp: "2023-05-15 14:30:00" },
  { id: 2, event: "Firewall block", source: "10.0.0.5", timestamp: "2023-05-15 14:35:22" },
  { id: 3, event: "File access", source: "user@example.com", timestamp: "2023-05-15 14:40:15" },
]

export function SearchInterface() {
  const [results, setResults] = useState(mockResults)

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
      eventType: "",
    },
  })

  const onSubmit = (data: SearchFormValues) => {
    // Implement search logic here
    console.log("Searching for:", data.searchTerm, "Event type:", data.eventType)
    // For now, we'll just filter the mock results
    const filtered = mockResults.filter(
      (result) =>
        result.event.toLowerCase().includes(data.searchTerm.toLowerCase()) &&
        (!data.eventType || result.event.toLowerCase().includes(data.eventType.toLowerCase()))
    )
    setResults(filtered)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 mb-6">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="Search logs..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="firewall">Firewall</SelectItem>
                      <SelectItem value="file_access">File Access</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </Form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.event}</TableCell>
                <TableCell>{result.source}</TableCell>
                <TableCell>{result.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

