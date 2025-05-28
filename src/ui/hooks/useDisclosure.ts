"use client";

import { useCallback, useState } from "react";
import { useCallbackRef } from "./useCallbackRef";

export type UseDisclosureProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
};

/**
 *
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
  const handleOpen = useCallbackRef(props.onOpen);
  const handleClose = useCallbackRef(props.onClose);

  const [openState, setOpen] = useState(props.defaultOpen || false);

  const isOpen = props.open !== undefined ? props.open : openState;
  const controlled = props.open !== undefined;

  const open = useCallback(() => {
    if (!controlled) setOpen(true);
    handleOpen?.();
  }, [controlled, handleOpen]);

  const close = useCallback(() => {
    if (!controlled) setOpen(false);
    handleClose?.();
  }, [controlled, handleClose]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
