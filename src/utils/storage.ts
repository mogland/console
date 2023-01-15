export function getStorage(key: string) {
  return localStorage.getItem(key) || null;
}

export function setStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  return value;
}

export function removeStorage(key: string) {
  localStorage.removeItem(key);
}
