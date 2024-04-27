import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../style/index.module.scss";
import { tablet, coin1, coin2, coin3, coin4, coin5, cardUngu, moneyLeft, moneyRight, shadow } from "../../../assets/loadingPayment/index";

type LoadingPaymentProps = {
    handleHiddenLoading: () => void
}

export const LoadingPayment = ({ handleHiddenLoading }: LoadingPaymentProps) => {
    const [time, setTime] = useState<boolean>(false);

    const handleTimeLoading = useCallback(() => {
        const interval = setInterval(() => {
            setTime(true)
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const intervalHiddenLoading = useCallback(() => {
        const interval = setInterval(() => {
            handleHiddenLoading()
        }, 5000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!time) handleTimeLoading();
        intervalHiddenLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {time && (
                <div className={styles["global-container"]}>
                    <div className={styles["parent-loading-payment"]}>
                        <div className={styles["parent-tablet"]}>
                            <img className={styles["tablet"]} src={tablet} alt="tablet" width={230} />

                            {/* Image Coin */}
                            <img className={styles["image-coin"]} src={coin1} alt="coin-1" width={80} height={80} />
                            <img className={styles["image-coin"]} src={coin2} alt="coin-2" width={80} height={80} />
                            <img className={styles["image-coin"]} src={coin3} alt="coin-3" width={80} height={80} />
                            <img className={styles["image-coin"]} src={coin4} alt="coin-4" width={80} height={80} />
                            <img className={styles["image-coin"]} src={coin5} alt="coin-5" width={80} height={80} />

                            <img className={styles["image-card-ungu"]} src={cardUngu} alt="card-unggu" width={200} />
                            <img className={styles["image-money-right"]} src={moneyRight} alt="money-right" width={140} />
                            <img className={styles["image-money-left"]} src={moneyLeft} alt="money-left" width={110} />
                            <img className={styles["image-shadow"]} src={shadow} alt="money-shadow" width={300} />

                            <div className={styles["parent-text-contain"]}>
                                <h1>wait a minute, okay...</h1>
                                <p>your payment is being processed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
