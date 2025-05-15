type HandleDropOptions = {
  multiple?: boolean;
  accept?: string[];
};

export function handleDrop<T extends HTMLElement = HTMLElement>(
  callback: (e: React.DragEvent<T>) => void,
  options?: HandleDropOptions
) {
  const { multiple = false, accept = [] } = options || {};

  return {
    onDrop: (e: React.DragEvent<T>) => {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      callback(e);
    },
    onDragOver: (e: React.DragEvent<T>) => {
      e.preventDefault();
      console.log("DRAG OVER");
    },
  };
}
