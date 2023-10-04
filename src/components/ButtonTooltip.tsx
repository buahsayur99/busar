import React, { useState } from "react";
import styles from "../style/index.module.scss";

type ButtonTooltipProps = {
    children: React.ReactNode;
    styleButton: string;
    textTooltip: string;
    styleTooltip: string;
    positionX: number;
    positionY: number;
    onClicks: () => void;
}

export const ButtonTooltip = ({ children, styleButton, textTooltip, styleTooltip, positionX, positionY, onClicks }: ButtonTooltipProps) => {
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (event: any) => {
        const buttonRect = event.target.getBoundingClientRect();
        setTooltipPosition({ top: buttonRect.y + positionY, left: buttonRect.x - positionX });
    };

    return (
        <>
            <button
                onMouseEnter={handleMouseEnter}
                className={styles[`${styleButton}`]}
                onClick={onClicks}
            >
                {children}
            </button>

            <span
                className={styles[`${styleTooltip}`]}
                style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            >
                {textTooltip}
            </span>
        </>
    )
}
