import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Des from './components/UserPanle/Des';
import Admin from './components/Admin/Admin';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Des />
      },
      {
        path: "/expense",
        element: <App />
      }
    ]
  },
  {
    path:"/sign-up",
    element: <SignUp/>,
  },
  {
    path:"/sign-in",
    element: <SignIn/>,
  },
  {
    path:"/admin",
    element: <Admin />
  },
 

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


