import React, { useEffect } from "react";
import styles from "../../style/index.module.scss";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { NavPurchase } from "./components/NavPurchase";
import { Footers } from "../../components/Footers";
import { DisplayTransaction } from "./components/DisplayTransaction";
import { useAppSelector } from "../../app/hooks";
import { LoadingTransaction } from "./components/LoadingTransaction";
import { useApiPayment } from "../../hook/useApiPayment";
import { useSocketsPayment } from "../../hookSockets/useSocketsPayment";
import { DataPaymentProps } from "../../app/actions/apiPaymentSlice";

export const PendingPurchase = () => {
    // State Redux
    const { dataPaymentAll, isLoadingPayment } = useAppSelector(state => state.apiPayment);
    // Custome Hook
    const { handleGetTransaction } = useApiPayment();
    // Handle Socket Get Payment, if Data Payment update
    useSocketsPayment();

    const handleFilterPaymentPending = (payment: DataPaymentProps[]) => {
        const filterPaymentPending = payment.filter((data) => {
            return data.status === `${process.env.REACT_APP_PENDING_PAYMENT}`
        });

        if (filterPaymentPending.length === 0) return []
        return filterPaymentPending
    }

    useEffect(() => {
        if (dataPaymentAll.length === 0) return handleGetTransaction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                    <DisplayTransaction dataTransaction={handleFilterPaymentPending(dataPaymentAll)} />
                </div>

                <Footers />
            </div >
        </>
    )
}
