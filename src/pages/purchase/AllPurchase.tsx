import React, { useEffect } from "react";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import styles from "../../style/index.module.scss";
import { NavPurchase } from "./components/NavPurchase";
import { useApiPayment } from "../../hook/useApiPayment";
import { useAppSelector } from "../../app/hooks";
import { DisplayTransaction } from "./components/DisplayTransaction";
import { Footers } from "../../components/Footers";
import { LoadingTransaction } from "./components/LoadingTransaction";

export const AllPurchase = () => {
    // State Redux
    const { dataPaymentAll, isLoadingPayment } = useAppSelector(state => state.apiPayment);
    // Custome Hook
    const { handleGetTransaction } = useApiPayment();

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

                    <DisplayTransaction dataTransaction={dataPaymentAll} />
                </div>

                <Footers />
            </div >
        </>
    )
}
