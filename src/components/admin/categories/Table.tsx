'use client'

import {
  Category,
  CategoryWithProductsCount,
} from '@/app/[locale]/admin/categories/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Edit, MoreHorizontal, Trash2, TrendingUp } from 'lucide-react'

type CategoriesTableProps = {
  categories: CategoryWithProductsCount[]
  onEdit: (_category: Category) => void
  onDelete: (_id: number, _name: string) => Promise<void>
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const getStatusBadge = (status: boolean) => {
    if (status)
      return <Badge className="bg-green-100 text-green-800">활성</Badge>
    return <Badge className="bg-gray-100 text-gray-800">비활성</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">카테고리 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>카테고리명</TableHead>
                <TableHead className="hidden sm:table-cell">설명</TableHead>
                <TableHead>상품 수</TableHead>
                {/* <TableHead className="hidden lg:table-cell">슬러그</TableHead> */}
                <TableHead>상태</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        {/* TODO: 서브카테고리는 아직미정 */}
                        {/* {category.children &&
                            category.children.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(category.id)}
                                className="h-6 w-6 p-0 mr-2">
                                <ChevronRight
                                  className={`h-4 w-4 transition-transform ${
                                    expandedCategories.includes(category.id)
                                      ? 'rotate-90'
                                      : ''
                                  }`}
                                />
                              </Button>
                            )} */}
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="max-w-xs truncate text-sm text-gray-600">
                      {category.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {category.products[0].count}
                      </span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </TableCell>
                  {/* <TableCell className="hidden lg:table-cell">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell> */}
                  <TableCell>{getStatusBadge(category.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            void onDelete(category.id, category.name)
                          }
                          className="text-red-600">
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
        </div>
      </CardContent>
    </Card>
  )
}
