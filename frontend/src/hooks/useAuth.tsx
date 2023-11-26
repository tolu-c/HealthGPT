import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  login,
  logout,
  resendOtp,
  resetPassword,
  resgitser,
  verifyEmail,
} from "services/auth";
// import { AuthContext } from "store/AuthContext";
import type { TLogin, TRegister, TStatus } from "types";
import { removeToken } from "utils/token";

export const useAuth = () => {
  const [status, setStatus] = useState<TStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // const { login: ALogin, logout: ALogout } = useContext(AuthContext);

  const registerUser = async ({ email, password, fullName }: TRegister) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      resgitser({ email, password, fullName })
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

  const loginUser = async ({ email, password }: TLogin) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      login({ email, password })
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
          // ALogin();
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setError(error.response.data.message);
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

  const resendUserOtp = async (email: string) => {
    return new Promise((resolve) => {
      setStatus("fetching");

      resendOtp(email)
        .then((res) => {
          resolve(res);
          // ? show notifcation
          setStatus("success");
        })
        .catch((error) => {
          // ? show error notifcation => console.log(error.response.data.message);
          console.log(error.response.data.message);
          setError(error.response.data.message);
          setStatus("error");
        })
        .finally(() => setStatus("idle"));
    });
  };

  const logoutUser = async () => {
    return new Promise((resolve) => {
      setStatus("fetching");

      logout()
        .then((res) => {
          resolve(res);
          removeToken();
          // ALogout();
          navigate("/");
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
    resendUserOtp,
    logoutUser,
    status,
    error,
  };
};
