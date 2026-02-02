import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button Component', () => {
  // Teste 1: Renderização básica
  it('deve renderizar o botão com o texto correto', () => {
    render(<Button text="Clique aqui" />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  // Teste 2: Cores diferentes
  it('deve aplicar a classe correta para cada cor', () => {
    const { rerender } = render(<Button text="Verde" color="green" />);
    expect(screen.getByRole('button')).toHaveClass('bg-fiap-green');

    rerender(<Button text="Azul" color="blue" />);
    expect(screen.getByRole('button')).toHaveClass('bg-fiap-navy-blue');

    rerender(<Button text="Vermelho" color="red" />);
    expect(screen.getByRole('button')).toHaveClass('bg-fiap-red');

    rerender(<Button text="Preto" color="black" />);
    expect(screen.getByRole('button')).toHaveClass('bg-black');

    rerender(<Button text="Cinza" color="gray" />);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
  });

  // Teste 3: Estilo outlined
  it('deve aplicar o estilo outlined corretamente', () => {
    render(<Button text="Outlined" color="green" outlined={true} />);
    
    expect(screen.getByRole('button')).toHaveClass('btn-outline');
    expect(screen.getByRole('button')).toHaveClass('text-fiap-green');
  });

  // Teste 4: Evento de click
  it('deve chamar a função onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Teste 5: Botão desabilitado
  it('deve estar desabilitado quando a prop disabled é true', () => {
    render(<Button text="Desabilitado" disabled={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Teste 6: Tipo do botão
  it('deve ter o tipo correto', () => {
    render(<Button text="Submit" type="submit" />);
    
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // Teste 7: Classes customizadas
  it('deve aceitar classes customizadas', () => {
    render(<Button text="Custom" className="my-custom-class" />);
    
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });

  // Teste 8: Cor padrão (orange)
  it('deve aplicar cor padrão quando nenhuma cor é especificada', () => {
    render(<Button text="Default" />);
    
    expect(screen.getByRole('button')).toHaveClass('bg-fiap-orange');
  });
});
