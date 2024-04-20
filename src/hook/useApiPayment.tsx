import { useEffect, useState } from "react";
import { DataAddressProps } from "../app/actions/apiAddressSlice";
import { DataCartProps } from "../app/actions/apiCartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { handleGetAllTransaction, handleGetPayment, handleGetPaymentByTransactionId } from "../app/actions/apiPaymentSlice";

export const useApiPayment = () => {
    // UseAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    // State
    const [snapShow, setSnapShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const postApiSnapPaymentMidtrans = async (dataCart: DataCartProps[], dataAddress: DataAddressProps[]) => {
        const totalPrice = dataCart.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.totalPrice;
        }, 0);
        const name = dataLoginUsers?.email.split('@')[0];

        const data = {
            total_price: totalPrice,
            name_customer: name,
            email_customer: dataLoginUsers?.email,
            uuid_users: dataLoginUsers?.uuid,
            product: dataCart
        }

        const link = `${process.env.REACT_APP_API_URL_LOCAL}/process-transaction`;

        const response = await fetch(link, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        const responseData = await response.json();

        if (response.ok) {
            setSnapShow(true);
            handelNewSnap(responseData.snap_token, responseData.transaction_id, responseData.data);
        }
    }

    const getpayment = () => {
        if (dataLoginUsers?.uuid) {
            const link = `${process.env.REACT_APP_API_URL_LOCAL}/transaction/${dataLoginUsers.uuid}`;
            dispatch(handleGetPayment({ link }))
        }
    }

    const getPaymentByTransactionId = (transactionId: string | undefined) => {
        if (dataLoginUsers?.uuid && transactionId) {
            const link = `${process.env.REACT_APP_API_URL_LOCAL}/transaction/${dataLoginUsers.uuid}/${transactionId}`;
            dispatch(handleGetPaymentByTransactionId({ link }))
        }
    }

    // Snap script element
    useEffect(() => {
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl

        const midtransClientKey = `${process.env.MIDTRANS_CLIENT_KEY}`;
        scriptTag.setAttribute("data-client-key", midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])

    // Handle Snap Midtrans
    const handelNewSnap = (token: any, transaction_id: any, data: any) => {
        if (token) {
            const snap = (window as any).snap.pay(token, {
                onSuccess: (result: any) => {
                    setSnapShow(false);
                    navigate(`/user/purchase/packaged`);
                },
                onPending: (result: any) => {
                    setSnapShow(false);
                    navigate(`/order-status/busar/${transaction_id}`);
                },
                onClose: () => {
                    setSnapShow(false);
                    // navigate(`/order-status/busar/${id}`);
                }
            });

            if (snap && snap.close) {
                // Menutup Snap Midtrans setelah beberapa detik
                setTimeout(() => {
                    snap.close();
                }, 5000); // Contoh: menutup setelah 5 detik
            }
        }
    }

    // Handle Snap Midtrans
    const handelSnap = (token: any, id: any) => {
        if (token) {
            (window as any).snap.pay(token, {
                onSuccess: (result: any) => {
                    setSnapShow(false);
                    // navigate(`/order-status/busar/${id}`);
                },
                onPending: (result: any) => {
                    setSnapShow(false);
                    // navigate(`/order-status/busar/${id}`);
                },
                onClose: () => {
                    setSnapShow(false);
                    // navigate(`/order-status/busar/${id}`);
                }
            });
        }
    }

    // Handle Get Api Transaction
    const handleGetTransaction = () => {
        if (dataLoginUsers) {
            const link = `${process.env.REACT_APP_API_URL_LOCAL}/transaction/${dataLoginUsers.uuid}`

            dispatch(handleGetAllTransaction({ link }))
        }
    }



    return { postApiSnapPaymentMidtrans, getpayment, handelSnap, getPaymentByTransactionId, handleGetTransaction, snapShow }
}
