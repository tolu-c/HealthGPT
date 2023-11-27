import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type TUser = {
  userId: string;
  email: string;
  fullName?: string;
};
type TUserContextType = {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
};
const initialUser: TUser = {
  userId: "",
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
