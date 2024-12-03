import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity({ className }: { className?: string }) {
  const activities = [
    { time: "2 minutes ago", description: "Firewall blocked suspicious traffic from 192.168.1.100" },
    { time: "15 minutes ago", description: "System update completed successfully" },
    { time: "1 hour ago", description: "New device connected: iPhone (192.168.1.5)" },
    { time: "3 hours ago", description: "Antivirus definitions updated" },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-16 text-sm text-muted-foreground">{activity.time}</div>
              <div className="flex-1 text-sm">{activity.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

