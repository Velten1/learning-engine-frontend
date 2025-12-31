'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Layout from '@/components/Layout';
import { AuthService } from '@/services/authService';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
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

    const result = await AuthService.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      // Após registro, fazer login automático se houver token
      // Se não houver token, redirecionar para login
      if (result.data?.token) {
        window.location.href = '/';
      } else {
        router.push('/login');
      }
    } else {
      setError(result.error || 'Erro ao criar conta');
    }

    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md fade-in">
          <Card className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                Criar conta
              </h1>
              <p className="text-[#64748b] dark:text-[#94a3b8]">
                Comece sua jornada de aprendizado hoje
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
                type="text"
                name="name"
                label="Nome completo"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />

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

              <div className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                Ao criar uma conta, você concorda com nossos{' '}
                <Link href="#" className="text-[#0369a1] hover:underline">
                  Termos de Serviço
                </Link>{' '}
                e{' '}
                <Link href="#" className="text-[#0369a1] hover:underline">
                  Política de Privacidade
                </Link>
                .
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-[#64748b]">
              Já tem uma conta?{' '}
              <Link
                href="/login"
                className="text-[#0369a1] hover:text-[#0284c7] font-medium transition-colors"
              >
                Entrar
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
