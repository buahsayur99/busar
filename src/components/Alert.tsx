import { useState } from "react";
import styles from "../style/index.module.scss";

type AlertProps = {
    children?: React.ReactNode;
    classCss?: string;
    onClicks: () => void
}

export const Alert = ({ children, classCss, onClicks }: AlertProps) => {
    const [active, setActive] = useState(true);

    const handleOnCloseAlert = () => {
        setActive(false);
        setTimeout(() => {
            onClicks()
        }, 500);
    }

    return (
        <>
            <div
                data-testid="parent-alert"
                className={`${styles["bg-black_alert"]}`}
            >
                <div className={`
                    ${styles[`${classCss}`]}
                    ${active ? styles["scale-in-center"] : styles["scale-out-center"]}
                `}>
                    <button
                        type="button"
                        className={`${styles["btn-alert_register"]}`}
                        onClick={() => handleOnCloseAlert()}
                    >
                        {children}
                    </button>
                </div>
            </div>
        </>
    )
}
