import React, { useRef } from "react";
import styles from "../../../style/index.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { convertTotalPrice } from "../../../utils/convert";
import { InputCheckbox } from "../../../components";
import { useCheckedCart } from "../../../hook/index";

type CardTotalHargaProps = {
    scrolledTotalPrice: any
}

export const CardTotalHarga = ({ scrolledTotalPrice }: CardTotalHargaProps) => {
    const { dataCart, checkedCart } = useAppSelector(state => state.apiCart);
    const { handleCheckedCart } = useCheckedCart(dataCart, checkedCart);
    const navigate = useNavigate();
    const selectAllRef = useRef<HTMLLabelElement>(null);

    const handleBuyProduct = () => {
        if (checkedCart.length !== 0) {
            navigate("shipment")
        }
    }

    const handleClickCheckbox = () => {
        selectAllRef.current?.click();
    }

    return (
        <>
            <div className={styles["parent-total-harga"]}>
                <div
                    className={`
                                ${styles["card-total-harga"]}
                                ${scrolledTotalPrice ? styles["card-absolute"] : styles["card-fixed"]}
                            `}
                >
                    <div className={styles["header-input-wrapper"]}>
                        {/* Button Select all mobile */}
                        <div className={styles["parent-input-select-all"]}>
                            <InputCheckbox
                                valueInput={"selectAll"}
                                checkeds={checkedCart}
                                dataToCheckeds={dataCart}
                                fcHandleCheckeds={(event) => handleCheckedCart(event)}
                            />

                            <button
                                type="button"
                                onClick={() => handleClickCheckbox()}
                            >
                                select all
                            </button>
                        </div>

                        <h3>ringkasan belanja</h3>
                    </div>

                    <div className={`${styles["css-line-cart"]} ${styles["tablet-hidden"]}`}></div>

                    <div className={styles["parent-button-text"]}>
                        <div className={styles["text-contain"]}>
                            <p>total harga</p>
                            <span>rp {convertTotalPrice(checkedCart)}</span>
                        </div>
                        <div className={styles["button-wrapper"]}>
                            <button
                                type="button"
                                className={`${checkedCart.length === 0 && styles["invisible"]}`}
                                onClick={() => handleBuyProduct()}
                            >
                                {`buy (${checkedCart.length})`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
