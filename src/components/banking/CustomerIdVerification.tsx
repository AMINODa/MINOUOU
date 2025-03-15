import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  CheckCircle,
  XCircle,
  CreditCard,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface CustomerIdVerificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: any | null;
}

export default function CustomerIdVerification({
  open,
  onOpenChange,
  customer,
}: CustomerIdVerificationProps) {
  const [activeTab, setActiveTab] = useState("front");
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "approved" | "rejected"
  >(customer?.verification_status || "pending");

  // Get ID card images from customer data if available
  const idImages = {
    front: customer?.front_id_image || "https://via.placeholder.com/600x400/f3f4f6/60a5fa?text=لا+توجد+صورة+متاحة",
    back: customer?.back_id_image || "https://via.placeholder.com/600x400/f3f4f6/60a5fa?text=لا+توجد+صورة+متاحة",
  };

  if (!customer) return null;

  const handleApprove = async () => {
    try {
      // Update verification status in the database
      const { error } = await supabase
        .from("customers")
        .update({
          verification_status: "approved",
          status: "مفعل", // Also update account status to active
          updated_at: new Date().toISOString()
        })
        .eq("id", customer.id);

      if (error) {
        console.error("Error approving verification:", error);
        alert("حدث خطأ أثناء تفعيل الحساب. الرجاء المحاولة مرة أخرى.");
        return;
      }

      // Update local state
      setVerificationStatus("approved");
      alert(`تم تفعيل حساب ${customer.name} بنجاح`);
    } catch (err) {
      console.error("Error in approval process:", err);
      alert("حدث خطأ أثناء تفعيل الحساب. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleReject = async () => {
    try {
      // Update verification status in the database
      const { error } = await supabase
        .from("customers")
        .update({
          verification_status: "rejected",
          updated_at: new Date().toISOString()
        })
        .eq("id", customer.id);

      if (error) {
        console.error("Error rejecting verification:", error);
        alert("حدث خطأ أثناء رفض التفعيل. الرجاء المحاولة مرة أخرى.");
        return;
      }

      // Update local state
      setVerificationStatus("rejected");
      alert(`تم رفض التحقق من هوية ${customer.name}`);
    } catch (err) {
      console.error("Error in rejection process:", err);
      alert("حدث خطأ أثناء رفض التفعيل. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>التحقق من هوية العميل</DialogTitle>
          <DialogDescription>
            عرض وتقييم مستندات الهوية المقدمة من {customer.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4 p-3 border rounded-md bg-muted/50">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">حالة التحقق</h3>
              <p className="text-sm text-muted-foreground">
                {verificationStatus === "pending"
                  ? "في انتظار الموافقة"
                  : verificationStatus === "approved"
                  ? "تم التفعيل"
                  : "تم الرفض"}
              </p>
            </div>
          </div>
          <div>
            {verificationStatus === "pending" ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-sm text-amber-600">في انتظار المراجعة</span>
              </div>
            ) : verificationStatus === "approved" ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-600">حساب مفعل</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-red-600">تم رفض التفعيل</span>
              </div>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="front">
              <CreditCard className="ml-2 h-4 w-4" />
              الوجه الأمامي
            </TabsTrigger>
            <TabsTrigger value="back">
              <CreditCard className="ml-2 h-4 w-4" />
              الوجه الخلفي
            </TabsTrigger>
          </TabsList>

          <TabsContent value="front" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              {idImages.front ? (
                <img
                  src={idImages.front}
                  alt="Front ID"
                  className="w-full max-h-[400px] object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-[300px] bg-muted/50">
                  <p className="text-muted-foreground">لم يتم تحميل صورة الهوية الأمامية</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="back" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              {idImages.back ? (
                <img
                  src={idImages.back}
                  alt="Back ID"
                  className="w-full max-h-[400px] object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-[300px] bg-muted/50">
                  <p className="text-muted-foreground">لم يتم تحميل صورة الهوية الخلفية</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-3 border rounded-md bg-amber-50 text-amber-800 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">هام</h3>
              <p className="text-sm">
                تأكد من صحة بيانات العميل ومطابقتها للمستندات المرفقة قبل
                اتخاذ قرار بشأن التفعيل.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          {verificationStatus === "pending" ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                مراجعة لاحقاً
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                <XCircle className="ml-2 h-4 w-4" />
                رفض التفعيل
              </Button>
              <Button onClick={handleApprove}>
                <CheckCircle className="ml-2 h-4 w-4" />
                تفعيل الحساب
              </Button>
            </>
          ) : (
            <Button onClick={() => onOpenChange(false)}>إغلاق</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
