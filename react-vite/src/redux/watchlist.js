import { csrfFetch } from './csrf';

const RECEIVE_WATCHLISTS = 'watchlist/receiveWatchlists'
const RECEIVE_WATCHLIST = 'watchlist/receiveWacthlist'
const REMOVE_WATCHLISTS = 'watchlist/removeWatchlists'
const REMOVE_WATCHLIST = 'watchlist/removeWatchlist'


const receiveWatchlists = (watchlists) => ({
    type: RECEIVE_WATCHLISTS,
    watchlists
})

const receiveWatchlist = (watchlist) => ({
    type: RECEIVE_WATCHLIST,
    watchlist
})

const removeWatchlists = () => ({
    type: REMOVE_WATCHLISTS
})

const removeWatchlist = () => ({
    type: REMOVE_WATCHLIST
})

// get current user's watchlist thunk

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
    console.log(params)
    const response = await csrfFetch(`/api/watchlists`, {
        method: 'POST',
        body: JSON.stringify(params)
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    dispatch(fetchWatchlists());
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
    dispatch(fetchWatchlists());
    return data;
}

// Delete watchlist
export const deleteWatchlist =  (watchlistId) => async (dispatch) => {
    const response = await csrfFetch(`/api/watchlists/${watchlistId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(removeWatchlist());
    dispatch(fetchWatchlists());
    return data;
}

// Add stock to watchlist
export const addWatchlistStock =  (watchlistId, name) => async (dispatch) => {

    const response = await csrfFetch(`/api/watchlists/${watchlistId}/stocks`, {
        method: 'POST',
        body: JSON.stringify({name})
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    dispatch(fetchWatchlists());
    return data;
}

// Remove stock from watchlist
export const removeWatchlistStock =  (watchlistId, name) => async (dispatch) => {
    
    const response = await csrfFetch(`/api/watchlists/${watchlistId}/stocks`, {
        method: 'DELETE',
        body: JSON.stringify({name})
    });
    const data = await response.json();
    dispatch(receiveWatchlist(data));
    dispatch(fetchWatchlists());
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

const initialState = {
    watchlist: null,
    watchlists: null
}

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_WATCHLISTS: {
            return { ...state, watchlists: action.watchlists };
        }
        case RECEIVE_WATCHLIST: {
            return { ...state, watchlist: action.watchlist };
        }
        case REMOVE_WATCHLISTS: {
            return { ...state, watchlists: null };
        }
        case REMOVE_WATCHLIST: {
            return { ...state, watchlist: null };
        }
        default:
            return state
    }
};

export default watchlistReducer;
