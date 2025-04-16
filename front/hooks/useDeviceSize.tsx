'use client';

import { useState, useEffect } from 'react';

export const DEVICE_BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1280,
};

type DeviceType = keyof typeof DEVICE_BREAKPOINTS;

export const useDeviceSize = () => {
    const [layoutWidth, setLayoutWidth] = useState(DEVICE_BREAKPOINTS.desktop);

    const getDeviceType = (width: number): DeviceType => {
        if (width < DEVICE_BREAKPOINTS.mobile) return 'mobile';
        if (width < DEVICE_BREAKPOINTS.tablet) return 'tablet';
        return 'desktop';
    };

    useEffect(() => {
        const updateSize = () => {
            const currentWidth = window.innerWidth;
            const type = getDeviceType(currentWidth);

            setLayoutWidth(DEVICE_BREAKPOINTS[type]);
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return { innerWidth: layoutWidth };
};
