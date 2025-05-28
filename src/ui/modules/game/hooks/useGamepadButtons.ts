import { useEffect } from "react";

type GamepadButtonEvent = {
  buttonIndex: number;
  pressed: boolean;
};

export function useGamepadButtons(
  onEvent?: (event: GamepadButtonEvent) => void
) {
  useEffect(() => {
    if (!onEvent) return;

    let previousButtons: boolean[] = [];

    function checkButtons() {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad && onEvent) {
        gamepad.buttons.forEach((button, index) => {
          if (button.pressed !== previousButtons[index]) {
            onEvent({
              buttonIndex: index,
              pressed: button.pressed,
            });
          }
        });
        previousButtons = gamepad.buttons.map((button) => button.pressed);
      }

      requestAnimationFrame(checkButtons);
    }

    const animationFrame = requestAnimationFrame(checkButtons);
    return () => cancelAnimationFrame(animationFrame);
  }, [onEvent]);

  return {
    isPressed: (buttonIndex: number) => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];
      return gamepad?.buttons[buttonIndex]?.pressed || false;
    },
  };
}
