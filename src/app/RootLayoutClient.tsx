"use client";

import React from 'react';
import Header from '@/src/components/layout/Header';
import SubToolbar from '@/src/components/layout/SubToolbar';
import ReduxProvider from '@/src/lib/redux/provider';

const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <SubToolbar />
        <main className="flex-1 p-8 bg-neutral-50">
          {children}
        </main>
      </div>
    </ReduxProvider>
  );
};

export default RootLayoutClient;
