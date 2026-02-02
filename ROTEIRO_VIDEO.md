# 🎬 Roteiro do Vídeo - Prova FIAP Fase 5

**Tempo estimado: 5-7 minutos**

---

## 📍 PARTE 1 - Introdução (30 seg)

> "Olá! Vou apresentar o projeto DevShip - uma aplicação de gestão financeira com testes automatizados e pipeline CI/CD."

**Mostrar:** Tela inicial da aplicação rodando no navegador (http://localhost:3000)

---

## 📍 PARTE 2 - Estrutura de Testes (1 min)

> "Primeiro, vou mostrar a estrutura de testes do projeto."

**Abrir no VS Code e mostrar:**

1. **Pasta de testes unitários:**
   - `apps/host-app/src/__tests__/unit/`
   - Mostrar: `Button.test.tsx`, `Modal.test.tsx`, `utils.test.ts`

2. **Pasta de testes de integração:**
   - `apps/host-app/src/__tests__/integration/`
   - Mostrar: `Dashboard.integration.test.tsx`

3. **Pasta de testes E2E:**
   - `apps/host-app/e2e/`
   - Mostrar: `auth-flow.spec.ts`

---

## 📍 PARTE 3 - Executar Testes Unitários (1 min)

> "Agora vou executar os testes unitários e mostrar a cobertura."

**No terminal, executar:**
```bash
cd apps/host-app
npm run test
```

**Mostrar:** 53 testes passando ✅

**Depois executar:**
```bash
npm run test:coverage
```

**Mostrar:** Cobertura de **83.67%** (acima dos 70% exigidos)

---

## 📍 PARTE 4 - Executar Teste E2E (1 min)

> "Agora vou executar os testes end-to-end com Playwright."

**No terminal, executar:**
```bash
npm run test:e2e
```

**Mostrar:** Testes E2E passando (navegação, acessibilidade, etc.)

---

## 📍 PARTE 5 - Pipeline CI/CD (1.5 min)

> "Vou mostrar o pipeline de CI/CD configurado no GitHub Actions."

**Abrir no VS Code:**
- `.github/workflows/ci-cd.yml`

**Explicar os jobs:**
> "O pipeline tem 5 etapas:
> 1. **Quality** - executa ESLint
> 2. **Test** - roda testes unitários e verifica cobertura mínima de 70%
> 3. **E2E** - executa testes Playwright com PostgreSQL
> 4. **Build** - compila a aplicação Next.js
> 5. **Deploy** - faz deploy na Vercel"

**Abrir no navegador:**
- https://github.com/brunaa-f/tech-challegener-f4/actions

**Mostrar:** Pipeline executando/passando com todos os jobs verdes ✅

---

## 📍 PARTE 6 - Aplicação Funcionando (1 min)

> "Por fim, vou mostrar a aplicação funcionando."

**No navegador (http://localhost:3000):**

1. **Tela de Login** - fazer login com:
   - Email: `teste@teste.com`
   - Senha: `teste123`
2. **Dashboard** - mostrar a página principal
3. **Navegar** - mostrar algumas funcionalidades

---

## 📍 PARTE 7 - Conclusão (30 seg)

> "Resumindo o que foi entregue:
> - ✅ 45 testes unitários
> - ✅ Testes de integração
> - ✅ 11 testes E2E
> - ✅ 83% de cobertura de código
> - ✅ Pipeline CI/CD completo no GitHub Actions
> 
> Obrigada!"

---

## 📋 Checklist antes de gravar

- [ ] Docker rodando (`docker ps`)
- [ ] Servidor rodando (`npm run dev`)
- [ ] VS Code aberto no projeto
- [ ] GitHub Actions com pipeline verde
- [ ] Navegador aberto em localhost:3000

---

## 🗂️ Arquivos importantes para mostrar

| Arquivo | Descrição |
|---------|-----------|
| `apps/host-app/src/__tests__/unit/Button.test.tsx` | Testes unitários do Button |
| `apps/host-app/src/__tests__/unit/Modal.test.tsx` | Testes unitários do Modal |
| `apps/host-app/src/__tests__/unit/utils.test.ts` | Testes de funções utilitárias |
| `apps/host-app/src/__tests__/integration/Dashboard.integration.test.tsx` | Teste de integração |
| `apps/host-app/e2e/auth-flow.spec.ts` | Testes E2E com Playwright |
| `.github/workflows/ci-cd.yml` | Pipeline CI/CD |
| `apps/host-app/jest.config.js` | Configuração do Jest |
| `apps/host-app/playwright.config.ts` | Configuração do Playwright |

---

## 🔗 Links úteis

- **Repositório:** https://github.com/brunaa-f/tech-challegener-f4
- **GitHub Actions:** https://github.com/brunaa-f/tech-challegener-f4/actions
- **Aplicação local:** http://localhost:3000

---

**Boa gravação! 🎥**
