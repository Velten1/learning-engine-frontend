'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TokenRenewer from './TokenRenewer';

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  showNavbar = true,
  showFooter = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TokenRenewer />
      {showNavbar && <Navbar />}
      <main className={`flex-1 ${showNavbar ? 'pt-16' : ''}`}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

