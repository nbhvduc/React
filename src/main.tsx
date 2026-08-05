import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";

import { router } from "./router.tsx";
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
