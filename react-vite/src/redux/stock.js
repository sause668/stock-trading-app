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
