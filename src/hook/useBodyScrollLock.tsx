import { useState, useEffect } from "react";

type UseBodyScrollLockReturn = {
    toggle: () => void
};

export const useBodyScrollLock = (): UseBodyScrollLockReturn => {
    const bodyStyle = document.body.style;
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        bodyStyle.overflowY = isLocked ? "hidden" : "auto"
    }, [isLocked, bodyStyle])

    const toggle = () => setIsLocked(!isLocked);

    return { toggle }
}