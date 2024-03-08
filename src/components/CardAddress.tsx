import React from "react";
import styles from "../style/index.module.scss";
import { DataAddressProps } from "../app/actions/apiAddressSlice";
import { BsCheckAll } from "../utils/icons";

type CardAddressProps = {
    dataAddress: DataAddressProps;
    activeClass: boolean | null | undefined;
    faDeleteApiAddress: (id: number) => void;
    faUpdateApiAddressMain: (id: number) => void;
    faUpdateApiAddressChoice: (id: number) => void;
    faHandleChangeAddress: (id: DataAddressProps) => void;
    onClickOption?: (id: number) => void;
}

export const CardAddress = ({ dataAddress, activeClass, faDeleteApiAddress, faUpdateApiAddressMain, faUpdateApiAddressChoice, faHandleChangeAddress, onClickOption }: CardAddressProps) => {
    return (
        <>
            <div
                className={`
                    ${styles["container-card-address"]}
                    ${activeClass && styles["main-card-address"]}
                `}
                key={dataAddress.id}
                onClick={() => onClickOption && onClickOption(dataAddress?.id ?? 0)}
            >
                <div className={styles["card-address"]}>
                    <div>
                        <div className={styles["header-wrapper"]}>
                            <h2>{dataAddress.addressLabel}</h2>
                            {dataAddress.main === true && (
                                <span>main</span>
                            )}
                        </div>

                        <div className={styles["contain-address-wrapper"]}>
                            <p>{dataAddress.name}</p>
                            <p>{dataAddress.numberPhone}</p>
                            <p>{dataAddress.completeAddress}</p>
                        </div>

                        <div className={styles["button-card-address-wrapper"]}>
                            <button
                                aria-label="change address"
                                type="button"
                                onClick={() => faHandleChangeAddress(dataAddress)}
                                className={styles["change-address"]}
                            >
                                change address
                            </button>
                            {dataAddress.main !== true && (
                                <>
                                    <button
                                        aria-label="change address"
                                        type="button"
                                        onClick={() => {
                                            if (dataAddress.id) faUpdateApiAddressMain(dataAddress.id)
                                        }}
                                        className={styles["change-address"]}
                                    >
                                        {dataAddress.choice === true ? (
                                            `so the main address`
                                        ) : (
                                            `so the main address & select`
                                        )}
                                    </button>
                                    <button
                                        aria-label="change address"
                                        type="button"
                                        onClick={() => {
                                            if (dataAddress.id) faDeleteApiAddress(dataAddress.id)
                                        }}
                                        className={styles["change-address"]}
                                    >
                                        delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        {activeClass ? (
                            <BsCheckAll className={styles["icon"]} />
                        ) : (
                            <button
                                type="button"
                                aria-label="button pilih"
                                className={styles["button-choice"]}
                                onClick={() => {
                                    if (dataAddress.id) faUpdateApiAddressChoice(dataAddress.id)
                                }}
                            >
                                pilih
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles["parent-button-mobile"]}>
                    <button
                        aria-label="change address mobile"
                        type="button"
                        onClick={() => faHandleChangeAddress(dataAddress)}
                        className={styles["button-address-mobile"]}
                    >
                        change address
                    </button>

                    {!dataAddress.main && (
                        <button
                            aria-label="change address mobile"
                            type="button"
                            onClick={() => {
                                if (dataAddress.id) faDeleteApiAddress(dataAddress.id)
                            }}
                            className={styles["button-address-mobile"]}
                        >
                            delete
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
