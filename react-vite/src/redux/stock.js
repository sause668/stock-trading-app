const SET_STOCK = 'stock/setStock';
const SET_USER_STOCKS = 'stocks/setUserStocks'
const DELETE_STOCK = 'stocks/deleteUserStock'
const CLEAR_STOCKS = 'stocks/clearStocks'

//set the current stock in the store
const setStock = stock => ({
    type: SET_STOCK,
    payload: stock
  });
//set all current user stocks in store
const setUserStocks = stocks => ({
  type: SET_USER_STOCKS,
  payload: stocks
})
//remove a stock from the user stocks
const deleteUserStock = stock => ({
  type: DELETE_STOCK,
  payload: stock
})

//clear stock and stocks from store
export const clearStocks = () => ({
  type: CLEAR_STOCKS
})

// thunk that fetches stock
export const getStock = (stock) => async (dispatch) => {
	const response = await fetch(`/api/stocks/${stock}`);
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setStock(data));
	}
};
//thunk that fetches all stocks for current user
export const getUserStocks = () => async (dispatch) => {
  const res = await fetch(`/api/stocks/current`)
  if (res.ok) {
		const data = await res.json();
		if (data.errors) {
			return;
		}
		dispatch(setUserStocks(data));
	}
};
//purchase a stock
export const buyStock = (stock, amt) => async () => {
  const res = await fetch(`/api/stocks/${stock.symbol}`, 
    {
    method: 'POST',
    body: JSON.stringify({amount: amt})
    })
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return;
      }
      return data
    }
}
//update stock will work for buy or sell using action
export const updateStock = (stock, amount, action) => async (dispatch) => {
  const res = await fetch(`/api/stocks/${stock.symbol}`, 
    {
    method: 'PUT',
    body: JSON.stringify({
      amount,
      action
    })})
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return;
      }
      dispatch(setStock(data));
    }
}
// Sell stock
export const sellStock = (symb) => async (dispatch) => {
  const res = await fetch(`/api/stocks/${symb}`, 
    {
    method: 'DELETE',
    })
    const data = await res.json();
    dispatch(deleteUserStock(symb))
    return data
}

const initialState = { stock: null, stocks: []};

function stockReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOCK:
      return { ...state, stock: action.payload };
    case SET_USER_STOCKS:
      return { ...state, stocks: action.payload };
    case DELETE_STOCK:
      return { ...state, stocks: state.stocks.filter(stock => stock.name !== action.payload)};
    case CLEAR_STOCKS:
      return {...state, stock: null, stocks: []}
    default:
      return state;
  }
}

export default stockReducer;
