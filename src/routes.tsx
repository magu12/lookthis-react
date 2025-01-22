import { Routes, Route } from 'react-router-dom';
import { SignIn } from './Pages/SignIn/SignIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Settings } from './Pages/Settings/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}; 