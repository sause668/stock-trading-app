import { csrfFetch } from './csrf';

import { json } from "react-router-dom"


// const GET_USER_WATCHLIST = 'watchlist/getUserWatchlist'
// const ADD_TO_WATCHLIST = 'watchlist/addToWachlist'
// const REMOVE_FROM_WATCHLIST = 'watchlist/removeFromWatchlist'

const RECEIVE_WATCHLISTS = 'watchlist/receiveWatchlists'
const RECEIVE_WATCHLIST = 'watchlist/receiveWacthlist'
const RECEIVE_WATCHLIST_STOCK = 'watchlist/receiveWatchlistStock'
const REMOVE_WATCHLISTS = 'watchlist/removeWatchlists'
const REMOVE_WATCHLIST = 'watchlist/removeWatchlist'
const REMOVE_WATCHLIST_STOCK = 'watchlist/removeWatchlistStock'

const receiveWatchlists = (watchlists) => ({
    type: RECEIVE_WATCHLISTS,
    watchlists
})

const receiveWatchlist = (watchlist) => ({
    type: RECEIVE_WATCHLIST,
    watchlist
})

// const receiveWatchlistStock = (watchlistStock) => ({
//     type: RECEIVE_WATCHLIST_STOCK,
//     payload: watchlistStock
// })

const removeWatchlists = () => ({
    type: REMOVE_WATCHLISTS
})

const removeWatchlist = () => ({
    type: REMOVE_WATCHLIST
})

// const removeWatchlistStock = () => ({
//     type: REMOVE_WATCHLIST_STOCK
// })



// get current user's watchlist thunk
// const receiveWatchlist = (watchlists) => ({
//     type: RECEIVE_WATCHLISTS,
//     payload: watchlists
// })

// add to current user's watchlist thunk
// const addToWachlist = (watchlist) => ({
//     type: ADD_TO_WATCHLIST,
//     payload: watchlist
// })


// // remove from current user's watchlist thunk
// const remvoeFromWatchlist = (watchlistId) => ({
//     type: REMOVE_FROM_WATCHLIST,
//     payload: watchlistId
// })

// Get watchlists
export const fetchWatchlists = () => async (dispatch) => {
    const response = await csrfFetch("/api/watchlists");
    const data = await response.json();
    dispatch(receiveWatchlists(data));
    return data;
};

// Get watchlist by ID
export const fetchWatchlist = (watchlistId) => async (dispatch) => {
    const response = await csrfFetch(`/api/watchlists/${watchlistId}`);
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    return data;
};

// Create watchlist
export const createWatchlist =  (params) => async (dispatch) => {
    const response = await csrfFetch(`/api/watchlists`, {
        method: 'POST',
        body: JSON.stringify(params)
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    return data;
}

// Edit watchlist
export const editWatchlist =  (params) => async (dispatch) => {
    const { watchlistId, name} = params;
    const response = await csrfFetch(`/api/watchlists/${watchlistId}`, {
        method: 'PUT',
        body: JSON.stringify({name})
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    return data;
}

// Delete watchlist
export const deleteWatchlist =  (watchlistId) => async (dispatch) => {
    const response = await csrfFetch(`/api/watchlists/${watchlistId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(removeWatchlist());
    return data;
}

// Add stock to watchlist
export const addWatchlistStock =  (params) => async (dispatch) => {
    const { watchlistId, name} = params;
    const response = await csrfFetch(`/api/watchlists/${watchlistId}/stocks`, {
        method: 'POST',
        body: JSON.stringify({name})
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    return data;
}

// Remove stock from watchlist
export const removeWatchlistStock =  (params) => async (dispatch) => {
    const { watchlistId, name} = params;
    const response = await csrfFetch(`/api/watchlists/${watchlistId}/stocks`, {
        method: 'DELETE',
        body: JSON.stringify({name})
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    return data;
}

// Remove watchlists
export const removeWatchlistsState =  () => async (dispatch) => {
    dispatch(removeWatchlists());
}

// Remove watchlist
export const removeWatchlistState =  () => async (dispatch) => {
    dispatch(removeWatchlist());
}


// // get user watchlist action thunk
// export const fetchWatchlist = () => async (dispatch) => {
//     const res = await fetch('/api/watchlist')
//     if (!res.ok) {
//         const errorData = await res.json()
//         if (errorData.message === 'No watchlist found') {
//             dispatch(getUserWatchlist({}))
//         } else {
//             throw new Error(errorData.message || "Failed to fetch watchlist");
//         }
//     } else {
//         const data = await res.json()
//         dispatch(getUserWatchlist(data))
//     }
// };

// // add stock to current user's watchlist action thunk
// export const addItem = (watchlistData) => async (dispatch) => {
//     const  {stock}  = watchlistData
//     const res = await fetch('/api/watchlist', {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//             stock
//         })
//     })
//     if(!res.ok){
//         const errorData = await res.json()
//         throw new Error(errorData.message || "Failed to add item to watchlist");
//     }
//     const data = await res.json()
//     dispatch(addToWachlist(data))
// }

// //remove stock from current user's watchlist action thunk
// export const deleteFromWatchlist = (watchlistData) => async (dispatch) => {
//     const {stock} = watchlistData
//     const res = await fetch('/api/watchlist', {
//         method: "DELETE",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             stock
//         })
//     })
//     if(!res.ok){
//         const errorData = await res.json()
//         throw new Error(errorData.message || "Failed to remove item from watchlist");
//     }
//     const data = await res.json()
//     dispatch(remvoeFromWatchlist(data))
// }

const initialState = {
    watchlists: null,
    watchlist: null,
    watchlistStock: null
}

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_WATCHLISTS: {
            return { ...state, watchlists: action.watchlists };
        }
        case RECEIVE_WATCHLIST: {
            return { ...state, watchlist: action.watchlist };
        }
        // case RECEIVE_WATCHLIST_STOCK: {
        //     return { ...state, watchlistStock: action.watchlistStock };
        // }
        case REMOVE_WATCHLISTS: {
            return { ...state, watchlists: null };
        }
        case REMOVE_WATCHLIST: {
            return { ...state, watchlist: null };
        }
        // case REMOVE_WATCHLIST_STOCK: {
        //     return { ...state, watchlistStock: null };
        // }
        default:
            return state
    }
};

// const watchlistReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_USER_WATCHLIST: 
//         case ADD_TO_WATCHLIST: {
//             return action.payload
//         }
//         case REMOVE_FROM_WATCHLIST: {
//             return action.payload
//         }
//         default:
//             return state
//     }
// };

// store.dispatch(sessionActions.signup(params))

export default watchlistReducer;