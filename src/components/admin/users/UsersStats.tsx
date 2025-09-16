'user client'

import { Card, CardContent } from '@/components/ui/card'
import { Ban, UserPlus, Users } from 'lucide-react'

type StatsProps = {
  allCount: number
  newCount: number
  suspendedCount: number
}

export default function UsersStats({
  allCount,
  newCount,
  suspendedCount,
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">전체 회원</p>
            <p className="text-3xl font-bold">{allCount.toLocaleString()}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-2">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card className="text-green-600">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">신규 회원</p>
              <p className="text-3xl font-bold">{newCount}</p>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <UserPlus className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="text-red-600">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">비활성 회원</p>
              <p className="text-3xl font-bold">{suspendedCount}</p>
            </div>
            <div className="rounded-full bg-red-100 p-2">
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
