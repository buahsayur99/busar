import React, { CSSProperties, useState } from "react";
import styles from "../style/index.module.scss";

type ButtonTooltipCssProps = {
    children: React.ReactNode;
    arialLabel: string;
    classNameButton: string;
    classNameTooltip: string;
    textTooltip: string;
    onClicks?: () => void;
}

export const ButtonTooltipCss = ({ onClicks, children, arialLabel, classNameButton, classNameTooltip, textTooltip }: ButtonTooltipCssProps) => {
    const [showContent, setShowContent] = useState(false);

    const buttonStyle: CSSProperties = {
        position: 'relative',
        color: '$primary-color',
    };

    const beforeStyle: CSSProperties = {
        position: 'absolute',
        zIndex: '1',
        display: showContent ? 'inline-block' : 'none',
    };

    return (
        <>
            <button
                type="button"
                aria-label={arialLabel}
                className={styles[`${classNameButton}`]}
                style={buttonStyle}
                onMouseOver={() => setShowContent(true)}
                onMouseOut={() => setShowContent(false)}
                onClick={onClicks}
            >
                <span
                    style={{ ...beforeStyle }}
                    className={`
                        ${styles["global-tooltip-css"]}
                        ${styles[`${classNameTooltip}`]}
                    `}
                >
                    {textTooltip}
                </span>
                {children}
            </button>
        </>
    )
}
