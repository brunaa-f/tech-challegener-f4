import { render, screen } from '@testing-library/react';
import Modal from '@/components/ui/Modal';

describe('Modal Component', () => {
  // Teste 1: Não renderiza quando isOpen é false
  it('não deve renderizar quando isOpen é false', () => {
    const { container } = render(
      <Modal isOpen={false}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(container.firstChild).toBeNull();
  });

  // Teste 2: Renderiza quando isOpen é true
  it('deve renderizar quando isOpen é true', () => {
    render(
      <Modal isOpen={true}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument();
  });

  // Teste 3: Renderiza children corretamente
  it('deve renderizar o conteúdo children corretamente', () => {
    render(
      <Modal isOpen={true}>
        <h1>Título</h1>
        <p>Parágrafo</p>
        <button>Botão</button>
      </Modal>
    );
    
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Parágrafo')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Teste 4: Classes de overlay
  it('deve ter as classes de overlay corretas', () => {
    const { container } = render(
      <Modal isOpen={true}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    const overlay = container.firstChild;
    expect(overlay).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center');
    expect(overlay).toHaveClass('bg-black', 'bg-opacity-50', 'z-50');
  });

  // Teste 5: Classes customizadas no overlay
  it('deve aceitar classes customizadas no overlay', () => {
    const { container } = render(
      <Modal isOpen={true} className="custom-overlay">
        <div>Conteúdo</div>
      </Modal>
    );
    
    const overlay = container.firstChild;
    expect(overlay).toHaveClass('custom-overlay');
  });

  // Teste 6: Classes do container de conteúdo
  it('deve ter classes corretas no container de conteúdo', () => {
    const { container } = render(
      <Modal isOpen={true}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    const contentContainer = container.querySelector('.bg-fiap-white');
    expect(contentContainer).toHaveClass('p-6', 'rounded-lg', 'shadow-lg');
  });

  // Teste 7: Classes customizadas no container de children
  it('deve aceitar classes customizadas no container de children', () => {
    const { container } = render(
      <Modal isOpen={true} childrenClassName="custom-children">
        <div>Conteúdo</div>
      </Modal>
    );
    
    const contentContainer = container.querySelector('.bg-fiap-white');
    expect(contentContainer).toHaveClass('custom-children');
  });

  // Teste 8: Alternância de visibilidade
  it('deve alternar visibilidade baseado em isOpen', () => {
    const { container, rerender } = render(
      <Modal isOpen={false}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    expect(container.firstChild).toBeNull();
    
    rerender(
      <Modal isOpen={true}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    
    rerender(
      <Modal isOpen={false}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    expect(container.firstChild).toBeNull();
  });
});
