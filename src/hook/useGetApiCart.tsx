import { useCallback, useEffect } from "react"
import { productProps } from "../app/actions/apiProductSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addCart, getCart, resetIsMessageCart } from "../app/actions/apiCartSlice";

export const useGetApiCart = () => {
    const dispatch = useAppDispatch();
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { dataCart, isMessageCart } = useAppSelector(state => state.apiCart);

    const handleAddCart = (product: productProps) => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/cart/${dataLoginUsers?.uuid}`;
        const data = {
            idProduct: product.id,
            amount: 1,
            urlImage: product.url,
            price: product.price,
        }

        dispatch(addCart({ data, link }))
    }

    const handleGetCart = useCallback(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/cart/${dataLoginUsers?.uuid}`;
        dispatch(getCart(link));
        dispatch(resetIsMessageCart());
    }, [dataLoginUsers?.uuid, dispatch])

    useEffect(() => {
        if (isMessageCart === "success add cart") return handleGetCart();
        if (dataCart.length === 0) return handleGetCart();
    }, [isMessageCart, handleGetCart, dataCart.length])

    return { handleAddCart, handleGetCart }
}
