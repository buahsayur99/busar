import { FaUserAlt, PiLockKeyFill, PiLockKeyOpenFill } from "../utils/icons";
import styles from "../style/index.module.scss";
import { useEffect, useState } from "react";

type IconsProps = string | Element | undefined

export type InputFormProps = {
    cssInput?: string;
    cssPlaceholder?: string;
    cssIcon?: string;
    cssValidasi?: string;
    cssMaxInput?: string;
    styleIcon?: React.CSSProperties;
    maxInput?: number;
    typeInput: string;
    changeInput: (value: string) => void;
    valueInput?: string | null | undefined;
    valuePlaceholder: string;
    iconType?: IconsProps;
    validasiInput?: {
        status: boolean | null;
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
        typeInput, changeInput, valueInput, iconType, styleIcon, valuePlaceholder, validasiInput, cssInput, cssPlaceholder, cssIcon, cssValidasi, maxInput, cssMaxInput
    }: InputFormProps
) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [inputLength, setInputLength] = useState(0);

    const updatePassVisible = () => {
        setPasswordVisible((state) => !state);
    }

    const onChange = (event: any) => {
        if (maxInput) {
            if (event.length <= maxInput) return changeInput(event);
        }
        if (!maxInput) return changeInput(event);
    }

    useEffect(() => {
        if (valueInput !== null && valueInput !== undefined) return setInputLength(valueInput.length);
    }, [valueInput])

    return (
        <>
            {/* Parent Form Input */}
            <label
                className={`${styles["parent-input-form"]}`}
            >
                {/* Input */}
                <input
                    type={!passwordVisible ? typeInput : "text"}
                    onChange={(input) => onChange(input.target.value)}
                    value={`${valueInput === null ? "" : valueInput}`}
                    className={
                        `${styles[`${cssInput}`]}
                        ${inputLength !== 0 && !validasiInput?.status && styles[`${cssInput}-active"`]}
                        ${validasiInput?.status && styles[`${cssInput}-danger`]}`
                    }
                    data-testid="inputElement"
                />

                {/* Text Placeholder */}
                <p
                    className={
                        `${styles[`${cssPlaceholder}`]}
                        ${inputLength !== 0 && !validasiInput?.status && styles[`${cssPlaceholder}-active`]}
                        ${validasiInput?.status && styles[`${cssPlaceholder}-danger-focus`]}
                        ${validasiInput?.status && valueInput?.length !== 0 && styles[`${cssPlaceholder}-danger`]}`
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
                                ${inputLength !== 0 && styles[`${cssIcon}-active`]}
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
                                ${inputLength !== 0 && styles[`${cssIcon}-active`]}
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
                        <span
                            className={`${styles[`${cssValidasi}`]}`}
                        >
                            {validasiInput.text}
                        </span>
                    )
                    : (
                        ""
                    )
                }

                {maxInput && (
                    <div className={styles[`${cssMaxInput}`]}>
                        <p>{valueInput === null ? "0" : valueInput?.length}</p>
                        <span>/</span>
                        <p>{maxInput}</p>
                    </div>
                )}
            </label >
        </>
    )
}