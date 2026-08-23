import { createBrowserRouter } from "react-router";

import App from "./App";
import { Register } from "./Pages/Register/register";
import { Login } from "./Pages/Login/login";
import { Home } from "./Home/home";
import { ForgotPasswordPage } from "./Pages/ForgotPassword/forgotPassword";
import { NotFound } from "./NotFound";
import { VerifyEmail } from "./Pages/VerifyEmail/verify_email";
import ErrorPage from "./ErrorPage";
import { InputOTP } from "./Pages/ForgotPassword/inputOTP";
import { CreateNewPassword } from "./Pages/ForgotPassword/CreateNewPassword";
import { Salary } from "./Salary/Salary";

import { SearchUser } from "./useEffect";

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
        path: "/verify_email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/inputOTP",
        element: <InputOTP />,
      },
      {
        path: "/CreateNewPassword",
        element: <CreateNewPassword />,
      },
      {
        path: "/salary",
        element: <Salary />,
      },
      {
        path: "/useEffect",
        element: <SearchUser />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
