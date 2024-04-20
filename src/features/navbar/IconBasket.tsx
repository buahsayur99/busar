import React, { useCallback, useEffect } from "react"
import { SlBasket } from "../../utils/icons";
import { ButtonTooltip } from "../../components/ButtonTooltip";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DataCartProps, activeCarts } from "../../app/actions/apiCartSlice";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import styles from "../../style/index.module.scss";
import { useNavigate } from "react-router-dom";
import { useGetApiCart } from "../../hook";
import { totalCartByAllProductCart } from "../../utils/convert";
import { io } from "socket.io-client";

export const IconBasket = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // useAppSelector
    const { dataCart } = useAppSelector(state => state.apiCart);
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    // Custome Hook
    const { toggle } = useBodyScrollLock();
    const { handleGetCart } = useGetApiCart();

    const handleVisibleBasket = () => {
        dispatch(activeCarts(true))
        toggle(true)
    }

    useEffect(() => {
        if (dataCart.length === 0) return handleGetCart();
    }, []);

    const handleSocketsGetCarts = useCallback(() => {
        if (dataLoginUsers) {
            const sockets = io(`${process.env.REACT_APP_API_URL_LOCAL}`);

            sockets.on(`${dataLoginUsers.uuid}-socket-carts`, (data: any) => {
                if (data === "get-carts") handleGetCart();
            });

            return () => {
                sockets.off(`${dataLoginUsers.uuid}-socket-payment`);
                sockets.disconnect();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoginUsers])

    useEffect(() => {
        handleSocketsGetCarts();
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
