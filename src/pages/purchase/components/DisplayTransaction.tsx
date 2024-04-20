import React from "react";
import { DataPaymentProps } from "../../../app/actions/apiPaymentSlice";
import styles from "../../../style/index.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { NavLink } from "react-router-dom";
import { UiProductTransaction } from "./UiProductTransaction";
import noteEmpty from "../../../assets/purchase/note-empty.webp";

type DisplayTransactionProps = {
    dataTransaction: DataPaymentProps[] | []
}

const handleTimeTransaction = (dataTransaction: DataPaymentProps) => {
    const convertDateTime = (date: number) => {
        const dates = new Date(date);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedDate = dates.toLocaleString('id-ID', options).replace(/\//g, '-').replace(',', '');
        const [datePart, timePart] = formattedDate.split(' ');
        const formattedDateTime = `${datePart}  |  ${timePart}`;

        return formattedDateTime
    }

    const handleStatusTransaction = () => {
        if (dataTransaction.status === `${process.env.REACT_APP_SUCCESS_PAYMENT}`) {
            if (dataTransaction.status_purchase === `${process.env.REACT_APP_PURCHASE_DELIVERED}`) {
                return (
                    <div className={`${styles["wrapper-status-transaction"]} ${styles["status-finished"]}`}>
                        <p className={styles["status-transaction"]}>delivered</p>
                    </div>
                )
            }

            if (dataTransaction.status_purchase === `${process.env.REACT_APP_PURCHASE_PACKAGED}`) {
                return (
                    <div className={`${styles["wrapper-status-transaction"]} ${styles["status-finished"]}`}>
                        <p className={styles["status-transaction"]}>packaged</p>
                    </div>
                )
            }

            return (
                <div className={`${styles["wrapper-status-transaction"]} ${styles["status-finished"]}`}>
                    <p className={styles["status-transaction"]}>finished</p>
                </div>
            )
        }
        if (dataTransaction.status === `${process.env.REACT_APP_PENDING_PAYMENT}`) {
            return (
                <div className={styles["wrapper-status-transaction"]}>
                    <NavLink
                        to={`/order-status/busar/${dataTransaction.transaction_id}`}
                        className={styles["status-transaction"]}
                    >
                        waiting for payment
                    </NavLink>
                </div>
            )
        }
        if (dataTransaction.status === `${process.env.REACT_APP_CANCEL_PAYMENT}`) {
            return (
                <div className={styles["wrapper-status-transaction"]}>
                    <p className={styles["status-transaction"]}>cancelled</p>
                </div>
            )
        }
    }


    return (
        <div className={styles["parent-info-transaction"]}>
            <h4>{convertDateTime(dataTransaction.date)}</h4>

            {handleStatusTransaction()}
        </div>
    )
}

export const DisplayTransaction = ({ dataTransaction }: DisplayTransactionProps) => {
    // State Redux
    const { dataProductApi } = useAppSelector(state => state.apiProduct);

    return (
        <>
            <div className={styles["container-display-transaction"]}>
                {dataTransaction.length === 0
                    ? (
                        <div className={`${styles["wrapper-note-empty"]} ${styles["card-transaction"]}`}>
                            <img src={noteEmpty} alt="note-empty" width={150} />
                            <p>no orders yet</p>
                        </div>
                    ) : ([...dataTransaction].reverse().map((data) => (
                        <div
                            key={data.id}
                            className={styles["card-transaction"]}
                        >
                            {handleTimeTransaction(data)}

                            <UiProductTransaction dataProductTransaction={data} dataProduct={dataProductApi} />

                            <div className={styles["wrapper-total-price"]}>
                                <div className={styles["total-price-content"]}>
                                    <p>total pesanan:</p>
                                    <p className={styles["total-price"]}>rp{data.total_price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )))
                }
            </div>
        </>
    )
}
