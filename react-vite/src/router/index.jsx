
import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import StockPage from '../components/StockComponent';
import Layout from './Layout';
import Watchlist from '../components/Watchlist';
import Transactions from '../components/Transactions';

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
        path: "stocks/:symb",
        element: <StockPage />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/transactions",  
        element: <Transactions />,
      }
    ],
  },
]);
