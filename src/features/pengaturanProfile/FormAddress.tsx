import React, { useCallback, useEffect, useState } from "react";
import styles from "../../style/index.module.scss";
import { InputsForm } from "../../components/InputsForm";
import { IoIosCloseCircle } from "../../utils/icons";
import { useInputFormAddress } from "../../hook/useInputFormAddress";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAddress, resetIsMessageAddress } from "../../app/actions/apiAddressSlice";
import { InputTextArea } from "../../components/InputTextArea";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { AlertText } from "../../components/AlertText";
import { Loading } from "../../components/Loading";

type FormAddressProps = {
    onClicks: () => void
}

export const FormAddress = ({ onClicks }: FormAddressProps) => {
    // State
    const [active, setActive] = useState({ bgBlack: true, bgWhite: true, alertText: false });
    const [onOffBgWhite, setOnOffBgWhite] = useState(false);
    // Custome Hook
    const { input, validasiInput, activeSave, changeInputValue } = useInputFormAddress();
    const { toggle } = useBodyScrollLock();
    // Dispatch
    const dispatch = useAppDispatch();
    // Selector
    const { isMessageAddress, isLoading } = useAppSelector(state => state.apiAddress);
    const uuid = localStorage.getItem("uuid")

    const changeActive = (event: any) => {
        setActive(state => {
            return { ...state, ...event }
        })
    }

    const onFormSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activeSave) {
            const link = `${process.env.REACT_APP_API_URL_LOCAL}/address`;
            const uuidUser = { uuidUser: uuid }
            const data = { ...uuidUser, ...input }

            dispatch(createAddress({ data, link }))
        }
    }

    const handleOnCloseForm = () => {
        changeActive({ bgWhite: false });

        setTimeout(() => { changeActive({ bgBlack: false }) }, 800)
        setTimeout(() => {
            onClicks()
            toggle(false);
        }, 1000);
    }

    const handleOnCloseAlert = () => {
        // reset isMessage
        dispatch(resetIsMessageAddress());
        // Close Alert
        changeActive({ alertText: false });
        // close form if add address success
        handleOnCloseForm();
    }

    const handleOnOpenForm = useCallback(() => {
        if (active.bgBlack === true) {
            setTimeout(() => {
                setOnOffBgWhite(true)
            }, 500);
        }
    }, [active.bgBlack])

    useEffect(() => {
        handleOnOpenForm();

        if (isMessageAddress === "add address success") return changeActive({ alertText: true })
    }, [handleOnOpenForm, isMessageAddress])

    return (
        <>
            {/* Alert add address success */}
            {active.alertText && (
                <AlertText
                    onClicks={() => handleOnCloseAlert()}
                    nameButton="Close"
                >
                    {isMessageAddress}
                </AlertText>
            )}
            {/* Loading add address */}
            {isLoading && <Loading />}

            <div className={`
                ${styles["container-form-address"]}
                ${!active.bgBlack ? styles["fade-out"] : styles["fade-in"]}
            `}>
                {onOffBgWhite && (
                    <div
                        className={`
                        ${styles["bg-white"]}
                        ${!active.bgWhite ? styles["slide-out-elliptic-top-bck"] : styles["slide-in-elliptic-top-fwd"]}
                    `}
                    >
                        {/* Judul */}
                        <div className={styles["judul-form"]}>
                            <h2>add address</h2>
                            <button
                                type="button"
                                onClick={handleOnCloseForm}
                            >
                                <IoIosCloseCircle />
                            </button>
                            <hr />
                        </div>
                        {/* Form */}
                        <form
                            className={styles["form-address"]}
                            onSubmit={onFormSubmit}
                        >
                            {/* Name */}
                            <InputsForm
                                cssInput="input-form"
                                cssPlaceholder="input-placeholder"
                                cssValidasi="validasi"
                                cssMaxInput="max-input"
                                typeInput="text"
                                changeInput={(input) => changeInputValue({ name: input })}
                                maxInput={20}
                                valueInput={input.name}
                                valuePlaceholder={"Name"}
                                validasiInput={validasiInput.name}
                            />
                            {/* Number Phone */}
                            <InputsForm
                                cssInput="input-form"
                                cssPlaceholder="input-placeholder"
                                cssValidasi="validasi"
                                cssMaxInput="max-input"
                                typeInput="number"
                                changeInput={(input) => changeInputValue({ numberPhone: input })}
                                maxInput={13}
                                valueInput={input.numberPhone}
                                valuePlaceholder={"Number Phone"}
                                validasiInput={validasiInput.numberPhone}
                            />
                            {/* City */}
                            <InputsForm
                                cssInput="input-form"
                                cssPlaceholder="input-placeholder"
                                cssValidasi="validasi"
                                cssMaxInput="max-input"
                                typeInput="text"
                                changeInput={(input) => changeInputValue({ city: input })}
                                maxInput={25}
                                valueInput={input.city}
                                valuePlaceholder={"City"}
                                validasiInput={validasiInput.city}
                            />
                            {/* Subdistrict */}
                            <InputsForm
                                cssInput="input-form"
                                cssPlaceholder="input-placeholder"
                                cssValidasi="validasi"
                                cssMaxInput="max-input"
                                typeInput="text"
                                changeInput={(input) => changeInputValue({ subdistrict: input })}
                                maxInput={30}
                                valueInput={input.subdistrict}
                                valuePlaceholder={"Subdistrict"}
                                validasiInput={validasiInput.subdistrict}
                            />
                            {/* CodePos */}
                            <InputsForm
                                cssInput="input-form"
                                cssPlaceholder="input-placeholder"
                                cssValidasi="validasi"
                                cssMaxInput="max-input"
                                typeInput="number"
                                changeInput={(input) => changeInputValue({ codePos: input })}
                                maxInput={5}
                                valueInput={input.codePos}
                                valuePlaceholder={"CodePos"}
                                validasiInput={validasiInput.codePos}
                            />
                            {/* Complete Address */}
                            <InputTextArea
                                cssInput="input-form-textarea"
                                cssPlaceholder="input-placeholder-textarea"
                                cssValidasi="validasi-textarea"
                                cssMaxInput="max-input"
                                heights={100}
                                changeInput={(input) => changeInputValue({ completeAddress: input })}
                                maxInput={200}
                                valueInput={input.completeAddress}
                                valuePlaceholder={"Complete Address"}
                                validasiInput={validasiInput.completeAddress}
                            />
                            {/* Courier Note */}
                            <InputsForm
                                cssInput="input-form"
                                cssPlaceholder="input-placeholder"
                                typeInput="text"
                                cssMaxInput="max-input"
                                changeInput={(input) => changeInputValue({ courierNote: input })}
                                maxInput={50}
                                valueInput={input.courierNote}
                                valuePlaceholder={"Courier Note"}
                            />

                            {/* Button */}
                            <div className={`${styles["parent-button"]}`}>
                                <button
                                    className={`${!activeSave ? styles["button-save"] : styles["button-save-active"]}`}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
