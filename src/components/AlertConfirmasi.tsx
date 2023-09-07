import React from "react";
import styles from "../style/index.module.scss";

type AlertConfirmasiProps = {
    children: React.ReactNode;
    okText: string;
    canselText: string;
    onOkClick: () => void;
    onCanselClick: () => void;
};

export const AlertConfirmasi = ({
    children,
    okText,
    canselText,
    onOkClick,
    onCanselClick
}: AlertConfirmasiProps) => {
    return (
        <>
            <div className={styles["bg-alert-confirmasi"]}>
                <div className={styles["bg-white-alert"]}>
                    <p>{children}</p>
                    <div className={styles["parent-btn"]}>
                        <button
                            type="button"
                            onClick={onOkClick}
                        >
                            {okText}
                        </button>
                        <button
                            type="button"
                            onClick={onCanselClick}
                        >
                            {canselText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};