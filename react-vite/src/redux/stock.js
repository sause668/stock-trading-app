const SET_STOCK = 'stock/setStock';

const setStock = (stock) => ({
    type: SET_STOCK,
    payload: stock
  });

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
    }
}

const initialState = { stock: null };

function stockReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STOCK:
      return { ...state, stock: action.payload };
    default:
      return state;
  }
}

export default stockReducer;
