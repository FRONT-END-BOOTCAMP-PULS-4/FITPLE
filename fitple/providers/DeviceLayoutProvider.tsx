'use client';

import { DEVICE_BREAKPOINTS, useDeviceSize } from '@/hooks/useDeviceSize';
import React, { createContext, ReactNode, useContext } from 'react';

export const useMobileContainerWidth = () => {
    return useContext(ScreenContext);
};

export const ScreenContext = createContext(DEVICE_BREAKPOINTS.desktop);

export const DeviceLayoutProvider = ({ children }: { children: ReactNode }) => {
    const { innerWidth } = useDeviceSize();

    return (
        <ScreenContext.Provider value={innerWidth}>
            <div
                style={{
                    maxWidth: innerWidth,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {children}
            </div>
        </ScreenContext.Provider>
    );
};
