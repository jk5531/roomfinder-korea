// app/goshiwon/page.tsx
import React from "react";
import { Home, ArrowLeft, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";

export default function GoshiwonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <Home className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg">Roomfinder Korea</div>
              <div className="text-xs text-slate-500">What is a Goshiwon?</div>
            </div>
          </div>
          <a href="/" className="text-sm rounded-xl border px-3 py-2 hover:bg-slate-50 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </a>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">What is a Goshiwon?</h1>
        <p className="mt-4 text-slate-600">
          A <b>Goshiwon</b> (고시원) is a very small, private room commonly found in Korea, popular among students and budget travelers.
          It’s similar to a micro-studio: a private room with a bed, desk, and storage. Bathrooms can be private or shared, depending on the building.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-5">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Typical Features
            </h2>
            <ul className="mt-3 text-sm list-disc pl-5 space-y-2 text-slate-700">
              <li>Private room (bed, desk, closet/storage)</li>
              <li>Shared or private bathroom (varies)</li>
              <li>High-speed Wi-Fi, air-conditioning, heating</li>
              <li>Kitchen or pantry (shared), free rice/ramen in some places</li>
              <li>Security: CCTV, digital door locks</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-sky-600" /> Locations & Price
            </h2>
            <ul className="mt-3 text-sm list-disc pl-5 space-y-2 text-slate-700">
              <li>Found near universities, city centers, and subway stations</li>
              <li><b>Low deposit</b> (often ₩0–500,000) and monthly rent varies by area</li>
              <li>Room size is small; premium rooms may include private bath & window</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" /> Tips to Choose Safely
          </h2>
          <ul className="mt-3 text-sm list-disc pl-5 space-y-2 text-slate-700">
            <li>Visit in person or request a real-time video tour</li>
            <li>Check window, ventilation, and noise</li>
            <li>Confirm refund/notice policy and what utilities are included</li>
            <li>Prefer verified photos and recent reviews</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500">
            On Roomfinder Korea, we aim to show verified photos/prices and connect you quickly with the host.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white"
          >
            Browse rooms
          </a>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Roomfinder Korea. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
