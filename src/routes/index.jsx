import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Login from "../pages/auth/Login";
import App from "../pages/App";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />, 
      children: [
        {
          index: true,
          element: <App />
        },
        {
          path: '/shop',
          element: <h1>Shop</h1>
        },
        {
          path: '/login',
          element: <Login/>
        },
      ]
    },
    
  ])