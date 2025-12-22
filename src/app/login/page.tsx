'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Layout from '@/components/Layout';
import { AuthService } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await AuthService.login(formData);

    if (result.success) {
      // Forçar atualização da Navbar
      window.location.href = '/';
    } else {
      setError(result.error || 'Erro ao fazer login');
    }

    setIsLoading(false);
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md fade-in">
          <Card className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                Bem-vindo de volta
              </h1>
              <p className="text-[#64748b] dark:text-[#94a3b8]">
                Entre na sua conta para continuar aprendendo
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />

              <Input
                type="password"
                name="password"
                label="Senha"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-[#e2e8f0] text-[#0369a1] focus:ring-[#0369a1]"
                    disabled={isLoading}
                  />
                  <span className="text-[#64748b] dark:text-[#94a3b8]">Lembrar-me</span>
                </label>
                <Link
                  href="#"
                  className="text-[#0369a1] hover:text-[#0284c7] transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-[#64748b] dark:text-[#94a3b8]">
              Não tem uma conta?{' '}
              <Link
                href="/register"
                className="text-[#0369a1] hover:text-[#0284c7] font-medium transition-colors"
              >
                Registrar-se
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
