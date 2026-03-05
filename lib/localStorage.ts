type keys = "accessToken" | "refreshToken";

export const setItem = (key: keys, data: string) => {
  return localStorage.setItem(key, data);
};

export const getItem = (key: keys) => {
  return localStorage.getItem(key);
};

export const removeItem = (key: keys) => {
  return localStorage.removeItem(key);
};

export const clearItems = () => {
  return localStorage.clear();
};
