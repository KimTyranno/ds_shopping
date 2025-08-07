import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/server"
import { Mail, ShoppingBag, User } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function MyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
          <p className="text-muted-foreground">
            계정 정보와 주문 내역을 관리하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 프로필 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                프로필 정보
              </CardTitle>
              <CardDescription>
                개인 정보를 확인하고 수정할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={user.user_metadata?.name || ""}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" value={user.email || ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joined">가입일</Label>
                <Input
                  id="joined"
                  value={new Date(user.created_at).toLocaleDateString("ko-KR")}
                  readOnly
                />
              </div>
              <Button className="w-full bg-transparent" variant="outline">
                프로필 수정
              </Button>
            </CardContent>
          </Card>

          {/* 주문 내역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                최근 주문
              </CardTitle>
              <CardDescription>최근 주문 내역을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  아직 주문 내역이 없습니다
                </p>
                <Button asChild>
                  <Link href="/products">쇼핑하러 가기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 빠른 링크 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">빠른 링크</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/orders">
                <ShoppingBag className="h-6 w-6 mb-2" />
                주문내역
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/cart">
                <ShoppingBag className="h-6 w-6 mb-2" />
                장바구니
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/wishlist">
                <User className="h-6 w-6 mb-2" />
                찜목록
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-20 flex-col bg-transparent">
              <Link href="/support">
                <Mail className="h-6 w-6 mb-2" />
                고객지원
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
