import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getWishlist, removeWishlist, resetIsMessageWishlist } from "../app/actions/apiWishlist";

export const useGetWishlist = () => {
    // UseAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { dataWishlist, isMessageWishlist } = useAppSelector(state => state.apiWishlist);
    const dispatch = useAppDispatch();

    const handleGetApiWishlist = useCallback(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/wishlist/${dataLoginUsers?.uuid}`;
        dispatch(getWishlist({ link }));
        dispatch(resetIsMessageWishlist());

    }, [dispatch, dataLoginUsers?.uuid]);

    const handleRemoveWishlist = (idProduct: number) => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/wishlist/${idProduct}`;
        if (idProduct) dispatch(removeWishlist({ link }))
    }

    useEffect(() => {
        if (dataWishlist.length === 0) return handleGetApiWishlist();
        if (isMessageWishlist === "success remove wishlist") return handleGetApiWishlist();
    }, [handleGetApiWishlist, dataWishlist.length, isMessageWishlist]);

    return { handleGetApiWishlist, handleRemoveWishlist };
};