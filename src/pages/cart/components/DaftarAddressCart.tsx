import React, { useEffect, useState } from "react";
import styles from "../../../style/index.module.scss";
import { IoIosCloseCircle } from "../../../utils/icons";
import { FormAddress } from "../../../features/pengaturanProfile/FormAddress";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGetApiAddress } from "../../../hook";
import { CardAddress } from "../../../components/CardAddress";
import { DataAddressProps, changeInputAddress } from "../../../app/actions/apiAddressSlice";

type DaftarAddressCartProps = {
    stateActive: boolean;
    faHandleActiveDaftarAddressCart: (event: boolean) => void;
}

export const DaftarAddressCart = ({ stateActive, faHandleActiveDaftarAddressCart }: DaftarAddressCartProps) => {
    const [active, setActive] = useState({ form: false, inBgWhite: false, outBgWhite: false, addressOptionsId: null });
    const { dataAddress } = useAppSelector(state => state.apiAddress);
    const { deleteApiAddress, updateApiAddressMain, updateApiAddressChoice } = useGetApiAddress();
    const dispatch = useAppDispatch();

    const updateActive = (event: any) => {
        setActive((prev) => {
            return { ...prev, ...event }
        })
    }

    const handleChangeAddress = (data: DataAddressProps) => {
        dispatch(changeInputAddress(data));
        updateActive({ form: true });
    }

    const closeBgWhite = () => {
        updateActive({ outBgWhite: true });

        setTimeout(() => {
            updateActive({ inBgWhite: false });
            faHandleActiveDaftarAddressCart(false)
        }, 1000);
    }

    // visible bg-white
    useEffect(() => {
        if (stateActive) {
            setTimeout(() => {
                updateActive({ inBgWhite: true })
            }, 1200);
        }
    }, [stateActive])

    useEffect(() => {
        const addressOptions = dataAddress.filter((data) => {
            return data.choice === true
        });

        if (addressOptions.length !== 0) return updateActive({ addressOptionsId: addressOptions[0].id })
    }, [dataAddress])

    return (
        <>
            {active.form && (
                <FormAddress
                    onClicks={() => updateActive({ form: false })}
                />
            )}

            <div
                className={`
                    ${styles["container-daftar-address-cart"]}
                    ${stateActive && styles["fade-in"]}
                `}
            >
                {active.inBgWhite && (
                    <div
                        className={`
                            ${active.inBgWhite && styles["in-bg-white"]}
                            ${active.outBgWhite && styles["out-bg-white"]}
                            ${styles["bg-white"]}
                        `}
                    >
                        <div className={styles["nav-daftar-address"]}>
                            <div className={styles["parent-btn_close-heading"]}>
                                <div className={styles["button-close-wrapper"]}>
                                    <button
                                        aria-label="button close"
                                        className={styles["button-close"]}
                                        onClick={() => closeBgWhite()}
                                    >
                                        <IoIosCloseCircle />
                                    </button>
                                </div>

                                <h1>address list</h1>
                            </div>

                            <button
                                type="button"
                                aria-label="button add address"
                                onClick={() => updateActive({ form: true })}
                                className={styles["button-add-address-mobile"]}
                            >
                                add address
                            </button>
                        </div>

                        <div className={styles["css-line-cart"]}></div>

                        <div className={styles["contain-address"]}>
                            <div className={styles["parent-button-add-address"]}>
                                <button
                                    type="button"
                                    aria-label="button add address"
                                    onClick={() => updateActive({ form: true })}
                                    className={styles["button-add-address"]}
                                >
                                    add address
                                </button>
                            </div>

                            <div className={styles["ul-address"]}>
                                <ul
                                    className={`
                                    ${dataAddress.length <= 2 && styles["ul-padding"]}
                                `}
                                >
                                    <div className={styles["list-address"]}>
                                        {/* Address Choice */}
                                        {dataAddress
                                            .filter(data => data.choice === true)
                                            .map(data => (
                                                <li key={data.id}>
                                                    <CardAddress
                                                        activeClass={data.choice}
                                                        dataAddress={data}
                                                        faDeleteApiAddress={(id) => deleteApiAddress([id])}
                                                        faUpdateApiAddressMain={(idAddress) => updateApiAddressMain(idAddress)}
                                                        faUpdateApiAddressChoice={(idAddress) => updateApiAddressChoice(idAddress)}
                                                        faHandleChangeAddress={(data) => handleChangeAddress(data)}
                                                    />
                                                </li>
                                            ))
                                        }
                                        {/* list Address */}
                                        {dataAddress
                                            .filter(data => data.choice !== true)
                                            .map(data => (
                                                <li key={data.id}>
                                                    <CardAddress
                                                        activeClass={data.choice}
                                                        dataAddress={data}
                                                        faDeleteApiAddress={(id) => deleteApiAddress([id])}
                                                        faUpdateApiAddressMain={(idAddress) => updateApiAddressMain(idAddress)}
                                                        faUpdateApiAddressChoice={(idAddress) => updateApiAddressChoice(idAddress)}
                                                        faHandleChangeAddress={(data) => handleChangeAddress(data)}
                                                    />
                                                </li>
                                            ))
                                        }
                                    </div>

                                    <div className={styles["list-address-mobile"]}>
                                        {/* Address Choice */}
                                        {dataAddress
                                            .filter(data => data.choice === true)
                                            .map(data => (
                                                <li key={data.id}>
                                                    <CardAddress
                                                        onClickOption={(id) => updateActive({ addressOptionsId: id })}
                                                        activeClass={data.id === active.addressOptionsId ? true : false}
                                                        dataAddress={data}
                                                        faDeleteApiAddress={(id) => deleteApiAddress([id])}
                                                        faUpdateApiAddressMain={(idAddress) => updateApiAddressMain(idAddress)}
                                                        faUpdateApiAddressChoice={(idAddress) => updateApiAddressChoice(idAddress)}
                                                        faHandleChangeAddress={(data) => handleChangeAddress(data)}
                                                    />
                                                </li>
                                            ))
                                        }
                                        {/* list Address */}
                                        {dataAddress
                                            .filter(data => data.choice !== true)
                                            .map(data => (
                                                <li key={data.id}>
                                                    <CardAddress
                                                        onClickOption={(id) => updateActive({ addressOptionsId: id })}
                                                        activeClass={data.id === active.addressOptionsId ? true : false}
                                                        dataAddress={data}
                                                        faDeleteApiAddress={(id) => deleteApiAddress([id])}
                                                        faUpdateApiAddressMain={(idAddress) => updateApiAddressMain(idAddress)}
                                                        faUpdateApiAddressChoice={(idAddress) => updateApiAddressChoice(idAddress)}
                                                        faHandleChangeAddress={(data) => handleChangeAddress(data)}
                                                    />
                                                </li>
                                            ))
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <div className={styles["parent-select-address-mobile"]}>
                            <button
                                type="button"
                                aria-label="button pilih"
                                className={styles["button-select-address"]}
                                onClick={() => {
                                    if (active.addressOptionsId) {
                                        updateApiAddressChoice(active.addressOptionsId)
                                        closeBgWhite()
                                    }
                                }}
                            >
                                pilih
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
