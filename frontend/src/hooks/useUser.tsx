import { useContext } from "react";
import { getUser } from "services/user";
import { UserContext } from "store/userContext";

export const useUser = () => {
  const { setUser } = useContext(UserContext!);

  const getLoggedInUser = (token: string) => {
    return new Promise((resolve) => {
      getUser(token)
        .then((res) => {
          setUser(res);
          // console.log(res);
          resolve(res);
          // return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return { getLoggedInUser };
};
