import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProtectedRoute, AuthRoute } from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';

const Layout: React.FC = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pb-20 pt-6">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
      },
      {
        path: '/history',
        element: <ProtectedRoute><HistoryPage /></ProtectedRoute>
      },
      {
        path: '/login',
        element: <AuthRoute><LoginPage /></AuthRoute>
      },
      {
        path: '/register',
        element: <AuthRoute><RegisterPage /></AuthRoute>
      }
    ]
  }
]);

export default router;
