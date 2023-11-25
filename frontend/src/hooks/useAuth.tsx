import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  login,
  resetPassword,
  resgitser,
  verifyEmail,
} from "services/auth";
import type { TEmailPassword, TStatus } from "types";

export const useAuth = () => {
  const [status, setStatus] = useState<TStatus>("idle");
  const navigate = useNavigate();

  const registerUser = async ({ email, password }: TEmailPassword) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      resgitser({ email, password })
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setStatus("error");
        })
        .finally(() => setStatus("idle"));
    });
  };

  const verifyUserEmail = async (email: string, otp: string) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      verifyEmail(email, otp)
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setStatus("error");
        })
        .finally(() => setStatus("idle"));
    });
  };

  const loginUser = async ({ email, password }: TEmailPassword) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      login({ email, password })
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
          navigate("/chat/new");
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setStatus("error");
        })
        .finally(() => setStatus("idle"));
    });
  };

  const forgotUserPassword = async (email: string) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      forgotPassword(email)
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setStatus("error");
        })
        .finally(() => setStatus("idle"));
    });
  };

  const resetUserPassword = async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      resetPassword(token, newPassword, confirmPassword)
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setStatus("error");
        })
        .finally(() => setStatus("idle"));
    });
  };
  return {
    registerUser,
    verifyUserEmail,
    loginUser,
    forgotUserPassword,
    resetUserPassword,
    status,
  };
};
