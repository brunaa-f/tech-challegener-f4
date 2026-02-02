import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '@/components/ui/IconButton';

describe('IconButton Component', () => {
  // Teste 1: Renderização básica
  it('deve renderizar o IconButton com o ícone correto', () => {
    render(<IconButton icon="edit" />);
    
    expect(screen.getByText('edit')).toBeInTheDocument();
  });

  // Teste 2: Cores diferentes
  it('deve aplicar a classe correta para cor verde', () => {
    const { container } = render(<IconButton icon="add" color="green" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('bg-fiap-green');
  });

  it('deve aplicar a classe correta para cor azul', () => {
    const { container } = render(<IconButton icon="add" color="blue" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('bg-fiap-navy-blue');
  });

  it('deve aplicar a classe correta para cor preta', () => {
    const { container } = render(<IconButton icon="add" color="black" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('bg-black');
  });

  it('deve aplicar a classe correta para cor cinza', () => {
    const { container } = render(<IconButton icon="add" color="gray" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('bg-gray-200');
  });

  // Teste 3: Cor padrão (red)
  it('deve aplicar cor padrão (vermelho) quando nenhuma cor é especificada', () => {
    const { container } = render(<IconButton icon="delete" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('bg-fiap-red');
  });

  // Teste 4: Evento de click
  it('deve chamar a função onClick quando clicado', () => {
    const handleClick = jest.fn();
    const { container } = render(<IconButton icon="edit" onClick={handleClick} />);
    
    fireEvent.click(container.firstChild as Element);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Teste 5: Não deve quebrar se onClick não for fornecido
  it('não deve quebrar quando onClick não é fornecido', () => {
    const { container } = render(<IconButton icon="edit" />);
    
    expect(() => {
      fireEvent.click(container.firstChild as Element);
    }).not.toThrow();
  });

  // Teste 6: Classes customizadas
  it('deve aceitar classes customizadas', () => {
    const { container } = render(<IconButton icon="edit" className="my-custom-class" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('my-custom-class');
  });

  // Teste 7: Título
  it('deve passar o título para o ícone', () => {
    render(<IconButton icon="edit" title="Editar item" />);
    
    expect(screen.getByText('edit')).toHaveAttribute('title', 'Editar item');
  });

  // Teste 8: Estrutura do componente
  it('deve ter a estrutura correta com classes de estilo', () => {
    const { container } = render(<IconButton icon="settings" />);
    
    const iconButton = container.firstChild;
    expect(iconButton).toHaveClass('flex', 'items-center', 'justify-center');
    expect(iconButton).toHaveClass('w-7', 'h-7', 'cursor-pointer', 'rounded-full');
  });
});
