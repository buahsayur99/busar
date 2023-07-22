import React from "react";
import styles from "../style/index.module.scss";
import { Buttons } from "./Buttons";
import { useAppDispatch } from "../app/hooks";
import { resetValidasi } from "../app/actions/formLoginRegisterSlice";
import { resetIsMessage } from "../app/actions/apiUsersSlice";

type BannerFormProops = {
    children: React.ReactNode;
    judulText: string;
    spanText: string;
    onClick: () => void;
    stylesCss?: React.CSSProperties;
    judulButton?: string
}

export const BannerForm = ({ children, judulText, spanText, onClick, stylesCss, judulButton }: BannerFormProops) => {
    const dispatch = useAppDispatch()

    return (
        <>
            <div className={`${styles["parent_banner-form"]}`}>
                {/* Judul */}
                <div style={stylesCss} className={`${styles["judul"]}`}>
                    <h1>{judulText}</h1>
                    <span>{spanText}</span>
                </div>
                {/* Text Banner */}
                <p className={`${styles["text"]}`}>{children}</p>

                <div
                    onClick={onClick}
                    className={`${styles["parent_btn-regis"]}`}
                >
                    {/* Button */}
                    <Buttons
                        styleScss={"btn_regis"}
                        onClicks={() => {
                            dispatch(resetValidasi());
                            dispatch(resetIsMessage());
                        }}
                    >
                        {judulButton}
                    </Buttons>
                </div>
            </div>
        </>
    )
}