import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('success');

  const showAlert = (message: string, type: AlertType) => {
    setMessage(message);
    setAlertType(type);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}; 