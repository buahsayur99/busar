import React from "react";
import styles from "../style/index.module.scss";

type LoadingCardProps = {
    arrayLoopCard: number[]
}

export const LoadingCard = ({ arrayLoopCard }: LoadingCardProps) => {
    return (
        <>
            <div className={styles["container-loading-card"]}>
                {arrayLoopCard.map((data) => (
                    <div key={data} className={styles["card"]}>
                        <div className={`${styles["img"]} ${styles["loading-card"]}`}></div>
                        <div className={`${styles["name"]} ${styles["loading-card"]}`}></div>
                        <div className={`${styles["harga"]} ${styles["loading-card"]}`}></div>
                        <div className={styles["button"]}>
                            <div className={`${styles["heart"]} ${styles["loading-card"]}`}></div>
                            <div className={`${styles["basket"]} ${styles["loading-card"]}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
