import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DollarSign,
  Euro,
  CreditCard,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const foreignAccounts = [
  {
    id: 1,
    name: "حساب الدولار الأمريكي",
    number: "**** **** **** 5421",
    balance: "5,200 $",
    currency: "دولار أمريكي",
    type: "جاري",
    exchangeRate: "1 $ = 135.5 د.ج",
    trend: "up",
    trendPercentage: "+1.2%",
  },
  {
    id: 2,
    name: "حساب اليورو",
    number: "**** **** **** 6832",
    balance: "4,800 €",
    currency: "يورو",
    type: "جاري",
    exchangeRate: "1 € = 148.2 د.ج",
    trend: "down",
    trendPercentage: "-0.5%",
  },
];

export default function CurrencyAccounts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الحسابات بالعملات الأجنبية</h1>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          فتح حساب بعملة أجنبية
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-2 sm:mb-0">
          <TabsTrigger value="all">جميع العملات</TabsTrigger>
          <TabsTrigger value="usd">
            <DollarSign className="ml-2 h-4 w-4" />
            دولار أمريكي
          </TabsTrigger>
          <TabsTrigger value="eur">
            <Euro className="ml-2 h-4 w-4" />
            يورو
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {foreignAccounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {account.currency === "دولار أمريكي" ? (
                        <DollarSign className="h-6 w-6 text-primary" />
                      ) : (
                        <Euro className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>
                        {account.type} • {account.currency}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {account.number}
                    </p>
                    <p className="text-2xl font-bold">{account.balance}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">سعر الصرف</p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">
                        {account.exchangeRate}
                      </p>
                      {account.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 mr-1 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
                      )}
                      <span
                        className={
                          account.trend === "up"
                            ? "text-success text-xs"
                            : "text-destructive text-xs"
                        }
                      >
                        {account.trendPercentage}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 space-x-reverse pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      تحويل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      إيداع
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      سحب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">فتح حساب بعملة جديدة</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                يمكنك فتح حسابات بعملات متعددة للتعاملات الدولية
              </p>
              <Button variant="outline">فتح حساب جديد</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usd" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>حساب الدولار الأمريكي</CardTitle>
              <CardDescription>تفاصيل حسابك بالدولار الأمريكي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">الرصيد الحالي</h3>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** 5421
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">5,200 $</p>
                  <p className="text-sm text-muted-foreground">
                    ما يعادل 704,600 د.ج
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">سعر الصرف</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <p className="font-medium">1 $ = 135.5 د.ج</p>
                      <TrendingUp className="h-4 w-4 mr-1 text-success" />
                      <span className="text-success text-xs">+1.2%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">آخر إيداع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">+1,000 $</p>
                    <p className="text-xs text-muted-foreground">
                      15 يونيو 2023
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">آخر سحب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">-500 $</p>
                    <p className="text-xs text-muted-foreground">
                      10 يونيو 2023
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-2 space-x-reverse pt-2">
                <Button className="flex-1">تحويل من الدولار</Button>
                <Button className="flex-1">تحويل إلى الدولار</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eur" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>حساب اليورو</CardTitle>
              <CardDescription>تفاصيل حسابك باليورو</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Euro className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">الرصيد الحالي</h3>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** 6832
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">4,800 €</p>
                  <p className="text-sm text-muted-foreground">
                    ما يعادل 711,360 د.ج
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">سعر الصرف</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <p className="font-medium">1 € = 148.2 د.ج</p>
                      <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
                      <span className="text-destructive text-xs">-0.5%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">آخر إيداع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">+2,000 €</p>
                    <p className="text-xs text-muted-foreground">
                      20 مايو 2023
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">آخر سحب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">-300 €</p>
                    <p className="text-xs text-muted-foreground">
                      5 يونيو 2023
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-2 space-x-reverse pt-2">
                <Button className="flex-1">تحويل من اليورو</Button>
                <Button className="flex-1">تحويل إلى اليورو</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
