import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { Header } from './Components/Header/Header';
import './App.scss';

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;