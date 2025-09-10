// Landing page
'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="container py-16 space-y-8">
      <h1 className="text-3xl font-bold">Roomfinder Korea</h1>
      <p className="text-gray-600">간단한 랜딩 페이지입니다. 관리자는 아래 버튼으로 대시보드로 이동하세요.</p>
      <button className="btn" onClick={()=>router.push('/admin/login')}>관리자 로그인</button>
    </main>
  );
}
