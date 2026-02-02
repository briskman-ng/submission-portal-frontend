type keys = "authToken";

export const setItem = (key: keys, data: string) => {
  return sessionStorage.setItem(key, data);
};

export const getItem = (key: keys) => {
  return sessionStorage.getItem(key);
};

export const removeItem = (key: keys) => {
  return sessionStorage.removeItem(key);
};

export const clearItems = () => {
  return sessionStorage.clear();
};
