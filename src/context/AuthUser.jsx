import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to use the context
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Helper function to get token from localStorage
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("currentUser");
  return token ? token : null;
};

// Provider component
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(getTokenFromLocalStorage());

  // Sync state with localStorage when authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("token", authUser);
    } else {
      localStorage.removeItem("token");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
