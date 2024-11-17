import { csrfFetch } from './csrf';
import { getCurrentPortfolio, newPortfolio } from './portfolio'; // Import portfolio thunks

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});


export const thunkAuthenticate = () => async (dispatch) => {
  const response = await csrfFetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));

    // should ensure user has a portfolio
    const portfolioResponse = await fetch(`/api/portfolio`);
    if (!portfolioResponse.ok) {
      // If no portfolio exists, create one
      await dispatch(newPortfolio({ initialBalance: 1000 })); // Default initial balance
    } else {
      const portfolioData = await portfolioResponse.json();
      dispatch(getCurrentPortfolio(portfolioData));
    }
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  try {
    const response = await csrfFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    
    if(response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }

  } catch (error) {
    let res = await error.json()
    return res
  }
  
};

export const thunkSignup = (user) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  
    if(response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
  
      // Automatically create a portfolio for the new user
      await dispatch(newPortfolio({ initialBalance: 1000 })); // Default initial balance
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    let res = await error.json()
    return res
  }
  
};

export const thunkLogout = () => async (dispatch) => {
  await csrfFetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
