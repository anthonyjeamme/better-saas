export type CookieOptions = {
  path?: string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  let cookieString = `${name}=${value}`;
  if (options.path) cookieString += `; path=${options.path}`;
  if (options.maxAge !== undefined)
    cookieString += `; max-age=${options.maxAge}`;
  if (options.domain) cookieString += `; domain=${options.domain}`;
  if (options.secure) cookieString += `; secure`;
  if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

  document.cookie = cookieString;
}

export function getCookie<T = string>(name: string) {
  const cookieString = document.cookie;
  const cookie = cookieString
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? (cookie.split("=")[1] as T) : null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}
