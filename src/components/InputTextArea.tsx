import { useEffect, useRef, useState } from "react";
import styles from "../style/index.module.scss";

type InputTextAreaProps = {
    cssInput?: string;
    cssPlaceholder?: string;
    cssValidasi?: string;
    cssMaxInput?: string;
    maxInput?: number;
    heights: number;
    changeInput: (value: string) => void;
    valueInput: string;
    valuePlaceholder: string;
    validasiInput?: {
        status: boolean | null;
        text: string;
    }
};

export const InputTextArea = ({
    cssInput, cssPlaceholder, cssValidasi, cssMaxInput,
    maxInput, changeInput, valueInput, valuePlaceholder, validasiInput, heights
}: InputTextAreaProps) => {
    // State
    const [height, setHeight] = useState(heights);
    // useRef
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textArea = textAreaRef.current;

        const handleKeyUp = () => {
            if (textArea !== null) {
                const scHeight = textArea.scrollHeight;
                if (scHeight > heights) return setHeight(scHeight);
            }
        };

        if (textArea !== null) {
            textArea.addEventListener("keydown", handleKeyUp);
        }
    }, [heights]);

    const handleOnChange = (event: any) => {
        if (maxInput) {
            if (event.length <= maxInput) return changeInput(event)
        }
    }

    const handleFocusInput = () => {
        textAreaRef.current?.focus();
    }

    return (
        <>
            <div
                className={`
                    ${styles["container-input-textarea"]}

                    // Css Custome
                    ${styles[`parent-${cssInput}`]}
                `}
                onClick={handleFocusInput}
            >
                {/* Input */}
                <textarea
                    data-testid="input-textarea"
                    value={valueInput}
                    onChange={(input) => handleOnChange(input.target.value)}
                    ref={textAreaRef}
                    className={`
                        ${styles["input"]}
                        ${validasiInput?.status && styles["input-danger"]}

                        // Css Custome
                        ${styles[`${cssInput}`]}
                        ${height > heights && styles[`${cssInput}-padding`]}
                        ${validasiInput?.status && styles[`${cssInput}-danger`]}
                    `}
                    style={{ height: `${height}px` }}
                />
                {/* Placeholder */}
                <p
                    className={`
                        ${styles["placeholder"]}
                        ${valueInput?.length > 0 && styles["placeholder-active"]}
                        ${validasiInput?.status && valueInput.length !== 0 && styles["placeholder-danger"]}

                        // Css Custome
                        ${styles[`${cssPlaceholder}`]} 
                        ${valueInput?.length > 0 && styles[`${cssPlaceholder}-active`]}
                        ${validasiInput?.status && styles[`${cssPlaceholder}-danger-focus`]}
                        ${validasiInput?.status && valueInput.length !== 0 && styles[`${cssPlaceholder}-danger`]}
                    `}
                >
                    {valuePlaceholder}
                </p>
                {/* Text Validasi */}
                <span
                    className={`
                        ${styles["validasi-input-text-area"]}

                        // Css Custome
                        ${styles[`${cssValidasi}`]}
                    `}
                >
                    {validasiInput?.text}
                </span>
                {/* Max Input */}
                {maxInput && (
                    <div className={`
                        ${styles["max-input-text-area"]}

                        // Css Custome
                        ${styles[`${cssMaxInput}`]}
                    `}>
                        <p>{valueInput === null ? "0" : valueInput?.length}</p>
                        <span>/</span>
                        <p>{maxInput}</p>
                    </div>
                )}
            </div >
        </>
    )
}
