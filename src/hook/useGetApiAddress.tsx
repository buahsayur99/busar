import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { getAddress } from "../app/actions/apiAddressSlice";

export const useGetApiAddress = () => {
    // useAppDispatch
    const dispatch = useAppDispatch();

    const callGetApiAddress = useCallback(() => {
        const uuid = localStorage.getItem("uuid");
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/address/${uuid}`;
        return dispatch(getAddress({ link }));
    }, [dispatch])

    useEffect(() => {
        callGetApiAddress();
    }, [callGetApiAddress])

    return { callGetApiAddress }
}