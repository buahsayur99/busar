import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authLogin, resetIsMessage, updateLoadingAuth } from "../app/actions/apiUsersSlice";
import { rejectedAuthLogin } from "../utils/responseApi";
import { apiUrl } from "../utils/variable";

export const useAuthUsers = () => {
    const { dataLoginUsers, isMessage } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();
    const uuid = localStorage.getItem("uuid");

    const requestUserApi = useCallback(() => {
        if (!dataLoginUsers && uuid) {
            dispatch(resetIsMessage());

            const link = `${apiUrl}/me/${uuid}`;
            return dispatch(authLogin({ link }));
        }

        return dispatch(updateLoadingAuth());
    }, [dispatch, uuid, dataLoginUsers]);

    const removeLocalStorage = useCallback((event: string) => {
        localStorage.removeItem(event);
    }, [])

    useEffect(() => {
        // if dataLoginUsers has uuid, enter uuid in localStorage
        if (dataLoginUsers?.uuid) return localStorage.setItem("uuid", dataLoginUsers?.uuid);
        if (isMessage === rejectedAuthLogin.toLowerCase()) return removeLocalStorage("uuid");
    }, [uuid, dataLoginUsers?.uuid, removeLocalStorage, isMessage])

    return { requestUserApi, removeLocalStorage }
}