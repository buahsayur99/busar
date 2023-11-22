import React, { useEffect, useState } from "react";
import styles from "../style/index.module.scss";
import { ButtonTooltip } from "./ButtonTooltip";
import { BsPlusCircle } from "../utils/icons";
import { ActiveInfoTableProps } from "../pages/dashboard/ProductAdmin";
import { convertObjectToArray } from "../utils/convert";
import { ImageTable } from "../pages/dashboard/components/TableDataAdmin";

type DetailInfoTableProps = {
    openBigImage: (visible: boolean, dataBigImage: any) => void;
    activeInfoTable: ActiveInfoTableProps;
    faClose: (event: ActiveInfoTableProps) => void;
    dataInfo: any[]
}

type ActiveProps = {
    bgBlack: boolean;
    bgWhite: boolean;
    bgBlackCss: boolean;
    bgWhiteCss: boolean;
}

export const DetailInfoTable = ({ activeInfoTable, dataInfo, faClose, openBigImage }: DetailInfoTableProps) => {
    const [active, setActive] = useState<ActiveProps>({ bgBlack: true, bgWhite: false, bgBlackCss: true, bgWhiteCss: false });

    const updateActive = (event: any) => {
        setActive(prev => {
            return { ...prev, ...event }
        })
    }

    const hanldeCloseForm = () => {
        updateActive({ bgWhiteCss: false });

        setTimeout(() => {
            updateActive({ bgWhite: false });
            updateActive({ bgBlackCss: false });

            setTimeout(() => {
                updateActive({ bgBlack: false });
                faClose({ status: false, tipe: null, data: null });
            }, 500);
        }, 500);
    }

    useEffect(() => {
        if (active.bgBlack === true) {
            setTimeout(() => {
                updateActive({ bgWhite: true, bgWhiteCss: true });
            }, 500);
        }
    }, [active.bgBlack])

    return (
        <>
            <div className={`
                ${styles["container-detail-info-table"]}
                ${active.bgBlackCss ? styles["fade-in"] : styles["fade-out"]}
            `}>
                {active.bgWhite && (
                    <div className={`
                    ${styles["bg-white"]}
                    ${active.bgWhiteCss ? styles["scale-in-center"] : styles["scale-out-center"]}
                `}>
                        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", top: ".5rem", right: ".5rem" }}>
                            <ButtonTooltip
                                styleButton={"button-close"}
                                textTooltip={"button close"}
                                styleTooltip={"tooltip-detail-table"}
                                styleCssTooltip={{}}
                                onClicks={() => hanldeCloseForm()}
                            >
                                <BsPlusCircle />
                            </ButtonTooltip>
                        </div>

                        <div className={styles["data-table"]}>
                            {dataInfo.map((data, index) => (
                                <div key={index} className={styles["flex-table"]}>
                                    <span>{data.tittle}:</span>
                                    {data.tipe === "text" && <h2>{data.content}</h2>}
                                    {data.tipe === "image" && (
                                        <div className={styles["parent-image"]}>
                                            <ImageTable
                                                data={convertObjectToArray(activeInfoTable.data?.url)}
                                                openBigImage={(visible: boolean, dataBigImage: any) => openBigImage(visible, dataBigImage)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
