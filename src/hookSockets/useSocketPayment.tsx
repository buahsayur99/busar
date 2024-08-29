import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { DataPaymentProps, handleUpdateAllPaymentRedux } from "../app/actions/apiPaymentSlice";
import { apiUrl } from "../utils/variable";


export const useSocketPayment = () => {
    // State Redux
    const dispatch = useAppDispatch();
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);

    const handleSocketsGetAllPayment = useCallback(() => {
        if (dataLoginUsers) {
            const sockets = io(`${apiUrl}`);
            console.log("socket")

            sockets.on(`${dataLoginUsers.uuid}-socket-payment`, (data: DataPaymentProps[]) => {
                dispatch(handleUpdateAllPaymentRedux(data));
            });

            return () => {
                sockets.off(`${dataLoginUsers.uuid}-socket-payment`);
                sockets.disconnect();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Handle Socket Payment
    useEffect(() => {
        handleSocketsGetAllPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
