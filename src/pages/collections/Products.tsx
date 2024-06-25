import React, { useCallback, useEffect } from "react";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { productProps } from "../../app/actions/apiProductSlice";
import styles from "../../style/index.module.scss";
import { usePageTittle, useApiCategory } from "../../hook/index";
import { Category, SliderAllProduct } from "./components/index";
import { Footers } from "../../components/Footers";

export const Products = () => {
    const { dataCategory } = useAppSelector(state => state.apiCategory);
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    // Custome Hook
    const { handleTitle } = usePageTittle();
    const { handleGetCategory } = useApiCategory();

    let { "*": categories } = useParams();
    // categories adalah string yang berisi semua bagian setelah "/collections/"
    // Jika URL adalah "/collections/buah/sayur/bumbu", categories akan menjadi "buah/sayur/bumbu"
    // Anda dapat memisahkan bagian-bagian ini menggunakan split("/")
    const categoriesArray = categories ? categories.split("/") : [];

    const handleFilterProduct = (product: productProps[]) => {
        if (categoriesArray.length === 0) return product

        const filterCategory = dataCategory.filter(event => categoriesArray.includes(event.name));
        const filterProducts = product.filter(event =>
            event.category !== undefined && filterCategory.some(category => category.id === event.category)
        )
        return filterProducts
    }

    const getCategory = useCallback(() => {
        if (dataCategory.length === 0) return handleGetCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataCategory]);

    useEffect(() => {
        getCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* NavBar */}
            <NavigationBar />

            {/* Title */}
            {handleTitle(`Product | BUSAR`)}

            <div className={`${styles["global-container"]}`}>
                <div className={styles["container-product"]}>
                    <Category />
                    <SliderAllProduct products={handleFilterProduct(dataProductApi)} />
                </div>
            </div>

            <Footers />
        </>
    )
}
