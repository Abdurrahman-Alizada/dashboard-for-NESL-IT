// #E5E5E5
import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Feedback from './pages/Feedback';
import User from './pages/User';
import DhobiUser from './pages/DhobiUser';
import NotFound from './pages/Page404';
import EmailVerification from './pages/EmailVerification';

// ----------------------------------------------------------------------

export default function Router() {
  // const [count, setCount] = useState(0);
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'dhobies', element: <DhobiUser /> },
        { path: 'Feedback', element: <Feedback /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset/:id/:token', element: <EmailVerification /> },
        { path: '404', element: <NotFound /> },
        // { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
