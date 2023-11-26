const api = process.env.REACT_APP_API;

export const APIS = {
  AUTH: {
    regsiter: `${api}/signup`,
    login: `${api}/login`,
    forgotPassword: `${api}/forgot-password`,
    verifyEmail: `${api}/verify-email`,
    resetPassword: `${api}/reset-password`,
    resendOtp: `${api}/resend-otp`,
    logout: `${api}/logout`,
  },
  CHAT: {},
};
