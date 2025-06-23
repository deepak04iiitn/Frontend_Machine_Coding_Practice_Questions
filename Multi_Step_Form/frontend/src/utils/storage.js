// storage.js
export const saveToStorage = (key, value, type = "local") => {
  const store = type === "session" ? sessionStorage : localStorage;
  store.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key, type = "local") => {
  const store = type === "session" ? sessionStorage : localStorage;
  const data = store.getItem(key);
  return data ? JSON.parse(data) : {};
};

export const clearStorage = (key, type = "local") => {
  const store = type === "session" ? sessionStorage : localStorage;
  store.removeItem(key);
};
