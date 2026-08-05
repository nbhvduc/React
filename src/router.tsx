import { createBrowserRouter } from "react-router";

import App from "./App";
import { Register } from "./Register/register";
import { Login } from "./Login/login";
import { Home } from "./Home/home";
import { ForgotPassword } from "./ForgotPassword/forgotPassword";
import { NotFound } from "./NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);