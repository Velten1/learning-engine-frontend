import { apiRequest, setAuthToken, removeAuthToken } from './config';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message?: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

// Registrar novo usuário
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.data?.token) {
    setAuthToken(response.data.token);
  }

  return response;
}

// Fazer login
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.data?.token) {
    setAuthToken(response.data.token);
  }

  return response;
}

// Fazer logout
export async function logout(): Promise<void> {
  try {
    // Chamar API para limpar cookie no backend
    await apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    // Mesmo se houver erro na API, remover token do localStorage
    console.error('Erro ao fazer logout na API:', error);
  } finally {
    // Sempre remover token do localStorage
  removeAuthToken();
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileResponse {
  status: number;
  data?: User;
  message?: string;
}

// Obter perfil do usuário
export async function getUserProfile(): Promise<UserProfileResponse> {
  return apiRequest<UserProfileResponse>('/api/auth/me', {
    method: 'GET',
  });
}

// Atualizar perfil do usuário
export async function updateUserProfile(
  data: Partial<{ name: string; email: string }>
): Promise<UserProfileResponse> {
  return apiRequest<UserProfileResponse>('/api/auth/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export interface RenewTokenResponse {
  status: number;
  data?: {
    token: string;
  };
  message?: string;
}

// Renovar token
export async function renewToken(): Promise<RenewTokenResponse> {
  const response = await apiRequest<RenewTokenResponse>('/api/auth/renew-token', {
    method: 'POST',
  });

  if (response.data?.token) {
    setAuthToken(response.data.token);
  }

  return response;
}

