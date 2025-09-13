// ❌ Guard 넣지 마세요
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.replace("/admin"); // 로그인 성공 → 대시보드로 이동
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={signIn} className="space-y-4 border p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
