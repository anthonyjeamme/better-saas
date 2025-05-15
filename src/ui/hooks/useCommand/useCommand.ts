import { useCustomCommands } from "@ui/contexts/commandContext";
import { useHotkey } from "../useHotkey/useHotkey";
import { UseHotkeyOptions } from "../useHotkey/useHotkey.types";
import { Command } from "./useCommand.types";
import { COMMAND_SHORTCUTS, MAC_COMMAND_SHORTCUTS } from "./useCommand.utils";

/**
 *
 */
export function useCommand<TCustomCommands extends string = string>(
  command: Command | TCustomCommands,
  callback: (e: KeyboardEvent) => void,
  options?: UseHotkeyOptions
) {
  const customCommands = useCustomCommands();

  function findHandler() {
    if (options?.disabled) return null;
    if (customCommands[command]) {
      return customCommands[command];
    }

    if (COMMAND_SHORTCUTS[command as Command]) {
      return {
        default: COMMAND_SHORTCUTS[command as Command],
        mac: MAC_COMMAND_SHORTCUTS[command as Command],
      };
    }

    return null;
  }

  useHotkey(findHandler(), callback, options);
}
