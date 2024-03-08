import React, { useEffect } from "react"
import { SlBasket } from "../../utils/icons";
import { ButtonTooltip } from "../../components/ButtonTooltip";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DataCartProps, activeCarts } from "../../app/actions/apiCartSlice";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import styles from "../../style/index.module.scss";
import { useNavigate } from "react-router-dom";
import { useGetApiCart } from "../../hook";
import { totalCartByAllProductCart } from "../../utils/convert";

export const IconBasket = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // useAppSelector
    const { dataCart } = useAppSelector(state => state.apiCart);
    // Custome Hook
    const { toggle } = useBodyScrollLock();
    const { handleGetCart } = useGetApiCart();

    const handleVisibleBasket = () => {
        dispatch(activeCarts(true))
        toggle(true)
    }

    useEffect(() => {
        if (dataCart.length === 0) return handleGetCart();
    }, [])

    return (
        <>
            {/* Table Pc */}
            <div className={styles["btn-basket-table-pc"]}>
                <AmountCart dataCart={dataCart} />
                <ButtonTooltip
                    styleButton={"btn-basket"}
                    textTooltip={"see basket"}
                    styleTooltip={"tooltip"}
                    positionX={-35}
                    positionY={25}
                    onClicks={() => handleVisibleBasket()}
                >
                    <SlBasket />
                </ButtonTooltip >
            </div>

            {/* Mobile */}
            <div className={styles["btn-basket-mobile"]}>
                <AmountCart dataCart={dataCart} />
                <ButtonTooltip
                    styleButton={"btn-basket"}
                    textTooltip={"see basket"}
                    styleTooltip={"tooltip"}
                    positionX={-35}
                    positionY={25}
                    onClicks={() => navigate("/cart")}
                >
                    <SlBasket />
                </ButtonTooltip >
            </div>
        </>
    )
}

const AmountCart = ({ dataCart }: { dataCart: DataCartProps[] }) => {

    return (
        <>
            {dataCart.length !== 0 && (
                <div className={styles["amount-wrapper"]}>
                    <p className={styles["amount-cart"]}>{totalCartByAllProductCart(dataCart)}</p>
                </div>
            )}
        </>
    )
}
