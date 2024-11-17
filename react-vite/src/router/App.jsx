
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../components/HomePage';
import StockPage from '../components/StockPage';
import Layout from './Layout';

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
        path: "stocks",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <h2 style={{"textAlign": "center"}}>Use the search bar above ⬆️ to search for a stock.</h2>
          },
          {
            path: ":symb",
            element: <StockPage />,
          }
        ]
      }
    ]
  }
]);
