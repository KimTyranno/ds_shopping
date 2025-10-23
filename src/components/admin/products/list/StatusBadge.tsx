'use client'

import { Badge } from '@/components/ui/badge'
import { PRODUCT_STATUS, PRODUCT_STATUS_TYPE } from '@/types/enums'

export default function ProductStatusBadge({
  status,
}: {
  status: PRODUCT_STATUS_TYPE
}) {
  switch (status) {
    case PRODUCT_STATUS.ACTIVE:
      return <Badge className="bg-green-100 text-green-800">판매중</Badge>
    case PRODUCT_STATUS.SOLD_OUT:
      return <Badge className="bg-yellow-100 text-yellow-800">품절</Badge>
    case PRODUCT_STATUS.PAUSED:
      return <Badge className="bg-orange-100 text-orange-800">판매중지</Badge>
    case PRODUCT_STATUS.DELETED:
      return <Badge className="bg-red-100 text-red-800">삭제됨</Badge>
  }
}
