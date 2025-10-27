'use client'

import { ProductWithImage } from '@/app/[locale]/admin/products/list/page'
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
import { Link } from '@/i18n/navigation'
import {
  AlertTriangle,
  Eye,
  ImageOff,
  MoreHorizontal,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import ProductStatusBadge from './StatusBadge'

type ProductListTableProps = {
  products: ProductWithImage[]
  onDeleteProduct: (_id: number) => Promise<void>
}

export default function ProductListTable({
  products,
  onDeleteProduct,
}: ProductListTableProps) {
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
            {/* 이미지 */}
            <TableCell>
              {product.imgUrl ? (
                <Image
                  src={product.imgUrl || ''}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                  <ImageOff className="w-6 h-6" />
                </div>
              )}
            </TableCell>
            {/* 상품명 */}
            <TableCell>
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500 sm:hidden">
                  {product.categoryName}
                </div>
              </div>
            </TableCell>
            {/* 카테고리 */}
            <TableCell className="hidden sm:table-cell">
              {product.categoryName}
            </TableCell>
            {/* 판매가격 */}
            <TableCell>₩{product.price.toLocaleString()}</TableCell>
            {/* 할인율 */}
            <TableCell className="hidden lg:table-cell">
              {product.discountRate}%
            </TableCell>
            {/* 재고 */}
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
            {/* 상태 */}
            <TableCell>
              <ProductStatusBadge status={product.status} />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/admin/products/list/${product.productId}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      상세보기
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() =>
                      void onDeleteProduct(Number(product.productId))
                    }>
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
