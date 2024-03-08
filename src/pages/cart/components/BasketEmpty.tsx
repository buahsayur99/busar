import React from "react";
import styles from "../../../style/index.module.scss";
import basketEmpty from "../../../assets/cart/cartEmpty.webp";
import { Link } from "react-router-dom";

export const BasketEmpty = () => {
    return (
        <>
            <div className={styles["basket-empty-wrapper"]}>
                <img src={basketEmpty} width={350} alt="basket empty" />
                <div className={styles["text-contain"]}>
                    <h4>wah, your shooping cart is empty</h4>
                    <p>let's, fill it witch your dream items</p>
                </div>
                <Link
                    to={"/collections"}
                >
                    <button
                        type="button"
                    >
                        start shopping
                    </button>
                </Link>
            </div>
        </>
    )
}
