import React from "react";
import { RxDashboard } from "../../utils/icons";
import styles from "../../style/index.module.scss";

export const DashboardAdmin = () => {
    return (
        <>
            <div className={styles["container-dashboard-admin"]}>
                <button
                    type="button"
                >
                    <RxDashboard />
                </button>
            </div>
        </>
    )
}
