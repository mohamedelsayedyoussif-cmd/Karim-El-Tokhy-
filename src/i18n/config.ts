import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "name": "Karim El-Tokhy",
      "title": "Senior Creative Director & Brand Strategist",
      "tagline": "15+ Years of Visual Excellence Across MENA & Europe",
      "projects": "200+ Projects",
      "identities": "40+ Brand Identities",
      "awards": "12 International Awards",
      "years": "15+ Years",
      "viewWork": "View My Work",
      "downloadCV": "Download CV",
      "about": "About Me",
      "aboutText": "A Creative Director with 15+ years of expertise in visual identity, UI/UX design, and brand direction for major brands across the Middle East and Europe. Led 200+ successful projects for clients including Forbes 500 companies. Passionate about merging technology with visual creativity.",
      "experience": "Experience",
      "skills": "Skills",
      "certifications": "Certifications",
      "caseStudies": "Case Studies",
      "awardsShowcase": "Awards",
      "testimonials": "Testimonials",
      "contact": "Contact",
      "blog": "Blog",
      "downloads": "Downloads",
      "aiGeneration": "AI Generation",
      "generateImage": "Generate Image",
      "generateVideo": "Generate Video",
      "secretMessage": "You found the secret! 🎨",
      "contactHeadline": "Let's Create Something Extraordinary",
      "contactSub": "Available for freelance projects, consultancy & speaking engagements",
      "send": "Send Message",
      "login": "Login",
      "logout": "Logout",
      "nameField": "Name",
      "emailField": "Email",
      "projectType": "Project Type",
      "budget": "Budget Range",
      "message": "Message"
    }
  },
  ar: {
    translation: {
      "name": "كريم حسام الطوخي",
      "title": "مدير إبداعي أول وخبير استراتيجي للعلامات التجارية",
      "tagline": "أكثر من 15 عامًا من التميز البصري في الشرق الأوسط وأوروبا",
      "projects": "200+ مشروع",
      "identities": "40+ هوية بصرية",
      "awards": "12 جائزة دولية",
      "years": "15+ سنة",
      "viewWork": "شاهد أعمالي",
      "downloadCV": "تحميل السيرة الذاتية",
      "about": "عني",
      "aboutText": "مدير إبداعي يتمتع بخبرة تزيد عن 15 عامًا في الهوية البصرية وتصميم واجهة المستخدم وتوجيه العلامات التجارية للشركات الكبرى في الشرق الأوسط وأوروبا. قاد أكثر من 200 مشروع ناجح لعملاء بما في ذلك شركات فورتشن 500. شغوف بدمج التكنولوجيا مع الإبداع البصري.",
      "experience": "الخبرة",
      "skills": "المهارات",
      "certifications": "الشهادات",
      "caseStudies": "دراسات الحالة",
      "awardsShowcase": "الجوائز",
      "testimonials": "التوصيات",
      "contact": "تواصل معي",
      "blog": "المدونة",
      "downloads": "التحميلات",
      "aiGeneration": "توليد بالذكاء الاصطناعي",
      "generateImage": "توليد صورة",
      "generateVideo": "توليد فيديو",
      "secretMessage": "لقد وجدت السر! 🎨",
      "contactHeadline": "دعنا نصنع شيئًا استثنائيًا",
      "contactSub": "متاح للمشاريع المستقلة والاستشارات والمحاضرات",
      "send": "إرسال رسالة",
      "login": "تسجيل الدخول",
      "logout": "تسجيل الخروج",
      "nameField": "الاسم",
      "emailField": "البريد الإلكتروني",
      "projectType": "نوع المشروع",
      "budget": "الميزانية",
      "message": "الرسالة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
