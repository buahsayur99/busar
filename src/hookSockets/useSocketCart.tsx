import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { DataCartProps, updateCartsData } from "../app/actions/apiCartSlice";

export const useSocketCart = () => {
    // useAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();

    const handleSocketCart = useCallback(() => {
        if (dataLoginUsers) {
            const sockets = io(`${process.env.REACT_APP_API_URL_LOCAL}`);

            sockets.on(`${dataLoginUsers.uuid}-socket-cart`, (data: DataCartProps[]) => {
                dispatch(updateCartsData(data));
            });

            return () => {
                sockets.off(`${dataLoginUsers.uuid}-socket-payment`);
                sockets.disconnect();
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoginUsers])

    useEffect(() => {
        handleSocketCart();
    }, [handleSocketCart])
}
