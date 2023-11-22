import React, { useCallback, useEffect } from "react"

type useOutsideClickProps = {
    ref: React.RefObject<HTMLDivElement>;
    faClose: () => void;
}

export const useOutsideClick: React.FC<useOutsideClickProps> = ({ ref, faClose }) => {

    const handleClose = useCallback((event: MouseEvent) => {
        if (ref.current !== event.target) return faClose()
    }, [ref, faClose])

    useEffect(() => {
        document.addEventListener("click", handleClose);

        return () => document.removeEventListener("click", handleClose);
    }, [handleClose])

    return null;
}
