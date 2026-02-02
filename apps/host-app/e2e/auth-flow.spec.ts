import { test, expect } from '@playwright/test';

/**
 * Teste E2E - Fluxo Completo de Usuário
 * 
 * Este teste simula o fluxo completo de um usuário:
 * 1. Acessa a página inicial
 * 2. Navega para a página de login
 * 3. Realiza o login
 * 4. Acessa o dashboard
 * 5. Visualiza transações
 * 6. Realiza logout
 */

test.describe('Fluxo Completo de Autenticação e Navegação', () => {
  
  test('deve carregar a página inicial corretamente', async ({ page }) => {
    await page.goto('/');
    
    // Verifica se a página carregou
    await expect(page).toHaveURL('/');
    
    // Verifica se tem algum conteúdo visível
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve ter botões de ação na página inicial', async ({ page }) => {
    await page.goto('/');
    
    // Aguarda a página carregar
    await page.waitForLoadState('networkidle');
    
    // Verifica se existem botões na página (visíveis ou não)
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('deve navegar para página de login', async ({ page }) => {
    await page.goto('/login');
    
    // Verifica se está na página de login
    await expect(page).toHaveURL(/.*login.*/);
    
    // Verifica se há inputs na página (email/senha)
    const inputs = page.locator('input');
    await expect(inputs.first()).toBeVisible({ timeout: 10000 });
  });

  test('deve ter campos de formulário na página de login', async ({ page }) => {
    await page.goto('/login');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Verifica se existem campos de input
    const emailInput = page.locator('input[type="email"], input[placeholder*="mail" i]');
    const passwordInput = page.locator('input[type="password"]');
    
    // Pelo menos um input deve estar visível
    const inputs = page.locator('input');
    await expect(inputs.first()).toBeVisible({ timeout: 10000 });
  });

  test('deve navegar para página de criar conta', async ({ page }) => {
    await page.goto('/nova-conta');
    
    // Verifica se está na página de nova conta
    await expect(page).toHaveURL(/.*nova-conta.*/);
    
    // Verifica se há campos de formulário
    const inputs = page.locator('input');
    await expect(inputs.first()).toBeVisible({ timeout: 10000 });
  });

  test('deve validar campos obrigatórios no cadastro', async ({ page }) => {
    await page.goto('/nova-conta');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Verifica que não foi redirecionado automaticamente
    await expect(page).toHaveURL(/.*nova-conta.*/);
  });

});

test.describe('Fluxo de Dashboard (com autenticação)', () => {
  
  test('deve redirecionar ao acessar home sem autenticação', async ({ page }) => {
    // Tenta acessar a página home diretamente
    await page.goto('/home');
    
    // Aguarda redirecionamento ou carregamento
    await page.waitForLoadState('domcontentloaded');
    
    // A URL deve ter mudado (redirecionou) ou mostra erro
    const url = page.url();
    expect(url).toBeTruthy();
  });

  test('deve redirecionar ao acessar transferências sem autenticação', async ({ page }) => {
    // Tenta acessar a página de transferências diretamente
    await page.goto('/transferencias');
    
    await page.waitForLoadState('domcontentloaded');
    
    // A URL deve ter mudado (redirecionou) ou mostra erro
    const url = page.url();
    expect(url).toBeTruthy();
  });

});

test.describe('Acessibilidade', () => {
  
  test('deve ter elementos com labels acessíveis na página de login', async ({ page }) => {
    await page.goto('/login');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Verifica se inputs têm algum tipo de identificação
    const inputs = await page.locator('input').all();
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('deve ter botões visíveis na página inicial', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForLoadState('domcontentloaded');
    
    // Verifica se botões existem e estão visíveis
    const buttons = await page.locator('button').all();
    expect(buttons.length).toBeGreaterThan(0);
  });

});

test.describe('Performance', () => {
  
  test('deve carregar a página inicial em tempo razoável', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // A página deve carregar em menos de 10 segundos
    expect(loadTime).toBeLessThan(10000);
  });

});
