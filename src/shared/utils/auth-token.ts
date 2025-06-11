const TOKEN_KEY = "auth_token";

export const getAuthToken = (): string | undefined => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  return token ?? undefined;
};

export const setAuthToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
