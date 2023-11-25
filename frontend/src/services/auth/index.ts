import AxiosApi from "api";
import { APIS } from "api/api";
import type { TEmailPassword } from "types";

export const resgitser = async ({ email, password }: TEmailPassword) => {
  return AxiosApi.post(`${APIS.AUTH.regsiter}`, { email, password }).then(
    (res) => {
      return res.data;
    }
  );
};

export const verifyEmail = async (email: string, otp: string) => {
  return AxiosApi.post(`${APIS.AUTH.verifyEmail}`, { email, otp }).then(
    (res) => {
      return res.data;
    }
  );
};

export const login = async ({ email, password }: TEmailPassword) => {
  return await AxiosApi.post(`${APIS.AUTH.login}`, { email, password }).then(
    (res) => {
      if (res?.data.token) {
        localStorage.setItem("userHealthToken", res.data.token);
      }
      return res.data;
    }
  );
};

export const forgotPassword = async (email: string) => {
  return await AxiosApi.post(`${APIS.AUTH.forgotPassword}`, { email }).then(
    (res) => {
      return res.data;
    }
  );
};

export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  return await AxiosApi.post(`${APIS.AUTH.resetPassword}`, {
    token,
    newPassword,
    confirmPassword,
  }).then((res) => {
    return res.data;
  });
};
