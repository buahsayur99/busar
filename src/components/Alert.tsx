import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import styles from "../style/index.module.scss";

type AlertProps = {
    children?: React.ReactNode;
    classCss: string;
    onClicks?: () => void
}

export const Alert = ({ children, classCss, onClicks }: AlertProps) => {
    const [active, setActive] = useState(false);
    const { isMessage } = useAppSelector(state => state.apiUsers);

    useEffect(() => {
        if (isMessage === "register success") return setActive(true)
        if (isMessage !== "register success") {
            setTimeout(() => {
                return setActive(false)
            }, 1000);
        }
    }, [isMessage])

    return (
        <>
            {active === true
                && (
                    <div
                        data-testid="parent-alert"
                        className={`
                            ${styles["bg-black_alert"]}
                            ${isMessage === "register success" ? styles["slide-in-blurred-top"] : styles["slide-out-blurred-top"]}
                        `}
                    >
                        <div className={`${styles[`${classCss}`]}`}>
                            <button
                                type="button"
                                className={`${styles["btn-alert_register"]}`}
                                onClick={onClicks}
                            >
                                {children}
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
