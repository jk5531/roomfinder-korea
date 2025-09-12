"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, ShieldCheck, Star, MessageCircle, Phone, Globe2, ChevronRight } from "lucide-react";
import Link from "next/link";

// 샘플 매물 데이터
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
  }
];

function formatKRW(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function Page() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <Home className="h-5 w-5"/>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg">StayFinder</div>
              <div className="text-xs text-slate-500">고시원·원룸 스테이 플랫폼</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 언어 선택 */}
            <div className="relative">
              <select className="appearance-none rounded-xl border px-3 py-2 text-sm pr-8 bg-white">
                <option>한국어</option>
                <option>English</option>
              </select>
              <Globe2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
            </div>

            {/* 👇 관리자 로그인 버튼 추가 */}
            <Link
              href="/admin/login"
              className="px-3 py-2 rounded-xl border text-sm hover:bg-slate-50"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            외국인도 쉽게 찾는 <span className="text-slate-500">고시원·원룸</span>
          </h1>
          <p className="mt-4 text-slate-600">가격 투명, 실사진 검증, 빠른 상담까지 — 지금 바로 확인하세요.</p>

          {/* Search Bar */}
          <div className="mt-6 rounded-2xl border bg-white p-3 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
                <input
                  className="w-full rounded-xl border px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="지역·역·건물명 검색 (예: 신림, 종로)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select
                className="rounded-xl border px-3 py-2 text-sm"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">전체 구</option>
                {Array.from(new Set(sampleListings.map((l) => l.district))).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                className="rounded-xl border px-3 py-2 text-sm"
                value={String(maxPrice)}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              >
                <option value="0">월세 상한 없음</option>
                {[300000, 400000, 500000, 600000].map((p) => (
                  <option key={p} value={p}>~ ₩{formatKRW(p)}</option>
                ))}
              </select>
              <a href="#list" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-white text-sm">
                검색
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> 실사진·가격 검증</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4"/> 후기 기반 신뢰</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> 지도 탐색</div>
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
                <div className="text-slate-700">₩{formatKRW(sampleListings[0].priceKRW)} <span className="text-slate-400 text-sm">/ 월</span></div>
                <div className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-current"/> <span className="text-slate-700">{sampleListings[0].rating}</span> <span className="text-slate-400">({sampleListings[0].reviews})</span></div>
              </div>
              <a href="#list" className="mt-4 inline-flex items-center gap-1 text-slate-900 font-semibold">더 보기 <ChevronRight className="h-4 w-4"/></a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
