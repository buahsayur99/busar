import React, { useState, useEffect, useRef } from "react";
import styles from "../style/index.module.scss";
import { useAppSelector } from "../app/hooks";
import { useOutsideClick } from "../hook/useOutsideClick";

interface AlertTextProps extends React.HTMLAttributes<HTMLDivElement> {
    nameButton: string;
    onClicks: () => void
}

export const AlertText: React.FC<AlertTextProps> = ({ children, nameButton, onClicks, ...props }) => {
    const { activeAlert } = useAppSelector(state => state.formLoginRegisterSlice);
    const [active, setActive] = useState(true);
    const parentAlertRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (activeAlert.alertText.status === true) return setActive(true)
    }, [activeAlert.alertText.status]);

    const closeAlert = () => {
        setActive(false)

        setTimeout(() => {
            onClicks()
        }, 1000)
    }

    // Custome Hook Close Alert
    useOutsideClick({
        ref: parentAlertRef,
        faClose: closeAlert
    });

    return (
        <>
            <div
                className={`${styles["alert-reset-pass"]}`}
                {...props}
                ref={parentAlertRef}
            >
                <div className={`
                        ${styles["alert"]}
                        ${active ? styles["puff-in-center"] : styles["puff-out-center"]}
                    `}
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