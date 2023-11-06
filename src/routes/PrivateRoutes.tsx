import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ data }: any) => {
    return (
        data ? (
            <Outlet />
        ) : (
            <Navigate to={"/"} />
        )
    )
}
