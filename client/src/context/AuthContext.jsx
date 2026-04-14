import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('secplus_user') || 'null'));

  const saveAuth = (payload) => {
    localStorage.setItem('secplus_token', payload.token);
    localStorage.setItem('secplus_user', JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem('secplus_token');
    localStorage.removeItem('secplus_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, saveAuth, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
