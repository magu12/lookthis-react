import { Routes, Route } from 'react-router-dom';
import { SignIn } from './Pages/SignIn/SignIn';
import { SignUp } from './Pages/SignUp/SignUp';
import { ForgotPassword } from './Pages/ForgotPassword/ForgotPassword';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Settings } from './Pages/Settings/Settings';
import { NotFound } from './Pages/NotFound/NotFound';
import CreateArticle from './Pages/CreateArticle/CreateArticle';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-article" 
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        } 
      />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}; 