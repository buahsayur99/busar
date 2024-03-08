import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../style/index.module.scss";

type AlertCartProps = {
    activeAlert: { status: boolean, text: string }
    faVisibleAlert: () => void;
}

export const AlertCart = ({ activeAlert, faVisibleAlert }: AlertCartProps) => {
    const [active, setActive] = useState(false);

    const handleCloseAlert = useCallback(() => {
        setActive(false);

        setTimeout(() => {
            faVisibleAlert()
        }, 2000);
    }, [faVisibleAlert])

    useEffect(() => {
        if (activeAlert.status === true) {
            setTimeout(() => {
                setActive(activeAlert.status)

                setTimeout(() => {
                    setActive(false);
                }, 3000);
            }, 100);
        }
    }, [activeAlert.status, handleCloseAlert])

    return (
        <>
            <div className={`${active && styles["visible-alert-cart"]} ${styles["container-alert-cart"]}`}>
                <div className={styles["contain-text"]}>
                    <p>{activeAlert.text}</p>
                    <button type="button" onClick={() => handleCloseAlert()}>ok</button>
                </div>
            </div>
        </>
    )
}
