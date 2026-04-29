# LinkedIn Full-Stack Clone

محاكاة كاملة لمنصة لينكد إن الاحترافية، تركز على ميزات الأمان المتقدمة، البحث الذكي، وتفاعل المستخدمين الحقيقي.

## 🚀 التقنيات المستخدمة (Tech Stack)

- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL & Prisma ORM
- **Authentication:** NextAuth.js (Custom Providers)
- **Security:** Bcryptjs for Hashing & Verification Tokens
- **Email Service:** [Nodemailer / Resend] (لتأكيد الحساب واستعادة كلمة السر)
- **Validation:** Zod
- **Styling:** Tailwind CSS (LinkedIn UI Replica)

## ✨ المميزات الرئيسية (Key Features)

- **Advanced Auth System:** - تسجيل دخول وإنشاء حساب حقيقي.
  - **Email Verification:** نظام تأكيد الإيميل لضمان هوية المستخدم.
  - **Forgot Password:** ميزة استعادة كلمة السر عبر البريد الإلكتروني.
- **Smart Search & Geo-Targeting:** - نظام بحث حقيقي عن المستخدمين.
  - **Location-based Results:** ميزة ذكية تظهر الأشخاص المتواجدين في نفس بلدك أولاً في نتائج البحث.
- **Social Core:** - إنشاء منشورات (Text/Images).
  - نظام متابعة (Follow System) لبناء شبكتك الاحترافية.
- **Professional Profiles:** صفحات شخصية تعرض البيانات، الخبرات، والموقع الجغرافي بشكل احترافي.
- **Real Data:** النظام يعمل ببيانات حقيقية 100% مع معالجة كاملة لكل حالات الخطأ (Error Handling).

## ⚙️ التحديات التقنية التي تم حلها

- **Security Workflow:** بناء دورة كاملة لتأكيد الإيميل واستعادة كلمة السر باستخدام Tokens مؤقتة ومشفرة.
- **Complex Querying:** تحسين استعلامات البحث (Prisma Queries) لفلترة المستخدمين بناءً على الموقع الجغرافي قبل النتائج العامة.
- **Responsive Replication:** تصميم واجهة تحاكي لينكد إن بدقة مع الحفاظ على الأداء وسرعة التصفح.

## 🛠️ التشغيل المحلي (Local Setup)

1. Clone the repo:
   ```bash
   git clone [https://github.com/AmrKhaledDev/LinkedIn-Clone.git](https://github.com/AmrKhaledDev/LinkedIn-Clone.git)