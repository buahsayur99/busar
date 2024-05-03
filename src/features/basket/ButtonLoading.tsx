import React from "react";
import styles from "../../style/index.module.scss";

type ButtonLoadingProps = {
    children: React.ReactNode;
    classButton: string;
    isLoading: boolean;
    onClicks: () => void;
}

export const ButtonLoading = ({ children, classButton, isLoading, onClicks }: ButtonLoadingProps) => {
    return (
        <>
            {!isLoading ? (
                <button
                    type="button"
                    className={styles[`${classButton}`]}
                    onClick={() => onClicks()}
                >
                    {children}
                </button>
            ) : (
                <button
                    type="button"
                    className={styles[`${classButton}`]}
                    style={{ opacity: .5, cursor: "not-allowed" }}
                >
                    {children}
                </button>
            )}
        </>
    )
}
