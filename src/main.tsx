import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";

import { router } from "./router.tsx";
import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <App />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)