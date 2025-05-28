import { useKeyboardMap } from "./useKeyboardMap";

type KeyBinding = {
  up: string[];
  down: string[];
  left: string[];
  right: string[];
};

export function useKeyboardDirection(keyBinding: KeyBinding) {
  const { isPressed } = useKeyboardMap();

  return {
    getDirection() {
      const direction = {
        x: 0,
        y: 0,
      };

      if (keyBinding.up.some((key) => isPressed(key))) {
        direction.y -= 1;
      }
      if (keyBinding.down.some((key) => isPressed(key))) {
        direction.y += 1;
      }
      if (keyBinding.left.some((key) => isPressed(key))) {
        direction.x -= 1;
      }
      if (keyBinding.right.some((key) => isPressed(key))) {
        direction.x += 1;
      }

      const magnitude = Math.sqrt(
        direction.x * direction.x + direction.y * direction.y
      );
      if (magnitude > 0) {
        direction.x /= magnitude;
        direction.y /= magnitude;
      }

      return direction;
    },
  };
}
