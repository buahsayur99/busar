import React, { useState } from "react";
import styles from "../../../style/index.module.scss";
import { productProps } from "../../../app/actions/apiProductSlice";
import { DataPaymentProps } from "../../../app/actions/apiPaymentSlice";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type UiProductTransactionProps = {
    dataProductTransaction: DataPaymentProps
    dataProduct: productProps[]
}

export const UiProductTransaction = ({ dataProductTransaction, dataProduct }: UiProductTransactionProps) => {
    const [active, setActive] = useState({ detailProduct: true });

    const handleUpdateActive = (event: any) => {
        setActive((prev) => {
            return { ...prev, ...event }
        })
    }

    const handleFilterProduct = (id: number, quantity: number) => {
        const productFilter = dataProduct.filter((data) => {
            return data.id === id
        })

        const images = JSON.parse(productFilter[0].url).image1
        const totalHarga = productFilter[0].price * quantity

        return (
            <>
                <div className={`${styles["wrapper-product"]} ${!active.detailProduct && styles["padding-0"]}`}>
                    <div className={styles["product"]}>
                        <img
                            src={`${process.env.REACT_APP_API_URL_LOCAL}/${images}`}
                            alt={productFilter[0].name}
                            width={100}
                            height={100}
                        />
                        <div className={styles["detail-product"]}>
                            <h5>{productFilter[0].name}</h5>
                            <p>rp{productFilter[0].price.toLocaleString()}</p>
                            <span>x{quantity}</span>
                            <span className={styles["total-price-product"]}>rp{totalHarga.toLocaleString()}</span>
                        </div>
                    </div>

                    <span className={styles["total-price-product"]}>rp{totalHarga.toLocaleString()}</span>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={styles["container-ui-product-transaction"]}>
                <div className={styles["wrapper-button-detail-product"]}>
                    <button
                        className={styles["button-detail-product"]}
                        onClick={() => handleUpdateActive({ detailProduct: !active.detailProduct })}
                        aria-label="button-detail-product"
                    >
                        detail product
                        <MdOutlineKeyboardArrowRight className={`${styles["icon"]} ${!active.detailProduct && styles["icon-button"]}`} />
                    </button>
                </div>

                <div className={styles["parent-product-transaction"]}>
                    {dataProductTransaction.item_details.map((product) => (
                        <div
                            key={product.idProduct}
                            className={`${styles["product-transaction"]} ${!active.detailProduct && styles["invisible"]}`}
                        >
                            {handleFilterProduct(product.idProduct, product.quantity)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
