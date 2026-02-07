import { createContext } from "react";

interface SidebarToggleContextType {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
}


export const SidebartoggelContext = createContext<SidebarToggleContextType>({ collapsed: false, setCollapsed: () => { }, });