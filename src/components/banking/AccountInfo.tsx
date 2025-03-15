import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Save,
  Clock,
} from "lucide-react";
import { Badge } from "../ui/badge";

export default function AccountInfo() {
  const [user, setUser] = useState({
    name: "عبدالرحمن محمد",
    email: "test@example.com",
    phone: "0512345678",
    dob: "1990-01-01",
    address: "الجزائر العاصمة",
    idNumber: "1234567890",
    accountNumber: "**** 5678",
    joinDate: "2023-05-15",
    accountStatus: "غير مفعل", // inactive by default
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    alert("تم حفظ المعلومات بنجاح");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">معلومات الحساب</h1>
            <p className="text-sm text-muted-foreground">
              عرض وتعديل معلومات حسابك الشخصية
            </p>
          </div>
        </div>
        <div>
          <Badge
            variant={user.accountStatus === "مفعل" ? "success" : "destructive"}
            className="rounded-full"
          >
            {user.accountStatus}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>البيانات الشخصية</CardTitle>
          <CardDescription>
            عرض وتعديل البيانات الشخصية الخاصة بك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <div className="relative">
                <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={isEditing ? formData.name : user.name}
                  onChange={handleChange}
                  className="pr-10"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? formData.email : user.email}
                  onChange={handleChange}
                  className="pr-10"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={isEditing ? formData.phone : user.phone}
                  onChange={handleChange}
                  className="pr-10"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">تاريخ الميلاد</Label>
              <div className="relative">
                <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dob"
                  type="date"
                  value={isEditing ? formData.dob : user.dob}
                  onChange={handleChange}
                  className="pr-10"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  value={isEditing ? formData.address : user.address}
                  onChange={handleChange}
                  className="pr-10"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">رقم الهوية</Label>
              <Input
                id="idNumber"
                value={isEditing ? formData.idNumber : user.idNumber}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معلومات الحساب</CardTitle>
          <CardDescription>
            معلومات حسابك المصرفي (لا يمكن تعديلها)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>رقم الحساب</Label>
              <div className="relative">
                <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={user.accountNumber}
                  className="pr-10"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>تاريخ الانضمام</Label>
              <div className="relative">
                <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={user.joinDate} className="pr-10" readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label>حالة الحساب</Label>
              <div className="flex items-center p-2 border rounded-md">
                <Badge
                  variant={
                    user.accountStatus === "مفعل" ? "success" : "destructive"
                  }
                  className="rounded-full"
                >
                  {user.accountStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({ ...user });
                    setIsEditing(false);
                  }}
                >
                  إلغاء
                </Button>
                <Button onClick={handleSave}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>تعديل البيانات</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
