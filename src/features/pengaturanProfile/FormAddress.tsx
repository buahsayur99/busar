import React, { useState } from "react";
import styles from "../../style/index.module.scss";
import { InputsForm } from "../../components/InputsForm";
import { dataInputFormAddress, dataValidasiInputFormAddress } from "../../data/FormAddress";

export const FormAddress = () => {
    // State
    const [input, setInput] = useState(dataInputFormAddress);
    const [validasiInput, setValidasiInput] = useState(dataValidasiInputFormAddress);

    const resetInput = () => {
        setInput(dataInputFormAddress);
    }

    const resetValidasiInput = () => {
        setValidasiInput(dataValidasiInputFormAddress);
    }

    const changeInputValue = (event: any) => {
        setInput(prev => {
            return { ...prev, ...event }
        })
    }
    return (
        <>
            <div className={styles["container-form-address"]}>
                <div className={styles["bg-white"]}>
                    {/* Name */}
                    <InputsForm
                        cssInput="input-form"
                        cssPlaceholder="input-placeholder"
                        cssIcon="input-icon"
                        cssValidasi="validasi"
                        typeInput="password"
                        changeInput={(input) => changeInputValue({ name: input })}
                        valueInput={input.name}
                        valuePlaceholder={"Password"}
                        iconType="PiLockKeyFill"
                        validasiInput={validasiInput.name}
                    />
                </div>
            </div>
        </>
    )
}
