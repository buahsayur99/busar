import React from "react"
import styles from "../style/index.module.scss";
import { ButtonTooltip } from "./ButtonTooltip";
import { GoHeart, GoHeartFill } from "../utils/icons";
import { DataWishlistProps, addWishlist, removeWishlist } from "../app/actions/apiWishlist";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { productProps } from "../app/actions/apiProductSlice";

export type HeartIconProps = {
    settingHeart?: any;
    dataWishlist: DataWishlistProps[];
    products: productProps;
    onClicks: () => void;
}

export const HeartIcon = ({ settingHeart, dataWishlist, products, onClicks }: HeartIconProps) => {
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
                            styleButton={settingHeart && settingHeart.cssButton ? settingHeart.cssButton : ""}
                            textTooltip={settingHeart && settingHeart.textTooltipRemove ? settingHeart.textTooltipRemove : ""}
                            styleCssButton={settingHeart && settingHeart.styleButtonFill ? settingHeart.styleButtonFill : {}}
                            styleTooltip={settingHeart && settingHeart.cssTooltipRemove ? settingHeart.cssTooltipRemove : ""}
                            styleCssTooltip={settingHeart && settingHeart.styleTooltip ? settingHeart.styleTooltip : {}}
                            onClicks={() => handleRemoveWishlist(dataWishlist[0].id)}
                            ariaLabel={settingHeart && settingHeart.arialLabelFill ? settingHeart.arialLabelFill : ""}
                            positionX={settingHeart && settingHeart.positionX ? settingHeart.positionX : 0}
                            positionY={settingHeart && settingHeart.positionY ? settingHeart.positionY : 0}
                        >
                            <GoHeartFill />
                        </ButtonTooltip>
                    </>
                ) : (
                    <ButtonTooltip
                        styleButton={settingHeart && settingHeart.cssButton ? settingHeart.cssButton : ""}
                        textTooltip={settingHeart && settingHeart.textTooltipAdd ? settingHeart.textTooltipAdd : ""}
                        styleTooltip={settingHeart && settingHeart.cssTooltipAdd ? settingHeart.cssTooltipAdd : ""}
                        styleCssTooltip={settingHeart && settingHeart.styleTooltip ? settingHeart.styleTooltip : {}}
                        onClicks={() => handleCreateWishlist()}
                        ariaLabel={settingHeart && settingHeart.arialLabelNoFill ? settingHeart.arialLabelNoFill : ""}
                        positionX={settingHeart && settingHeart.positionX ? settingHeart.positionX : 0}
                        positionY={settingHeart && settingHeart.positionY ? settingHeart.positionY : 0}
                    >
                        <GoHeart />
                    </ButtonTooltip>
                )}
            </div>
        </>
    )
}
