export function getCookie(key: string) {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((c) => c.trim().startsWith(`${key}=`));
  return cookie ? cookie.split('=')[1] : null;
}

export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value}`;
  return value;
}

export function removeCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}