import { useStateRef } from "../useStateRef";
import {
  arrayInsert,
  arrayMove,
  arrayRemove,
  arrayReplace,
  arrayUpdate,
} from "./useList.utils";

export function useList<T>(initialItems: T[]) {
  const [items, setItems, getItems] = useStateRef(initialItems);

  return {
    items,
    setItems,
    getItems,
    insert: (item: T, index: number) => {
      setItems(arrayInsert(getItems(), item, index));
    },
    remove: (index: number) => {
      setItems(arrayRemove(getItems(), index));
    },
    move: (from: number, to: number) => {
      setItems(arrayMove(getItems(), from, to));
    },
    clear: () => {
      setItems([]);
    },
    update: (index: number, item: Partial<T>) => {
      setItems(arrayUpdate(getItems(), index, item));
    },
    replace: (index: number, item: T) => {
      setItems(arrayReplace(getItems(), index, item));
    },
    count: () => items.length,
  };
}
