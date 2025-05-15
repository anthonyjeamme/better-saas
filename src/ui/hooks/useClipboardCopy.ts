import { useRef, useState } from "react";

type UseClipboardCopyOptions = {
  delay?: number;
};

/**
 *
 */
export function useClipboardCopy(options?: UseClipboardCopyOptions) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return {
    isCopied,
    copy: (text: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      navigator.clipboard.writeText(text);
      setIsCopied(true);
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, options?.delay ?? 1500);
    },
  };
}
