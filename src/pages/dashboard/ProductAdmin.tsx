import { useEffect, useState } from "react";
import { productProps, resetIsMessageProduct } from "../../app/actions/apiProductSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TableDataAdmin, TableDataProps } from "./components/TableDataAdmin";
import styles from "../../style/index.module.scss";
import { NavbarDashboard } from "./components/NavbarDashboard";
import { FormAddProduct } from "./components/FormAddProduct";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { useGetProduct } from "../../hook/useGetProduct";
import { resetCheckeds } from "../../app/actions/apiAddressSlice";

export type ActiveProps = {
    checkboxs?: boolean;
    formProduct?: boolean;
    updateProductData?: productProps | null
}

export type BigImageProps = {
    dataImage?: string[];
    targetImage?: string | null;
}

export type ActiveInfoTableProps = {
    status: boolean;
    tipe: string | null
    data: productProps | null
}

export const ProductAdmin = () => {
    // State
    const [localActive, setLocalActive] = useState<ActiveProps>({ checkboxs: false, formProduct: false, updateProductData: null });
    const [bigImage, setBigImage] = useState<BigImageProps>({ dataImage: [], targetImage: null });
    const [visibleBigImage, setVisibleBigImage] = useState<boolean>(false);
    const [activeInfoTable, setActiveInfoTable] = useState<ActiveInfoTableProps>({ status: false, tipe: null, data: null });
    // useAppSelector
    const { active } = useAppSelector(state => state.onOffSlice);
    const { dataProductApi, isMessageProduct } = useAppSelector(state => state.apiProduct);
    const dispatch = useAppDispatch();
    // Custome Hook
    const { toggle } = useBodyScrollLock();
    const { handleGetProduct } = useGetProduct();

    const updateBigImage = ((event: any) => {
        setBigImage(prev => {
            return { ...prev, ...event }
        })
    });

    const updateInfoTable = ((event: ActiveInfoTableProps) => {
        setActiveInfoTable(prev => {
            return { ...prev, ...event }
        })
    })

    const updateVisibleBigImage = (event: boolean) => {
        setVisibleBigImage(event)
    }

    const handleLocalActive = (event: any) => {
        setLocalActive(prev => {
            return { ...prev, ...event }
        })
    }

    const handleOnOffForm = (toggles: boolean, form: any) => {
        toggle(toggles);
        setLocalActive(form)
    }

    useEffect(() => {
        if (isMessageProduct === "product delete successfuly") {
            handleGetProduct();
            dispatch(resetIsMessageProduct());
            dispatch(resetCheckeds());
            handleLocalActive({ checkboxs: false })
        }
    }, [isMessageProduct, dispatch, handleGetProduct])
    return (
        <>
            {localActive.formProduct && (
                <FormAddProduct
                    handleOnOffForm={() => handleOnOffForm(false, { formProduct: false })}
                    dataUpdateProduct={localActive.updateProductData}
                />
            )}

            <div className={styles["global-container-dashboard"]}>
                <NavbarDashboard />
                {/* Dimensi Tablet And PC */}
                <div
                    className={`
                        ${styles["global-parent-dashboard"]}
                        ${active.navDashboard ? styles["global-margin-max-size"] : styles["global-margin-min-size"]}
                        ${styles["hidden-mobile"]}
                    `}
                >
                    <Products
                        updateInfoTable={updateInfoTable}
                        activeInfoTable={activeInfoTable}
                        visibleBigImage={visibleBigImage}
                        bigImage={bigImage}
                        updateBigImage={(event: BigImageProps) => updateBigImage(event)}
                        updateVisibleBigImage={(event: boolean) => updateVisibleBigImage(event)}
                        handleOnOffForm={() => handleOnOffForm(true, { formProduct: true })}
                        tbodyData={dataProductApi}
                        localActive={localActive}
                        faHandleActive={(event: ActiveProps) => handleLocalActive(event)}
                    />
                </div>

                {/* Dimensi Mobile */}
                <div
                    className={`
                        ${styles["global-parent-dashboard"]}
                        ${styles["global-margin-min-size"]}
                        ${styles["hidden-tablet-pc"]}
                    `}
                >
                    <Products
                        updateInfoTable={updateInfoTable}
                        activeInfoTable={activeInfoTable}
                        visibleBigImage={visibleBigImage}
                        bigImage={bigImage}
                        updateBigImage={(event: BigImageProps) => updateBigImage(event)}
                        updateVisibleBigImage={(event: boolean) => updateVisibleBigImage(event)}
                        handleOnOffForm={() => handleOnOffForm(true, { formProduct: true })}
                        tbodyData={dataProductApi}
                        localActive={localActive}
                        faHandleActive={(event: ActiveProps) => handleLocalActive(event)}
                    />
                </div>
            </div>
        </>
    )
}

const Products = ({ localActive, faHandleActive, tbodyData, handleOnOffForm, bigImage, visibleBigImage, updateBigImage, updateVisibleBigImage, activeInfoTable, updateInfoTable }: TableDataProps) => {
    return (
        <>
            <div className={styles["padding-table"]}>
                {/* Table Product */}
                <div className={styles["parent-product-admin"]}>
                    <div className={styles["parent-button-judul-product"]}>
                        <h3>daftar product</h3>
                        <button
                            type="button"
                            onClick={handleOnOffForm}
                        >
                            add product
                        </button>
                    </div>
                    <div className={styles["line"]}></div>
                    <TableDataAdmin
                        updateInfoTable={updateInfoTable}
                        activeInfoTable={activeInfoTable}
                        visibleBigImage={visibleBigImage}
                        bigImage={bigImage}
                        updateBigImage={updateBigImage}
                        updateVisibleBigImage={updateVisibleBigImage}
                        tbodyData={tbodyData}
                        localActive={localActive}
                        faHandleActive={(event: ActiveProps) => faHandleActive(event)}
                    />
                </div>
            </div>
        </>
    )
}