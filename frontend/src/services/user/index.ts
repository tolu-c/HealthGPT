import AxiosApi from "api";
import { APIS } from "api/api";

export const getUser = async (token: string) => {
  return AxiosApi.get(`${APIS.USER.getUser}`, {
    headers: {
      "x-auth-token": token,
    },
  }).then((res) => {
    return res.data;
  });
};
