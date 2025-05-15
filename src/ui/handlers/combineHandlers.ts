import React from "react";

type AnyEventHandler<T> =
  | React.ClipboardEventHandler<T>
  | React.CompositionEventHandler<T>
  | React.DragEventHandler<T>
  | React.FocusEventHandler<T>
  | React.FormEventHandler<T>
  | React.ChangeEventHandler<T>
  | React.KeyboardEventHandler<T>
  | React.MouseEventHandler<T>
  | React.TouchEventHandler<T>
  | React.PointerEventHandler<T>
  | React.UIEventHandler<T>
  | React.WheelEventHandler<T>
  | React.AnimationEventHandler<T>
  | React.ToggleEventHandler<T>
  | React.TransitionEventHandler<T>;

export type Handler<T = HTMLElement> = Omit<
  React.DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

type HandlerKeys<T> = keyof Handler<T>;

/**
 *
 */
export function handlers<T = HTMLElement>(...handlers: Handler<T>[]) {
  const combinedHandlers: Partial<
    Record<HandlerKeys<T>, AnyEventHandler<T>[]>
  > = {};

  for (const handler of handlers) {
    for (const _eventName in handler) {
      const eventName = _eventName as HandlerKeys<T>;

      if (handler[eventName]) {
        if (!combinedHandlers[eventName]) {
          combinedHandlers[eventName] = [];
        }

        const func = handler[eventName]!;
        combinedHandlers[eventName].push(func);
      }
    }
  }

  return Object.entries(combinedHandlers).reduce<Handler<T>>(
    (acc, [eventName, handlers]) => {
      return {
        ...acc,
        [eventName]: (e: AnyEventHandler<T>) => {
          console.log(eventName, handlers);
          for (const handler of handlers) {
            (handler as (e: unknown) => void)(e);
          }
        },
      };
    },
    {}
  );
}
