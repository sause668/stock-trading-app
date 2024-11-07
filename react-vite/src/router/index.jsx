import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import StockPage from '../components/StockComponent';
import StockSearchPage from '../components/StockSearchPage';
import Layout from './Layout';
import Watchlist from '../components/Watchlist';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "stocks",
        element: <StockSearchPage />,
      },
      {
        path: "stocks/:symb",
        element: <StockPage />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      }
    ],
  },
]);
