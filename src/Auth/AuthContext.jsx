import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AXIOS_API from "../Api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  console.log("auth provider is mounting.....");
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      console.log("use effect working....");
      
      try {
        const response = await AXIOS_API.get("/api/v1/user/checkAuth");

        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth Fetch Error:", error);
        setUser(null);
      } finally {
        console.log("fetch is done");
        setIsLoading(false);
      }
    };
      verifyUser()
  },[]);



  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
