import { createContext, useContext, useState } from "react";
import api from "../api/axios";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, SetUser] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });

    setToken(res.data.data.token);
    SetUser(res.data.data.user);
  };

  const register = async (data) => {
    const res = await api.post("/register", data);

    setToken(res.data.data.token);
    SetUser(res.data.data.user);
  };

  const logout = async () => {
    await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setToken(null);
    SetUser(null);
  };

  return (
        <AuthContext.Provider value={{token, user, login, register, logout}} >
                {children}
        </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);