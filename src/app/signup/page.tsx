// app/auth/page.tsx
'use client';

import AuthForms from '@/components/ui/signup';

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForms />
    </main>
  );
}