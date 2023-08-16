import { FaUserAlt, PiLockKeyFill, PiLockKeyOpenFill } from "../utils/icons";
import styles from "../style/index.module.scss";
import { useState, useRef } from "react";

type IconsProps = string | Element | undefined

type InputFormProps = {
    cssInput?: string
    cssPlaceholder?: string
    cssIcon?: string
    cssValidasi?: string
    styleIcon?: React.CSSProperties;
    typeInput: string;
    changeInput: (value: string) => void;
    valueInput: string;
    valuePlaceholder: string;
    iconType?: IconsProps;
    validasiInput?: {
        status: boolean;
        text: string;
    }
};

export const Icons = ({ iconType }: { iconType: IconsProps }) => {
    if (iconType === "PiLockKeyOpenFill") return <PiLockKeyOpenFill />
    if (iconType === "FaUserAlt") return <FaUserAlt />
    if (iconType === "PiLockKeyFill") return <PiLockKeyFill />
    return null
}

export const InputsForm = (
    {
        typeInput, changeInput, valueInput, iconType, styleIcon, valuePlaceholder, validasiInput, cssInput, cssPlaceholder, cssIcon, cssValidasi
    }: InputFormProps
) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const updatePassVisible = () => {
        setPasswordVisible((state) => !state);

        const inputElement = inputRef.current;
        // if InputElement exists
        if (inputElement) {
            // variable holds input data length 
            const inputLength = inputElement.value.length;
            // Focus input on the last value
            setTimeout(() => {
                inputElement.selectionStart = inputLength;
                inputElement.focus();
            }, 0);
        }
    }

    return (
        <>
            {/* Parent Form Input */}
            <label
                className={`${styles["parent-input-form"]}`}
            // onClick={handleDivClick}
            >
                {/* Input */}
                <input
                    type={!passwordVisible ? typeInput : "text"}
                    onChange={(input) => changeInput(input.target.value)}
                    value={valueInput}
                    className={
                        `${styles[`${cssInput}`]}
                        ${valueInput.length !== 0 && !validasiInput?.status && styles[`${cssInput}-active"`]}
                        ${validasiInput?.status && styles[`${cssInput}-danger`]}`
                    }
                    // ref={inputRef}
                    data-testid="inputElement"
                />

                {/* Text Placeholder */}
                <p
                    className={
                        `${styles[`${cssPlaceholder}`]}
                        ${valueInput.length !== 0 && !validasiInput?.status && styles[`${cssPlaceholder}-active`]}
                        ${validasiInput?.status && valueInput.length !== 0 && styles[`${cssPlaceholder}-danger`]}`
                    }
                >
                    {valuePlaceholder}
                </p>

                {/* Icon */}
                {iconType === "PiLockKeyFill"
                    ? (
                        <div
                            className={`
                                ${styles[`${cssIcon}`]}
                                ${valueInput.length !== 0 && styles[`${cssIcon}-active`]}
                                ${validasiInput?.status && styles[`${cssIcon}-danger`]}
                            `}
                            style={styleIcon}
                            onClick={() => updatePassVisible()}
                            data-testid="buttonIconElement"
                        >
                            <Icons
                                // if passwordVisible true send "PiLockKeyOpenFill"
                                iconType={!passwordVisible ? iconType : "PiLockKeyOpenFill"}
                            />
                        </div>
                    )
                    : (
                        <div
                            className={`
                                ${styles[`${cssIcon}`]}
                                ${valueInput.length !== 0 && styles[`${cssIcon}-active`]}
                                ${validasiInput?.status && styles[`${cssIcon}-danger`]}
                            `}
                            style={styleIcon}
                            data-testid="buttonIconElement"
                        >
                            <Icons
                                // if passwordVisible true send "PiLockKeyOpenFill"
                                iconType={iconType}
                            />
                        </div>
                    )
                }

                {validasiInput?.status === true
                    ? (
                        // Validasi denger
                        <span className={`${styles[`${cssValidasi}`]}`}>{validasiInput.text}</span>
                    )
                    : (
                        ""
                    )
                }
            </label >
        </>
    )
}