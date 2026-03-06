type Keys = "authToken";

// TODO - refactor.

const isBrowser = typeof window !== "undefined";

export const setItem = (key: Keys, data: string) => {
  if (!isBrowser) return;
  return sessionStorage?.setItem(key, data) ?? null;
};

export const getItem = (key: Keys) => {
  if (!isBrowser) return;
  return sessionStorage?.getItem(key) ?? null;
};

export const removeItem = (key: Keys) => {
  if (!isBrowser) return;
  return sessionStorage?.removeItem(key) ?? null;
};

export const clearItems = () => {
  if (!isBrowser) return;
  return sessionStorage?.clear() ?? null;
};
