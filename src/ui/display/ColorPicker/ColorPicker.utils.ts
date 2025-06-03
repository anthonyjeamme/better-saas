import { HSLAColor, HSVaColor } from "./ColorPicker.types";

export function hsvaToHex(hsva: HSVaColor): string {
  const hsla = hsvaToHsla(hsva);
  const rgba = hslaToRgba(hsla);
  return rgbaToHex(rgba);
}

export function hsvaToRgba(hsva: HSVaColor): RGBAColor {
  const hsla = hsvaToHsla(hsva);
  return hslaToRgba(hsla);
}

export function hslaToHex(hsla: HSLAColor): string {
  const rgba = hslaToRgba(hsla);
  return rgbaToHex(rgba);
}

export function rgbaToHSVa(rgba: RGBAColor): HSVaColor {
  const hsla = rgbaToHSLa(rgba);
  return HSLaToHSVa(hsla);
}

export function hsvaToHsla({
  hue,
  saturation,
  value,
  alpha,
}: HSVaColor): HSLAColor {
  const l = (value * (2 - saturation)) / 2;

  let s;
  if (saturation === 0 || value === 0) {
    s = 0;
  } else {
    const denominator = Math.min(l, 1 - l);
    s = denominator === 0 ? 0 : (value - l) / denominator;
  }

  return {
    hue,
    saturation: s * 100,
    lightness: l * 100,
    alpha,
  };
}

export type RGBAColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export function hslaToRgba({
  hue,
  saturation,
  lightness,
  alpha,
}: HSLAColor): RGBAColor {
  // Normaliser les valeurs
  const h = hue; // Suppose que hue est déjà dans [0, 1]
  const s = saturation / 100; // Convertir [0, 100] en [0, 1]
  const l = lightness / 100; // Convertir [0, 100] en [0, 1]

  let r, g, b;

  if (s === 0) {
    // Couleur achromatique (gris)
    r = g = b = l;
  } else {
    // Fonction auxiliaire pour calculer les composantes RGB
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convertir en valeurs 0-255 pour RGB
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: alpha,
  };
}

export function rgbaToHex({ r, g, b, a }: RGBAColor) {
  const toHex = (value: number) => value.toString(16).padStart(2, "0");

  const COLOR = `${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (a === 1) {
    return `#${COLOR}`;
  }

  const ALPHA = toHex(Math.round(a * 255));

  return `#${COLOR}${ALPHA}`;
}

export function hexToRgba(hex: string): RGBAColor {
  const cleanHex = hex.replace("#", "");

  let r: number,
    g: number,
    b: number,
    a: number = 255;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 4) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    a = parseInt(cleanHex[3] + cleanHex[3], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else if (cleanHex.length === 8) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
    a = parseInt(cleanHex.slice(6, 8), 16);
  } else {
    throw new Error(`Format hexadécimal invalide: ${hex}`);
  }

  return { r, g, b, a: a / 255 };
}

export function rgbaToHSLa({ r, g, b, a }: RGBAColor): HSLAColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  const lightness = (max + min) / 2;

  let saturation = 0;
  if (delta !== 0) {
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  }

  let hue = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      hue = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
    } else if (max === gNorm) {
      hue = ((bNorm - rNorm) / delta + 2) / 6;
    } else {
      hue = ((rNorm - gNorm) / delta + 4) / 6;
    }
  }

  return {
    hue,
    saturation: saturation * 100,
    lightness: lightness * 100,
    alpha: a,
  };
}

export function HSLaToHSVa(hsla: HSLAColor): HSVaColor {
  const { hue, saturation, lightness, alpha } = hsla;

  const l = lightness / 100;
  const s = saturation / 100;

  const value = l + s * Math.min(l, 1 - l);

  let saturationHsv = 0;
  if (value !== 0) {
    saturationHsv = 2 * (1 - l / value);
  }

  return {
    hue,
    saturation: saturationHsv,
    value,
    alpha,
  };
}

export function isValidHex(hex: string): boolean {
  if (!hex.startsWith("#")) {
    return false;
  }

  const cleanHex = hex.slice(1);
  const validLengths = [3, 6, 8];

  if (!validLengths.includes(cleanHex.length)) {
    return false;
  }

  const hexPattern = /^[0-9a-fA-F]+$/;
  return hexPattern.test(cleanHex);
}

export function hexToHSVa(hex: string): HSVaColor {
  const rgba = hexToRgba(hex);
  const hsla = rgbaToHSLa(rgba);
  return HSLaToHSVa(hsla);
}

export function parseColor(color?: string): HSVaColor {
  if (color && isValidHex(color)) {
    return hexToHSVa(color);
  }

  return hexToHSVa("#ff0000");
}

export function hsvaEquals(hsva1: HSVaColor, hsva2: HSVaColor): boolean {
  return (
    hsva1.hue === hsva2.hue &&
    hsva1.saturation === hsva2.saturation &&
    hsva1.value === hsva2.value &&
    hsva1.alpha === hsva2.alpha
  );
}
