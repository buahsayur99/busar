import React from "react";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import styles from "../../style/index.module.scss";

export const AllPurchase = () => {
    return (
        <>
            <div className={styles["bg-body-gray"]}>
                <NavigationBar />
            </div>
        </>
    )
}
