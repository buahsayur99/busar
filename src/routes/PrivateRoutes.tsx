import React from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);

    return (
        dataLoginUsers ? <Outlet /> : <Navigate to={"/"} />
    )
}
