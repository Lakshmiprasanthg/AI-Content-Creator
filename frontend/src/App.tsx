import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" />
  </AuthProvider>
);

export default App;
