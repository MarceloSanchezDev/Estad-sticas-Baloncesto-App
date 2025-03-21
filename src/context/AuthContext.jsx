import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (tok, user) => {
    sessionStorage.setItem("token", tok);
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(tok);
    setUser(user);
  };
  const updateUser = (newUserData) => {
    setUser(newUserData);
    sessionStorage.setItem("user", JSON.stringify(newUserData));
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken("");
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
