import React from "react";
import styles from "../../../style/index.module.scss";

export const LoadingTransaction = () => {
    const loopData = [1, 2, 3, 4]

    return (
        <>
            {loopData.map((data) => (
                <div
                    key={data}
                    className={styles["container-loading-transaction"]}
                >
                    <div className={styles["card-loading-transaction"]}>
                        <div className={styles["wrapper-status"]}>
                            <div className={`${styles["date"]} ${styles["animasi-loading"]}`}></div>
                            <div className={`${styles["status"]} ${styles["animasi-loading"]}`}></div>
                        </div>

                        <div className={styles["wrapper-detail-product"]}>
                            <div className={styles["wrapper-button-detail-product"]}>
                                <div className={`${styles["button-detail-product"]} ${styles["animasi-loading"]}`}></div>
                                <div className={`${styles["icon"]} ${styles["animasi-loading"]}`}></div>
                            </div>

                            <div className={styles["detail-product"]}>
                                <div className={styles["img-content-text"]}>
                                    <div className={`${styles["img"]} ${styles["animasi-loading"]}`}></div>

                                    <div className={`${styles["content-text"]}`}>
                                        <div className={`${styles["name-product"]} ${styles["animasi-loading"]}`}></div>
                                        <div className={`${styles["price"]} ${styles["animasi-loading"]}`}></div>
                                        <div className={`${styles["amount"]} ${styles["animasi-loading"]}`}></div>
                                        <div className={`${styles["total-price"]} ${styles["animasi-loading"]}`}></div>
                                    </div>
                                </div>

                                <div className={`${styles["total-price"]} ${styles["animasi-loading"]}`}></div>
                            </div>
                        </div>

                        <div className={styles["wrapper-total-price-full-transaction"]}>
                            <div className={`${styles["total-pesanan"]} ${styles["animasi-loading"]}`}></div>
                            <div className={`${styles["total-price"]} ${styles["animasi-loading"]}`}></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
