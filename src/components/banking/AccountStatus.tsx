import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Shield,
  Upload,
  Check,
  AlertCircle,
  Clock,
  AlertTriangle,
  Save,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { supabase } from "../../lib/supabase";

export default function AccountStatus() {
  const [status, setStatus] = useState("غير مفعل"); // non-activated by default
  const [frontIdImage, setFrontIdImage] = useState<string | null>(null);
  const [backIdImage, setBackIdImage] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "submitted" | "approved" | "rejected" | null
  >(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const frontIdInputRef = useRef<HTMLInputElement>(null);
  const backIdInputRef = useRef<HTMLInputElement>(null);
  
  // Load user data and verification status from database
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Get current user from session storage
        const currentCustomerStr = sessionStorage.getItem("currentCustomer");
        if (!currentCustomerStr) {
          console.error("No customer found in session");
          setIsLoading(false);
          return;
        }
        
        const currentCustomer = JSON.parse(currentCustomerStr);
        setCustomerId(currentCustomer.id);
        
        // Fetch verification status from database
        const { data, error } = await supabase
          .from("customers")
          .select("status, verification_status, front_id_image, back_id_image")
          .eq("id", currentCustomer.id)
          .single();
        
        if (error) {
          console.error("Error fetching verification status:", error);
        } else if (data) {
          setStatus(data.status || "غير مفعل");
          if (data.verification_status) {
            setVerificationStatus(data.verification_status);
          }
          if (data.front_id_image) {
            setFrontIdImage(data.front_id_image);
          }
          if (data.back_id_image) {
            setBackIdImage(data.back_id_image);
          }
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  const handleFrontIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFrontIdImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setBackIdImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFrontId = () => {
    setFrontIdImage(null);
    if (frontIdInputRef.current) {
      frontIdInputRef.current.value = "";
    }
  };

  const handleRemoveBackId = () => {
    setBackIdImage(null);
    if (backIdInputRef.current) {
      backIdInputRef.current.value = "";
    }
  };

  const handleSubmitVerification = async () => {
    if (!frontIdImage || !backIdImage) {
      alert("الرجاء رفع صورة الهوية من الأمام والخلف");
      return;
    }
    
    if (!customerId) {
      alert("لم يتم العثور على معلومات المستخدم. الرجاء تسجيل الدخول مرة أخرى.");
      return;
    }

    try {
      // Save verification data to database
      const { error } = await supabase
        .from("customers")
        .update({
          verification_status: "submitted",
          front_id_image: frontIdImage,
          back_id_image: backIdImage,
          updated_at: new Date().toISOString()
        })
        .eq("id", customerId);

      if (error) {
        console.error("Error saving verification data:", error);
        alert("حدث خطأ أثناء حفظ بيانات التحقق. الرجاء المحاولة مرة أخرى.");
        return;
      }

      // Update local state
      setVerificationStatus("submitted");
      
      // Show success message
      alert("تم إرسال طلب التفعيل بنجاح. سيتم مراجعته من قبل الإدارة.");
      
      // Update the customer data in session storage
      const currentCustomerStr = sessionStorage.getItem("currentCustomer");
      if (currentCustomerStr) {
        const currentCustomer = JSON.parse(currentCustomerStr);
        currentCustomer.verification_status = "submitted";
        sessionStorage.setItem("currentCustomer", JSON.stringify(currentCustomer));
      }
    } catch (err) {
      console.error("Error in verification submission:", err);
      alert("حدث خطأ أثناء إرسال طلب التفعيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "مفعل":
        return (
          <Badge variant="success" className="rounded-full px-4 py-1 text-sm">
            <Check className="h-4 w-4 ml-1" />
            مفعل
          </Badge>
        );
      case "غير مفعل":
        return (
          <Badge variant="destructive" className="rounded-full px-4 py-1 text-sm">
            <X className="h-4 w-4 ml-1" />
            غير مفعل
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="rounded-full px-4 py-1 text-sm">
            {status}
          </Badge>
        );
    }
  };

  const getVerificationStatusAlert = () => {
    switch (verificationStatus) {
      case "submitted":
        return (
          <Alert className="mt-4">
            <Clock className="h-4 w-4" />
            <AlertTitle>في انتظار المراجعة</AlertTitle>
            <AlertDescription>
              تم استلام طلب التفعيل وهو قيد المراجعة من قبل فريق الإدارة. سيتم
              إشعارك عند اكتمال المراجعة.
            </AlertDescription>
          </Alert>
        );
      case "approved":
        return (
          <Alert className="mt-4 border-green-500 bg-green-50 text-green-700">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle>تم التفعيل</AlertTitle>
            <AlertDescription>
              تم تفعيل حسابك بنجاح! يمكنك الآن الاستفادة من جميع خدمات النظام
              المصرفي.
            </AlertDescription>
          </Alert>
        );
      case "rejected":
        return (
          <Alert className="mt-4" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>تم رفض الطلب</AlertTitle>
            <AlertDescription>
              تم رفض طلب التفعيل. الرجاء التأكد من صحة المستندات المرفوعة أو
              التواصل مع خدمة العملاء.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">حالة الحساب</h1>
            <p className="text-sm text-muted-foreground">
              تفعيل حسابك من خلال التحقق من الهوية
            </p>
          </div>
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>حالة التفعيل</CardTitle>
          <CardDescription>
            حالة تفعيل حسابك والخطوات المطلوبة لإتمام التفعيل
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">حسابك غير مفعل</h3>
                <p className="text-sm text-muted-foreground">
                  لتفعيل حسابك، الرجاء رفع صورة من بطاقة الهوية الخاصة بك من
                  الأمام والخلف. سيتم مراجعة المستندات وتفعيل حسابك بعد التحقق
                  من صحتها.
                </p>
              </div>
            </div>
          </div>

          {getVerificationStatusAlert()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <Label htmlFor="front-id">صورة الهوية (الوجه الأمامي)</Label>
              {frontIdImage ? (
                <div className="relative border rounded-lg overflow-hidden">
                  <img
                    src={frontIdImage}
                    alt="Front ID"
                    className="w-full h-48 object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 left-2 h-8 w-8 rounded-full"
                    onClick={handleRemoveFrontId}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => frontIdInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium text-sm">اضغط لرفع صورة الوجه الأمامي</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG أو PDF بحجم أقصى 5 ميجابايت
                  </p>
                  <Input
                    id="front-id"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFrontIdUpload}
                    ref={frontIdInputRef}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="back-id">صورة الهوية (الوجه الخلفي)</Label>
              {backIdImage ? (
                <div className="relative border rounded-lg overflow-hidden">
                  <img
                    src={backIdImage}
                    alt="Back ID"
                    className="w-full h-48 object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 left-2 h-8 w-8 rounded-full"
                    onClick={handleRemoveBackId}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => backIdInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium text-sm">اضغط لرفع صورة الوجه الخلفي</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG أو PDF بحجم أقصى 5 ميجابايت
                  </p>
                  <Input
                    id="back-id"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleBackIdUpload}
                    ref={backIdInputRef}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSubmitVerification}
            disabled={
              !frontIdImage ||
              !backIdImage ||
              verificationStatus === "submitted" ||
              verificationStatus === "approved"
            }
          >
            <Save className="ml-2 h-4 w-4" />
            {verificationStatus === "submitted"
              ? "تم إرسال الطلب"
              : verificationStatus === "approved"
              ? "تم التفعيل"
              : "تفعيل الحساب"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>فوائد تفعيل الحساب</CardTitle>
          <CardDescription>
            ميزات إضافية ستحصل عليها بعد تفعيل حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">حدود تحويل أعلى</p>
                <p className="text-sm text-muted-foreground">
                  يمكنك تحويل مبالغ أكبر بعد تفعيل حسابك
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">خدمات مصرفية إضافية</p>
                <p className="text-sm text-muted-foreground">
                  الوصول إلى خدمات وميزات مصرفية متقدمة
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">الأمان والموثوقية</p>
                <p className="text-sm text-muted-foreground">
                  حماية إضافية لحسابك ومعاملاتك المالية
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
