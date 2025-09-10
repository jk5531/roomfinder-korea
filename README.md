# Roomfinder Korea (Next.js + Supabase Admin)

## 1) 환경변수 설정
`.env` 파일을 만들고 아래 값 채우세요 (.env.example 참고)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_ADMIN_EMAIL=...  # 관리자 이메일 한 명
```

## 2) Supabase 테이블
SQL 에디터에서 아래 실행:

```sql
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  title text not null,
  price integer not null,
  location text not null,
  owner uuid references auth.users(id)
);

-- RLS
alter table public.listings enable row level security;

-- 정책: 로그인한 사용자는 모두 읽기 가능
create policy "read_all" on public.listings for select using (true);

-- 정책: 관리자만 쓰기 가능 (email 비교)
create or replace function auth.email() returns text language sql stable as $$
  select coalesce((auth.jwt() ->> 'email')::text, ''::text);
$$;

create policy "admin_can_write"
on public.listings for all
using ( auth.email() = current_setting('request.jwt.claims', true)::json->>'email' )
with check ( auth.email() = current_setting('request.jwt.claims', true)::json->>'email' );
```

간단히 하려면 RLS를 잠깐 꺼도 됩니다 (개발용): `alter table public.listings disable row level security;`

## 3) 개발
```
npm i
npm run dev
```

## 4) 배포(Vercel)
- GitHub에 업로드 → Vercel 연결
- 환경변수 3개를 Vercel Project → Settings → Environment Variables에 추가
```
