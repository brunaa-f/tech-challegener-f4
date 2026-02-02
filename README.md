# 🚀 DevShip - Plataforma de CI/CD & Qualidade

[![CI/CD Pipeline](https://github.com/brunaa-f/dev-ship-safe-release/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/brunaa-f/dev-ship-safe-release/actions/workflows/ci-cd.yml)
[![Coverage](https://img.shields.io/badge/coverage-70%25+-brightgreen)](./apps/host-app/coverage)

> Projeto desenvolvido para a **Prova Substitutiva - Fase 5 FIAP** demonstrando domínio em testes, CI/CD e deploy automatizado.

---

## 📐 Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DevShip Platform                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │   Host App  │◄───│ Remote App  │    │   Database  │              │
│  │  (Next.js)  │    │  (React MF) │    │ (PostgreSQL)│              │
│  └──────┬──────┘    └─────────────┘    └──────┬──────┘              │
│         │                                      │                     │
│         └──────────────────┬───────────────────┘                     │
│                            │                                         │
│                    ┌───────▼───────┐                                 │
│                    │    Prisma     │                                 │
│                    │     ORM       │                                 │
│                    └───────────────┘                                 │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                        Camada de Testes                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │   Unitários │    │  Integração │    │     E2E     │              │
│  │    Jest     │    │   Jest +    │    │  Playwright │              │
│  │             │    │   Testing   │    │             │              │
│  └─────────────┘    └─────────────┘    └─────────────┘              │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                      Pipeline CI/CD                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │  Lint   │→│  Test   │→│  Build  │→│   E2E   │→│ Deploy  │        │
│  │ ESLint  │ │  Jest   │ │  Next   │ │Playwright│ │ Vercel  │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Tecnologias Utilizadas

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Microfrontends** | Module Federation |
| **Autenticação** | NextAuth.js |
| **Estado** | Redux Toolkit |
| **Banco de Dados** | PostgreSQL + Prisma |
| **Testes Unitários** | Jest + Testing Library |
| **Testes E2E** | Playwright |
| **CI/CD** | GitHub Actions |
| **Deploy** | Vercel |

---

## 🧪 Estratégia de Testes

### Pirâmide de Testes

```
        ▲
       /E\        E2E Tests (Playwright)
      /2E \       - Fluxo completo de autenticação
     /─────\      - Navegação e interações
    /       \
   / Integr. \    Integration Tests (Jest + Testing Library)
  /───────────\   - Dashboard components
 /             \  - Redux store integration
/   Unitários   \ Unit Tests (Jest)
─────────────────  - Componentes (Button, Icon, Loading)
                   - Utilitários (validaEmail, formatters)
```

### Cobertura de Testes

| Tipo | Quantidade | Framework |
|------|------------|-----------|
| **Unitários** | 18+ testes | Jest + Testing Library |
| **Integração** | 5+ testes | Jest + Testing Library |
| **E2E** | 10+ testes | Playwright |
| **Cobertura** | ≥70% | Jest Coverage |

### Arquivos de Teste

```
apps/host-app/
├── src/__tests__/
│   ├── unit/
│   │   ├── Button.test.tsx      # Testes do componente Button
│   │   ├── Icon.test.tsx        # Testes do componente Icon
│   │   ├── Loading.test.tsx     # Testes do componente Loading
│   │   └── utils.test.ts        # Testes de utilitários
│   └── integration/
│       └── Dashboard.integration.test.tsx
└── e2e/
    └── auth-flow.spec.ts        # Testes E2E de autenticação
```

---

## 🔄 Pipeline CI/CD

### Fluxo do Pipeline

```yaml
Trigger: Push/PR para main ou develop
    │
    ▼
┌─────────────────┐
│  🔍 Quality     │ ← ESLint
└────────┬────────┘
         ▼
┌─────────────────┐
│  🧪 Tests       │ ← Jest + Coverage (≥70%)
└────────┬────────┘
         ▼
┌─────────────────┐
│  🎭 E2E Tests   │ ← Playwright
└────────┬────────┘
         ▼
┌─────────────────┐
│  🏗️ Build       │ ← Next.js Build
└────────┬────────┘
         ▼
┌─────────────────┐
│  🚀 Deploy      │ ← Vercel (apenas main)
└─────────────────┘
```

### Jobs do Pipeline

| Job | Descrição | Dependências |
|-----|-----------|--------------|
| `quality` | Linting com ESLint | - |
| `test` | Testes unitários e integração | quality |
| `e2e` | Testes end-to-end | test |
| `build` | Build da aplicação | quality, test |
| `deploy` | Deploy para produção | build, e2e |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Docker (para o banco de dados)
- npm ou yarn

### 1. Instalar Dependências

```bash
# Na raiz do projeto
npm install

# No host-app
cd apps/host-app
npm install
```

### 2. Configurar Banco de Dados

```bash
# Subir o PostgreSQL com Docker
npm run up-db

# Configurar Prisma
cd libs/db
npx prisma generate --schema=./prisma/schema.prisma
npx prisma migrate dev --schema=./prisma/schema.prisma
```

### 3. Iniciar a Aplicação

```bash
# Terminal 1 - Host App
cd apps/host-app
npm run dev

# Terminal 2 - Remote App (opcional)
cd apps/remote-app
npm run start
```

Acesse: http://localhost:3000

---

## 🧪 Como Rodar os Testes

### Testes Unitários e de Integração

```bash
cd apps/host-app

# Rodar todos os testes
npm run test

# Rodar em modo watch
npm run test:watch

# Rodar com cobertura
npm run test:coverage
```

### Testes E2E

```bash
cd apps/host-app

# Instalar browsers do Playwright
npx playwright install

# Rodar testes E2E
npm run test:e2e

# Rodar com interface visual
npm run test:e2e:ui

# Ver relatório
npm run test:e2e:report
```

---

## ⚡ Pipeline GitHub Actions

### Como Executar

1. Faça push para `main` ou `develop`
2. Ou abra um Pull Request
3. O pipeline executará automaticamente

### Visualizar Resultados

1. Acesse a aba "Actions" no GitHub
2. Clique no workflow em execução
3. Veja os logs de cada job
4. Baixe os artifacts (coverage, reports)

---

## 📊 Métricas de Qualidade

| Métrica | Target | Status |
|---------|--------|--------|
| Cobertura de Código | ≥70% | ✅ |
| Testes Unitários | ≥3 | 18+ ✅ |
| Testes de Integração | ≥1 | 5+ ✅ |
| Testes E2E | ≥1 | 10+ ✅ |
| Lint (0 erros) | 0 | ✅ |
| Build Success | 100% | ✅ |

---

## 🔀 Estratégia de Versionamento

### Branches

| Branch | Propósito | Deploy |
|--------|-----------|--------|
| `main` | Produção estável | ✅ Automático |
| `develop` | Desenvolvimento | Preview |
| `feature/*` | Novas features | - |
| `hotfix/*` | Correções urgentes | - |

### Versionamento Semântico

```
v1.0.0
  │ │ │
  │ │ └── Patch: Correções de bugs
  │ └──── Minor: Novas features (retrocompatíveis)
  └────── Major: Breaking changes
```

---

## 👩‍💻 Autora

**Bruna Fernandes**
- GitHub: [@brunaa-f](https://github.com/brunaa-f)
- FIAP - Fase 5 - Prova Substitutiva

---

## 📝 Licença

Este projeto está sob a licença MIT.
