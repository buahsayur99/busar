import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getWishlist, resetIsMessageWishlist } from "../app/actions/apiWishlist";

export const useGetWishlist = () => {
    // UseAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();

    const handleGetApiWishlist = useCallback(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/wishlist/${dataLoginUsers?.uuid}`;
        dispatch(getWishlist({ link }));
        dispatch(resetIsMessageWishlist());

    }, [dispatch, dataLoginUsers?.uuid]);

    useEffect(() => {
        handleGetApiWishlist();
    }, [handleGetApiWishlist]);

    return { handleGetApiWishlist };
};