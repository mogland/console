import { app } from "@states/app";

export function getCookie(key: string) {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().startsWith(`${key}=`));
  const d = cookie ? cookie.split("=")[1] : null;
  app.token = d;
  return d;
}

export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value}`;
  app.token = value;
  return value;
}

export function removeCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
