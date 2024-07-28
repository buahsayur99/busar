import React, { useEffect, useState } from "react";
import styles from "../../style/index.module.scss";
import { useAppSelector } from "../../app/hooks";
import { NavigationBar } from "../../features/navbar";
import { Footers, LoadingCard } from "../../components/index";
import { productProps } from "../../app/actions/apiProductSlice";
import { useParams } from "react-router-dom";
import { SliderAllProduct } from "../collections/components/index";
import { usePageTittle } from "../../hook/index";

export const SearchProduct = () => {
    const [suggestions, setSuggestions] = useState<productProps[]>([]);
    const { dataProductApi, isLoadingProduct } = useAppSelector(state => state.apiProduct);
    const { nameProduct } = useParams();
    const { handleTitle } = usePageTittle();

    useEffect(() => {
        // Hanya update daftar saran jika inputSearch tidak kosong
        if (nameProduct) {
            if (nameProduct.trim() !== "") {
                const filteredProducts = dataProductApi.filter((product) =>
                    product.name.toLowerCase().includes(nameProduct.toLowerCase())
                );
                setSuggestions(filteredProducts);
            } else {
                // Kosongkan daftar saran jika inputSearch kosong
                setSuggestions([]);
            }
        }
    }, [nameProduct, dataProductApi]);

    return (
        <>
            {/* Title */}
            {handleTitle(`Pencarian: ${suggestions.length} hasil ditemukan untuk "${nameProduct}" - BUSAR`)}

            <NavigationBar />

            <div className={`${styles["global-container"]}`}>
                <div className={styles["container-search-product"]}>
                    {/* Loading Card */}
                    {isLoadingProduct && (
                        <div className={styles["loading-card-wrapper"]}>
                            <div className={styles["total-products-wrapper"]}>
                                <p className={`${styles["loading-card"]} ${styles["total-product-1"]}`}></p>
                                <p className={`${styles["loading-card"]} ${styles["total-product-2"]}`}></p>
                            </div>

                            <div className={styles["card-products-wrapper"]}>
                                <LoadingCard arrayLoopCard={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                            </div>
                        </div>
                    )}

                    <div className={styles["total-products-wrapper"]}>
                        <h2>{`product (${suggestions.length})`}</h2>
                        <p>
                            menampilkan hasil
                            <strong>{suggestions.length}</strong>
                        </p>
                    </div>

                    {/* If the search product is empty */}
                    {!isLoadingProduct && suggestions.length === 0 && (
                        <div className={styles["search-product-empty-wrapper"]}>
                            <p className={styles["info-product-empty"]}>
                                {`Maaf! Kami tidak dapat menemukan hasil untuk "${nameProduct}". Namun jangan menyerah – periksa ejaannya atau coba istilah pencarian yang kurang spesifik`}
                            </p>
                        </div>
                    )}

                    <div className={styles["card-products-wrapper"]}>
                        <SliderAllProduct products={suggestions} />
                    </div>
                </div>
            </div>

            <Footers />
        </>
    )
}
