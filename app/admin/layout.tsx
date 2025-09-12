// app/admin/layout.tsx
"use client";

import React from "react";
import Guard from "@/components/Guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // /admin 아래에서만 인증 가드가 동작하도록 레이아웃에서 감쌈
  return <Guard>{children}</Guard>;
}
