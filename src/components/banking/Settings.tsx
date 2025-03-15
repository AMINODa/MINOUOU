import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  User,
  Shield,
  ChevronRight,
  Bell,
  Lock,
  Languages,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: "الحساب",
      items: [
        {
          icon: User,
          label: "معلومات الحساب",
          description: "عرض وتعديل البيانات الشخصية",
          href: "/bank/account-info",
        },
        {
          icon: Shield,
          label: "حالة الحساب",
          description: "التحقق من الهوية وتفعيل الحساب",
          href: "/bank/account-status",
        },
      ],
    },
    {
      title: "الأمان والخصوصية",
      items: [
        {
          icon: Bell,
          label: "الإشعارات",
          description: "إدارة إعدادات الإشعارات",
          href: "/bank/settings",
        },
        {
          icon: Lock,
          label: "الأمان",
          description: "تغيير كلمة المرور وإعدادات الأمان",
          href: "/bank/settings",
        },
      ],
    },
    {
      title: "عام",
      items: [
        {
          icon: Languages,
          label: "اللغة",
          description: "تغيير لغة التطبيق",
          href: "/bank/settings",
        },
        {
          icon: HelpCircle,
          label: "المساعدة والدعم",
          description: "الأسئلة الشائعة والتواصل مع الدعم",
          href: "/bank/help",
        },
        {
          icon: LogOut,
          label: "تسجيل الخروج",
          description: "تسجيل الخروج من حسابك",
          onClick: () => (window.location.href = "/"),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">الإعدادات</h1>
          <p className="text-sm text-muted-foreground">
            إدارة إعدادات حسابك الشخصية
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {settingsSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>
                إدارة إعدادات {section.title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors"
                  onClick={
                    item.onClick
                      ? item.onClick
                      : () => navigate(item.href)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
