let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const setRefreshToken = (token: string) => {
  refreshToken = token;
};

export const getRefreshToken = () => {
  return refreshToken;
};

export const clearRefreshToken = () => {
  refreshToken = null;
};
