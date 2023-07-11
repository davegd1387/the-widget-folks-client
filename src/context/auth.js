import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
const LOGOUT_URL = "/protected/logout";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (data) => {
    setUser(data);
  };
  // const logout = () => {
  //   console.log(`inside auth.logout`);
  //   setUser(null);
  // };
  const logout = async () => {
    console.log(`inside auth.logout`);
    try {
      const response = await axios.get(LOGOUT_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(`response.data: ${JSON.stringify(response?.data)}`);
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
