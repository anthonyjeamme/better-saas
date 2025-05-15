import { useStateRef } from "../useStateRef";

export function useDropzone(
  callback: (e: React.DragEvent<HTMLElement>) => void
) {
  const [isDraggingOver, setIsDraggingOver, getIsDraggingOver] =
    useStateRef(false);
  return {
    isDraggingOver,
    attrs: {
      ["data-dropzone"]: true,
      onDragEnter: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        if (!getIsDraggingOver()) setIsDraggingOver(true);
      },
      onDragLeave: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!target || !relatedTarget) {
          setIsDraggingOver(false);
          return;
        }

        const closestDropzone = relatedTarget.closest("[data-dropzone]");
        if (closestDropzone !== target) {
          setIsDraggingOver(false);
        }
      },
      onDragOver: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
      },
      onDrop: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        callback(e);
      },
    },
  };
}
