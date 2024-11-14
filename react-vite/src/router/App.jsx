
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import StockPage from '../components/StockPage';
import Layout from './Layout';
import Transactions from '../components/Transactions';

// Create the route tree.
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        element: <Outlet />,
        children: [
          {
            path: ":symb",
            element: <StockPage />,
          }
        ]
      },
      {
        path: "/transactions",  
        element: <Transactions />,
      }
    ],
  },
]);
