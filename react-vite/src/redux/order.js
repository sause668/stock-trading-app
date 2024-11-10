

const RECEIVE_ORDERS = 'order/receiveOrders';
const RECEIVE_ORDER = 'order/receiveOrder';
const REMOVE_ORDER = 'order/removeOrder';
const REMOVE_ORDERS = 'order/removeOrders';

const receiveOrders = (orders) => ({
    type: RECEIVE_ORDERS,
    orders
})

const receiveOrder = (order) => ({
    type: RECEIVE_ORDER,
    order
})

const removeOrders = () => ({
    type: REMOVE_ORDERS
})

const removeOrder = () => ({
    type: REMOVE_ORDER
})


//Thunks
export const fetchOrders = () => async (dispatch) => {
    const response = await fetch("/api/orders");
    const data = await response.json();
    dispatch(receiveOrders(data));
    return data;
};

export const fetchOrder =  (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`);
    const data = await response.json();
    dispatch(receiveOrder(data));
    return response;
}

export const createOrder =  (params) => async (dispatch) => {
    const response = await fetch(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify(params)
    });
    const data = await response.json();
    dispatch(receiveOrder(data));
    return data;
}

export const editOrder =  (params) => async (dispatch) => {
    const { orderId, stock, action, amount, date, repeat} = params;
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({stock, action, amount, date, repeat})
    });
    const data = await response.json();
    dispatch(receiveOrder(data));
    return data;
}

export const deleteOrder =  (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(removeOrder());
    return data;
}

export const removeOrdersState =  () => async (dispatch) => {
    dispatch(removeOrders());
}



// portfolio reducer
const initialState = {
    orders: null,
    order: null
}


const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ORDERS:
            return { ...state, orders: action.orders };
        case RECEIVE_ORDER:
            return { ...state, order: action.order };
        case REMOVE_ORDERS:
            return { ...state, orders: null };
        case REMOVE_ORDER:
            return { ...state, order: null };
        default:
            return state;
    }
};


export default orderReducer;