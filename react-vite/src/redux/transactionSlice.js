const initialState = {
    transactions: [],
    loading: false,
    error: null,
  };
  
  // Action Types
  const FETCH_TRANSACTIONS = "transactions/FETCH_TRANSACTIONS";
  const ADD_TRANSACTION = "transactions/ADD_TRANSACTION";
  const DELETE_TRANSACTION = "transactions/DELETE_TRANSACTION";
  const SET_LOADING = "transactions/SET_LOADING";
  const SET_ERROR = "transactions/SET_ERROR";
  
  // Action Creators
  export const fetchTransactions = (transactions) => ({
    type: FETCH_TRANSACTIONS,
    transactions,
  });
  
  export const addTransaction = (transaction) => ({
    type: ADD_TRANSACTION,
    transaction,
  });
  
  export const deleteTransaction = (transactionId) => ({
    type: DELETE_TRANSACTION,
    transactionId,
  });
  
  export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading,
  });
  
  export const setError = (error) => ({
    type: SET_ERROR,
    error,
  });
  
  // Reducer
  const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS:
        return { ...state, transactions: action.transactions, loading: false };
      case ADD_TRANSACTION:
        return { ...state, transactions: [...state.transactions, action.transaction] };
      case DELETE_TRANSACTION:
        return {
          ...state,
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== action.transactionId
          ),
        };
      case SET_LOADING:
        return { ...state, loading: action.loading };
      case SET_ERROR:
        return { ...state, error: action.error };
      default:
        return state;
    }
  };
  
  export default transactionReducer;
  