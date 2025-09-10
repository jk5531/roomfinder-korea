'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.replace('/admin/login');
      const email = user.email ?? '';
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (adminEmail && email.toLowerCase() !== adminEmail.toLowerCase()) {
        return router.replace('/admin/login');
      }
      setOk(true);
    };
    run();
  }, [router]);

  if (ok === null) return <div className="container py-20">Loading…</div>;
  return <>{children}</>;
}
