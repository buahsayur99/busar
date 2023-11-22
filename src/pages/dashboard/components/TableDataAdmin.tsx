import { ImBin, ImCheckboxChecked, IoIosCloseCircle, MdDeselect, MdOutlineModeEditOutline, MdSelectAll, BsPlusCircle } from "../../../utils/icons";
import { ButtonTooltip } from "../../../components/ButtonTooltip";
import styles from "../../../style/index.module.scss";
import { InputCheckbox } from "../../../components/InputCheckbox";
import { productProps, removeProduct } from "../../../app/actions/apiProductSlice";
import { useCheckbox } from "../../../hook/useCheckbox";
import tableEmpty from "../../../assets/Table/tableEmpty.svg";
import { TableEmpty } from "../../../components/TableEmpty";
import { ActiveInfoTableProps, ActiveProps, BigImageProps } from "../ProductAdmin";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateCheckeds } from "../../../app/actions/onOffSlice";
import { convertObjectToArray, formattedNumber } from "../../../utils/convert";
import { BigImage } from "../../../components/BigImage";
import { DetailInfoTable } from "../../../components/DetailInfoTable";
import { useEffect, useState } from "react";

export type TableDataProps = {
    activeInfoTable: ActiveInfoTableProps;
    updateInfoTable: (event: ActiveInfoTableProps) => void
    visibleBigImage: boolean;
    bigImage: BigImageProps;
    updateBigImage: (event: BigImageProps) => void;
    updateVisibleBigImage: (event: boolean) => void;
    tbodyData: productProps[];
    localActive: ActiveProps;
    faHandleActive: (event: ActiveProps) => void;
    handleOnOffForm?: () => void;
}

export const TableDataAdmin = ({ tbodyData, localActive, bigImage, visibleBigImage, activeInfoTable, updateBigImage, updateVisibleBigImage, faHandleActive, updateInfoTable }: TableDataProps) => {
    // State
    const [dataProduct, setDataProduct] = useState<any[]>([]);
    // useAppSelector
    const { checkeds } = useAppSelector(state => state.onOffSlice);
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    // useAppDispatch
    const dispath = useAppDispatch();
    // Custome Hook
    const { handleCheckeds } = useCheckbox({ data: tbodyData });
    // Data thead table
    const theadData = ["no", "name", "image", "amount", "price", "information", "detail product"];

    const openBigImage = (visible: boolean, dataBigImage: any) => {
        updateVisibleBigImage(visible)
        updateBigImage(dataBigImage)
    }

    const closeBigImage = (visible: boolean) => {
        updateVisibleBigImage(visible)
    }

    const handleRemoveProduct = (id: number[]) => {
        if (id) {
            const link = `${process.env.REACT_APP_API_URL_LOCAL}/products`;
            const arrayId = id;

            dispath(removeProduct({ link, arrayId }))
        }
    }

    const removeAllProduct = (event: any[]) => {
        let id = [];
        for (const element of event) {
            id.push(element.id)
        }

        return handleRemoveProduct(id);
    }

    const handleCheckAll = () => {
        if (dataProductApi.length !== 0) return faHandleActive({ checkboxs: true });
    }

    const dataDetailInfoTable = [
        { tittle: "name", tipe: "text", content: activeInfoTable.data?.name ?? "" },
        { tittle: "amount", tipe: "text", content: activeInfoTable.data?.amount ?? "" },
        { tittle: "price", tipe: "text", content: `Rp ${formattedNumber(activeInfoTable.data?.price ?? "")}` },
        { tittle: "image", tipe: "image", content: activeInfoTable.data?.url ?? "" },
        { tittle: "information", tipe: "text", content: activeInfoTable.data?.information ?? "" },
    ]

    useEffect(() => {
        const reversedData = tbodyData.slice().reverse();
        setDataProduct(reversedData);
    }, [tbodyData])

    return (
        <>
            {visibleBigImage && (
                <BigImage
                    dataImage={bigImage.dataImage}
                    targetImage={bigImage.targetImage}
                    closeBigImage={(visible: boolean) => closeBigImage(visible)}
                />
            )}

            {activeInfoTable.status && (
                <DetailInfoTable
                    openBigImage={openBigImage}
                    faClose={updateInfoTable}
                    activeInfoTable={activeInfoTable}
                    dataInfo={dataDetailInfoTable}
                />
            )}

            <div className={styles["parent-feture-select"]}>
                {/* Button Active Select All */}
                {!localActive.checkboxs && (
                    <ButtonTooltip
                        styleButton={dataProductApi.length !== 0 ? "button" : "invisible-button"}
                        textTooltip={"active checkbox"}
                        styleTooltip={"tooltip-table-data"}
                        styleCssTooltip={{ width: "5.2rem", left: "-1.1rem", top: "2rem" }}
                        onClicks={() => handleCheckAll()}
                    >
                        <ImCheckboxChecked />
                    </ButtonTooltip>
                )}
                {/* button close and on off select all */}
                {localActive.checkboxs && (
                    <div className={styles["parent-button-on-off-checkbox"]}>
                        <div className={styles["flex-checkbox"]}>
                            {/* Button Close Select */}
                            <ButtonTooltip
                                styleButton={"buttonCloseCheckbox"}
                                textTooltip={"close checkbox"}
                                styleTooltip={"tooltip-table-data"}
                                styleCssTooltip={{ width: "5.2rem", left: "-1.7rem" }}
                                onClicks={() => {
                                    // Close Select
                                    faHandleActive({ checkboxs: false });
                                    // Reset Checkeds
                                    dispath(updateCheckeds([]));
                                }}
                            >
                                <IoIosCloseCircle />
                            </ButtonTooltip>
                            {/* Line */}
                            <div className={styles["line"]}></div>
                            {/* if the user do not click checked on all products, display button MdSelectAll. if the user clicks checked on all products, display button MdDeselect */}
                            {checkeds.length < tbodyData.length ? (
                                <ButtonTooltip
                                    styleButton={"buttonCheckbox"}
                                    textTooltip={"select all"}
                                    styleTooltip={"tooltip-table-data"}
                                    styleCssTooltip={{ width: "3.4rem" }}
                                    onClicks={() => handleCheckeds({ selectAll: true })}
                                >
                                    < MdSelectAll />
                                </ButtonTooltip>
                            ) : (
                                <ButtonTooltip
                                    styleButton={"buttonCheckbox"}
                                    textTooltip={"deselect all"}
                                    styleTooltip={"tooltip-table-data"}
                                    styleCssTooltip={{ width: "4rem" }}
                                    onClicks={() => handleCheckeds({ selectAll: true })}
                                >
                                    < MdDeselect />
                                </ButtonTooltip>
                            )}
                            {/* Line */}
                            <div className={styles["line"]}></div>
                            {/* Button Remove */}
                            {checkeds.length !== 0 ? (
                                // if the users clicks checked then the remove product button can be clicked
                                <ButtonTooltip
                                    styleButton={"buttonCheckbox"}
                                    textTooltip={"remove select product"}
                                    styleTooltip={"tooltip-table-data"}
                                    styleCssTooltip={{ width: "7rem", display: "flex", justifyContent: "center", left: "-3rem" }}
                                    onClicks={() => removeAllProduct(checkeds)}
                                >
                                    <ImBin />
                                </ButtonTooltip>
                            ) : (
                                // if the users not is clicks checked then the remove product button cannot be clicked
                                <ButtonTooltip
                                    styleButton={"button-invisible"}
                                    textTooltip={"remove select product"}
                                    styleTooltip={"tooltip-table-data"}
                                    styleCssTooltip={{ width: "7rem", display: "flex", justifyContent: "center", left: "-3rem" }}
                                    onClicks={() => { }}
                                >
                                    <ImBin />
                                </ButtonTooltip>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles["parent-table"]}>
                <table>
                    <thead>
                        <tr>
                            {localActive.checkboxs && (
                                <th style={{ width: "50px", textAlign: "center" }}>
                                    select
                                </th>
                            )}
                            {theadData?.map((data, index) => (
                                <th
                                    key={index}
                                    className={`
                                        ${index === 0 && styles["th1"]}
                                        ${index === 1 && styles["th2"]}
                                        ${index === 2 && styles["th-image"]}
                                        ${index === 3 && styles["th-amount"]}
                                        ${index === 4 && styles["th-price"]}
                                        ${index === 5 && styles["th-information"]}
                                        ${index === 6 && styles["th-detail-product"]}
                                    `}
                                >
                                    {data}
                                </th>
                            ))}
                            {!localActive.checkboxs && (
                                <th className={styles["th-actions"]}>actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {/* display table, if the product is not empty */}
                        {dataProduct.map((data, index) => (
                            <tr key={index}>
                                {localActive.checkboxs && (
                                    <td>
                                        <InputCheckbox
                                            valueInput={data}
                                            checkeds={checkeds}
                                            fcHandleCheckeds={(event: productProps) => handleCheckeds(event)}
                                        />
                                    </td>
                                )}
                                <td style={{ height: "6rem" }}>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>
                                    <div className={styles["parent-image"]}>
                                        {/* Component image, 1 file */}
                                        <ImageTable data={convertObjectToArray(data.url)} openBigImage={(visible: boolean, dataBigImage: any) => openBigImage(visible, dataBigImage)} />
                                    </div>
                                    <div className={styles["parent-btn-tooltip-table-product"]}>
                                        <ButtonTooltip
                                            styleButton={""}
                                            textTooltip={"detail image"}
                                            styleTooltip={"tooltip-table-data"}
                                            styleCssTooltip={{ left: ".1rem" }}
                                            onClicks={() => openBigImage(true, { dataImage: convertObjectToArray(data.url) })}
                                        >
                                            <BsPlusCircle />
                                        </ButtonTooltip>
                                    </div>
                                </td>
                                <td>{formattedNumber(data.amount)}</td>
                                <td>{`Rp ${formattedNumber(data.price)}`}</td>
                                <td>
                                    <div className={styles["parent-btn-tooltip-table-product"]}>
                                        <ButtonTooltip
                                            styleButton={""}
                                            textTooltip={"detail information"}
                                            styleTooltip={"tooltip-table-data"}
                                            styleCssTooltip={{ left: "0rem" }}
                                            onClicks={() => updateInfoTable({ status: true, tipe: "detail product", data: data })}
                                        >
                                            <BsPlusCircle />
                                        </ButtonTooltip>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles["parent-btn-tooltip-table-product"]}>
                                        <ButtonTooltip
                                            styleButton={""}
                                            textTooltip={"detail product"}
                                            styleTooltip={"tooltip-table-data"}
                                            styleCssTooltip={{ left: "0rem" }}
                                            onClicks={() => updateInfoTable({ status: true, tipe: "detail product", data: data })}
                                        >
                                            <BsPlusCircle />
                                        </ButtonTooltip>
                                    </div>
                                </td>
                                {/* Button Action */}
                                {!localActive.checkboxs && (
                                    <td >
                                        <div className={styles["parent-button-actions"]}>
                                            <ButtonTooltip
                                                styleButton={"buttonAction"}
                                                textTooltip={"edit product"}
                                                styleTooltip={"tooltip-table-data"}
                                                onClicks={() => faHandleActive({ formProduct: true, updateProductData: data })}
                                            >
                                                <MdOutlineModeEditOutline />
                                            </ButtonTooltip>
                                            <ButtonTooltip
                                                styleButton={"buttonAction"}
                                                textTooltip={"remove product"}
                                                styleTooltip={"tooltip-table-data"}
                                                onClicks={() => {
                                                    if (data.id) return handleRemoveProduct([data.id]);
                                                }}
                                            >
                                                <ImBin />
                                            </ButtonTooltip>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table >


                {/* If the product empty, display the image 'table-empty' */}
                {tbodyData.length === 0 && (
                    <TableEmpty image={tableEmpty} />
                )}
            </div>
        </>
    )
}

export type ImageTableProps = {
    data: string[];
    openBigImage: (visible: boolean, dataBigImage: any) => void;
}

export const ImageTable = ({ data, openBigImage }: ImageTableProps) => {
    return (
        <>
            {data.map((url: any, index: number) => (
                <img key={index} onClick={() => openBigImage(true, { dataImage: data, targetImage: url })} src={`${process.env.REACT_APP_API_URL_LOCAL}/${url}`} alt={`${index}`} />
            ))}
        </>
    )
}
