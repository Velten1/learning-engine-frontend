'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, removeAuthToken } from '@/api/config';
import { AuthService } from '@/services/authService';
import ThemeToggle from '@/components/ThemeToggle';
import LogoutModal from '@/components/LogoutModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(isAuthenticated());
    
    // Listener para atualizar quando o storage mudar (login/logout em outra aba)
    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Verificar periodicamente (para atualizar após login na mesma aba)
    const interval = setInterval(() => {
      setIsLoggedIn(isAuthenticated());
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    const result = await AuthService.logout();
    if (result.success) {
    setIsLoggedIn(false);
    router.push('/');
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const navItems = [
    { href: '/', label: 'Pomodoro' },
    { href: '/history', label: 'Histórico' },
    { href: '/revisoes', label: 'Revisões' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-white/20 dark:border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0369a1] to-[#0284c7] flex items-center justify-center">
              <span className="text-white font-bold text-sm">LE</span>
            </div>
            <span className="text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
              Learning Engine
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                  className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(item.href)
                      ? 'bg-[#0369a1]/10 dark:bg-[#0369a1]/20 text-[#0369a1] dark:text-[#7dd3fc]'
                      : 'text-[#475569] dark:text-[#cbd5e1] hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-[#0369a1] dark:hover:text-[#7dd3fc]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive('/profile')
                        ? 'bg-[#0369a1]/10 dark:bg-[#0369a1]/20 text-[#0369a1] dark:text-[#7dd3fc]'
                        : 'text-[#475569] dark:text-[#cbd5e1] hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-[#0369a1] dark:hover:text-[#7dd3fc]'
                    }
                  `}
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-[#475569] dark:text-[#cbd5e1] hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-[#0369a1] dark:hover:text-[#7dd3fc]"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive('/login')
                        ? 'bg-[#0369a1]/10 dark:bg-[#0369a1]/20 text-[#0369a1] dark:text-[#7dd3fc]'
                        : 'text-[#475569] dark:text-[#cbd5e1] hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-[#0369a1] dark:hover:text-[#7dd3fc]'
                    }
                  `}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive('/register')
                        ? 'bg-[#0369a1] text-white'
                        : 'bg-[#0369a1] text-white hover:bg-[#0284c7]'
                    }
                  `}
                >
                  Registrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Modal - renderizado via portal para aparecer acima de tudo */}
      {mounted && typeof window !== 'undefined' && createPortal(
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={handleCancelLogout}
          onConfirm={handleConfirmLogout}
        />,
        document.body
      )}
    </nav>
  );
}

