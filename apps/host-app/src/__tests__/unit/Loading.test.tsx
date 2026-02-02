import { render, screen } from '@testing-library/react';
import Loading from '@/components/ui/Loading';

describe('Loading Component', () => {
  // Teste 1: Renderização do componente
  it('deve renderizar o componente de loading', () => {
    render(<Loading />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  // Teste 2: Classe de animação
  it('deve ter a classe de animação spin', () => {
    const { container } = render(<Loading />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  // Teste 3: Estrutura do componente
  it('deve ter a estrutura correta com container flex', () => {
    const { container } = render(<Loading />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center');
  });

  // Teste 4: Estilização do spinner
  it('deve ter as bordas corretas no spinner', () => {
    const { container } = render(<Loading />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('border-t-4', 'border-b-4', 'border-fiap-green');
  });

  // Teste 5: Estilização do texto
  it('deve ter a estilização correta no texto', () => {
    render(<Loading />);
    
    const text = screen.getByText('Carregando...');
    expect(text).toHaveClass('text-xl', 'font-medium', 'text-fiap-navy-blue');
  });
});
