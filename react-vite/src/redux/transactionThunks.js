import { csrfFetch } from './csrf';

import {
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    setLoading,
    setError,
  } from "./transactionSlice";

  import { csrfFetch } from './csrf';
  
  export const getTransactionsThunk = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await csrfFetch("/api/transactions");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      dispatch(fetchTransactions(data.transactions));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const createTransactionThunk = (transaction) => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) throw new Error("Failed to create transaction");
      const data = await response.json();
      dispatch(addTransaction(data.transaction));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  
  export const deleteTransactionThunk = (transactionId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");
      dispatch(deleteTransaction(transactionId));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  