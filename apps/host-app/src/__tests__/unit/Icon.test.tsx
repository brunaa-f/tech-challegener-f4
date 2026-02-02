import { render, screen } from '@testing-library/react';
import Icon from '@/components/ui/Icon';

describe('Icon Component', () => {
  // Teste 1: Renderização do ícone
  it('deve renderizar o ícone com o nome correto', () => {
    render(<Icon name="home" />);
    
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  // Teste 2: Classe material-icons
  it('deve ter a classe material-icons', () => {
    render(<Icon name="settings" />);
    
    expect(screen.getByText('settings')).toHaveClass('material-icons');
  });

  // Teste 3: Classes customizadas
  it('deve aceitar classes customizadas', () => {
    render(<Icon name="edit" className="text-blue-500" />);
    
    expect(screen.getByText('edit')).toHaveClass('text-blue-500');
  });

  // Teste 4: Atributo title
  it('deve ter o atributo title quando fornecido', () => {
    render(<Icon name="delete" title="Excluir item" />);
    
    expect(screen.getByText('delete')).toHaveAttribute('title', 'Excluir item');
  });

  // Teste 5: Diferentes ícones
  it('deve renderizar diferentes ícones corretamente', () => {
    const { rerender } = render(<Icon name="add" />);
    expect(screen.getByText('add')).toBeInTheDocument();

    rerender(<Icon name="remove" />);
    expect(screen.getByText('remove')).toBeInTheDocument();

    rerender(<Icon name="menu" />);
    expect(screen.getByText('menu')).toBeInTheDocument();
  });
});
