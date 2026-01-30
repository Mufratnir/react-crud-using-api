import { useState, useContext, createContext } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await api.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      // frontend cleanup (must always run)
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, setUser, setAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
