import React, { useState, useEffect } from 'react';

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const errorHandler = (event: any) => {
      setHasError(true);
      setError(event.error || '')
      console.error('Caught error:', event.error);
    };
    
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong. ${error}</h1>;
  }

  return <>{children}</>;
};


export default ErrorBoundary;
