import React, { createContext, useState, useContext } from 'react';

const ToggleSidebarContext = createContext();

const ToggleSidebarProvider = ({ children }) => {
    const [sidebarToggled, setSidebarToggled] = useState(false);
    return (
        <ToggleSidebarContext.Provider value={{ sidebarToggled, setSidebarToggled }}>
            {children}
        </ToggleSidebarContext.Provider>
    );
};

export const useToggleSidebar = () => useContext(ToggleSidebarContext);

const BreakpointContext = createContext();

const BreakpointProvider = ({ children }) => {
    const [sidebarBreakpoint, setSidebarBreakpoint] = useState(false);
    return (
        <BreakpointContext.Provider value={{ sidebarBreakpoint, setSidebarBreakpoint }}>
            {children}
        </BreakpointContext.Provider>
    );
}

export const useBreakpointSidebar = () => useContext(BreakpointContext);

export const SidebarProvider = ({ children }) => {
    return (
        <ToggleSidebarProvider>
            <BreakpointProvider>
                {children}
            </BreakpointProvider>
        </ToggleSidebarProvider>
    );
}