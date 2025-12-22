'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { AuthService } from '@/services/authService';
import type { User } from '@/api/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoadingProfile(true);
    setError(null);

    const result = await AuthService.getProfile();

    if (result.success && result.data) {
      setUser(result.data);
      setFormData({
        name: result.data.name || '',
        email: result.data.email || '',
      });
    } else {
      setError(result.error || 'Erro ao carregar perfil');
      if (result.error?.includes('login') || result.error?.includes('Token')) {
        router.push('/login');
      }
    }

    setIsLoadingProfile(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // Preparar dados para atualização (apenas campos que mudaram)
    const dataToUpdate: { name?: string; email?: string } = {};

    if (formData.name !== user?.name) {
      dataToUpdate.name = formData.name;
    }

    if (formData.email !== user?.email) {
      dataToUpdate.email = formData.email;
    }

    // Verificar se há algo para atualizar
    if (Object.keys(dataToUpdate).length === 0) {
      setError('Nenhuma alteração foi feita');
      setIsLoading(false);
      return;
    }

    const result = await AuthService.updateProfile(dataToUpdate);

    if (result.success && result.data) {
      setUser(result.data);
      setSuccess(result.message || 'Perfil atualizado com sucesso');
      // Atualizar formData com os novos dados
      setFormData({
        name: result.data.name || '',
        email: result.data.email || '',
      });
    } else {
      setError(result.error || 'Erro ao atualizar perfil');
    }

    setIsLoading(false);
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <p className="text-[#64748b]">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto fade-in">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">Meu Perfil</h1>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8]">
              Gerencie suas informações pessoais
            </p>
          </div>

          {/* Profile Card */}
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
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

              {/* Email */}
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

              {/* User Info */}
              {user && (
                <div className="pt-4 border-t border-white/20 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748b] dark:text-[#94a3b8]">ID do usuário:</span>
                    <span className="text-[#0f172a] dark:text-[#f1f5f9] font-mono text-xs">
                      {user.id}
                    </span>
                  </div>
                  {user.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-[#64748b] dark:text-[#94a3b8]">Membro desde:</span>
                      <span className="text-[#0f172a] dark:text-[#f1f5f9]">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar alterações'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

