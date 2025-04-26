import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transacao } from '@/shared/models/Transacao';
import { atualizarTransacoes, fetchDadosIniciais } from '../transactions/transactionSlice';

interface FiltrosTransacoesState {
  todasTransacoes: Transacao[];
  transacoesFiltradas: Transacao[];
  tipoFiltroTransacao: string;
  dataInicio: string;
  dataFim: string;
}

const initialState: FiltrosTransacoesState = {
  todasTransacoes: [],
  transacoesFiltradas: [],
  tipoFiltroTransacao: 'todos',
  dataInicio: '',
  dataFim: '',
};

const filtrosTransacoesSlice = createSlice({
  name: 'filtrosTransacoes',
  initialState,
  reducers: {
    setTipoFiltroTransacao(state, action: PayloadAction<string>) {
      state.tipoFiltroTransacao = action.payload;
    },
    setDataInicio(state, action: PayloadAction<string>) {
      state.dataInicio = action.payload;
    },
    setDataFim(state, action: PayloadAction<string>) {
      state.dataFim = action.payload;
    },
    atualizarTransacoesFiltradas(state) {
      const dataFinal = state.dataFim ? new Date(state.dataFim) : new Date();

      state.transacoesFiltradas = state.todasTransacoes.filter((transacao) => {
        const tipoTransacaoMatch =
          state.tipoFiltroTransacao === 'todos' || transacao.tipoTransacao === state.tipoFiltroTransacao;

        const dentroDoIntervalo =
          (!state.dataInicio || new Date(transacao.date) >= new Date(state.dataInicio)) &&
          (!state.dataFim || new Date(transacao.date) <= dataFinal);

        return tipoTransacaoMatch && dentroDoIntervalo;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDadosIniciais.fulfilled, (state, action) => {
        state.todasTransacoes = action.payload.transacoes;
        state. transacoesFiltradas = action.payload.transacoes;
      })
      .addCase(atualizarTransacoes.fulfilled, (state, action) => {
        state.todasTransacoes = action.payload.transacoes;
      })
      .addMatcher(
        (action) =>
          ['filtrosTransacoes/setTipoFiltroTransacao', 'filtrosTransacoes/setDataInicio', 'filtrosTransacoes/setDataFim'].includes(
            action.type
          ),
        (state) => {
          // Atualiza as transações filtradas automaticamente ao alterar os filtros
          filtrosTransacoesSlice.caseReducers.atualizarTransacoesFiltradas(state);
        }
      )
      .addDefaultCase((state) => {
        // Sempre que as transações são atualizadas, reprocessar os filtros
        filtrosTransacoesSlice.caseReducers.atualizarTransacoesFiltradas(state);
      });
  },
});

export const {
  setTipoFiltroTransacao,
  setDataInicio,
  setDataFim,
  atualizarTransacoesFiltradas,
} = filtrosTransacoesSlice.actions;

export default filtrosTransacoesSlice.reducer;