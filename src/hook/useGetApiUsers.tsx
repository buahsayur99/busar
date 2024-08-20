import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { LoginUsers, getUsers } from "../app/actions/apiUsersSlice";
import { apiUrl } from "../utils/variable";

type useGetApiUsersProps = {
    isMessage: string | null;
    dataLoginUsers: LoginUsers | null;
}

export const useGetApiUsers = ({ isMessage, dataLoginUsers }: useGetApiUsersProps) => {
    const dispatch = useAppDispatch();

    const getApiUsers = useCallback(() => {
        console.log(apiUrl)
        // When update success getUsers
        let link = `${apiUrl}/get/users/${dataLoginUsers?.uuid}`;
        if (isMessage === "update user success") return dispatch(getUsers({ link }))
    }, [dispatch, isMessage, dataLoginUsers?.uuid]);

    useEffect(() => {
        getApiUsers();
    }, [getApiUsers])
}
