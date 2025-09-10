'use client';
import Guard from '@/components/Guard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Listing = {
  id: string;
  title: string;
  price: number;
  location: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (!error && data) setListings(data as Listing[]);
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null);
    const { error } = await supabase.from('listings').insert({ title, price, location });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    setTitle(''); setPrice(0); setLocation('');
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('삭제할까요?')) return;
    await supabase.from('listings').delete().eq('id', id);
    load();
  };

  return (
    <Guard>
      <main className="container py-10 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">관리자 대시보드</h1>
          <button className="btn" onClick={async ()=>{ await supabase.auth.signOut(); location.href='/admin/login'; }}>로그아웃</button>
        </header>

        <section className="card p-6">
          <h2 className="font-semibold mb-4">매물 추가</h2>
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="input" placeholder="제목" value={title} onChange={e=>setTitle(e.target.value)} required />
            <input className="input" placeholder="가격" type="number" value={price} onChange={e=>setPrice(parseInt(e.target.value || '0'))} required />
            <input className="input" placeholder="지역" value={location} onChange={e=>setLocation(e.target.value)} required />
            <div>
              <button className="btn" disabled={loading} type="submit">{loading?'저장 중…':'추가'}</button>
              {err && <span className="text-red-600 text-sm ml-3">{err}</span>}
            </div>
          </form>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">매물 목록</h2>
          {listings.map(l => (
            <div key={l.id} className="card p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{l.title}</div>
                <div className="text-sm text-gray-600">{l.location} • {new Intl.NumberFormat().format(l.price)}원</div>
              </div>
              <button className="btn" onClick={()=>remove(l.id)}>삭제</button>
            </div>
          ))}
          {listings.length === 0 && <p className="text-gray-500">등록된 매물이 없습니다.</p>}
        </section>
      </main>
    </Guard>
  );
}
