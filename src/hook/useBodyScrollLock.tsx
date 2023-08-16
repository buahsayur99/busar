import { useRef } from "react";

type UseBodyScrollLockReturn = {
    toggle: (event: boolean) => void
};

export const useBodyScrollLock = (): UseBodyScrollLockReturn => {
    const bodyStyle = document.body.style;
    const isLockedRef = useRef(false);

    const toggle = (event: boolean) => {
        isLockedRef.current = event;
        bodyStyle.overflowY = event ? "hidden" : "auto";
    };

    return { toggle }
}