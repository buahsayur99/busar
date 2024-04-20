import React, { useEffect } from "react";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { NavPurchase } from "./components/NavPurchase";
import { DisplayTransaction } from "./components/DisplayTransaction";
import { Footers } from "../../components/Footers";
import { useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { LoadingTransaction } from "./components/LoadingTransaction";
import { useApiPayment } from "../../hook/useApiPayment";
import { useSocketsPayment } from "../../hookSockets/useSocketsPayment";
import { DataPaymentProps } from "../../app/actions/apiPaymentSlice";

export const SendPurchase = () => {
    // State Redux
    const { dataPaymentAll, isLoadingPayment } = useAppSelector(state => state.apiPayment);
    // Custome Hook
    const { handleGetTransaction } = useApiPayment();
    // Handle Socket Get Payment, if Data Payment update
    useSocketsPayment();

    const handleFilterPaymentDelivered = (payment: DataPaymentProps[]) => {
        const paymentDilivered = payment.filter((data) => {
            return data.status_purchase === `${process.env.REACT_APP_PURCHASE_DELIVERED}`
        });

        return paymentDilivered;
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

                    <DisplayTransaction dataTransaction={handleFilterPaymentDelivered(dataPaymentAll)} />
                </div>

                <Footers />
            </div >
        </>
    )
}
