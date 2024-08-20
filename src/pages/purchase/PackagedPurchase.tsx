import React, { useEffect } from "react";
import { NavPurchase } from "./components/NavPurchase";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import styles from "../../style/index.module.scss";
import { useAppSelector } from "../../app/hooks";
import { DisplayTransaction } from "./components/DisplayTransaction";
import { Footers } from "../../components/Footers";
import { LoadingTransaction } from "./components/LoadingTransaction";
import { useApiPayment } from "../../hook/useApiPayment";
import { DataPaymentProps } from "../../app/actions/apiPaymentSlice";
import { purchasePackaged } from "../../utils/variable";

export const PackagedPurchase = () => {
    const { isLoadingPayment, dataPaymentAll } = useAppSelector(state => state.apiPayment);
    // Custome Hook
    const { handleGetTransaction } = useApiPayment();

    const handleFilterPaymentPackaged = (payment: DataPaymentProps[]) => {

        if (!Array.isArray(payment)) return [];

        const paymentPackaged = payment.filter((data) => {
            return data.status_purchase === `${purchasePackaged}`
        });
        if (paymentPackaged.length === 0) return []
        return paymentPackaged
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

                    <DisplayTransaction dataTransaction={handleFilterPaymentPackaged(dataPaymentAll)} />
                </div>

                <Footers />
            </div >
        </>
    )
}
