// UserContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextType {
  userId: string | null;
  setUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const setUser = (id: string) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};