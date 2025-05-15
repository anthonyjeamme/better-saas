export type DeviceType =
  | "mac"
  | "windows"
  | "linux"
  | "ios"
  | "android"
  | "tablet"
  | "unknown";

/**
 *
 */
export function getDeviceType(): DeviceType {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipod|ipad/.test(userAgent)) {
    return /ipad/.test(userAgent) ? "tablet" : "ios";
  }

  if (/android/.test(userAgent)) {
    return /tablet|sm-t|gt-p/.test(userAgent) ? "tablet" : "android";
  }

  if (/macintosh|mac os x/.test(userAgent)) {
    return "mac";
  }

  if (/windows|win32|win64/.test(userAgent)) {
    return "windows";
  }

  if (/linux|x11/.test(userAgent)) {
    return "linux";
  }

  return "unknown";
}
