import React, { useEffect, useState } from "react";
import styles from "../../../style/index.module.scss";
import { GiSevenPointedStar, FaCheck } from "../../../utils/icons";
import { formattedNumber } from "../../../utils/convert";
import { useNavigate } from "react-router-dom";

type NotifSuccessTransProps = {
    totalPrice: number;
    orderId: string;
}

export const NotifSuccessTrans = ({ totalPrice, orderId }: NotifSuccessTransProps) => {
    const [timerRedirec, setTimerRedirec] = useState(5);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/user/purchase/packaged")
    }

    // Handle Timer Redirecting
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerRedirec > 0) setTimerRedirec((state) => state - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timerRedirec])

    useEffect(() => {
        if (timerRedirec === 0) handleNavigate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerRedirec])

    return (
        <>
            <div className={styles["bg-success-transaction"]}>
                <div className={styles["bg-white"]}>
                    <div className={styles["bg-green"]}>
                        <div className={styles["parent-payment-success"]}>
                            <div className={styles["parent-logo"]}>
                                <GiSevenPointedStar className={styles["icon-star"]} />
                                <FaCheck className={styles["icon-check"]} />
                            </div>

                            <h3>payment successful</h3>

                            {/* Line */}
                            <div className={styles["line-horizontal"]}></div>

                            <h4>rp{formattedNumber(totalPrice)}</h4>

                            <p>{orderId}</p>
                        </div>
                    </div>
                    <div className={styles["parent-button-redirect"]}>
                        <p>redirecting back automatically in {timerRedirec} seconds</p>

                        <button
                            type="button"
                            aria-label="button redirecting"
                            onClick={() => handleNavigate()}
                        >
                            return to home page
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
