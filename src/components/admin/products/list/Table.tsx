'use client'

import { ProductWithImage } from '@/app/[locale]/admin/products/list/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PRODUCT_STATUS } from '@/types/enums'
import { AlertTriangle, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'

type ProductListTableProps = {
  products: ProductWithImage[]
}

export default function ProductListTable({ products }: ProductListTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case PRODUCT_STATUS.ACTIVE:
        return <Badge className="bg-green-100 text-green-800">판매중</Badge>
      case PRODUCT_STATUS.SOLD_OUT:
        return <Badge className="bg-red-100 text-red-800">품절</Badge>
      case PRODUCT_STATUS.PAUSED:
        return <Badge className="bg-gray-100 text-gray-800">판매중지</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">이미지</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead className="hidden sm:table-cell">카테고리</TableHead>
          <TableHead>판매가격</TableHead>
          <TableHead className="hidden lg:table-cell">할인율</TableHead>
          <TableHead>재고</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="w-16"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.productId}>
            <TableCell>
              <Image
                src={product.imgUrl || ''}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500 sm:hidden">
                  {product.categoryName}
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {product.categoryName}
            </TableCell>
            <TableCell>₩{product.price.toLocaleString()}</TableCell>
            <TableCell className="hidden lg:table-cell">
              {product.discountRate}%
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span
                  className={
                    product.stock <= 5 ? 'text-red-600 font-medium' : ''
                  }>
                  {product.stock}
                </span>
                {product.stock <= 5 && product.stock > 0 && (
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                )}
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(product.status)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    상세보기
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
