import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { getProduct } from "../app/actions/apiProductSlice";
import { apiUrl } from "../utils/variable";

export const useGetProduct = () => {
    const dispatch = useAppDispatch();

    const handleGetProduct = useCallback(() => {
        const link = `${apiUrl}/products`;
        dispatch(getProduct(link))
    }, [dispatch]);

    return { handleGetProduct }
}