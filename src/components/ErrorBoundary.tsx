import React, { useState, useEffect } from 'react';
import ErrorModal from './ErrorModal';


const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const errorHandler = (event: any) => {
      setHasError(true);
      console.error('Caught error:', event?.error);
    };
    
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  let message = "Oops! Something went wrong. Restart the app and try again."
  if (hasError ) {
    return <ErrorModal message={message}/>
  }

  return <>{children}</>;
};


export default ErrorBoundary;
