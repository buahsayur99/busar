import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { DataPaymentProps, handleUpdateAllPaymentRedux } from "../app/actions/apiPaymentSlice";


export const useSocketPayment = () => {
    // State Redux
    const dispatch = useAppDispatch();
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);

    const handleSocketsGetAllPayment = useCallback(() => {
        if (dataLoginUsers) {
            const sockets = io(`${process.env.REACT_APP_API_URL_LOCAL}`);

            sockets.on(`${dataLoginUsers.uuid}-socket-payment`, (data: DataPaymentProps[]) => {
                dispatch(handleUpdateAllPaymentRedux(data));
            });

            return () => {
                sockets.off(`${dataLoginUsers.uuid}-socket-payment`);
                sockets.disconnect();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoginUsers])

    // Handle Socket Payment
    useEffect(() => {
        handleSocketsGetAllPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSocketsGetAllPayment]);
}
