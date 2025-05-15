import { Dispatch, SetStateAction, useRef, useState } from "react";

export function useStateRef<T = unknown>(initData: T): UseStateRefReturn<T> {
  const [state, setState] = useState<T>(initData);
  const stateRef = useRef<T>(state);

  return [
    state,
    (entry) => {
      if (typeof entry === "function") {
        // @ts-expect-error Should be a function
        const updateState = entry(stateRef.current);
        stateRef.current = updateState;

        setState(updateState);
      } else {
        stateRef.current = entry;
        setState(entry);
      }
    },
    () => stateRef.current,
  ];
}

export type UseStateRefReturn<T> = [
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  getState: () => T
];
