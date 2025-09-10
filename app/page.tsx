"use client";

// app/page.tsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ShieldCheck, Star, MessageCircle, Phone, Globe2, ChevronRight } from "lucide-react";

// ✅ TailwindCSS 기반 단일 파일 랜딩
// - 다국어(i18n): KO, EN, FR, DE, IT, VI, TH, JA, ZH, AR
// - 아랍어 RTL 지원
// - 브랜드: 한국어=룸파인더, 그 외=Roomfinder Korea
// - 슬로건: "find low deposit rooms in korea."

const sampleListings = [
  {
    id: "L-101",
    title_ko: "신림역 도보 3분 · 레지던스 채움",
    title_en: "3min to Sillim Station · Luen Residence",
    district: "관악구",
    city: "Seoul",
    priceKRW: 490000,
    depositKRW: 300000,
    tags: ["개인실", "개별욕실", "여성전용"],
    rating: 4.7,
    reviews: 128,
    cover: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    features: ["Wi-Fi", "세탁기", "CCTV", "관리비포함"],
    availability: "즉시 입주",
  },
  {
    id: "L-102",
    title_ko: "종로 청계천 인근 · 아크 호스텔",
    title_en: "Near Cheonggyecheon · ARK Hostel",
    district: "종로구",
    city: "Seoul",
    priceKRW: 390000,
    depositKRW: 200000,
    tags: ["공용욕실", "남녀공용", "장기할인"],
    rating: 4.8,
    reviews: 76,
    cover: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d51?q=80&w=1600&auto=format&fit=crop",
    features: ["라운지", "에어컨", "정수기"],
    availability: "7일 이내",
  },
  {
    id: "L-103",
    title_ko: "홍대입구 · 코지 하우스",
    title_en: "Hongdae Entrance · Cozy House",
    district: "마포구",
    city: "Seoul",
    priceKRW: 550000,
    depositKRW: 500000,
    tags: ["개인실", "방음보강", "프리미엄"],
    rating: 4.9,
    reviews: 42,
    cover: "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop",
    features: ["개별냉장고", "개별에어컨", "비대면체크인"],
    availability: "즉시 입주",
  },
];

function formatKRW(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

// ---------------- i18n ----------------
const I18N: Record<string, Record<string, string>> = {
  ko: {
    langLabel: "한국어",
    subtitle: "고시원·원룸 스테이 검색 플랫폼",
    hero1: "외국인도 쉽게 찾는",
    hero2: "고시원·원룸",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "지역·역·건물명 검색 (예: 신림, 종로)",
    allDistricts: "전체 구",
    noPriceCap: "월세 상한 없음",
    search: "검색",
    listView: "목록 보기",
    addListing: "매물 등록",
    verified: "실사진·가격 검증",
    reviewDriven: "후기 기반 신뢰",
    mapSearch: "지도 탐색",
    seeMore: "더 보기",
    recListings: "추천 매물",
    consult: "상담하기",
    hostTitle: "원장님 전용 — 간편 매물 등록",
    hostDesc: "사진 업로드, 가격·보증금·옵션만 입력하면 끝. 검수팀이 실사진/가격을 확인해 신뢰도를 보장합니다.",
    hostB1: "카카오톡/WhatsApp 실시간 문의 버튼 자동 생성",
    hostB2: "영문 페이지 자동 생성 (외국인 유학생 타깃)",
    hostB3: "노쇼 방지를 위한 예약금(선택) 기능",
    contactTitle: "바로 상담 받아보세요",
    contactDesc: "카카오톡/이메일 중 편한 채널로 연결해드립니다. 운영시간 10:00–19:00 (KST)",
    kakao: "카카오톡 연결",
    email: "이메일 보내기",
    footerMission: "고시원·원룸 정보의 투명성을 높이고, 안전한 계약을 돕습니다.",
    services: "서비스",
    searchListings: "매물 검색",
    registerListing: "매물 등록",
    reviews: "이용 후기",
    policy: "정책",
    terms: "이용약관",
    privacy: "개인정보처리방침",
    perMonth: "/ 월",
    deposit: "보증금",
    aboutGoshiwon: "고시원이 뭐예요?",
  },
  en: {
    langLabel: "English",
    subtitle: "Find goshiwon & one-room stays",
    hero1: "Find cozy rooms & goshiwon",
    hero2: "made simple",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "Search area / station / name",
    allDistricts: "All districts",
    noPriceCap: "No price cap",
    search: "Search",
    listView: "View list",
    addListing: "Add listing",
    verified: "Verified photos & prices",
    reviewDriven: "Review-driven",
    mapSearch: "Map search",
    seeMore: "See more",
    recListings: "Recommended listings",
    consult: "Contact",
    hostTitle: "For hosts — quick listing",
    hostDesc: "Upload photos and enter rent/deposit/options. Our team verifies photos & prices for trust.",
    hostB1: "Auto KakaoTalk/WhatsApp contact buttons",
    hostB2: "Auto English page (for intl students)",
    hostB3: "Optional reservation deposit to reduce no-shows",
    contactTitle: "Get in touch now",
    contactDesc: "We connect via KakaoTalk or email. Hours 10:00–19:00 (KST)",
    kakao: "Connect on KakaoTalk",
    email: "Send email",
    footerMission: "We increase transparency for room info and support safe contracts.",
    services: "Services",
    searchListings: "Search listings",
    registerListing: "Add listing",
    reviews: "Reviews",
    policy: "Policy",
    terms: "Terms of service",
    privacy: "Privacy policy",
    perMonth: "/ month",
    deposit: "Deposit",
    aboutGoshiwon: "What is a Goshiwon?",
  },
  fr: {
    langLabel: "Français",
    subtitle: "Plateforme de recherche de goshiwon et studios",
    hero1: "Trouvez facilement",
    hero2: "goshiwon & studios",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "Rechercher zone / station / nom",
    allDistricts: "Tous les arrondissements",
    noPriceCap: "Sans plafond de loyer",
    search: "Rechercher",
    listView: "Liste",
    addListing: "Publier",
    verified: "Photos & prix vérifiés",
    reviewDriven: "Basé sur les avis",
    mapSearch: "Recherche carte",
    seeMore: "Voir plus",
    recListings: "Annonces recommandées",
    consult: "Contacter",
    hostTitle: "Pour propriétaires — ajout rapide",
    hostDesc: "Téléversez des photos et renseignez loyer/dépôt/options. Notre équipe vérifie.",
    hostB1: "Boutons Kakao/WhatsApp automatiques",
    hostB2: "Page anglaise auto (étudiants étrangers)",
    hostB3: "Acompte optionnel pour réduire les no-shows",
    contactTitle: "Contactez-nous",
    contactDesc: "Par KakaoTalk ou e-mail. 10:00–19:00 (KST)",
    kakao: "Contacter sur KakaoTalk",
    email: "Envoyer un e-mail",
    footerMission: "Plus de transparence et contrats sécurisés.",
    services: "Services",
    searchListings: "Rechercher",
    registerListing: "Publier",
    reviews: "Avis",
    policy: "Politique",
    terms: "Conditions",
    privacy: "Confidentialité",
    perMonth: "/ mois",
    deposit: "Dépôt",
    aboutGoshiwon: "Qu’est-ce qu’un goshiwon ?",
  },
  de: {
    langLabel: "Deutsch",
    subtitle: "Plattform für Goshiwon & Einzimmer",
    hero1: "Einfach finden",
    hero2: "Goshiwon & Zimmer",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "Suche Bereich / Station / Name",
    allDistricts: "Alle Bezirke",
    noPriceCap: "Keine Preisgrenze",
    search: "Suchen",
    listView: "Liste",
    addListing: "Inserat",
    verified: "Verifizierte Fotos & Preise",
    reviewDriven: "Bewertungsbasiert",
    mapSearch: "Kartensuche",
    seeMore: "Mehr ansehen",
    recListings: "Empfohlene Inserate",
    consult: "Kontakt",
    hostTitle: "Für Vermieter — schnelles Inserat",
    hostDesc: "Fotos hochladen, Miete/Kaution/Optionen eingeben. Team prüft.",
    hostB1: "Kakao/WhatsApp-Buttons automatisch",
    hostB2: "Englische Seite automatisch",
    hostB3: "Optionale Reservierungsanzahlung",
    contactTitle: "Jetzt kontaktieren",
    contactDesc: "Per KakaoTalk oder E-Mail. 10:00–19:00 (KST)",
    kakao: "Auf KakaoTalk verbinden",
    email: "E-Mail senden",
    footerMission: "Transparenz & sichere Verträge.",
    services: "Dienste",
    searchListings: "Suchen",
    registerListing: "Inserat",
    reviews: "Bewertungen",
    policy: "Richtlinien",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutz",
    perMonth: "/ Monat",
    deposit: "Kaution",
    aboutGoshiwon: "Was ist ein Goshiwon?",
  },
  it: {
    langLabel: "Italiano",
    subtitle: "Piattaforma per goshiwon e monolocali",
    hero1: "Trova facilmente",
    hero2: "goshiwon e stanze",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "Cerca area / stazione / nome",
    allDistricts: "Tutti i distretti",
    noPriceCap: "Senza limite di prezzo",
    search: "Cerca",
    listView: "Lista",
    addListing: "Pubblica",
    verified: "Foto e prezzi verificati",
    reviewDriven: "Basato su recensioni",
    mapSearch: "Ricerca mappa",
    seeMore: "Vedi altro",
    recListings: "Annunci consigliati",
    consult: "Contatta",
    hostTitle: "Per host — inserimento rapido",
    hostDesc: "Carica foto, inserisci affitto/cauzione/opzioni. Verifica del team.",
    hostB1: "Pulsanti Kakao/WhatsApp auto",
    hostB2: "Pagina inglese automatica",
    hostB3: "Deposito prenotazione (opzionale)",
    contactTitle: "Contattaci ora",
    contactDesc: "Via KakaoTalk o email. 10:00–19:00 (KST)",
    kakao: "Connetti su KakaoTalk",
    email: "Invia email",
    footerMission: "Più trasparenza e contratti sicuri.",
    services: "Servizi",
    searchListings: "Cerca",
    registerListing: "Pubblica",
    reviews: "Recensioni",
    policy: "Policy",
    terms: "Termini",
    privacy: "Privacy",
    perMonth: "/ mese",
    deposit: "Deposito",
    aboutGoshiwon: "Che cos’è un goshiwon?",
  },
  vi: {
    langLabel: "Tiếng Việt",
    subtitle: "Nền tảng tìm phòng goshiwon & one-room",
    hero1: "Tìm phòng dễ dàng",
    hero2: "goshiwon & one-room",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "Tìm khu vực / ga / tên",
    allDistricts: "Tất cả quận",
    noPriceCap: "Không giới hạn giá",
    search: "Tìm kiếm",
    listView: "Danh sách",
    addListing: "Đăng phòng",
    verified: "Ảnh & giá đã xác minh",
    reviewDriven: "Dựa trên đánh giá",
    mapSearch: "Tìm trên bản đồ",
    seeMore: "Xem thêm",
    recListings: "Phòng gợi ý",
    consult: "Liên hệ",
    hostTitle: "Dành cho chủ phòng — đăng nhanh",
    hostDesc: "Tải ảnh, nhập giá/cọc/tùy chọn. Đội ngũ xác minh.",
    hostB1: "Nút Kakao/WhatsApp tự động",
    hostB2: "Trang tiếng Anh tự động",
    hostB3: "Đặt cọc giữ chỗ (tùy chọn)",
    contactTitle: "Liên hệ ngay",
    contactDesc: "KakaoTalk hoặc email. 10:00–19:00 (KST)",
    kakao: "Kết nối KakaoTalk",
    email: "Gửi email",
    footerMission: "Tăng minh bạch & hợp đồng an toàn.",
    services: "Dịch vụ",
    searchListings: "Tìm phòng",
    registerListing: "Đăng phòng",
    reviews: "Đánh giá",
    policy: "Chính sách",
    terms: "Điều khoản",
    privacy: "Quyền riêng tư",
    perMonth: "/ tháng",
    deposit: "Đặt cọc",
    aboutGoshiwon: "Goshiwon là gì?",
  },
  th: {
    langLabel: "ไทย",
    subtitle: "แพลตฟอร์มห้องพัก goshiwon & one-room",
    hero1: "ค้นหาห้องได้ง่าย",
    hero2: "โก시วอน & วันรูม",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "ค้นหา พื้นที่ / สถานี / ชื่อ",
    allDistricts: "ทุกเขต",
    noPriceCap: "ไม่จำกัดราคา",
    search: "ค้นหา",
    listView: "รายการ",
    addListing: "ลงประกาศ",
    verified: "รูป & ราคายืนยันแล้ว",
    reviewDriven: "อิงรีวิว",
    mapSearch: "ค้นหาบนแผนที่",
    seeMore: "ดูเพิ่มเติม",
    recListings: "รายการแนะนำ",
    consult: "ติดต่อ",
    hostTitle: "สำหรับเจ้าของ — ลงประกาศเร็ว",
    hostDesc: "อัปโหลดรูป กรอกราคา/มัดจำ/ตัวเลือก ทีมงานตรวจสอบ",
    hostB1: "ปุ่ม Kakao/WhatsApp อัตโนมัติ",
    hostB2: "หน้าภาษาอังกฤษอัตโนมัติ",
    hostB3: "มัดจำจอง (เลือกได้)",
    contactTitle: "ติดต่อเราเลย",
    contactDesc: "ผ่าน KakaoTalk หรืออีเมล 10:00–19:00 (KST)",
    kakao: "เชื่อมต่อ KakaoTalk",
    email: "ส่งอีเมล",
    footerMission: "โปร่งใสและสัญญาที่ปลอดภัย",
    services: "บริการ",
    searchListings: "ค้นหา",
    registerListing: "ลงประกาศ",
    reviews: "รีวิว",
    policy: "นโยบาย",
    terms: "เงื่อนไข",
    privacy: "ความเป็นส่วนตัว",
    perMonth: "/ เดือน",
    deposit: "มัดจำ",
    aboutGoshiwon: "Goshiwon คืออะไร?",
  },
  ja: {
    langLabel: "日本語",
    subtitle: "コシウォン・ワンルーム検索プラットフォーム",
    hero1: "かんたん検索",
    hero2: "コシウォン＆お部屋",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "地域 / 駅 / 建物名で検索",
    allDistricts: "すべての区",
    noPriceCap: "家賃上限なし",
    search: "検索",
    listView: "一覧",
    addListing: "掲載",
    verified: "実写真・価格を検証",
    reviewDriven: "レビュー重視",
    mapSearch: "地図検索",
    seeMore: "もっと見る",
    recListings: "おすすめ物件",
    consult: "相談する",
    hostTitle: "オーナー向け — かんたん掲載",
    hostDesc: "写真をアップ、家賃/保証金/オプションを入力。チームが検証します。",
    hostB1: "Kakao/WhatsApp ボタン自動作成",
    hostB2: "英語ページ自動生成",
    hostB3: "予約金（任意）機能",
    contactTitle: "今すぐお問い合わせ",
    contactDesc: "KakaoTalk / メールに対応 10:00–19:00 (KST)",
    kakao: "KakaoTalk でつながる",
    email: "メールを送る",
    footerMission: "情報の透明性を高め、安全な契約を支援します。",
    services: "サービス",
    searchListings: "検索",
    registerListing: "掲載",
    reviews: "レビュー",
    policy: "ポリシー",
    terms: "利用規約",
    privacy: "プライバシー",
    perMonth: "/ 月",
    deposit: "保証金",
    aboutGoshiwon: "コシウォンとは？",
  },
  zh: {
    langLabel: "中文",
    subtitle: "考試院/單間 住宿搜尋平台",
    hero1: "輕鬆找到",
    hero2: "考試院與單間",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "搜尋 區域 / 車站 / 名稱",
    allDistricts: "所有區",
    noPriceCap: "無價格上限",
    search: "搜尋",
    listView: "列表",
    addListing: "刊登",
    verified: "實拍與價格已驗證",
    reviewDriven: "以評價為主",
    mapSearch: "地圖搜尋",
    seeMore: "查看更多",
    recListings: "推薦房源",
    consult: "聯繫",
    hostTitle: "房東專用 — 快速刊登",
    hostDesc: "上傳照片，輸入月租/押金/選項。團隊驗證。",
    hostB1: "自動 Kakao/WhatsApp 按鈕",
    hostB2: "自動英文頁面",
    hostB3: "可選預約金功能",
    contactTitle: "立即諮詢",
    contactDesc: "KakaoTalk 或電子郵件。10:00–19:00 (KST)",
    kakao: "連結 KakaoTalk",
    email: "發送郵件",
    footerMission: "提升資訊透明與安全合約。",
    services: "服務",
    searchListings: "搜尋",
    registerListing: "刊登",
    reviews: "評價",
    policy: "政策",
    terms: "使用條款",
    privacy: "隱私權",
    perMonth: "/ 月",
    deposit: "押金",
    aboutGoshiwon: "什麼是考試院？",
  },
  ar: {
    langLabel: "العربية",
    subtitle: "منصّة للعثور على غرف غوشيوون وغرف الاستوديو",
    hero1: "ابحث بسهولة عن",
    hero2: "غرف غوشيوون والاستوديو",
    heroSub: "find low deposit rooms in korea.",
    searchPh: "ابحث بالمنطقة / المحطة / الاسم",
    allDistricts: "جميع المناطق",
    noPriceCap: "بدون حد للسعر",
    search: "بحث",
    listView: "قائمة",
    addListing: "أضف إعلانًا",
    verified: "صور وأسعار موثَّقة",
    reviewDriven: "معتمد على المراجعات",
    mapSearch: "بحث بالخريطة",
    seeMore: "المزيد",
    recListings: "عروض مُقترَحة",
    consult: "تواصل",
    hostTitle: "للمالكين — إدراج سريع",
    hostDesc: "ارفع الصور وأدخل الإيجار/التأمين/الخيارات. فريقنا يَتحقَّق.",
    hostB1: "أزرار Kakao/WhatsApp تلقائيًا",
    hostB2: "صفحة إنجليزية تلقائيًا",
    hostB3: "عربون حجز اختياري",
    contactTitle: "تواصل معنا الآن",
    contactDesc: "عبر KakaoTalk أو البريد الإلكتروني. 10:00–19:00 (KST)",
    kakao: "اتصل عبر KakaoTalk",
    email: "إرسال بريد",
    footerMission: "نعزّز الشفافية وندعم العقود الآمنة.",
    services: "الخدمات",
    searchListings: "البحث",
    registerListing: "إدراج",
    reviews: "المراجعات",
    policy: "السياسات",
    terms: "الشروط",
    privacy: "الخصوصية",
    perMonth: "/ شهر",
    deposit: "تأمين",
    aboutGoshiwon: "ما هو الغوشيوون؟",
  },
};

function useI18n() {
  const [lang, setLang] = useState<keyof typeof I18N>("ko");
  const t = (k: string) => I18N[lang][k] ?? I18N.en[k] ?? k;
  const isRTL = lang === "ar";
  return { lang, setLang, t, isRTL };
}

export default function Page() {
  const { lang, setLang, t, isRTL } = useI18n();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);

  const listings = useMemo(() => {
    return sampleListings.filter((l) => {
      const text = `${l.title_ko} ${l.title_en} ${l.district} ${l.city}`.toLowerCase();
      const hit = text.includes(query.toLowerCase());
      const area = district ? l.district === district : true;
      const priceOk = maxPrice ? l.priceKRW <= maxPrice : true;
      return hit && area && priceOk;
    });
  }, [query, district, maxPrice]);

  const languages = [
    { code: "ko", label: I18N.ko.langLabel },
    { code: "en", label: I18N.en.langLabel },
    { code: "fr", label: I18N.fr.langLabel },
    { code: "de", label: I18N.de.langLabel },
    { code: "it", label: I18N.it.langLabel },
    { code: "vi", label: I18N.vi.langLabel },
    { code: "th", label: I18N.th.langLabel },
    { code: "ja", label: I18N.ja.langLabel },
    { code: "zh", label: I18N.zh.langLabel },
    { code: "ar", label: I18N.ar.langLabel },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center"><Home className="h-5 w-5"/></div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg">{lang === "ko" ? "룸파인더" : "Roomfinder Korea"}</div>
              <div className="text-xs text-slate-500">{t("subtitle")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                className="appearance-none rounded-xl border px-3 py-2 text-sm pr-8 bg-white"
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                aria-label="language selector"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
              <Globe2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
            </div>
            <a href="#list" className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50">{t("listView")}</a>
            <a href="#host" className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50">{t("addListing")}</a>
            <a href="/goshiwon" className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm">{t("aboutGoshiwon")}</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t("hero1")} <span className="text-slate-500">{t("hero2")}</span>
          </h1>
          <p className="mt-4 text-slate-600">{t("heroSub")}</p>

          {/* Search Bar */}
          <div className="mt-6 rounded-2xl border bg-white p-3 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
                <input
                  className="w-full rounded-xl border px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder={t("searchPh")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select
                className="rounded-xl border px-3 py-2 text-sm"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">{t("allDistricts")}</option>
                {Array.from(new Set(sampleListings.map((l) => l.district))).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                className="rounded-xl border px-3 py-2 text-sm"
                value={String(maxPrice)}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              >
                <option value="0">{t("noPriceCap")}</option>
                {[300000, 400000, 500000, 600000].map((p) => (
                  <option key={p} value={p}>~ ₩{formatKRW(p)}</option>
                ))}
              </select>
              <a href="#list" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-white text-sm">
                {t("search")}
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> {t("verified")}</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4"/> {t("reviewDriven")}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {t("mapSearch")}</div>
          </div>
        </motion.div>

        {/* Preview Card */}
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <div className="rounded-3xl overflow-hidden shadow-xl border bg-white">
            <img src={sampleListings[0].cover} alt="cover" className="h-56 w-full object-cover"/>
            <div className="p-5">
              <div className="text-xs text-slate-500 flex items-center gap-2"><MapPin className="h-3 w-3"/> {sampleListings[0].city} · {sampleListings[0].district}</div>
              <h3 className="mt-1 font-bold text-lg">{sampleListings[0].title_ko}</h3>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-slate-700">₩{formatKRW(sampleListings[0].priceKRW)} <span className="text-slate-400 text-sm">{t("perMonth")}</span></div>
                <div className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-current"/> <span className="text-slate-700">{sampleListings[0].rating}</span> <span className="text-slate-400">({sampleListings[0].reviews})</span></div>
              </div>
              <a href="#list" className="mt-4 inline-flex items-center gap-1 text-slate-900 font-semibold">{t("seeMore")} <ChevronRight className="h-4 w-4"/></a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Listings */}
      <section id="list" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold">{t("recListings")}</h2>
          <a href="#host" className="text-sm text-slate-600 hover:text-slate-900">{t("registerListing")} →</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <div key={l.id} className="group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
              <div className="relative">
                <img src={l.cover} alt="room" className="h-44 w-full object-cover group-hover:scale-[1.02] transition"/>
                <div className="absolute left-3 top-3 text-xs bg-white/90 rounded-full px-2 py-1">{l.availability}</div>
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3"/> {l.city} · {l.district}</div>
                <div className="font-bold mt-1">{l.title_ko}</div>
                <div className="mt-1 text-slate-700">₩{formatKRW(l.priceKRW)} <span className="text-slate-400 text-sm">{t("perMonth")}</span> <span className="ml-2 text-xs text-slate-500">{t("deposit")} ₩{formatKRW(l.depositKRW)}</span></div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {l.tags.slice(0,3).map((t) => (
                    <span key={t} className="text-xs rounded-full bg-slate-100 px-2 py-1">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-current"/> <span className="text-slate-700 text-sm">{l.rating}</span> <span className="text-slate-400 text-xs">({l.reviews})</span></div>
                  <a href="#contact" className="inline-flex items-center gap-1 text-sm text-slate-900">{t("consult")} <MessageCircle className="h-4 w-4"/></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Host CTA */}
      <section id="host" className="bg-white border-y">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-extrabold">{t("hostTitle")}</h3>
            <p className="mt-2 text-slate-600">{t("hostDesc")}</p>
            <ul className="mt-4 space-y-2 text-slate-700 text-sm list-disc pl-5">
              <li>{t("hostB1")}</li>
              <li>{t("hostB2")}</li>
              <li>{t("hostB3")}</li>
            </ul>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white"><Phone className="h-4 w-4"/> {t("consult")}</a>
          </div>
          <div className="rounded-3xl border bg-slate-50 p-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2">매물명<input className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="예: 신림역 도보 3분 · 레지던스 채움"/></label>
              <label>월세<input className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="예: 49만"/></label>
              <label>보증금<input className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="예: 30만"/></label>
              <label className="col-span-2">옵션<textarea className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="Wi-Fi, 세탁기, 개별욕실 등"/></label>
              <button className="col-span-2 rounded-xl bg-slate-900 text-white px-4 py-2">임시 저장</button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-xl font-extrabold mb-4">{t("reviews")}</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {[{
            name:"민수", msg:"가격이 투명해서 사기 걱정 없이 계약했습니다.", rating:5
          },{
            name:"Anna", msg:"English page helped a lot, quick replies!", rating:5
          },{
            name:"Yuki", msg:"写真が実際と同じで安心でした。", rating:5
          }].map((r, i) => (
            <div key={i} className="rounded-3xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.name}</div>
                <div className="flex gap-1 text-amber-500">{Array.from({length:r.rating}).map((_,i)=>(<Star key={i} className="h-4 w-4 fill-current"/>))}</div>
              </div>
              <p className="mt-2 text-slate-600">{r.msg}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-12 text-white grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-extrabold">{t("contactTitle")}</h3>
            <p className="mt-2 text-slate-300">{t("contactDesc")}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm" href="#">{t("kakao")}</a>
              <a className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm" href="#">{t("email")}</a>
            </div>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2">이름<input className="mt-1 w-full rounded-xl border px-3 py-2 bg-white text-slate-900"/></label>
              <label>연락처<input className="mt-1 w-full rounded-xl border px-3 py-2 bg-white text-slate-900"/></label>
              <label className="col-span-2">문의내용<textarea className="mt-1 w-full rounded-xl border px-3 py-2 bg-white text-slate-900" placeholder="원룸 등록/방 구하기/제휴 문의 등"/></label>
              <button className="col-span-2 rounded-xl bg-white text-slate-900 px-4 py-2">문의 보내기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-extrabold text-slate-900">{lang === "ko" ? "룸파인더" : "Roomfinder Korea"}</div>
            <p className="mt-2">{t("footerMission")}</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">{t("services")}</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#list" className="hover:text-slate-900">{t("searchListings")}</a></li>
              <li><a href="#host" className="hover:text-slate-900">{t("registerListing")}</a></li>
              <li><a href="#reviews" className="hover:text-slate-900">{t("reviews")}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900">{t("policy")}</div>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-slate-900" href="#">{t("terms")}</a></li>
              <li><a className="hover:text-slate-900" href="#">{t("privacy")}</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-400 pb-6">© {new Date().getFullYear()} {lang === "ko" ? "룸파인더" : "Roomfinder Korea"}. All rights reserved.</div>
      </footer>
    </div>
  );
}
