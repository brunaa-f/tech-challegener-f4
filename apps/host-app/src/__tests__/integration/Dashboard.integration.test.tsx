import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Mock dos componentes individuais para testar integração
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Loading from '@/components/ui/Loading';

// Criação de um store mock para testes de integração
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      transaction: (state = { transacoes: [], saldo: 1000 }) => {
        return state;
      },
      filter: (state = { tipoFiltroTransacao: 'todos' }) => state,
    },
    preloadedState: initialState,
  });
};

describe('Testes de Integração - Dashboard Components', () => {
  describe('Integração entre Button e Icon', () => {
    it('deve renderizar botões com ícones funcionando em conjunto', () => {
      const handleClick = jest.fn();
      
      render(
        <div className="flex gap-2">
          <Button text="Adicionar" color="green" onClick={handleClick} />
          <Icon name="add" className="text-green-500" />
          <Button text="Remover" color="red" onClick={handleClick} />
          <Icon name="remove" className="text-red-500" />
        </div>
      );

      // Verifica renderização de todos os elementos
      expect(screen.getByText('Adicionar')).toBeInTheDocument();
      expect(screen.getByText('Remover')).toBeInTheDocument();
      expect(screen.getByText('add')).toBeInTheDocument();
      expect(screen.getByText('remove')).toBeInTheDocument();

      // Testa interação
      fireEvent.click(screen.getByText('Adicionar'));
      fireEvent.click(screen.getByText('Remover'));
      
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Integração com Redux Store', () => {
    it('deve renderizar componentes com estado do Redux', () => {
      const store = createMockStore({
        transaction: {
          transacoes: [
            { id: 1, tipo: 'deposito', valor: 100, data: '2026-01-01' },
            { id: 2, tipo: 'saque', valor: 50, data: '2026-01-02' },
          ],
          saldo: 1500,
        },
      });

      render(
        <Provider store={store}>
          <div>
            <Button text="Nova Transação" color="green" />
            <Button text="Ver Extrato" color="blue" />
          </div>
        </Provider>
      );

      expect(screen.getByText('Nova Transação')).toBeInTheDocument();
      expect(screen.getByText('Ver Extrato')).toBeInTheDocument();
    });
  });

  describe('Fluxo de Loading e Conteúdo', () => {
    it('deve simular transição de loading para conteúdo', async () => {
      const TestComponent = () => {
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
          const timer = setTimeout(() => setIsLoading(false), 100);
          return () => clearTimeout(timer);
        }, []);

        if (isLoading) {
          return <Loading />;
        }

        return (
          <div>
            <h1>Dashboard Carregado</h1>
            <Button text="Ação Principal" color="green" />
          </div>
        );
      };

      // Precisamos importar React para o componente funcionar
      const React = require('react');

      render(<TestComponent />);

      // Inicialmente mostra loading
      expect(screen.getByText('Carregando...')).toBeInTheDocument();

      // Aguarda o conteúdo carregar
      await waitFor(() => {
        expect(screen.getByText('Dashboard Carregado')).toBeInTheDocument();
      }, { timeout: 500 });

      expect(screen.getByText('Ação Principal')).toBeInTheDocument();
    });
  });

  describe('Integração de Ações de Formulário', () => {
    it('deve integrar múltiplos botões em um formulário', () => {
      const handleSubmit = jest.fn();
      const handleCancel = jest.fn();

      render(
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="flex gap-2">
            <Button text="Salvar" type="submit" color="green" />
            <Button text="Cancelar" type="button" color="gray" onClick={handleCancel} />
          </div>
        </form>
      );

      // Testa submit do formulário
      fireEvent.click(screen.getByText('Salvar'));
      expect(handleSubmit).toHaveBeenCalledTimes(1);

      // Testa cancelamento
      fireEvent.click(screen.getByText('Cancelar'));
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste de Estados Múltiplos', () => {
    it('deve alternar estados de botões corretamente', () => {
      const React = require('react');

      const MultiStateComponent = () => {
        const [activeButton, setActiveButton] = React.useState<string>('home');

        return (
          <div>
            <Button 
              text="Home" 
              color={activeButton === 'home' ? 'blue' : 'gray'} 
              onClick={() => setActiveButton('home')} 
            />
            <Button 
              text="Perfil" 
              color={activeButton === 'perfil' ? 'blue' : 'gray'} 
              onClick={() => setActiveButton('perfil')} 
            />
            <Button 
              text="Configurações" 
              color={activeButton === 'config' ? 'blue' : 'gray'} 
              onClick={() => setActiveButton('config')} 
            />
            <span data-testid="active-state">{activeButton}</span>
          </div>
        );
      };

      render(<MultiStateComponent />);

      // Estado inicial
      expect(screen.getByTestId('active-state')).toHaveTextContent('home');

      // Clica em Perfil
      fireEvent.click(screen.getByText('Perfil'));
      expect(screen.getByTestId('active-state')).toHaveTextContent('perfil');

      // Clica em Configurações
      fireEvent.click(screen.getByText('Configurações'));
      expect(screen.getByTestId('active-state')).toHaveTextContent('config');

      // Volta para Home
      fireEvent.click(screen.getByText('Home'));
      expect(screen.getByTestId('active-state')).toHaveTextContent('home');
    });
  });
});
