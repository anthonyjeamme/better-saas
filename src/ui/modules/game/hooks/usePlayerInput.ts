import { useKeyboardDirection } from "./useKeyboardDirection";
import { useGamepadDirection } from "./useGamepadDirection";

type PlayerInputOptions = {
  keyboard: {
    up: string[];
    down: string[];
    left: string[];
    right: string[];
  };
  gamepad: {
    axis: number;
    deadzone?: number;
  };
  priority?: "keyboard" | "gamepad" | "combined";
};

export function usePlayerInput(options: PlayerInputOptions) {
  const keyboard = useKeyboardDirection(options.keyboard);
  const gamepad = useGamepadDirection({
    axis: options.gamepad.axis,
    deadzone: options.gamepad.deadzone,
  });

  return {
    getDirection() {
      const kbDirection = keyboard.getDirection();
      const gpDirection = gamepad.getDirection();

      switch (options.priority) {
        case "keyboard":
          if (Math.abs(kbDirection.x) > 0 || Math.abs(kbDirection.y) > 0) {
            return kbDirection;
          }
          return gpDirection;

        case "gamepad":
          if (Math.abs(gpDirection.x) > 0 || Math.abs(gpDirection.y) > 0) {
            return gpDirection;
          }
          return kbDirection;

        case "combined":
        default:
          return {
            x:
              Math.abs(gpDirection.x) > Math.abs(kbDirection.x)
                ? gpDirection.x
                : kbDirection.x,
            y:
              Math.abs(gpDirection.y) > Math.abs(kbDirection.y)
                ? gpDirection.y
                : kbDirection.y,
          };
      }
    },
  };
}
