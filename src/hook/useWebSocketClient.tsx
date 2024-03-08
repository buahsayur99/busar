import { useEffect, useState } from "react";
import io from "socket.io-client";
import { DataPaymentProps } from "../app/actions/apiPaymentSlice";

type UseWebSoketClientProps = {
    dataPayment: DataPaymentProps | null;
}

export const useWebSocketClient = ({ dataPayment }: UseWebSoketClientProps) => {
    const [socket, setSocket] = useState<DataPaymentProps | null>(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000");

        if (dataPayment) {
            newSocket.on(dataPayment.transaction_id, (data: any) => {
                setSocket(data);
            });
        }

        return () => {
            newSocket.disconnect();
        };
    }, [dataPayment]);

    return { socket };
}