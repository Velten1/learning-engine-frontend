'use client';

import { useEffect, useRef } from 'react';
import { isAuthenticated } from '@/api/config';
import { renewToken } from '@/api/auth';

/**
 * Componente que renova automaticamente o token a cada 30 minutos
 * quando o usuário está autenticado
 */
export default function TokenRenewer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const renewTokenPeriodically = async () => {
      if (!isAuthenticated()) {
        return;
      }

      try {
        await renewToken();
        console.log('Token renovado com sucesso');
      } catch (error) {
        console.error('Erro ao renovar token:', error);
        // Se houver erro, não fazemos nada - o usuário será deslogado
        // quando tentar fazer uma requisição autenticada
      }
    };

    // Renovar token imediatamente se o usuário estiver autenticado
    if (isAuthenticated()) {
      renewTokenPeriodically();
    }

    // Configurar intervalo para renovar a cada 30 minutos (30 * 60 * 1000 ms)
    intervalRef.current = setInterval(() => {
      if (isAuthenticated()) {
        renewTokenPeriodically();
      }
    }, 30 * 60 * 1000); // 30 minutos

    // Cleanup: limpar intervalo quando o componente for desmontado
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Este componente não renderiza nada
  return null;
}

