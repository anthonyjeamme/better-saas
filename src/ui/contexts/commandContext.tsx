'use client'

import { HotkeyInput } from "@ui/hooks/useHotkey/useHotkey.types";
import { createContext, useContext } from "react";

type CustomCommands = Record<string, HotkeyInput>
const commandContext = createContext<CustomCommands>({})

export function useCustomCommands() {
    return useContext(commandContext)
}

type CustomCommandsProviderProps = {
    commands: CustomCommands
    children: React.ReactNode
}

export function CustomCommandsProvider({ children, commands }: CustomCommandsProviderProps) {
    return <commandContext.Provider value={commands}>{children}</commandContext.Provider>
}

export function withCustomCommands<T extends object>(Component: React.ComponentType<T>, commands: CustomCommands) {
    return function WithCustomCommands(props: T) {
        return <CustomCommandsProvider commands={commands}>
            <Component {...props} />
        </CustomCommandsProvider>
    }
}

