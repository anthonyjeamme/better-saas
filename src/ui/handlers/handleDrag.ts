import React from "react";
import { Handler } from "./combineHandlers";

type Position = {
  x: number;
  y: number;
};

type StartEvent = {
  initial: Position;
};

type MoveEvent = {
  delta: Position;
  initial: Position;
};

type EndEvent = {
  delta: Position;
  initial: Position;
};

type CallbackReturn = {
  onMove?: (e: MoveEvent, originalEvent: PointerEvent) => void;
  onEnd?: (e: EndEvent, originalEvent: PointerEvent | FocusEvent) => void;
};

type CallbackFunction<T extends HTMLElement = HTMLElement> = (
  e: StartEvent,
  originalEvent: React.PointerEvent<T>
) => CallbackReturn | null | undefined | void;

/**
 *
 */
export function handleDrag<T extends HTMLElement = HTMLElement>(
  callback: CallbackFunction<T>
): Handler<T> {
  return {
    onPointerDown: (e: React.PointerEvent<T>) => {
      const initial = {
        x: e.clientX,
        y: e.clientY,
      };

      let lastPointerPosition = {
        ...initial,
      };

      const handler = callback({ initial }, e);

      if (!handler || (!handler?.onMove && !handler?.onEnd)) return;

      function onPointerMove(e: PointerEvent) {
        lastPointerPosition = {
          x: e.clientX,
          y: e.clientY,
        };

        const delta = {
          x: e.clientX - initial.x,
          y: e.clientY - initial.y,
        };

        handler?.onMove?.({ delta, initial }, e);
      }

      function onEnds(e: PointerEvent | FocusEvent) {
        const delta = {
          x: lastPointerPosition.x - initial.x,
          y: lastPointerPosition.y - initial.y,
        };

        handler?.onEnd?.({ delta, initial }, e);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onEnds);
        window.removeEventListener("blur", onEnds);
      }

      if (handler?.onMove)
        window.addEventListener("pointermove", onPointerMove);

      window.addEventListener("pointerup", onEnds);
      window.addEventListener("blur", onEnds);
    },
  };
}
