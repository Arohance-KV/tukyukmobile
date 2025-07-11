import React, { createContext, useState } from 'react';

type User = {
  name?: string;
  email?: string;
  phone?: string;
  autoNumber?: string; // ✅ changed
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType>({
  user: {},
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: 'Kunal Kumar Amar',
    phone: '+91 9999999999',
    autoNumber: 'BR01FX1234', // ✅ updated default
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
