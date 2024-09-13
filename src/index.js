import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Play from "./Components/Pages/Play";
import Other from "./Components/Pages/Other";
import Home from "./Components/Pages/Home";
import NotFoundPage from "./Components/Pages/NotFound/NotFoundPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'digits',
                element: <Play />,
            },
            {
                path: 'other',
                element: <Other />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

