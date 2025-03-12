import {
  CreditCard,
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Download,
  Share2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const accounts = [
  {
    id: 1,
    name: "الحساب الجاري",
    number: "**** **** **** 4832",
    balance: "85,000 د.ج",
    currency: "دينار جزائري",
    type: "جاري",
  },
  {
    id: 2,
    name: "حساب التوفير",
    number: "**** **** **** 7621",
    balance: "40,000 د.ج",
    currency: "دينار جزائري",
    type: "توفير",
  },
  {
    id: 3,
    name: "حساب الاستثمار",
    number: "**** **** **** 9354",
    balance: "120,000 د.ج",
    currency: "دينار جزائري",
    type: "استثمار",
  },
];

const cards = [
  {
    id: 1,
    name: "بطاقة الخصم المباشر",
    number: "**** **** **** 5678",
    expiryDate: "06/25",
    type: "فيزا",
    status: "نشطة",
  },
  {
    id: 2,
    name: "بطاقة الائتمان الذهبية",
    number: "**** **** **** 9012",
    expiryDate: "09/26",
    type: "ماستركارد",
    status: "نشطة",
  },
];

export default function Accounts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الحسابات والبطاقات</h1>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة حساب جديد
        </Button>
      </div>

      <Tabs defaultValue="accounts">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-2 sm:mb-0">
          <TabsTrigger value="accounts">الحسابات</TabsTrigger>
          <TabsTrigger value="cards">البطاقات</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4 mt-6">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{account.name}</CardTitle>
                    <CardDescription>
                      {account.type} • {account.currency}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="ml-2 h-4 w-4" />
                      عرض التفاصيل
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="ml-2 h-4 w-4" />
                      تنزيل كشف الحساب
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="ml-2 h-4 w-4" />
                      مشاركة تفاصيل الحساب
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {account.number}
                  </p>
                  <p className="text-2xl font-bold">{account.balance}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cards" className="space-y-4 mt-6">
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              طلب بطاقة جديدة
            </Button>
          </div>

          {cards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-foreground/70 p-6 text-primary-foreground">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">بنك الأمان</h3>
                  <span className="text-lg font-semibold">{card.type}</span>
                </div>

                <div className="mb-6">
                  <p className="text-sm opacity-80 mb-1">رقم البطاقة</p>
                  <p className="text-xl tracking-wider">{card.number}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80 mb-1">صاحب البطاقة</p>
                    <p>أحمد محمد</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1">تاريخ الانتهاء</p>
                    <p>{card.expiryDate}</p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{card.name}</CardTitle>
                    <CardDescription>الحالة: {card.status}</CardDescription>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="ml-2 h-4 w-4" />
                        عرض التفاصيل
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <EyeOff className="ml-2 h-4 w-4" />
                        تجميد البطاقة
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="ml-2 h-4 w-4" />
                        تنزيل كشف البطاقة
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
