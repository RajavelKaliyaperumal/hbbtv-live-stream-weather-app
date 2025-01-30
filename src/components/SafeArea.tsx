import React from 'react';

// Define the type for the children prop
interface SafeAreaProps {
    children: React.ReactNode;
  }
  
const SafeArea: React.FC<SafeAreaProps> = ({ children }) => {
    return (
      <div id="safe_area">
        {children}
      </div>
    );
  };

export default SafeArea;