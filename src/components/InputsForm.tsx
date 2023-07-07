import { FaUserAlt, PiLockKeyFill } from "../utils/icons";
import styles from "../style/index.module.scss";
import { useEffect, useState, useRef } from "react";

type IconsProps = string | Element | undefined

type InputFormProps = {
    styleIcon?: React.CSSProperties;
    typeInput: string;
    changeInput: (value: string) => void;
    valueInput: string;
    valuePlaceholder: string;
    iconType?: IconsProps;
};

const Icons = ({ iconType }: { iconType: IconsProps }) => {
    if (iconType === "FaUserAlt") return <FaUserAlt />
    if (iconType === "PiLockKeyFill") return <PiLockKeyFill />
    return null
}

export const InputsForm = ({ typeInput, changeInput, valueInput, iconType, styleIcon, valuePlaceholder }: InputFormProps) => {
    const [valueInputs, setValueInputs] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDivClick = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (valueInput.length !== 0) return setValueInputs(true);
        return setValueInputs(false)
    }, [valueInput.length])

    return (
        <>
            {/* Parent Form Input */}
            <div
                className={`${styles["parent-input-form"]}`}
                onClick={handleDivClick}
            >
                {/* Input */}
                <input
                    type={typeInput}
                    onChange={(input) => changeInput(input.target.value)}
                    value={valueInput}
                    className={`${!valueInputs ? styles["input-form"] : styles["input-form-active"]}`}
                    ref={inputRef}
                />

                {/* Text Placeholder */}
                <p
                    // If the value input not is empty run the classname text-placeholder-active
                    className={`${!valueInputs ? styles["text-placeholder"] : styles["text-placeholder-active"]}`}
                >
                    {valuePlaceholder}
                </p>

                {/* Icon Input */}
                <div
                    className={`${!valueInputs ? styles["parent-icon"] : styles["parent-icon-active"]}`}
                    style={styleIcon}
                >
                    <Icons iconType={iconType} />
                </div>
            </div>
        </>
    )
}