'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setErr(error.message); return; }
    router.replace('/admin');
  };

  return (
    <main className="container py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-6">관리자 로그인</h1>
      <form onSubmit={onSubmit} className="space-y-4 card p-6">
        <div>
          <label className="label">이메일</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label">비밀번호</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="btn" type="submit">로그인</button>
      </form>
    </main>
  );
}
