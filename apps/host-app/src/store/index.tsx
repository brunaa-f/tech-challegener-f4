import { configureStore } from "@reduxjs/toolkit";
import  transaction from "../features/transactions/transactionSlice"
import  filterTransaction from "../features/FilterTransactions/filterTransactions"

const store = configureStore({
    reducer: {
        transaction,
        filterTransaction
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;