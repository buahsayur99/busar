import { useCallback } from "react"
import { productProps } from "../app/actions/apiProductSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { DataCartProps, addCart, deleteCart, getCart, resetIsMessageCart, updateCart } from "../app/actions/apiCartSlice";
import { activeFormTransition } from "../app/actions/formLoginRegisterSlice";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { apiUrl } from "../utils/variable";

export const useGetApiCart = () => {
    const dispatch = useAppDispatch();
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { toggle } = useBodyScrollLock();

    const handleAddCart = (product: productProps, amounts: number) => {
        if (!dataLoginUsers) {
            toggle(true);
            return dispatch(activeFormTransition({ onOffForm: true }));
        }

        const link = `${apiUrl}/cart/${dataLoginUsers?.uuid}`;
        const amount = { amount: amounts }

        const data = { ...product, ...amount }
        dispatch(addCart({ data, link }))
    }

    const handleGetCart = useCallback(() => {
        const link = `${apiUrl}/cart/${dataLoginUsers?.uuid}`;
        dispatch(getCart(link));
        dispatch(resetIsMessageCart());
    }, [dataLoginUsers?.uuid, dispatch])

    const handleUpdateCart = useCallback((productCart: DataCartProps, amounts: number) => {
        const link = `${apiUrl}/cart/update`;
        const amount = { amount: amounts }

        const data = { ...productCart, ...amount }
        dispatch(updateCart({ data, link }))
    }, [dispatch])

    const handleDeleteCart = useCallback((id: number[]) => {
        const link = `${apiUrl}/cart/delete`;
        const data = { arrayId: [...id] }

        dispatch(deleteCart({ data, link }))
    }, [dispatch])

    return { handleAddCart, handleGetCart, handleUpdateCart, handleDeleteCart }
}
