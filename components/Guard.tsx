// components/Guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function run() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      } else {
        router.replace("/admin/login");
      }
      setChecking(false);
    }
    run();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Checking session...
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // 로그인 안됐을 땐 아무것도 안 보여줌
  }

  return <>{children}</>;
}


