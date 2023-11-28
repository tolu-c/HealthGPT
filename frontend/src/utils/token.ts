import { TUser } from "store/userContext";

export const getToken = (): string | null => {
  return localStorage.getItem("userHealthToken");
};

export const removeToken = (): void => {
  localStorage.removeItem("userHealthToken");
};

export const getUser = (): TUser => {
  return JSON.parse(localStorage.getItem("healthUser")!);
};
