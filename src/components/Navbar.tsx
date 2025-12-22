'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, removeAuthToken } from '@/api/config';
import { AuthService } from '@/services/authService';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    router.push('/');
  };

  const navItems = [
    { href: '/', label: 'Pomodoro' },
    { href: '/dashboard', label: 'Histórico' },
    { href: '/reflection', label: 'Estudo' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0369a1] to-[#0284c7] flex items-center justify-center">
              <span className="text-white font-bold text-sm">LE</span>
            </div>
            <span className="text-lg font-semibold text-[#0f172a]">
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
                      ? 'bg-[#0369a1]/10 text-[#0369a1]'
                      : 'text-[#475569] hover:bg-white/50 hover:text-[#0369a1]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive('/profile')
                        ? 'bg-[#0369a1]/10 text-[#0369a1]'
                        : 'text-[#475569] hover:bg-white/50 hover:text-[#0369a1]'
                    }
                  `}
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-[#475569] hover:bg-white/50 hover:text-[#0369a1]"
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
                        ? 'bg-[#0369a1]/10 text-[#0369a1]'
                        : 'text-[#475569] hover:bg-white/50 hover:text-[#0369a1]'
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
    </nav>
  );
}

