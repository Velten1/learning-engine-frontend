# Learning Engine - Frontend

Frontend da aplicação Learning Engine, uma plataforma moderna para estudos usando a técnica Pomodoro e sistema de revisão espaçada (spaced repetition) inspirado no AnkiApp.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Páginas e Rotas](#-páginas-e-rotas)
- [Componentes](#-componentes)
- [Temas (Dark/Light Mode)](#-temas-darklight-mode)
- [Autenticação](#-autenticação)
- [Desenvolvimento](#-desenvolvimento)

## 🛠 Tecnologias

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **LocalStorage** - Armazenamento local para tokens e preferências

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend da aplicação rodando (veja [README do backend](../backend/README.md))
- Git

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Learning-Engine/frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (veja [Configuração](#-configuração))

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação:
```
http://localhost:3000
```

## ⚙️ Configuração

Crie um arquivo `.env.local` na raiz do diretório `frontend` com as seguintes variáveis:

```env
# URL do backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Exemplo de `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Nota**: O arquivo `.env.local` não deve ser commitado no repositório. Use o arquivo `env.example` como referência.

## 📁 Estrutura do Projeto

```
frontend/
├── public/                 # Arquivos estáticos (imagens, ícones, etc.)
├── src/
│   ├── app/               # Páginas e rotas (Next.js App Router)
│   │   ├── layout.tsx     # Layout raiz
│   │   ├── page.tsx       # Página inicial (Dashboard)
│   │   ├── login/         # Página de login
│   │   ├── register/      # Página de registro
│   │   ├── profile/       # Página de perfil
│   │   ├── history/       # Página de histórico
│   │   ├── reflection/    # Páginas de reflexões
│   │   └── revisoes/      # Páginas de revisões (decks e cards)
│   ├── api/               # Clientes API (chamadas HTTP)
│   │   ├── config.ts      # Configuração base da API
│   │   ├── auth.ts         # Endpoints de autenticação
│   │   ├── pomodoro.ts     # Endpoints de Pomodoro
│   │   ├── deck.ts         # Endpoints de decks
│   │   ├── card.ts         # Endpoints de cards
│   │   ├── review.ts       # Endpoints de revisões
│   │   └── ...
│   ├── services/          # Serviços de negócio (lógica de aplicação)
│   │   ├── authService.ts
│   │   ├── pomodoroService.ts
│   │   ├── deckService.ts
│   │   ├── cardService.ts
│   │   ├── reviewService.ts
│   │   └── ...
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── Layout.tsx      # Layout principal (Navbar + Footer)
│   │   ├── Navbar.tsx      # Barra de navegação
│   │   ├── Footer.tsx      # Rodapé
│   │   ├── PomodoroTimer/  # Componente do timer Pomodoro
│   │   ├── CardReview/     # Componente de revisão de cards
│   │   ├── CardList/       # Lista de cards
│   │   ├── CardModal/      # Modal para criar/editar cards
│   │   ├── ThemeToggle/    # Toggle de tema (dark/light)
│   │   ├── TokenRenewer/   # Renovação automática de tokens
│   │   └── ui/             # Componentes UI básicos (Button, Card, Input, etc.)
│   ├── contexts/           # Contextos React (estado global)
│   │   └── ThemeContext.tsx # Contexto de tema
│   ├── lib/                # Bibliotecas e utilitários
│   │   └── auth.ts          # Helpers de autenticação
│   ├── types/               # Tipos TypeScript compartilhados
│   │   └── index.ts
│   └── globals.css          # Estilos globais
├── tailwind.config.js      # Configuração do Tailwind CSS
├── next.config.js          # Configuração do Next.js
├── tsconfig.json           # Configuração do TypeScript
├── package.json
└── README.md
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento (http://localhost:3000)

# Build
npm run build        # Cria build de produção
npm start            # Inicia o servidor de produção (após build)

# Linting
npm run lint         # Executa o ESLint
```

## ✨ Funcionalidades

### 🍅 Técnica Pomodoro
- Timer Pomodoro configurável (padrão: 25 minutos)
- Iniciar, pausar, completar e abandonar sessões
- Estatísticas do dia (sessões, tempo focado, reflexões)
- Histórico de sessões Pomodoro

### 📚 Sistema de Revisão Espaçada (AnkiApp-style)
- **Decks**: Criar e gerenciar baralhos de cards
- **Cards**: Cards com frente (pergunta) e verso (resposta)
- **Revisões**: Sistema de revisão espaçada com três níveis:
  - **Errado** (Wrong): Revisar em 3 minutos
  - **Bom** (Good): Revisar em 10 minutos
  - **Fácil** (Easy): Revisar em 1 dia
- **Estatísticas por Deck**: Visualizar cards novos, em aprendizagem e para revisar
- **Interface de Revisão**: Interface inspirada no AnkiApp com flip de cards

### 📝 Reflexões
- Criar reflexões após completar sessões Pomodoro
- Perguntas obrigatórias e opcionais
- Histórico de reflexões

### 👤 Perfil do Usuário
- Visualizar e editar informações do perfil
- Gerenciar conta

### 🎨 Tema Dark/Light
- Alternância entre modo claro e escuro
- Preferência salva no localStorage
- Detecção automática da preferência do sistema

## 🏗 Arquitetura

O frontend segue uma arquitetura em camadas bem definida:

### 1. **API Layer** (`src/api/`)
Responsável por fazer as chamadas HTTP para o backend. Cada arquivo corresponde a um recurso da API.

**Exemplo**:
```typescript
// src/api/card.ts
export async function getCardsByDeckId(deckId: string): Promise<Card[]>
```

### 2. **Service Layer** (`src/services/`)
Contém a lógica de negócio e tratamento de erros. Os serviços chamam as APIs e retornam resultados padronizados.

**Exemplo**:
```typescript
// src/services/cardService.ts
static async getCardsByDeckId(deckId: string) {
  try {
    const cards = await cardApi.getCardsByDeckId(deckId);
    return { success: true, data: cards };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 3. **Component Layer** (`src/components/`)
Componentes React reutilizáveis. Divididos em:
- **Componentes de Página**: Componentes específicos de funcionalidades (PomodoroTimer, CardReview, etc.)
- **Componentes UI**: Componentes básicos reutilizáveis (Button, Card, Input, Modal, etc.)

### 4. **Context Layer** (`src/contexts/`)
Gerencia estado global da aplicação usando React Context API.

**Contextos disponíveis**:
- `ThemeContext`: Gerencia o tema (dark/light)

### 5. **Page Layer** (`src/app/`)
Páginas da aplicação usando Next.js App Router. Cada pasta representa uma rota.

## 🗺 Páginas e Rotas

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/` | Dashboard com Pomodoro Timer e estatísticas | ✅ |
| `/login` | Página de login | ❌ |
| `/register` | Página de registro | ❌ |
| `/profile` | Perfil do usuário | ✅ |
| `/history` | Histórico de sessões Pomodoro | ✅ |
| `/reflection/[id]` | Página de reflexão específica | ✅ |
| `/revisoes` | Gerenciamento de decks e revisões | ✅ |
| `/revisoes/review?deckId=...` | Interface de revisão de cards | ✅ |

## 🧩 Componentes Principais

### Layout e Navegação
- **`Layout`**: Componente que envolve todas as páginas (Navbar + Footer)
- **`Navbar`**: Barra de navegação com links e toggle de tema
- **`Footer`**: Rodapé da aplicação
- **`ThemeToggle`**: Botão para alternar entre tema claro/escuro

### Pomodoro
- **`PomodoroTimer`**: Timer principal com controles de iniciar, pausar, completar e abandonar
- **`ReflectionModal`**: Modal para criar reflexões após completar Pomodoro

### Revisões
- **`CardReview`**: Componente de revisão individual de card (inspirado no AnkiApp)
- **`CardList`**: Lista de cards de um deck
- **`CardModal`**: Modal para criar/editar cards

### UI Base
- **`Button`**: Botão reutilizável com variantes
- **`Card`**: Card container reutilizável
- **`Input`**: Campo de entrada de texto
- **`Textarea`**: Campo de texto multilinha
- **`Modal`**: Modal reutilizável
- **`SearchInput`**: Campo de busca

### Utilitários
- **`TokenRenewer`**: Componente que renova automaticamente tokens JWT
- **`LogoutModal`**: Modal de confirmação de logout

## 🎨 Temas (Dark/Light Mode)

A aplicação suporta modo claro e escuro usando Tailwind CSS com a classe `dark:`.

### Como funciona:
1. O `ThemeContext` gerencia o estado do tema
2. A preferência é salva no `localStorage`
3. O tema é aplicado através da classe `dark` no elemento `<html>`
4. Tailwind CSS aplica estilos condicionalmente usando `dark:` prefix

### Uso em componentes:
```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Conteúdo
</div>
```

### Cores principais:
- **Light Mode**: Tons claros com foco em branco e cinza claro
- **Dark Mode**: Tons escuros com foco em preto e cinza escuro
- **Primary**: Azul (#0369a1) para ambos os modos

## 🔐 Autenticação

A autenticação é baseada em JWT (JSON Web Tokens).

### Fluxo de autenticação:
1. Usuário faz login através de `/login`
2. Token JWT é salvo no `localStorage` e enviado como cookie
3. Token é incluído automaticamente em requisições via header `Authorization: Bearer <token>`
4. `TokenRenewer` renova automaticamente tokens expirados

### Gerenciamento de token:
- **Armazenamento**: `localStorage.getItem('token')`
- **Inclusão em requisições**: Automático via `apiRequest` em `src/api/config.ts`
- **Renovação**: Automática via componente `TokenRenewer`

### Rotas protegidas:
A maioria das rotas requer autenticação. Se o usuário não estiver autenticado, será redirecionado para `/login`.

## 💻 Desenvolvimento

### Estrutura de Código
- **TypeScript**: Todo o código é escrito em TypeScript
- **Componentes**: Usam React Hooks (`useState`, `useEffect`, `useContext`)
- **Estilização**: Tailwind CSS com classes utilitárias
- **Padrão de nomenclatura**: 
  - Componentes: PascalCase
  - Arquivos: camelCase para utilitários, PascalCase para componentes
  - Pastas: camelCase

### Adicionando Nova Funcionalidade

1. **Criar API Client** (`src/api/`):
```typescript
// src/api/novoRecurso.ts
export async function getNovoRecurso(): Promise<NovoRecurso> {
  return apiRequest<NovoRecurso>('/api/novo-recurso', {
    method: 'GET',
  });
}
```

2. **Criar Service** (`src/services/`):
```typescript
// src/services/novoRecursoService.ts
import * as novoRecursoApi from '@/api/novoRecurso';

export class NovoRecursoService {
  static async get() {
    try {
      const data = await novoRecursoApi.getNovoRecurso();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

3. **Criar Componente** (`src/components/`):
```typescript
// src/components/NovoRecurso/index.tsx
'use client';

export default function NovoRecurso() {
  // Lógica do componente
}
```

4. **Criar Página** (`src/app/`):
```typescript
// src/app/novo-recurso/page.tsx
'use client';

import Layout from '@/components/Layout';

export default function NovoRecursoPage() {
  return (
    <Layout>
      {/* Conteúdo da página */}
    </Layout>
  );
}
```

### Hot Reload
O Next.js possui hot reload automático. Alterações em arquivos são refletidas imediatamente no navegador.

### Debugging
- Use `console.log` para debug (remova antes de commit)
- Use React DevTools para inspecionar componentes
- Use Network tab do navegador para ver requisições HTTP

## 📝 Notas

- O frontend roda na porta `3000` por padrão
- Requer o backend rodando na porta `3001` (ou configurada via `.env.local`)
- O CORS está configurado no backend para aceitar requisições do frontend
- As requisições incluem `credentials: 'include'` para suportar cookies httpOnly

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se o backend está rodando
- Verifique a URL da API em `.env.local`
- Verifique as configurações de CORS no backend

### Erro: "useTheme must be used within a ThemeProvider"
- Certifique-se de que o componente está dentro do `ThemeProvider` no `layout.tsx`

### Tema não está funcionando
- Limpe o `localStorage` e recarregue a página
- Verifique se o `ThemeProvider` está envolvendo a aplicação

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

