import { json } from "react-router-dom"


const GET_USER_WATCHLIST = 'watchlist/getUserWatchlist'
const ADD_TO_WATCHLIST = 'watchlist/addToWachlist'
const REMOVE_FROM_WATCHLIST = 'watchlist/remvoeFromWatchlist'

// get current user's watchlist thunk
const getUserWatchlist = (watchlist) => ({
    type: GET_USER_WATCHLIST,
    payload: watchlist
})

// add to current user's watchlist thunk
const addToWachlist = (watchlist) => ({
    type: ADD_TO_WATCHLIST,
    payload: watchlist
})


// remove from current user's watchlist thunk
const remvoeFromWatchlist = (watchlistId) => ({
    type: REMOVE_FROM_WATCHLIST,
    payload: watchlistId
})

// get current user's watchlist action thunk
export const getWatchlist = () => async (dispatch) => {
    const res = await fetch('/api/watchlist')
    if (!res.ok) {
        const errorData = await res.json()
        if (errorData.message === 'No watchlist found') {
            dispatch(getUserWatchlist({}))
        } else {
            throw new Error(errorData.message || "Failed to fetch watchlist");
        }
    } else {
        const data = await res.json()
        dispatch(getUserWatchlist(data))
    }
};

// add stock to current user's watchlist action thunk
export const addItem = (watchlistData) => async (dispatch) => {
    const  {stock}  = watchlistData
    const res = await fetch('/api/watchlist', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            stock
        })
    })
    if(!res.ok){
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to add item to watchlist");
    }
    const data = await res.json()
    dispatch(addToWachlist(data))
}

//remove stock from current user's watchlist action thunk
export const deleteFromWatchlist = (watchlistData) => async (dispatch) => {
    const {stock} = watchlistData
    const res = await fetch('/api/watchlist', {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            stock
        })
    })
    if(!res.ok){
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to remove item from watchlist");
    }
    const data = await res.json()
    dispatch(remvoeFromWatchlist(data))
}

const initialState = {}
const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_WATCHLIST: 
        case ADD_TO_WATCHLIST: {
            return action.payload
        }
        case REMOVE_FROM_WATCHLIST: {
            return action.payload
        }
        default:
            return state
    }
};

export default watchlistReducer;