import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { LoginUsers, getUsers } from "../app/actions/apiUsersSlice";

type useGetApiUsersProps = {
    isMessage: string | null;
    dataLoginUsers: LoginUsers | null;
}

export const useGetApiUsers = ({ isMessage, dataLoginUsers }: useGetApiUsersProps) => {
    const dispatch = useAppDispatch();

    const getApiUsers = useCallback(() => {
        // When update success getUsers
        let link = `${process.env.REACT_APP_API_URL_LOCAL}/get/users/${dataLoginUsers?.uuid}`;
        if (isMessage === "update user success") return dispatch(getUsers({ link }))
    }, [dispatch, isMessage, dataLoginUsers?.uuid]);

    useEffect(() => {
        getApiUsers();
    }, [getApiUsers])
}
