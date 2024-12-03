import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SecurityStatus({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Security Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Firewall</div>
              <div className="font-medium">Active</div>
            </div>
            <Progress value={100} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Antivirus</div>
              <div className="font-medium">Up to date</div>
            </div>
            <Progress value={100} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Encryption</div>
              <div className="font-medium">95% Complete</div>
            </div>
            <Progress value={95} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>VPN</div>
              <div className="font-medium">Connected</div>
            </div>
            <Progress value={100} className="h-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

