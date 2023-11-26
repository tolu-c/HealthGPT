export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  fullName: string;
  email: string;
  password: string;
};

export type TStatus = "fetching" | "success" | "error" | "idle";
