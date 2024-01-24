import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { getProduct } from "../app/actions/apiProductSlice";

export const useGetProduct = () => {
    const dispatch = useAppDispatch();

    const handleGetProduct = useCallback(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/products`;
        dispatch(getProduct(link))
    }, [dispatch]);

    return { handleGetProduct }
}