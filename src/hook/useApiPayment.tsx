import { useEffect, useState } from "react";
import { DataAddressProps } from "../app/actions/apiAddressSlice";
import { DataCartProps } from "../app/actions/apiCartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { handleGetPayment, handleGetPaymentByTransactionId } from "../app/actions/apiPaymentSlice";

export const useApiPayment = () => {
    // UseAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { dataPayment } = useAppSelector(state => state.apiPayment);
    // State
    const [snapShow, setSnapShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const postPayment = async (dataCart: DataCartProps[], dataAddress: DataAddressProps[]) => {
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
            handelSnap(responseData.snap_token, responseData.id);
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
    const handelSnap = (token: any, id: any) => {
        if (token) {
            (window as any).snap.pay(token, {
                onSuccess: (result: any) => {
                    localStorage.setItem("payment", JSON.stringify(result));
                    setSnapShow(false)
                    navigate(`/order-status/busar/${id}`);
                },
                onPending: (result: any) => {
                    localStorage.setItem("payment", JSON.stringify(result));
                    setSnapShow(false);
                    navigate(`/order-status/busar/${id}`);
                },
                onClose: () => {
                    setSnapShow(false)
                    navigate(`/order-status/busar/${id}`);
                }
            });
        }
    }

    return { postPayment, getpayment, handelSnap, getPaymentByTransactionId, snapShow }
}
