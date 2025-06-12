const TOKEN_KEY = "auth_token";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
};

export const getTokenObject = (): TokenResponse | undefined => {
  const tokenObject = sessionStorage.getItem(TOKEN_KEY);
  return tokenObject ? JSON.parse(tokenObject) : undefined;
};

export const getAuthToken = (): TokenResponse | undefined => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  return token ? JSON.parse(token).access_token : undefined;
};

export const setAuthToken = (token: TokenResponse): void => {
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const removeAuthToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
