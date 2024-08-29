import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { DataCartProps, updateCartsData } from "../app/actions/apiCartSlice";
import { apiUrl } from "../utils/variable";

export const useSocketCart = () => {
    // useAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();

    const handleSocketCart = useCallback(() => {
        if (dataLoginUsers) {
            const sockets = io(`${apiUrl}`);

            sockets.on(`${dataLoginUsers.uuid}-socket-cart`, (data: DataCartProps[]) => {
                dispatch(updateCartsData(data));
            });

            return () => {
                sockets.off(`${dataLoginUsers.uuid}-socket-cart`);
                sockets.disconnect();
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoginUsers])

    useEffect(() => {
        handleSocketCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
