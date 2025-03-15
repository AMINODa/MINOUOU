<<<<<<< HEAD
function Home() {
  return (
    <div className="w-screen h-screen">
    </div>
  )
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowRight, Building, CreditCard, DollarSign, Globe, Lock, Shield, Star, Users } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">بنك الأمان</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="space-x-2 space-x-reverse">
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#features">
                  الميزات
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#services">
                  الخدمات
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#testimonials">
                  آراء العملاء
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#contact">
                  اتصل بنا
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              تسجيل الدخول
            </Button>
            <Button onClick={() => navigate("/register")}>
              فتح حساب جديد
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/15 via-secondary/5 to-background py-20">
        <div className="container relative z-10 flex flex-col items-center justify-center gap-8 py-12 text-center md:flex-row md:text-right lg:gap-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
              الخدمات المصرفية <br />
              <span className="text-secondary">بطريقة عصرية</span>
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground">
              استمتع بتجربة مصرفية متكاملة مع بنك الأمان. نقدم لك خدمات مصرفية آمنة وسريعة تلبي احتياجاتك المالية بكل سهولة.  
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button size="lg" onClick={() => navigate("/register")}>
                افتح حساب الآن
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                تسجيل الدخول
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-1 shadow-xl">
              <div className="absolute inset-0 rounded-lg bg-white/90 backdrop-blur-sm">
                <div className="flex h-full flex-col items-center justify-center p-6">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-4 text-center">
                    <h3 className="text-2xl font-bold">الخدمات المصرفية الآمنة</h3>
                    <p className="text-muted-foreground">تمتع بأعلى درجات الأمان مع خدماتنا المصرفية المتطورة</p>
                    <div className="flex justify-center gap-4">
                      <div className="rounded-lg bg-primary/5 p-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <p className="mt-2 text-sm">بطاقات ذكية</p>
                      </div>
                      <div className="rounded-lg bg-secondary/5 p-4">
                        <Globe className="h-8 w-8 text-secondary" />
                        <p className="mt-2 text-sm">خدمات عالمية</p>
                      </div>
                      <div className="rounded-lg bg-accent/5 p-4">
                        <Lock className="h-8 w-8 text-accent" />
                        <p className="mt-2 text-sm">حماية متكاملة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types Section */}
      <section className="container py-16" id="services">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">أنواع الحسابات</h2>
          <p className="text-muted-foreground">اختر نوع الحساب المناسب لاحتياجاتك</p>
        </div>

        <div className="flex justify-center space-x-4 space-x-reverse mb-8">
          <Button 
            variant={activeTab === "personal" ? "default" : "outline"}
            onClick={() => setActiveTab("personal")}
            className="min-w-[120px]"
          >
            حسابات شخصية
          </Button>
          <Button 
            variant={activeTab === "business" ? "default" : "outline"}
            onClick={() => setActiveTab("business")}
            className="min-w-[120px]"
          >
            حسابات الشركات
          </Button>
          <Button 
            variant={activeTab === "savings" ? "default" : "outline"}
            onClick={() => setActiveTab("savings")}
            className="min-w-[120px]"
          >
            حسابات التوفير
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {activeTab === "personal" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>الحساب الأساسي</CardTitle>
                  <CardDescription>للاحتياجات اليومية البسيطة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">مجاناً</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> بطاقة سحب آلي مجانية</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمات مصرفية عبر الإنترنت</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> تحويلات محلية مجانية</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    الأكثر شعبية
                  </div>
                  <CardTitle>الحساب المميز</CardTitle>
                  <CardDescription>للعملاء الذين يبحثون عن مزايا إضافية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">50 ريال/شهرياً</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> جميع مزايا الحساب الأساسي</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> بطاقة ائتمان بمزايا حصرية</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> تحويلات دولية مخفضة</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمة عملاء متميزة</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الحساب الذهبي</CardTitle>
                  <CardDescription>للعملاء ذوي الملاءة المالية العالية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">150 ريال/شهرياً</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> جميع مزايا الحساب المميز</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> مدير حساب شخصي</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> تحويلات دولية مجانية</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> تأمين سفر شامل</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> دخول صالات VIP في المطارات</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {activeTab === "business" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>حساب الأعمال الصغيرة</CardTitle>
                  <CardDescription>للشركات الناشئة والمشاريع الصغيرة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">100 ريال/شهرياً</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمات مصرفية للشركات</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> بطاقات أعمال لموظفين</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمات الرواتب</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>حساب الشركات</CardTitle>
                  <CardDescription>للشركات المتوسطة والكبيرة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">250 ريال/شهرياً</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> جميع مزايا حساب الأعمال الصغيرة</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمات استشارية مالية</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> تسهيلات ائتمانية</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمات تجارة دولية</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    خدمات متكاملة
                  </div>
                  <CardTitle>الحساب التجاري المتميز</CardTitle>
                  <CardDescription>للشركات الكبرى والمؤسسات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">500 ريال/شهرياً</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> جميع مزايا حساب الشركات</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> مدير علاقات مخصص</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خدمات مصرفية دولية</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> حلول استثمارية متقدمة</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> تمويل مشاريع</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {activeTab === "savings" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>حساب التوفير الأساسي</CardTitle>
                  <CardDescription>للمدخرين المبتدئين</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">2% <span className="text-sm">سنوياً</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> فائدة سنوية 2%</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> سحب وإيداع مرن</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> بدون حد أدنى للرصيد</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    الأكثر شعبية
                  </div>
                  <CardTitle>حساب التوفير المميز</CardTitle>
                  <CardDescription>للمدخرين الجادين</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">3.5% <span className="text-sm">سنوياً</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> فائدة سنوية 3.5%</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> حد أدنى للرصيد 10,000 ريال</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> سحب شهري محدود</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خطط ادخار مرنة</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>حساب التوفير طويل الأجل</CardTitle>
                  <CardDescription>للمستثمرين طويلي الأمد</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">5% <span className="text-sm">سنوياً</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> فائدة سنوية 5%</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> مدة ربط لا تقل عن سنتين</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> حد أدنى للرصيد 50,000 ريال</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> مكافآت إضافية عند الاحتفاظ بالرصيد</li>
                    <li className="flex items-center"><Star className="mr-2 h-4 w-4 text-primary" /> خيارات استثمارية متنوعة</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate("/register")}>
                    افتح حساب الآن
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16" id="features">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">مميزات بنك الأمان</h2>
            <p className="text-muted-foreground">نقدم لك مجموعة من الخدمات المصرفية المتميزة</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">أمان مصرفي متكامل</h3>
              <p className="text-muted-foreground">نستخدم أحدث تقنيات الأمان لحماية حساباتك ومعاملاتك المصرفية من أي تهديدات.</p>
            </div>

            <div className="rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Globe className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">خدمات عالمية</h3>
              <p className="text-muted-foreground">استمتع بخدماتنا المصرفية أينما كنت حول العالم مع دعم للعملات المتعددة والتحويلات الدولية.</p>
            </div>

            <div className="rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <CreditCard className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-bold">بطاقات ذكية</h3>
              <p className="text-muted-foreground">بطاقات مصرفية متطورة تمنحك تحكماً كاملاً في مصروفاتك مع ميزات أمان متقدمة.</p>
            </div>

            <div className="rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">استثمارات مربحة</h3>
              <p className="text-muted-foreground">فرص استثمارية متنوعة تناسب أهدافك المالية مع عوائد مجزية ومخاطر محسوبة.</p>
            </div>

            <div className="rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Building className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">حلول للشركات</h3>
              <p className="text-muted-foreground">خدمات مصرفية متكاملة للشركات تساعدها على النمو وتحقيق أهدافها المالية.</p>
            </div>

            <div className="rounded-xl bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-bold">خدمة عملاء متميزة</h3>
              <p className="text-muted-foreground">فريق خدمة عملاء محترف متاح على مدار الساعة لتلبية احتياجاتك المصرفية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-16" id="testimonials">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">آراء عملائنا</h2>
          <p className="text-muted-foreground">ماذا يقول عملاؤنا عن تجربتهم مع بنك الأمان</p>
        </div>

        <Carousel className="mx-auto max-w-5xl">
          <CarouselContent>
            <CarouselItem className="md:basis-1/2">
              <div className="p-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>مح</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">محمد أحمد</h4>
                        <p className="text-sm text-muted-foreground">عميل منذ 2020</p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "تجربتي مع بنك الأمان كانت رائعة. الخدمات المصرفية سهلة الاستخدام والموظفين متعاونين جداً. أنصح به بشدة لكل من يبحث عن خدمات مصرفية موثوقة."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <div className="p-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>سا</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">سارة محمد</h4>
                        <p className="text-sm text-muted-foreground">عميلة منذ 2021</p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "أحب تطبيق البنك الإلكتروني، سهل الاستخدام ويوفر جميع الخدمات التي أحتاجها. التحويلات سريعة والرسوم معقولة جداً مقارنة بالبنوك الأخرى."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <div className="p-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>عب</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">عبدالله خالد</h4>
                        <p className="text-sm text-muted-foreground">عميل منذ 2019</p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "استفدت كثيراً من خدمات الاستثمار في بنك الأمان. العوائد ممتازة والمخاطر محسوبة بدقة. فريق الاستشارات المالية محترف جداً ويقدم نصائح قيمة."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <div className="p-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>نو</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">نورة أحمد</h4>
                        <p className="text-sm text-muted-foreground">عميلة منذ 2022</p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "خدمة العملاء ممتازة والتطبيق سهل الاستخدام. أتمنى لو كان هناك المزيد من الفروع في مدينتي، لكن بشكل عام تجربتي إيجابية مع بنك الأمان."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/50 py-16" id="contact">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-xl bg-background p-8 shadow-lg">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">تواصل معنا</h2>
              <p className="text-muted-foreground">نحن هنا للإجابة على استفساراتك</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+966 123 456 7890</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>info@securitybank.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>شارع الملك فهد، الرياض</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 بنك الأمان. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">الهاتف</h3>
                    <p className="text-muted-foreground">+966 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">info@securitybank.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">العنوان</h3>
                    <p className="text-muted-foreground">شارع الملك فهد، الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">الاسم</label>
                  <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="أدخل اسمك" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="أدخل بريدك الإلكتروني" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الرسالة</label>
                  <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={4} placeholder="أدخل رسالتك"></textarea>
                </div>
                <Button className="w-full">إرسال</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">بنك الأمان</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                نقدم خدمات مصرفية آمنة وموثوقة لعملائنا منذ أكثر من 20 عاماً. ثقتكم هي أولويتنا.  
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">عن البنك</a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-primary">خدماتنا</a>
                </li>
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-primary">المميزات</a>
                </li>
                <li>
                  <a href="#testimonials" className="text-muted-foreground hover:text-primary">آراء العملاء</a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary">اتصل بنا</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">الخدمات</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">الحسابات الشخصية</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">حسابات الشركات</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">حسابات التوفير</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">القروض والتمويل</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">الاستثمارات</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">تواصل معنا</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+966 123 456 7890</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>info@securitybank.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>شارع الملك فهد، الرياض</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 بنك الأمان. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
>>>>>>> 9f77d8f (first commit)
}

export default Home
