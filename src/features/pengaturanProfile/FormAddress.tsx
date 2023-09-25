import React from "react";
import styles from "../../style/index.module.scss";
import { InputsForm } from "../../components/InputsForm";
import { IoIosCloseCircle } from "../../utils/icons";
import { useInputFormAddress } from "../../hook/useInputFormAddress";

export const FormAddress = () => {
    const { input, validasiInput, activeSave, changeInputValue, changeInputClicked } = useInputFormAddress();

    return (
        <>
            <div className={styles["container-form-address"]}>
                <div className={styles["bg-white"]}>
                    {/* Judul */}
                    <div className={styles["judul-form"]}>
                        <h2>add address</h2>
                        <button
                            type="button"
                        >
                            <IoIosCloseCircle />
                        </button>
                        <hr />
                    </div>
                    {/* Form */}
                    <form
                        className={styles["form-address"]}
                    >
                        {/* Name */}
                        <InputsForm
                            cssInput="input-form"
                            cssPlaceholder="input-placeholder"
                            cssValidasi="validasi"
                            cssMaxInput="max-input"
                            typeInput="text"
                            changeInput={(input) => changeInputValue({ name: input })}
                            onClicks={() => changeInputClicked({ name: true })}
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
                            onClicks={() => changeInputClicked({ numberPhone: true })}
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
                            onClicks={() => changeInputClicked({ city: true })}
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
                            onClicks={() => changeInputClicked({ subdistrict: true })}
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
                            onClicks={() => changeInputClicked({ codePos: true })}
                            maxInput={5}
                            valueInput={input.codePos}
                            valuePlaceholder={"CodePos"}
                            validasiInput={validasiInput.codePos}
                        />
                        {/* Complete Address */}
                        <InputsForm
                            cssInput="input-form"
                            cssPlaceholder="input-placeholder"
                            cssValidasi="validasi"
                            cssMaxInput="max-input"
                            typeInput="text"
                            changeInput={(input) => changeInputValue({ completeAddress: input })}
                            onClicks={() => changeInputClicked({ completeAddress: true })}
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
                            onClicks={() => changeInputClicked({ courierNote: true })}
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
            </div>
        </>
    )
}
