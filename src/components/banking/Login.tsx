import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from "lucide-react";
import { customerService } from "@/lib/customers";
import { Alert, AlertDescription } from "../ui/alert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // التحقق من اسم المستخدم وكلمة المرور للمدير
    if (username.toLowerCase() === "patron" && password) {
      // توجيه المدير إلى لوحة التحكم
      navigate("/admin");
      return;
    }

    // التحقق من اسم المستخدم وكلمة المرور للعملاء
    const customer = customerService.authenticateCustomer(username, password);
    if (customer) {
      // تخزين معلومات العميل في الجلسة
      sessionStorage.setItem("currentCustomer", JSON.stringify(customer));
      // توجيه المستخدم العادي إلى الصفحة الرئيسية
      navigate("/bank");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/15 via-secondary/5 to-background p-4 sm:p-6"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">بنك الأمان</h1>
          <p className="mt-2 text-muted-foreground">الخدمات المصرفية الشخصية</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              أدخل بيانات الدخول للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="أدخل اسم المستخدم"
                    className="pr-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs"
                    type="button"
                  >
                    نسيت كلمة المرور؟
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute left-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  تذكرني
                </Label>
              </div>
              <Button type="submit" className="w-full">
                تسجيل الدخول
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  أو تسجيل الدخول باستخدام
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button variant="outline" className="w-full">
                بصمة الوجه
              </Button>
              <Button variant="outline" className="w-full">
                بصمة الإصبع
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Button variant="link" className="h-auto p-0">
              فتح حساب جديد
            </Button>
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground space-y-2">
          <p>
            للدخول كمدير، استخدم اسم المستخدم:{" "}
            <span className="font-semibold">patron</span> وأي كلمة مرور
          </p>
          <p className="font-semibold">حسابات العملاء للتجربة:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            <div>
              <p>
                اسم المستخدم: <span className="font-semibold">ahmed.karim</span>
              </p>
              <p>
                كلمة المرور: <span className="font-semibold">Ahmed123</span>
              </p>
            </div>
            <div>
              <p>
                اسم المستخدم:{" "}
                <span className="font-semibold">fatima.ahmed</span>
              </p>
              <p>
                كلمة المرور: <span className="font-semibold">Fatima123</span>
              </p>
            </div>
            <div>
              <p>
                اسم المستخدم: <span className="font-semibold">mohamed.ali</span>
              </p>
              <p>
                كلمة المرور: <span className="font-semibold">Mohamed123</span>
              </p>
            </div>
            <div>
              <p>
                اسم المستخدم: <span className="font-semibold">sara.khalid</span>
              </p>
              <p>
                كلمة المرور: <span className="font-semibold">Sara123</span>
              </p>
            </div>
            <div>
              <p>
                اسم المستخدم: <span className="font-semibold">khaled.omar</span>
              </p>
              <p>
                كلمة المرور: <span className="font-semibold">Khaled123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
