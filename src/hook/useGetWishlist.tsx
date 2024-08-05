import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addWishlist, getWishlist, removeWishlist, resetIsMessageWishlist } from "../app/actions/apiWishlist";
import { activeFormTransition } from "../app/actions/formLoginRegisterSlice";

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

    const handleRemoveWishlist = (idWishlist: number) => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/wishlist/${idWishlist}`;
        if (idWishlist) dispatch(removeWishlist({ link }))
    }

    const createWishlistApi = (idProduct: number) => {
        if (!dataLoginUsers) return dispatch(activeFormTransition({ onOffForm: true }))

        const link = `${process.env.REACT_APP_API_URL_LOCAL}/add/wishlist`;
        const data = { uuidUser: dataLoginUsers?.uuid, idProduct: idProduct }
        dispatch(addWishlist({ link, data }))
    }

    useEffect(() => {
        if (dataWishlist.length === 0) return handleGetApiWishlist();
        if (isMessageWishlist === "success remove wishlist") return handleGetApiWishlist();
    }, [handleGetApiWishlist, dataWishlist.length, isMessageWishlist]);

    return { handleGetApiWishlist, handleRemoveWishlist, createWishlistApi };
};