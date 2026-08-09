import { createBrowserRouter } from "react-router";

import App from "./App";
import { Register } from "./Pages/Register/register";
import { Login } from "./Pages/Login/login";
import { Home } from "./Home/home";
import { ForgotPassword } from "./Pages/ForgotPassword/forgotPassword";
import { NotFound } from "./NotFound";
import { VerifyEmail } from "./Pages/VerifyEmail/verify_email";
import ErrorPage from "./ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
                path:"verify_email",
                element:<VerifyEmail/>,
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