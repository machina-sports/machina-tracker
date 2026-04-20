"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import SubToolbar from '@/components/layout/SubToolbar';

const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <SubToolbar />
      <main className="flex-1 p-8 bg-neutral-50">
        {children}
      </main>
    </div>
  );
};

export default RootLayoutClient;
