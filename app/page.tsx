"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  ShieldCheck,
  Star,
  MessageCircle,
  Phone,
  Globe2,
  ChevronRight,
} from "lucide-react";

// ✅ 샘플 매물 데이터
const sampleListings = [
  {
    id: "L-101",
    title_ko: "신림 도보 3분 · 레지던스 채움",
    title_en: "3min to Sillim Station · Luen Residence",
    district: "관악구",
    city: "Seoul",
    priceKRW: 490000,
    depositKRW: 300000,
    tags: ["개인실", "개별욕실", "여성전용"],
    rating: 4.7,
    reviews: 128,
    cover:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
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
    cover:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d51?q=80&w=1600&auto=format&fit=crop",
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
    cover:
      "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop",
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
    hostDesc:
      "사진 업로드, 가격·보증금·옵션만 입력하면 끝. 검수팀이 실사진/가격을 확인해 신뢰도를 보장합니다.",
    hostB1: "카카오톡/WhatsApp 실시간 문의 버튼 자동 생성",
    hostB2: "영문 페이지 자동 생성 (외국인 유학생 타깃)",
    hostB3: "노쇼 방지를 위한 예약금(선택) 기능",
    contactTitle: "바로 상담 받아보세요",
    contactDesc:
      "카카오톡/이메일 중 편한 채널로 연결해드립니다. 운영시간 10:00–19:00 (KST)",
    kakao: "카카오톡 연결",
    email: "이메일 보내기",
    footerMission:
      "고시원·원룸 정보의 투명성을 높이고, 안전한 계약을 돕습니다.",
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
    hostDesc:
      "Upload photos and enter rent/deposit/options. Our team verifies photos & prices for trust.",
    hostB1: "Auto KakaoTalk/WhatsApp contact buttons",
    hostB2: "Auto English page (for intl students)",
    hostB3: "Optional reservation deposit to reduce no-shows",
    contactTitle: "Get in touch now",
    contactDesc: "We connect via KakaoTalk or email. Hours 10:00–19:00 (KST)",
    kakao: "Connect on KakaoTalk",
    email: "Send email",
    footerMission:
      "We increase transparency for room info and support safe contracts.",
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
  // ⚠️ 나머지 (fr, de, it, vi, th, ja, zh, ar)도 동일하게 추가 가능
};

function useI18n() {
  const [lang, setLang] = useState<keyof typeof I18N>("ko");
  const t = (k: string) => I18N[lang][k] ?? I18N.en[k] ?? k;
  return { lang, setLang, t };
}

export default function Page() {
  const { lang, setLang, t } = useI18n();
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
    // 👉 여기 나머지 언어들 추가
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <Home className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg">
                {lang === "ko" ? "룸파인더" : "Roomfinder Korea"}
              </div>
              <div className="text-xs text-slate-500">{t("subtitle")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* 언어 선택 */}
            <div className="relative">
              <select
                className="appearance-none rounded-xl border px-3 py-2 text-sm pr-8 bg-white"
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
              <Globe2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            {/* 메뉴 버튼들 */}
            <a
              href="#list"
              className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50"
            >
              {t("listView")}
            </a>
            <a
              href="#host"
              className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50"
            >
              {t("addListing")}
            </a>
            <a
              href="/goshiwon"
              className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm"
            >
              {t("aboutGoshiwon")}
            </a>
            <a
              href="/admin/login"
              className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50"
            >
              Admin Login
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t("hero1")} <span className="text-slate-500">{t("hero2")}</span>
          </h1>
          <p className="mt-4 text-slate-600">{t("heroSub")}</p>
        </motion.div>
      </section>

      {/* Listings */}
      <section id="list" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold">{t("recListings")}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <div
              key={l.id}
              className="group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative">
                <img
                  src={l.cover}
                  alt="room"
                  className="h-44 w-full object-cover group-hover:scale-[1.02] transition"
                />
                <div className="absolute left-3 top-3 text-xs bg-white/90 rounded-full px-2 py-1">
                  {l.availability}
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {l.city} · {l.district}
                </div>
                <div className="font-bold mt-1">{l.title_ko}</div>
                <div className="mt-1 text-slate-700">
                  ₩{formatKRW(l.priceKRW)}{" "}
                  <span className="text-slate-400 text-sm">{t("perMonth")}</span>
                  <span className="ml-2 text-xs text-slate-500">
                    {t("deposit")} ₩{formatKRW(l.depositKRW)}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {l.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full bg-slate-100 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />{" "}
                    <span className="text-slate-700 text-sm">{l.rating}</span>{" "}
                    <span className="text-slate-400 text-xs">
                      ({l.reviews})
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm text-slate-900"
                  >
                    {t("consult")} <MessageCircle className="h-4 w-4" />
                  </a>
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
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white"
            >
              <Phone className="h-4 w-4" /> {t("consult")}
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-xl font-extrabold mb-4">{t("reviews")}</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {[
            {
              name: "민수",
              msg: "가격이 투명해서 사기 걱정 없이 계약했습니다.",
              rating: 5,
            },
            {
              name: "Anna",
              msg: "English page helped a lot, quick replies!",
              rating: 5,
            },
            {
              name: "Yuki",
              msg: "写真が実際と同じで安心でした。",
              rating: 5,
            },
          ].map((r, i) => (
            <div key={i} className="rounded-3xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.name}</div>
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
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
              <a
                className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm"
                href="#"
              >
                {t("kakao")}
              </a>
              <a
                className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm"
                href="#"
              >
                {t("email")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-extrabold text-slate-900">
              {lang === "ko" ? "룸파인더" : "Roomfinder Korea"}
            </div>
            <p className="mt-2">{t("footerMission")}</p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">{t("services")}</div>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#list" className="hover:text-slate-900">
                  {t("searchListings")}
                </a>
              </li>
              <li>
                <a href="#host" className="hover:text-slate-900">
                  {t("registerListing")}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-slate-900">
                  {t("reviews")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-900">{t("policy")}</div>
            <ul className="mt-2 space-y-1">
              <li>
                <a className="hover:text-slate-900" href="#">
                  {t("terms")}
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900" href="#">
                  {t("privacy")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-400 pb-6">
          © {new Date().getFullYear()}{" "}
          {lang === "ko" ? "룸파인더" : "Roomfinder Korea"}. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
