import React from "react";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import styles from "../../style/index.module.scss";
import { NavPurchase } from "./components/NavPurchase";
import { useAppSelector } from "../../app/hooks";
import { LoadingTransaction } from "./components/LoadingTransaction";
import { DisplayTransaction } from "./components/DisplayTransaction";
import { Footers } from "../../components/Footers";

export const CancelledPurchase = () => {
    const { isLoadingPayment, dataPaymentAll } = useAppSelector(state => state.apiPayment)

    const handleFilterPaymentCancelled = () => {
        const filterData = dataPaymentAll.filter((data) => {
            return data.status === `${process.env.REACT_APP_CANCEL_PAYMENT}`
        });

        return filterData
    }

    return (
        <>
            <div className={styles["bg-body-gray"]}>
                <NavigationBar />

                <div className={`
                    ${styles["container-all-purchase"]}
                    ${styles["global-container"]}               
                `}>
                    {/* Navigation Purchase */}
                    <NavPurchase />

                    {isLoadingPayment && dataPaymentAll.length === 0 && <LoadingTransaction />}

                    <DisplayTransaction dataTransaction={handleFilterPaymentCancelled()} />
                </div>

                <Footers />
            </div >
        </>
    )
}
