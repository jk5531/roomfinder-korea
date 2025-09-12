// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pw,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    if (data.session) {
      router.replace("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Admin Login</h1>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              className="w-full border rounded-lg p-2"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              className="w-full border rounded-lg p-2"
              type="password"
              placeholder="••••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <button
            className="w-full rounded-lg p-2 border bg-black text-white disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
