import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  UserPlus,
  RefreshCw,
  Bell,
  Shield,
} from "lucide-react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerDetails from "./CustomerDetails";
import { db } from "@/lib/db";
import { customerService } from "@/lib/customers";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AdminDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // استرجاع بيانات العملاء من قاعدة البيانات
  const customers = [
    ...db.getCustomers(),
    ...customerService.getAllCustomers(),
  ].map((customer) => ({
    ...customer,
    balance: `${customer.balance.toLocaleString()} د.ج`,
  }));

  // تطبيق الفلترة على العملاء
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchTerm) ||
      customer.email.includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      customer.accountNumber.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">لوحة تحكم المدير</h1>
            <p className="text-sm text-muted-foreground">
              مرحباً بك في نظام إدارة البنك
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              آخر تحديث: 10:30 ص
            </span>
          </div>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-r-4 border-r-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              إجمالي العملاء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,248</div>
              <div className="text-xs text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              248 عميل جديد هذا الشهر
            </div>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-secondary" />
              إجمالي الودائع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">25.4 مليون</div>
              <div className="text-xs text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              1.8 مليون زيادة عن الشهر الماضي
            </div>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-accent" />
              البطاقات النشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">876</div>
              <div className="text-xs text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              42 بطاقة جديدة هذا الشهر
            </div>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-success" />
              المعاملات اليومية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">342</div>
              <div className="text-xs text-success flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              52 معاملة في الساعة الأخيرة
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="customers"
        className="bg-white rounded-lg shadow-sm border p-1"
      >
        <TabsList className="w-full grid grid-cols-3 mb-2 sm:mb-0 bg-muted/50">
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Users className="h-4 w-4 mr-2" />
            العملاء
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            المعاملات
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Bell className="h-4 w-4 mr-2" />
            التنبيهات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4 mt-6 px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن عميل..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="حالة الحساب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="مجمد">مجمد</SelectItem>
                  <SelectItem value="مغلق">مغلق</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 ml-2" />
                إضافة عميل
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden bg-white">
            <div className="hidden md:grid grid-cols-6 bg-muted/50 p-4 font-medium">
              <div>اسم العميل</div>
              <div>رقم الحساب</div>
              <div>البريد الإلكتروني</div>
              <div>الرصيد</div>
              <div>الحالة</div>
              <div className="text-left">الإجراءات</div>
            </div>

            <div className="divide-y">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex flex-col md:grid md:grid-cols-6 p-4 items-start md:items-center border-b md:border-b-0 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{customer.name}</div>
                  </div>
                  <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                    {customer.accountNumber}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                    {customer.email}
                  </div>
                  <div className="font-medium mt-1 md:mt-0">
                    {customer.balance}
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Badge
                      variant={
                        customer.status === "نشط"
                          ? "success"
                          : customer.status === "مجمد"
                            ? "destructive"
                            : "outline"
                      }
                      className="rounded-full"
                    >
                      {customer.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0 md:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsCustomerDetailsOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={
                        customer.status === "نشط" ? "destructive" : "success"
                      }
                      size="sm"
                    >
                      {customer.status === "نشط" ? "تعطيل" : "تفعيل"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              عرض {filteredCustomers.length} من {customers.length} عميل
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="outline" size="sm" disabled>
                السابق
              </Button>
              <Button variant="outline" size="sm">
                التالي
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4 mt-6 px-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle>المعاملات المالية</CardTitle>
              <CardDescription>مراقبة وتتبع المعاملات المالية</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="البحث عن معاملة..." className="pr-10" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden bg-white">
                <div className="hidden md:grid grid-cols-5 bg-muted/50 p-4 font-medium">
                  <div>رقم المعاملة</div>
                  <div>العميل</div>
                  <div>النوع</div>
                  <div>المبلغ</div>
                  <div>التاريخ</div>
                </div>

                <div className="divide-y">
                  {[
                    {
                      id: "TX-5421",
                      customer: "أحمد محمد",
                      type: "إيداع",
                      amount: "+15,000 د.ج",
                      date: "اليوم، 09:45 ص",
                      status: "success",
                    },
                    {
                      id: "TX-5420",
                      customer: "سارة خالد",
                      type: "سحب",
                      amount: "-5,000 د.ج",
                      date: "اليوم، 09:30 ص",
                      status: "success",
                    },
                    {
                      id: "TX-5419",
                      customer: "محمد علي",
                      type: "تحويل",
                      amount: "-12,000 د.ج",
                      date: "اليوم، 09:15 ص",
                      status: "success",
                    },
                    {
                      id: "TX-5418",
                      customer: "فاطمة أحمد",
                      type: "إيداع",
                      amount: "+50,000 د.ج",
                      date: "اليوم، 09:00 ص",
                      status: "success",
                    },
                    {
                      id: "TX-5417",
                      customer: "خالد عبدالله",
                      type: "سحب",
                      amount: "-8,000 د.ج",
                      date: "اليوم، 08:45 ص",
                      status: "success",
                    },
                  ].map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex flex-col md:grid md:grid-cols-5 p-4 items-start md:items-center border-b md:border-b-0 hover:bg-muted/10 transition-colors"
                    >
                      <div className="font-medium">{transaction.id}</div>
                      <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                        {transaction.customer}
                      </div>
                      <div className="mt-1 md:mt-0">
                        <Badge
                          variant={
                            transaction.type === "إيداع"
                              ? "success"
                              : transaction.type === "سحب"
                                ? "destructive"
                                : "outline"
                          }
                          className="rounded-full"
                        >
                          {transaction.type}
                        </Badge>
                      </div>
                      <div
                        className={`font-medium mt-1 md:mt-0 ${transaction.amount.startsWith("+") ? "text-success" : "text-destructive"}`}
                      >
                        {transaction.amount}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                        {transaction.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  عرض 1-5 من 342 معاملة
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm" disabled>
                    السابق
                  </Button>
                  <Button variant="outline" size="sm">
                    التالي
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4 mt-6 px-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle>التنبيهات والإشعارات</CardTitle>
              <CardDescription>مراقبة أحداث النظام والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "محاولة دخول مشبوهة",
                    description:
                      "تم رصد محاولة دخول غير عادية لحساب العميل محمد علي",
                    time: "منذ 35 دقيقة",
                    type: "warning",
                  },
                  {
                    id: 2,
                    title: "تحديث النظام",
                    description: "تم تحديث نظام البنك بنجاح إلى الإصدار 2.5.0",
                    time: "منذ ساعتين",
                    type: "success",
                  },
                  {
                    id: 3,
                    title: "معاملة كبيرة",
                    description:
                      "تم إجراء معاملة بقيمة 500,000 د.ج من حساب العميل فاطمة أحمد",
                    time: "منذ 3 ساعات",
                    type: "info",
                  },
                  {
                    id: 4,
                    title: "تجاوز حد السحب",
                    description:
                      "محاولة سحب تتجاوز الحد اليومي لحساب العميل خالد عبدالله",
                    time: "منذ 5 ساعات",
                    type: "warning",
                  },
                  {
                    id: 5,
                    title: "إنشاء حساب جديد",
                    description: "تم إنشاء حساب جديد للعميل عمر محمد بنجاح",
                    time: "منذ 6 ساعات",
                    type: "success",
                  },
                ].map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start p-4 border rounded-lg hover:bg-muted/10 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full ml-4 ${alert.type === "warning" ? "bg-warning/10" : alert.type === "success" ? "bg-success/10" : "bg-primary/10"}`}
                    >
                      {alert.type === "warning" ? (
                        <AlertTriangle
                          className={`h-5 w-5 ${alert.type === "warning" ? "text-warning" : alert.type === "success" ? "text-success" : "text-primary"}`}
                        />
                      ) : alert.type === "success" ? (
                        <CheckCircle
                          className={`h-5 w-5 ${alert.type === "warning" ? "text-warning" : alert.type === "success" ? "text-success" : "text-primary"}`}
                        />
                      ) : (
                        <Clock
                          className={`h-5 w-5 ${alert.type === "warning" ? "text-warning" : alert.type === "success" ? "text-success" : "text-primary"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      عرض
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="px-0">
              <Button variant="outline" className="w-full">
                عرض جميع التنبيهات
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <CustomerDetails
        open={isCustomerDetailsOpen}
        onOpenChange={setIsCustomerDetailsOpen}
        customer={selectedCustomer}
      />
    </div>
  );
}
