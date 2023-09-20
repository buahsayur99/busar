import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authLogin } from "../app/actions/apiUsersSlice";

export const useAuthUsers = () => {
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();
    const uuid = localStorage.getItem("uuid");

    const requestUserApi = useCallback(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/me/${uuid}`;
        dispatch(authLogin({ link }));
    }, [dispatch, uuid])

    useEffect(() => {
        // if dataLoginUsers has uuid, enter uuid in localStorage
        if (dataLoginUsers?.uuid) return localStorage.setItem("uuid", dataLoginUsers?.uuid);
        // if uuid in localstorage exists, run requestUserApi function
        if (uuid !== null) return requestUserApi();
    }, [uuid, dataLoginUsers?.uuid, requestUserApi])
}

