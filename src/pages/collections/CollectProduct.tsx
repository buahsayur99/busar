import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { productProps } from "../../app/actions/apiProductSlice";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { Footers } from "../../components/Footers";
import styles from "../../style/index.module.scss";
import { ImageArray } from "../../components/ImageArray";
import { convertObjectToArray, faWishlist, formattedNumber } from "../../utils/convert";
import { HeartIcon } from "../../components/HeartIcon";
import { useGetWishlist } from "../../hook/useGetWishlist";
import { useGetProduct } from "../../hook/useGetProduct";
import { BigImage } from "../../components/BigImage";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { useGetApiCart } from "../../hook/useGetApiCart";

export const CollectProduct = () => {
    const { nameProduct } = useParams();
    const [product, setProduct] = useState<productProps[]>([]);
    const [visibleBigImage, setVisibleBigImage] = useState<boolean>(false);
    const [targetImage, setTargetImage] = useState<string | null>(null);
    // UseAppSelector
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    const { dataWishlist, isMessageWishlist } = useAppSelector(state => state.apiWishlist);
    // Custome Hook
    const { handleGetApiWishlist } = useGetWishlist();
    const { toggle } = useBodyScrollLock();
    const { handleAddCart } = useGetApiCart();
    useGetProduct();

    const baseStyleTooltips = {
        color: "white",
        fontSize: ".6rem"
    }

    const settingHeart = {
        cssButton: "icon-heart",
        cssTooltipRemove: "text-tooltip-remove",
        cssTooltipAdd: "text-tooltip-add",
        textTooltipRemove: "remove from wishlist",
        textTooltipAdd: "add from wishlist",
        styleButtonFill: { color: "red" },
        styleTooltips: { color: "red" },
        styleTooltip: {
            ...baseStyleTooltips,
        },
        positionX: 13,
        positionY: 16,
        arialLabelFill: "heart fill",
        arialLabelNoFill: "heart",
    }

    const faGetApiWishlist = useCallback(() => {
        if (isMessageWishlist === "success add wishlist" || isMessageWishlist === "success remove wishlist") return handleGetApiWishlist()
    }, [isMessageWishlist, handleGetApiWishlist])

    const handleFilterProduct = useCallback(() => {
        const productFilter = dataProductApi.filter((data) => {
            return data.name.toLowerCase() === nameProduct?.toLowerCase();
        });
        setProduct(productFilter);
    }, [dataProductApi, nameProduct])

    useEffect(() => {
        faGetApiWishlist();
        handleFilterProduct();
    }, [faGetApiWishlist, handleFilterProduct])

    const handleVisibleBigImage = (url: string) => {
        setTargetImage(url);
        setVisibleBigImage(true);
        toggle(true)
    }

    const handleInvisibleBigImage = (visible: boolean) => {
        setVisibleBigImage(visible);
        toggle(visible)
    }

    return (
        <>
            {/* Navbar */}
            <NavigationBar />

            {/* Big Image */}
            {visibleBigImage && (
                <BigImage
                    targetImage={targetImage}
                    dataImage={convertObjectToArray(product[0].url)}
                    closeBigImage={(visible) => handleInvisibleBigImage(visible)}
                />
            )}

            <div className={styles["global-container"]}>
                <div className={styles["container-collect-product"]}>
                    {product.map(data => (
                        <div key={data.id} className={styles["collect-product-group"]}>
                            <div className={styles["product-image"]}>
                                <ImageArray imageUrl={convertObjectToArray(data.url)} faHandleBigImage={(url: string) => handleVisibleBigImage(url)} />
                            </div>
                            <div className={styles["product-detail"]}>
                                <div className={styles["product-detail-top"]}>
                                    <h4>{data.name}</h4>
                                    <div className={styles["icon-heart-wraps"]}>
                                        <HeartIcon
                                            settingHeart={settingHeart}
                                            dataWishlist={faWishlist(data, dataWishlist)}
                                            products={data}
                                            onClicks={() => { }}
                                        />
                                        <p>favorit</p>
                                    </div>
                                </div>
                                <div className={styles["product-detail-mid"]}>
                                    <p className={styles["price"]}>Rp {formattedNumber(data.price)}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleAddCart(data, 1)}
                                    >
                                        +Keranjang
                                    </button>
                                </div>
                                <p className={styles["informasi"]}>{data.information}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footers />
        </>

    )
}
