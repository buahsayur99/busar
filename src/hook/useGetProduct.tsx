import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProduct } from "../app/actions/apiProductSlice";

export const useGetProduct = () => {
    const dispatch = useAppDispatch();
    const { dataProductApi } = useAppSelector(state => state.apiProduct);

    const handleGetProduct = useCallback(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/products`;
        dispatch(getProduct(link))
    }, [dispatch]);


    useEffect(() => {
        if (dataProductApi.length === 0) return handleGetProduct();
    }, [handleGetProduct, dataProductApi.length])

    return { handleGetProduct }
}