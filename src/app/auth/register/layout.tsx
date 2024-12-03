// src/app/auth/layout.tsx
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        {children}
      
    </div>
  );
};

export default AuthLayout;
