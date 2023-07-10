import React from "react";
import styles from "../style/index.module.scss";
import { Buttons } from "./Buttons";

type BannerFormProops = {
    children: React.ReactNode;
    judulText: string;
    spanText: string;
    onClick: () => void
    stylesCss?: React.CSSProperties
}

export const BannerForm = ({ children, judulText, spanText, onClick, stylesCss }: BannerFormProops) => {
    return (
        <>
            <div className={`${styles["parent_banner-form"]}`}>
                {/* Judul */}
                <h1
                    style={stylesCss}
                    className={`${styles["judul"]}`}
                >
                    {judulText},
                    <br />
                    <span>{spanText}</span>
                </h1>
                {/* Text Banner */}
                <p className={`${styles["text"]}`}>{children}</p>

                <div onClick={() => onClick()} className={`${styles["parent_btn-regis"]}`}>
                    {/* Button */}
                    <Buttons styleScss={"btn_regis"}>
                        register
                    </Buttons>
                </div>
            </div>
        </>
    )
}
