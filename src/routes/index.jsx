import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Auth/Login";
import Root from "./Root";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />, 
      children: [
        {
          index: true,
          element: <App />
        },
        {
          path: '/shop',
          element: <h1>Shop</h1>
        }
      ]
    },
    {
      path: '/login',
      element: <Login></Login>
    }
  ])