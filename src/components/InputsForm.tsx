import { FaUserAlt, PiLockKeyFill, PiLockKeyOpenFill } from "../utils/icons";
import styles from "../style/index.module.scss";
import { useState, useRef } from "react";

type IconsProps = string | Element | undefined

type InputFormProps = {
    styleIcon?: React.CSSProperties;
    typeInput: string;
    changeInput: (value: string) => void;
    valueInput: string;
    valuePlaceholder: string;
    iconType?: IconsProps;
};

export const Icons = ({ iconType }: { iconType: IconsProps }) => {
    if (iconType === "PiLockKeyOpenFill") return <PiLockKeyOpenFill />
    if (iconType === "FaUserAlt") return <FaUserAlt />
    if (iconType === "PiLockKeyFill") return <PiLockKeyFill />
    return null
}

export const InputsForm = ({ typeInput, changeInput, valueInput, iconType, styleIcon, valuePlaceholder }: InputFormProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // click parentInput focus input
    const handleDivClick = () => {
        inputRef.current?.focus();
    };

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
            <div
                className={`${styles["parent-input-form"]}`}
                onClick={handleDivClick}
            >
                {/* Input */}
                <input
                    type={!passwordVisible ? typeInput : "text"}
                    onChange={(input) => changeInput(input.target.value)}
                    value={valueInput}
                    className={`${valueInput.length === 0 ? styles["input-form"] : styles["input-form-active"]}`}
                    ref={inputRef}
                    role="inputElement"
                />

                {/* Text Placeholder */}
                <p
                    // If the value input not is empty run the classname text-placeholder-active
                    className={`${valueInput.length === 0 ? styles["text-placeholder"] : styles["text-placeholder-active"]}`}
                >
                    {valuePlaceholder}
                </p>

                {iconType === "PiLockKeyFill"
                    ? (
                        <div
                            className={`${valueInput.length === 0 ? styles["parent-icon"] : styles["parent-icon-active"]}`}
                            style={styleIcon}
                            onClick={() => updatePassVisible()}
                            role="inputElement"
                        >
                            <Icons
                                // if passwordVisible true send "PiLockKeyOpenFill"
                                iconType={!passwordVisible ? iconType : "PiLockKeyOpenFill"}
                            />
                        </div>
                    )
                    : (
                        <div
                            className={`${valueInput.length === 0 ? styles["parent-icon"] : styles["parent-icon-active"]}`}
                            style={styleIcon}
                            role="buttonIconElement"
                        >
                            <Icons
                                // if passwordVisible true send "PiLockKeyOpenFill"
                                iconType={iconType}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
}