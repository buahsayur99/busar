import React, { useEffect, useCallback } from 'react'

type useInsideClickProps = {
    ref: React.RefObject<HTMLDivElement>
    faClose: () => void;
}

export const useInsideClick: React.FC<useInsideClickProps> = ({ ref, faClose }) => {
    const onClickOffAlert = useCallback((event: MouseEvent) => {
        if (event.target === ref.current) {
            faClose()
        }
    }, [faClose, ref])

    useEffect(() => {
        document.addEventListener("click", onClickOffAlert);

        return () => document.removeEventListener("click", onClickOffAlert);
    }, [onClickOffAlert]);

    return null; // Kembalikan null karena hook ini tidak menghasilkan elemen React apapun
}