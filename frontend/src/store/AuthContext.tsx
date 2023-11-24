import { ReactNode, createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const loginHandler = () => {
    setUserLoggedIn(true);
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
