// app/admin/page.tsx
"use client";

import Guard from "@/components/Guard";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <Guard>
      <div className="min-h-screen p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button className="border rounded-lg px-3 py-2" onClick={signOut}>
            Sign out
          </button>
        </div>

        <div className="border rounded-2xl p-4">
          <p>Welcome! 여기가 관리자 메인입니다.</p>
        </div>
      </div>
    </Guard>
  );
}
