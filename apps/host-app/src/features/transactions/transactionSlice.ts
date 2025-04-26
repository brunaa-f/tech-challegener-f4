import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteTransacao,
  getSaldo,
  getTransacoes,
  postSaldo,
  postTransacao,
  putTransacoes,
} from '../../services/transacoesServices';

interface Transacao {
  userId: number;
  tipoTransacao: string;
  valor: number;
  date: string;
  anexo?: File;
}

interface TransacoesState {
  transacoes: Transacao[];
  saldo: number;
}

const initialState: TransacoesState = {
  transacoes: [],
  saldo: 0,
};

export const fetchDadosIniciais = createAsyncThunk(
  'transacoes/fetchDadosIniciais',
  async (userId: number) => {
    const [saldoResult, transacoesResult] = await Promise.all([
      getSaldo(userId),
      getTransacoes(userId),
    ]);
    return { saldo: saldoResult, transacoes: transacoesResult };
  }
);

export const atualizarTransacoes = createAsyncThunk(
  'transacoes/atualizarTransacoes',
  async (userId: number) => {
    const transacoesResult = await getTransacoes(userId);
    return { transacoes: transacoesResult };
  }

)
export const atualizarSaldo = createAsyncThunk(
  'transacoes/atualizarSaldo',
  async (userId: number) => {
    const saldoResult = await getSaldo(userId);   
    return { saldo: saldoResult };
  }
)

export const realizarDeposito = createAsyncThunk(
  'transacoes/realizarDeposito',
  async (
    { userId, valor }: { userId: number; valor: number },
    { dispatch }
  ) => {

    await postSaldo(userId, valor); 
    const saldoAtualizado = await getSaldo(userId); 
    dispatch(atualizarSaldoGlobal(saldoAtualizado)); 
  }
);

export const realizarTransferencia = createAsyncThunk(
  'transacoes/realizarTransferencia',
  async (
    { userId, valor }: { userId: number; valor: number },
    { dispatch }
  ) => {

    await postSaldo(userId, valor); 
    const saldoAtualizado = await getSaldo(userId); 
    dispatch(atualizarSaldoGlobal(saldoAtualizado)); 
  }
);

export const deletarTransacao = createAsyncThunk(
  'transacoes/deletarTransacao',
  async ({ transacaoId, userId }: { transacaoId: number; userId: number }, { dispatch }) => {
    const deletarTransacao = await DeleteTransacao(transacaoId);

    if (deletarTransacao) {
      await dispatch(atualizarSaldo(userId));
      await dispatch(atualizarTransacoes(userId));
    }
  }
);


export const novaTransacaoBanco = createAsyncThunk(
  'transacoes/novaTransacaoBanco',
  async (
    { userId, tipoTransacao, valor, date, anexo }: { userId: number; tipoTransacao: string; valor: number; date: string; anexo?: File },
    { dispatch }
  ) => {
    const transacao: Transacao = { userId, tipoTransacao, valor, date, anexo };
    const result = await postTransacao(transacao);

    if (result) {
      const { payload: transacoesAtualizadas } = await dispatch(atualizarTransacoes(userId));
      return transacoesAtualizadas; 
    }
   
  }

);
export const atualizarTransacaoBanco = createAsyncThunk(
  'transacoes/atualizarTransacaoBanco',
  async (
    { transacaoId, tipoTransacao, valor, date, anexo, userId }: { transacaoId: number; tipoTransacao: string; valor: number; date: string; anexo?: File ; userId: number},
    { dispatch }
  ) => {
    const transacaoAtualizada = { transacaoId, tipoTransacao, valor, date, anexo };
    const result = await putTransacoes(transacaoAtualizada);

    if (result) {
      await dispatch(atualizarSaldo(userId));
      await dispatch(atualizarTransacoes(userId));
    }
    return result
    
  }

)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    atualizarSaldoLocal(state, action: PayloadAction<number>) {
      state.saldo += action.payload; 
    },
    atualizarSaldoGlobal(state, action: PayloadAction<number>) {
      state.saldo = action.payload; 
    },
    novaTransacao(state, action: PayloadAction<Transacao>) {
      state.transacoes.push(action.payload); 
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchDadosIniciais.fulfilled, (state, action) => {
        state.saldo = action.payload.saldo;
        state.transacoes = action.payload.transacoes;
      })
      .addCase(fetchDadosIniciais.rejected, (state, action) => {
        console.error('Erro ao buscar dados iniciais:', action.error.message, state);
      })
      .addCase(atualizarTransacoes.fulfilled, (state, action) => {
        state.transacoes = action.payload.transacoes;
      })
      .addCase(atualizarSaldo.fulfilled, (state, action) => {
        state.saldo = action.payload.saldo;
        console.log('Saldo atualizado pelo banco:', state.saldo);
      })

  },
});

export const {
  atualizarSaldoLocal,
  atualizarSaldoGlobal,
  novaTransacao,
} = transactionSlice.actions;

export default transactionSlice.reducer;