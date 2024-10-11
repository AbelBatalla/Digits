import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Play from "./Components/Pages/Play";
import Other from "./Components/Pages/Other";
import Home from "./Components/Pages/Home";
import Login from "./Components/Auth/Login/Login";
import Users from "./Components/Auth/Users";
import Register from "./Components/Auth/Register/Register";
import Stats from "./Components/Pages/Stats/Stats";
import ProfileScreen from "./Components/Profiles/ProfileScreen";
import NotFoundPage from "./Components/Pages/NotFound/NotFoundPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'digits',
                element: <Play />,
            },
            {
                path: 'info',
                element: <Other />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'auth',
                element: <Users />,
            },
            {
                path: 'stats',
                element: <Stats />,
            },
            {
                path: 'profile/:profileName',
                element: <ProfileScreen />,
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

