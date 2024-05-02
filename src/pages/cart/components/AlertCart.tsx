import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../style/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetIsMessageCart } from "../../../app/actions/apiCartSlice";

type AlertProps = {
    active: boolean;
    message: string;
}

export const AlertCart = () => {
    const [alert, setAlert] = useState<AlertProps>({ active: false, message: "" });
    const { isMessageCart } = useAppSelector(state => state.apiCart);
    const dispatch = useAppDispatch();

    const updateStateAlert = (event: AlertProps) => {
        setAlert((prev) => {
            return { ...prev, ...event }
        })
    }

    const handleInvisibleAlert = useCallback((message: string) => {
        updateStateAlert({ active: false, message: message })
        setTimeout(() => {
            dispatch(resetIsMessageCart());
            updateStateAlert({ active: false, message: "" })
        }, 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleVisibleAlert = useCallback((message: string) => {
        updateStateAlert({ active: true, message: message })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isMessageCart && alert.message === "") {
            handleVisibleAlert(isMessageCart);

            setTimeout(() => {
                return handleInvisibleAlert(isMessageCart);
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMessageCart])

    return (
        <>
            <div className={`${alert.active && styles["visible-alert-cart"]} ${styles["container-alert-cart"]}`}>
                <div className={styles["contain-text"]}>
                    <p>{alert.message}</p>
                    <button type="button" onClick={() => handleInvisibleAlert(isMessageCart)}>ok</button>
                </div>
            </div>
        </>
    )
}
