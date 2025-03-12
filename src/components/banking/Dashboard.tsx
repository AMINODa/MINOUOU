import { useEffect, useState } from "react";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Euro,
  Wallet,
  AlertCircle,
} from "lucide-react";
import OpenNewAccount from "./OpenNewAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenAccountDialogOpen, setIsOpenAccountDialogOpen] = useState(false);

  useEffect(() => {
    // استرجاع بيانات العميل من الجلسة
    const storedCustomer = sessionStorage.getItem("currentCustomer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            لم يتم العثور على بيانات العميل. الرجاء{" "}
            <Link to="/" className="underline font-bold">
              تسجيل الدخول
            </Link>{" "}
            مرة أخرى.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // تنسيق الرصيد
  const formatBalance = (balance) => {
    return balance.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          مرحباً، {customer.name.split(" ")[0]}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">آخر تحديث:</span>
          <span className="text-sm font-medium">
            {new Date().toLocaleString("ar-DZ", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* بطاقة الرصيد الإجمالي */}
      <Card className="bg-gradient-to-r from-primary to-primary/60 text-white border-0 shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            الرصيد الإجمالي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm opacity-80">الدينار الجزائري</p>
            <p className="text-2xl font-bold">
              {formatBalance(customer.balance)} د.ج
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-white/10 rounded-lg p-3">
            <div>
              <p className="text-xs opacity-80">دولار أمريكي</p>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <p className="font-bold">0</p>
              </div>
            </div>
            <div>
              <p className="text-xs opacity-80">يورو</p>
              <div className="flex items-center gap-1">
                <Euro className="h-3 w-3" />
                <p className="font-bold">0</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/20 hover:text-white w-full"
          >
            <TrendingUp className="h-4 w-4 ml-2" />
            عرض تفاصيل الأرصدة
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>حساباتي</CardTitle>
          <CardDescription>إدارة حساباتك المصرفية</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {customer.accounts && customer.accounts.length > 0 ? (
            customer.accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{account.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {account.number.substring(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {formatBalance(account.balance)} د.ج
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/20">
              <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">لا توجد حسابات نشطة</h3>
              <p className="text-sm text-muted-foreground mb-4">
                لم يتم العثور على أي حسابات مصرفية نشطة في حسابك
              </p>
              <Button
                variant="outline"
                onClick={() => setIsOpenAccountDialogOpen(true)}
              >
                فتح حساب جديد
              </Button>
            </div>
          )}

          {customer.balance === 0 && (
            <Alert className="mt-4 bg-warning/10 text-warning border-warning/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                رصيد حسابك صفر. يمكنك إيداع الأموال باستخدام{" "}
                <Link
                  to="/bank/deposit-instructions"
                  className="underline font-bold"
                >
                  تعليمات الإيداع
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>آخر المعاملات</CardTitle>
          <CardDescription>نظرة عامة على معاملاتك الأخيرة</CardDescription>
        </CardHeader>
        <CardContent>
          {customer.balance === 0 ? (
            <div className="p-8 text-center border rounded-lg bg-muted/20">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">لا توجد معاملات</h3>
              <p className="text-sm text-muted-foreground mb-4">
                لم يتم العثور على أي معاملات في حسابك
              </p>
              <Button variant="outline" asChild>
                <Link to="/bank/deposit-instructions">عرض تعليمات الإيداع</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "ماركت الرياض",
                  date: "٢٠ يونيو",
                  amount: "-350 د.ج",
                  category: "تسوق",
                },
                {
                  id: 2,
                  title: "تحويل إلى محمد",
                  date: "١٨ يونيو",
                  amount: "-1,200 د.ج",
                  category: "تحويل",
                },
                {
                  id: 3,
                  title: "راتب شهري",
                  date: "١٥ يونيو",
                  amount: "+15,000 د.ج",
                  category: "دخل",
                },
                {
                  id: 4,
                  title: "مطعم السلام",
                  date: "١٤ يونيو",
                  amount: "-220 د.ج",
                  category: "مطاعم",
                },
                {
                  id: 5,
                  title: "فاتورة الكهرباء",
                  date: "١٠ يونيو",
                  amount: "-450 د.ج",
                  category: "فواتير",
                },
              ].map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{transaction.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${transaction.amount.startsWith("+") ? "text-success" : "text-destructive"}`}
                    >
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {customer.balance > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              عرض جميع المعاملات
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* نافذة فتح حساب جديد */}
      <OpenNewAccount
        open={isOpenAccountDialogOpen}
        onOpenChange={setIsOpenAccountDialogOpen}
        onSuccess={() => {
          // يمكن إضافة تحديث للبيانات هنا بعد فتح الحساب بنجاح
        }}
      />
    </div>
  );
}
