import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { DataCartProps, updateCartsData } from "../app/actions/apiCartSlice";
import { apiUrl } from "../utils/variable";

export const useSocketCart = () => {
    // useAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();
    // State
    const [isConnected, setIsConnected] = useState(false);

    const handleSocketCart = useCallback(() => {
        if (dataLoginUsers && !isConnected) {
            try {
                const sockets = io(`${apiUrl}`);

                sockets.on("connect", () => {
                    setIsConnected(true);
                });

                sockets.on("connect_error", () => {
                    setIsConnected(false);
                    sockets.disconnect();  // Disconnect on error
                });

                sockets.on(`${dataLoginUsers.uuid}-socket-cart`, (data: DataCartProps[]) => {
                    console.log(data)
                    dispatch(updateCartsData(data));
                });

                return () => {
                    sockets.off(`${dataLoginUsers.uuid}-socket-cart`);
                    sockets.disconnect();
                };
            } catch (error) {
                console.error("Socket connection failed:", error);
                setIsConnected(false);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoginUsers])

    useEffect(() => {
        handleSocketCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSocketCart])
}
