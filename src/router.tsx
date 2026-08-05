import { createBrowserRouter } from "react-router";

import App from "./App";
import { Register } from "./Register/register";
import { Login } from "./Login/login";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
           
            
        ],
    },
   
]);