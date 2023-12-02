import React, { useState } from "react";
import styles from "../style/index.module.scss";

type ButtonTooltipProps = {
    children: React.ReactNode;
    styleButton: string;
    textTooltip: string;
    styleTooltip: string;
    styleCssTooltip?: React.CSSProperties;
    styleCssButton?: React.CSSProperties;
    positionX?: number;
    positionY?: number;
    onClicks: () => void;
    ariaLabel?: string;
}

export const ButtonTooltip = ({ children, styleButton, textTooltip, styleTooltip, positionX, positionY, styleCssTooltip, styleCssButton, onClicks, ariaLabel }: ButtonTooltipProps) => {
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 })

    const handlePositionTooltip = (event: any) => {
        const { clientX, clientY } = event;
        setPosition({ top: clientY + positionY, left: clientX + positionX });
        setActive(true)
    }

    return (
        <>
            <div style={{ position: "relative" }}>
                <button
                    onMouseMove={(event) => handlePositionTooltip(event)}
                    onMouseLeave={() => setActive(false)}
                    className={styles[`${styleButton}`]}
                    style={{ ...styleCssButton }}
                    onClick={onClicks}
                    type="button"
                    aria-label={ariaLabel}
                >
                    {children}
                </button>

                {active && (
                    <p
                        className={styles[`${styleTooltip}`]}
                        style={{ top: position.top, left: position.left, ...styleCssTooltip }}
                    >
                        {textTooltip}
                    </p>
                )}
            </div>
        </>
    )
}
