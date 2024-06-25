import React from "react";
import styles from "../../../style/index.module.scss";
import { GoHeart, GoHeartFill } from "../../../utils/icons";
import { useGetWishlist } from "../../../hook";
import { DataWishlistProps } from "../../../app/actions/apiWishlist";
import { useAppSelector } from "../../../app/hooks";

type ButtonWishlistProps = {
    dataWishlist: DataWishlistProps[];
    idProduct: number;
    handleLoginRedirect: () => void;
}

export const ButtonWishlist = ({ dataWishlist, idProduct, handleLoginRedirect }: ButtonWishlistProps) => {
    // Redux
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    // Custome Hook
    const { handleRemoveWishlist, createWishlistApi } = useGetWishlist();

    const handleCreateWishlist = (idProducts: number) => {
        if (!dataLoginUsers) return handleLoginRedirect();
        return createWishlistApi(idProducts);
    }

    return (
        <>
            <div className={styles["button-wishlist-container"]}>
                {dataWishlist.length === 1 ? (
                    // if the user already has a wishlist
                    <div className={styles["button-wishlist-wrapper"]}>
                        <button
                            type="button"
                            className={styles["button-wishlist"]}
                            style={{ color: "red" }}
                            onClick={() => handleRemoveWishlist(dataWishlist[0].id)}
                        >
                            <GoHeartFill />
                        </button>
                        <p className={styles["tooltip-wishlist"]}>remove wishlist</p>
                    </div>
                ) : (
                    // if the user dont have a wishlist
                    <div className={styles["button-wishlist-wrapper"]}>
                        <button
                            type="button"
                            className={styles["button-wishlist"]}
                            onClick={() => handleCreateWishlist(idProduct)}
                        >
                            <GoHeart />
                        </button>
                        <p className={styles["tooltip-wishlist"]}>add wishlist</p>
                    </div>
                )}
            </div>
        </>
    )
}
