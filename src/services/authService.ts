import * as authApi from '@/api/auth';
import { RegisterData, LoginData } from '@/api/auth';

export class AuthService {
  static async register(data: RegisterData) {
    try {
      const response = await authApi.register(data);
      return {
        success: true,
        data: response.data,
        message: response.message || 'Usuário registrado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao registrar',
      };
    }
  }

  static async login(data: LoginData) {
    try {
      const response = await authApi.login(data);
      return {
        success: true,
        data: response.data,
        message: 'Login realizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      };
    }
  }

  static logout() {
    authApi.logout();
  }

  static async getProfile() {
    try {
      const response = await authApi.getUserProfile();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter perfil',
      };
    }
  }

  static async updateProfile(data: { name?: string; email?: string }) {
    try {
      const response = await authApi.updateUserProfile(data);
      return {
        success: true,
        data: response.data,
        message: 'Perfil atualizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar perfil',
      };
    }
  }
}

