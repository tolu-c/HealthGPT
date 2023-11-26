import { ReactNode, createContext, useState } from "react";
import { getToken } from "utils/token";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const userHealthToken = getToken();

  const loginHandler = () => {
    if (userHealthToken) {
      setUserLoggedIn(true);
    }
  };

  const logoutHandler = () => {
    setUserLoggedIn(false);
  };

  const authContextValue = {
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
