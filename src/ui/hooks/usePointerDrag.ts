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

/**
 *
 */
export function usePointerDrag<T extends HTMLElement>() {
  return {
    getPointerHandler(
      callback: (e: StartEvent) => {
        onMove?: (e: MoveEvent) => void;
        onEnd?: (e: EndEvent) => void;
      } | null
    ) {
      const onPointerDown: React.PointerEventHandler<T> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const initial = {
          x: e.clientX,
          y: e.clientY,
        };

        const handler = callback({ initial });

        if (!handler || (!handler?.onMove && !handler?.onEnd)) return;

        function onPointerMove(e: PointerEvent) {
          const delta = {
            x: e.clientX - initial.x,
            y: e.clientY - initial.y,
          };

          handler?.onMove?.({ delta, initial });
        }

        function onEnds() {
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onEnds);
          window.removeEventListener("blur", onEnds);

          const delta = {
            x: e.clientX - initial.x,
            y: e.clientY - initial.y,
          };
          handler?.onEnd?.({ delta, initial });
        }

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onEnds);
        window.addEventListener("blur", onEnds);
      };

      return {
        onPointerDown,
      };
    },
  };
}
