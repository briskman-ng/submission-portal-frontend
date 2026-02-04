type Keys = "authToken";

const isBrowser = typeof window !== "undefined";

export const setItem = (key: Keys, data: string) => {
  if (!isBrowser) return;
  sessionStorage.setItem(key, data);
};

export const getItem = (key: Keys) => {
  if (!isBrowser) return null;
  return sessionStorage.getItem(key);
};

export const removeItem = (key: Keys) => {
  if (!isBrowser) return;
  sessionStorage.removeItem(key);
};

export const clearItems = () => {
  if (!isBrowser) return;
  sessionStorage.clear();
};
