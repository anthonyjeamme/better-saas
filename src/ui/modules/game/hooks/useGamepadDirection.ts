import { useEffect, useRef } from "react";

type GamepadBinding = {
  axis: number;
  deadzone?: number;
};

export function useGamepadDirection(gamepadBinding: GamepadBinding) {
  const gamepadRef = useRef<Gamepad | null>(null);

  useEffect(() => {
    function handleGamepadConnected(e: GamepadEvent) {
      gamepadRef.current = e.gamepad;
    }

    function handleGamepadDisconnected() {
      gamepadRef.current = null;
    }

    function updateGamepad() {
      if (gamepadRef.current) {
        const gamepads = navigator.getGamepads();
        const currentGamepad = gamepads[gamepadRef.current.index];
        if (currentGamepad) {
          gamepadRef.current = currentGamepad;
        }
      }
      requestAnimationFrame(updateGamepad);
    }

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);
    requestAnimationFrame(updateGamepad);

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnected
      );
    };
  }, []);

  return {
    getDirection() {
      const currentGamepad = gamepadRef.current;
      if (!currentGamepad) {
        return { x: 0, y: 0 };
      }

      const deadzone = gamepadBinding.deadzone ?? 0.1;
      const direction = {
        x: 0,
        y: 0,
      };
      const x = currentGamepad.axes[gamepadBinding.axis * 2] ?? 0;
      const y = currentGamepad.axes[gamepadBinding.axis * 2 + 1] ?? 0;

      if (Math.abs(x) > deadzone) {
        direction.x = x;
      }
      if (Math.abs(y) > deadzone) {
        direction.y = y;
      }

      return direction;
    },
  };
}
