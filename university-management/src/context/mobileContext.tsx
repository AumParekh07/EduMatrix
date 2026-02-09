import React, { createContext, useContext, useEffect, useState } from "react";

interface MobileContextType { isMobile: boolean }

export const MobileContext = createContext<MobileContextType>({ isMobile: false });

export const MobileProvider: React.FC<{
    children: React.ReactNode;
    breakpoint?: number;
}> = ({ children, breakpoint = 420 }) => {
    const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== "undefined" ? window.innerWidth < breakpoint : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
};

export const useIsMobile = () => useContext(MobileContext);