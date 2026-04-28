import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const res = await api.get("/api/users/me");
      setUser(res.data.user);
    } catch(error) {
      console.log('Auth check fails',error)
      setUser(null);
    }finally {
    setLoading(false); 
  }
  };

  return (
    <AuthContext.Provider value={{ user,loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);