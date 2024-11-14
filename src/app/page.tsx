// app/page.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import your FoodDeliveryPlatform component
const FoodDeliveryPlatform = dynamic(
  () => import('@/components/ui/coffeedeliveryplatform'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <FoodDeliveryPlatform />
    </main>
  );
}