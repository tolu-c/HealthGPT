export const getToken = (): string | null => {
  return localStorage.getItem("userHealthToken");
};

export const removeToken = (): void => {
  localStorage.removeItem("userHealthToken");
};
