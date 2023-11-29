import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type TUser = {
  // userId: string;
  email: string;
  fullname: string;
};
type TUserContextType = {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
};
const initialUser: TUser = {
  fullname: "",
  email: "",
};
const dummySetUser: Dispatch<SetStateAction<TUser>> = () => {};

export const UserContext = createContext<TUserContextType>({
  user: initialUser,
  setUser: dummySetUser,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser>(initialUser);

  const userContextvalue: TUserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContextvalue}>
      {children}
    </UserContext.Provider>
  );
};
