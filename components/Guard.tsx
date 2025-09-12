// components/Guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 확인
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function run() {
      const { data } = await supabase.auth.getSession();

      // ✅ /admin 경로일 때만 로그인 체크
      if (pathname.startsWith("/admin") && !data.session) {
        router.replace("/admin/login");
      } else {
        setChecking(false);
      }
    }
    run();
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}
