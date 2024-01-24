import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "../style/index.module.scss";
import { useAppSelector } from "../app/hooks";
import { useInsideClick } from "../hook/useInsideClick";

interface AlertTextProps extends React.HTMLAttributes<HTMLDivElement> {
    nameButton: string;
    onClicks: () => void
}

export const AlertText: React.FC<AlertTextProps> = ({ children, nameButton, onClicks, ...props }) => {
    const { activeAlert } = useAppSelector(state => state.formLoginRegisterSlice);
    const [active, setActive] = useState(true);
    const parentAlertRef = useRef<HTMLDivElement>(null)

    const closeAlert = useCallback(() => {
        setActive(false)

        setTimeout(() => {
            onClicks()
        }, 1000)
    }, [onClicks])

    // Custome Hook Close Alert
    useInsideClick({
        ref: parentAlertRef,
        faClose: closeAlert
    });

    useEffect(() => {
        if (activeAlert.alertText.status === true) return setActive(true);
        if (active === true) {
            setTimeout(() => {
                closeAlert();
            }, 3500);
        }
    }, [activeAlert.alertText.status, active, closeAlert]);


    return (
        <>
            <div
                className={`${styles["alert-reset-pass"]}`}
                {...props}
                ref={parentAlertRef}
            >
                <div className={`${styles["alert"]}`}
                >
                    <h1>{children}</h1>
                    <button
                        type="button"
                        onClick={() => closeAlert()}
                    >
                        {nameButton}
                    </button>
                </div>
            </div >
        </>
    )
}