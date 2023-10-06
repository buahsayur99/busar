import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authLogin, resetIsMessage } from "../app/actions/apiUsersSlice";
import { rejectedAuthLogin } from "../utils/responseApi";

export const useAuthUsers = () => {
    const { dataLoginUsers, isMessage } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();
    const uuid = localStorage.getItem("uuid");

    const requestUserApi = useCallback(() => {
        dispatch(resetIsMessage());

        const link = `${process.env.REACT_APP_API_URL_LOCAL}/me/${uuid}`;
        dispatch(authLogin({ link }));
    }, [dispatch, uuid]);

    const removeLocalStorage = useCallback((event: string) => {
        if (isMessage === rejectedAuthLogin.toLowerCase()) {
            localStorage.removeItem(event);
        }
    }, [isMessage])

    useEffect(() => {
        // if dataLoginUsers has uuid, enter uuid in localStorage
        if (dataLoginUsers?.uuid) return localStorage.setItem("uuid", dataLoginUsers?.uuid);
        // if uuid in localstorage exists, run requestUserApi function
        requestUserApi();
        removeLocalStorage("uuid");
        // if (isMessage === rejectedAuthLogin.toLowerCase()) return removeLocalStorage("uuid");
    }, [uuid, dataLoginUsers?.uuid, requestUserApi, removeLocalStorage])

    return { requestUserApi }
}