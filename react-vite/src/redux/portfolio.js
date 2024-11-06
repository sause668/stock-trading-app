
const CREATE_NEW_PORTFOLIO = 'portfolio/createPortfolio'
const GET_USER_PORTFOLIO = 'portfolio/getuserPorfolios'
const GET_USER_PORTFOLIO_BY_ID = 'portfolio/getUserPortfolioById'
const UPDATE_PORTFOLIO = 'portfolio/updatePortfolio';
const DELETE_PORTFOLIO = 'porfolio/deleteUserPortfolio'


// get current user portfolio thunk
const getUserPorfolio = (portfolio) => ({
    type: GET_USER_PORTFOLIO,
    payload: portfolio
})

// get portfolio for current user by portfolio id thunk
const getUserPorfolioById = (portfolio) => ({
    type: GET_USER_PORTFOLIO_BY_ID,
    payload: portfolio
})

// create a new portfolio thunk
const createPortfolio = (portfolio) => ({
    type: CREATE_NEW_PORTFOLIO,
    payload: portfolio
})

// delete user portfolio thunk
const deleteUserPortfolio = (portfolioId) => ({
    type: DELETE_PORTFOLIO,
    payload: portfolioId
})

//update user portfolio thunk
const updatePortfolio = (portfolio) => ({
    type: UPDATE_PORTFOLIO,
    payload: portfolio
});


// //remove portfolio from store
// export const clearPortfolioDetails = () => {
//     state.portfolio = null
// }


// delete user portfolio action thunk
export const deletePortfolio = (portfolioId) => async (dispatch) => {
    const res = await fetch('/api/portfolio', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    dispatch(deleteUserPortfolio(portfolioId))
    return res

}

// get current user portfolio action thunk
export const userPortfolio = () => async (dispatch) => {

    const res = await fetch(`/api/portfolio`)
    if (!res.ok) {
        const errorData = await res.json()
        if (errorData.message === "Portfolio not found") {
            dispatch(getUserPorfolio({}));
        } else {
            throw new Error(errorData.message || "Failed to fetch portfolio");
        }
    } else {
        const data = await res.json();
        dispatch(getUserPorfolio(data));
    }

}

// get current user portfolio bid id action thunk
export const getPortfolioById = (portfolioId) => async (dispatch) => {

    const res = await fetch(`/api/portfolio/${portfolioId}`)
    if (!res.ok) {
        const errorData = await res.json()
        if (errorData.message === "Portfolio not found") {
            dispatch(getUserPorfolioById({}));
        } else {
            throw new Error(errorData.message || "Failed to fetch portfolio");
        }
    } else {
        const data = await res.json();
        dispatch(getUserPorfolioById(data));
    }
}


// create a new portfolio action thunk
export const newPortfolio = (portfolioData) => async (dispatch) => {
    const { initialBalance } = portfolioData
    let res = await fetch(`/api/portfolio`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            initialBalance
        })
    })
    res = await res.json();
    dispatch(createPortfolio(res))
}


// edit a new portfolio action thunk
export const editPortfolio = (portfolioData) => async (dispatch) => {
    console.log(portfolioData, 'from update')
    const { addAmount } = portfolioData
    console.log(addAmount, 'from update')

    let res = await fetch(`/api/portfolio`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            addAmount
        })
    })
    res = await res.json();
    dispatch(updatePortfolio(res))
}



// portfolio reducer
const initialState = {}


const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PORTFOLIO:
        case GET_USER_PORTFOLIO: {
            return action.payload;
        }
        case GET_USER_PORTFOLIO_BY_ID: {
            return action.payload
        }
        case UPDATE_PORTFOLIO: {
            return action.payload;
        }
        case DELETE_PORTFOLIO: {
            return {};
        }
        default: {
            return state;
        }
    }
};


export default portfolioReducer;
