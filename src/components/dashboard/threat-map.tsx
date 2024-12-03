"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from 'lucide-react'

export function ThreatMap({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Global Threat Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[2/1] w-full bg-gray-100 dark:bg-gray-800 relative">
          {/* This is a placeholder for the actual map. You would typically use a library like react-simple-maps here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground">Map Placeholder</span>
          </div>
          {/* Example threat indicators */}
          <MapPin className="absolute top-1/4 left-1/4 text-red-500" />
          <MapPin className="absolute top-1/2 left-1/2 text-yellow-500" />
          <MapPin className="absolute bottom-1/4 right-1/4 text-orange-500" />
        </div>
      </CardContent>
    </Card>
  )
}

