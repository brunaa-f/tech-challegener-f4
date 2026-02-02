import validaEmail from '@/core/utils/validaEmail';
import { formatarMoeda, formatarData } from '@/core/utils/Formatters';
import { FormatoData } from '@/shared/types/FormatoData';

describe('validaEmail', () => {
  // Teste 1: Email válido
  it('deve retornar true para emails válidos', () => {
    expect(validaEmail('teste@email.com')).toBe(true);
    expect(validaEmail('usuario@dominio.com.br')).toBe(true);
    expect(validaEmail('nome.sobrenome@empresa.org')).toBe(true);
  });

  // Teste 2: Email inválido
  it('deve retornar false para emails inválidos', () => {
    expect(validaEmail('email-invalido')).toBe(false);
    expect(validaEmail('email@')).toBe(false);
    expect(validaEmail('@dominio.com')).toBe(false);
    expect(validaEmail('')).toBe(false);
  });

  // Teste 3: Email com formato básico
  it('deve validar emails com formato básico correto', () => {
    expect(validaEmail('a@b.c')).toBe(true);
    expect(validaEmail('test123@test.com')).toBe(true);
  });
});

describe('formatarMoeda', () => {
  // Teste 4: Formatação de valor inteiro
  it('deve formatar valores inteiros corretamente', () => {
    const resultado = formatarMoeda(100);
    expect(resultado).toContain('100');
    expect(resultado).toContain('R$');
  });

  // Teste 5: Formatação de valor decimal
  it('deve formatar valores decimais corretamente', () => {
    const resultado = formatarMoeda(99.99);
    expect(resultado).toContain('99');
    expect(resultado).toContain('R$');
  });

  // Teste 6: Valores grandes
  it('deve formatar valores grandes com separadores de milhar', () => {
    const resultado = formatarMoeda(1000000);
    expect(resultado).toContain('1.000.000');
    expect(resultado).toContain('R$');
  });

  // Teste 7: Valores negativos
  it('deve formatar valores negativos corretamente', () => {
    const resultado = formatarMoeda(-100);
    expect(resultado).toContain('100');
    expect(resultado).toContain('-');
  });

  // Teste 8: Valor zero
  it('deve formatar zero corretamente', () => {
    const resultado = formatarMoeda(0);
    expect(resultado).toContain('0');
    expect(resultado).toContain('R$');
  });
});

describe('formatarData', () => {
  const dataTest = new Date('2026-02-01T12:00:00');

  // Teste 9: Formato padrão
  it('deve formatar data no formato padrão', () => {
    const resultado = formatarData(dataTest, FormatoData.PADRAO);
    expect(resultado).toBe('01/02/2026');
  });

  // Teste 10: Formato dia/mês
  it('deve formatar data no formato dia/mês', () => {
    const resultado = formatarData(dataTest, FormatoData.DIA_MES);
    expect(resultado).toBe('01/02');
  });

  // Teste 11: Formato sem parâmetro (usa padrão)
  it('deve usar formato padrão quando nenhum formato é especificado', () => {
    const resultado = formatarData(dataTest);
    expect(resultado).toBe('01/02/2026');
  });
});
