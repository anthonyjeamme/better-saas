import { useEffect } from "react";

export function usePasteFile(callback: (files: File[]) => void) {
  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      if (!e.clipboardData) return;
      if (!e.clipboardData.types.includes("Files")) return;

      const files = Array.from(e.clipboardData.files);

      callback(files);
    }

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [callback]);
}
