import { useEffect, useRef } from "react";

import { getCookie, setCookie } from "../functions/cookies/cookies";

import { useStateRef } from "./useStateRef";
import { useAttributeMutationObserver } from "./useMutationObserver";
import { Theme } from "../core/types";

export function useTheme() {
  const [value, setValue, getValue] = useStateRef<Theme>(
    typeof window !== "undefined" ? getCurrentTheme() : "light"
  );
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(getCurrentTheme());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAttributeMutationObserver(
    () => document.documentElement,
    "data-theme",
    (value) => {
      if (value && getValue() !== value && !isInternalUpdate.current) {
        setValue(value as Theme);
      }
    }
  );

  function toggle() {
    const theme = getValue();
    const newTheme = theme === "dark" ? "light" : "dark";

    isInternalUpdate.current = true;
    setValue(newTheme);
    setCookie("theme", newTheme);
    updateDocumentElement(newTheme);

    requestAnimationFrame(() => {
      isInternalUpdate.current = false;
    });
  }

  return {
    value,
    toggle,
  };
}

function getPrefersColorScheme(): Theme {
  if (typeof window === "undefined") return "light";
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches)
    return "dark";
  return "light";
}

function getCurrentTheme(): Theme {
  const cookieTheme = getCookie<Theme>("theme");
  if (cookieTheme) return cookieTheme;
  return getPrefersColorScheme();
}

function updateDocumentElement(theme: Theme) {
  const root = document.documentElement;
  root.className = root.className.replace(/\w+-theme/g, "") + ` ${theme}-theme`;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}
