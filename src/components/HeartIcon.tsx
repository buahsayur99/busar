import React from "react"
import styles from "../style/index.module.scss";
import { ButtonTooltip } from "./ButtonTooltip";
import { GoHeart, GoHeartFill } from "../utils/icons";
import { DataWishlistProps, addWishlist, removeWishlist } from "../app/actions/apiWishlist";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { productProps } from "../app/actions/apiProductSlice";

export type HeartIconProps = {
    dataWishlist: DataWishlistProps[];
    products: productProps;
    onClicks: () => void;
}

export const HeartIcon = ({ dataWishlist, products, onClicks }: HeartIconProps) => {
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();

    const handleRemoveWishlist = (idProduct: number | undefined) => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/wishlist/${idProduct}`;
        if (idProduct) dispatch(removeWishlist({ link }))
    }

    const handleCreateWishlist = () => {
        if (!dataLoginUsers) return onClicks()

        const link = `${process.env.REACT_APP_API_URL_LOCAL}/add/wishlist`;
        const data = { uuidUser: dataLoginUsers?.uuid, idProduct: products.id }
        dispatch(addWishlist({ link, data }))
    }

    return (
        <>
            <div className={styles["container-heart-icon"]}>
                {dataWishlist.length !== 0 ? (
                    <>
                        <ButtonTooltip
                            styleButton={"icon-heart"}
                            textTooltip={"remove from wishlist"}
                            styleCssButton={{ color: "red" }}
                            styleTooltip={"tooltip-heart-icon-remove"}
                            styleCssTooltip={{ color: "white", fontSize: ".8rem" }}
                            onClicks={() => handleRemoveWishlist(dataWishlist[0].id)}
                            ariaLabel={"heart fill"}
                        >
                            <GoHeartFill />
                        </ButtonTooltip>
                    </>
                ) : (
                    <ButtonTooltip
                        styleButton={"icon-heart"}
                        textTooltip={"add from wishlist"}
                        styleTooltip={"tooltip-heart-icon-add"}
                        styleCssTooltip={{ color: "white", fontSize: ".8rem" }}
                        onClicks={() => handleCreateWishlist()}
                        ariaLabel={"heart"}
                    >
                        <GoHeart />
                    </ButtonTooltip>
                )}
            </div>
        </>
    )
}
