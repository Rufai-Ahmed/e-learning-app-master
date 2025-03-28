import { AlertType, CustomAlert } from '@/components/CustomAlert';
import React, { createContext, useState, useCallback } from 'react';


export interface AlertContextType {
  showAlert: (type: AlertType, message: string, duration?: number) => void;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    type: AlertType;
    message: string;
    duration?: number;
  }>({
    type: 'info',
    message: '',
  });

  const showAlert = useCallback((type: AlertType, message: string, duration?: number) => {
    setAlertConfig({ type, message, duration });
    setVisible(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const value = {
    showAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <CustomAlert
        visible={visible}
        type={alertConfig.type}
        message={alertConfig.message}
        duration={alertConfig.duration}
        onDismiss={handleDismiss}
      />
    </AlertContext.Provider>
  );
}; 