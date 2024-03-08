import React, { useCallback, useEffect, useState } from "react";
import styles from "../../style/index.module.scss";
import { useAppSelector } from "../../app/hooks";
import { useApiPayment } from "../../hook/useApiPayment";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTimerPayment } from "../../hook/useTimerPayment";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { Footers } from "../../components/Footers";
import { LoadingPayment } from "./components/LoadingPayment";
import { CardDetailPayment } from "./components/CardDetailPayment";
import { MdOutlineKeyboardArrowLeft } from "../../utils/icons";
import { useWebSocketClient } from "../../hook/useWebSocketClient";
import { NotifSuccessTrans } from "./components/NotifSuccessTrans";
import { PaymentBankProps, PaymentStoreProps, resetIsMessagePayment } from "../../app/actions/apiPaymentSlice";

export const DetailTransaction = () => {
    const [active, setActive] = useState({ panduanPembayaran: false })
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // UseAppSelector
    const { dataPayment, isLoadingPayment, isMessagePayment } = useAppSelector(state => state.apiPayment);
    // Custome Hook
    const { getPaymentByTransactionId } = useApiPayment();
    const { timer, fullTime } = useTimerPayment(id);
    // Hanlde midtrans payment response
    const { socket } = useWebSocketClient({ dataPayment });
    console.log({
        socket,
        dataPayment,
        isMessagePayment,
        location
    })

    const updateActive = (event: any) => {
        setActive((prev) => {
            return { ...prev, ...event }
        })
    }

    useEffect(() => {
        getPaymentByTransactionId(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRedirect = useCallback(() => {
        // Hanlde user no payment
        if (isMessagePayment === "have no payment") {
            resetIsMessagePayment()
            navigate(-1);
        }
        if (dataPayment && dataPayment.status_purchase === `${process.env.REACT_APP_PURCHASE_PACKAGED}`) {
            navigate("/user/purchase/packaged")
        }
        // if (dataPayment?.status === `${process.env.REACT_APP_SUCCESS_PAYMENT}` || dataPayment?.status === `${process.env.REACT_APP_CANCEL_PAYMENT}`) return navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMessagePayment, dataPayment])

    useEffect(() => {
        handleRedirect()
    }, [handleRedirect])

    const handleListUiPaymentGuide = () => {
        if (dataPayment) {
            // Handle Mandiri
            if (dataPayment.data_payment.payment_type === "echannel" && (dataPayment.data_payment as PaymentBankProps).payment_va_numbers.bank === "mandiri") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=mandiri"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan Biller Code ({(dataPayment.data_payment as PaymentBankProps).payment_va_numbers.biller_code}).
                            </li>
                            <li>
                                3. Masukkan "Nomor Virtual Account" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                4. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle BCA
            if (dataPayment.data_payment.payment_type === "bank_transfer" && (dataPayment.data_payment as PaymentBankProps).payment_va_numbers.bank === "bca") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/bca/va/index"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan "Virtual Account Number" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                3. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle BRI
            if (dataPayment.data_payment.payment_type === "bank_transfer" && (dataPayment.data_payment as PaymentBankProps).payment_va_numbers.bank === "bri") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=bri"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan "Virtual Account Number" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                3. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle BNI
            if (dataPayment.data_payment.payment_type === "bank_transfer" && (dataPayment.data_payment as PaymentBankProps).payment_va_numbers.bank === "bni") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/bni/va/index"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan "Virtual Account Number" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                3. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle Permata
            if (dataPayment.data_payment.payment_type === "bank_transfer" && (dataPayment.data_payment as PaymentBankProps).payment_va_numbers.bank === "permata") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=permata"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan "Virtual Account Number" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                3. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle CIMB Niaga
            if (dataPayment.data_payment.payment_type === "bank_transfer" && (dataPayment.data_payment as PaymentBankProps).payment_va_numbers.bank === "cimb") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/openapi/va/index?bank=cimb"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan "Virtual Account Number" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                3. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle Alfamart
            if (dataPayment.data_payment.payment_type === "cstore" && (dataPayment.data_payment as PaymentStoreProps).payment_va_numbers.payment_store
                === "alfamart") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/alfamart/index"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan "Virtual Account Number" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                3. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
            // Handle Indomart
            if (dataPayment.data_payment.payment_type === "cstore" && (dataPayment.data_payment as PaymentStoreProps).payment_va_numbers.payment_store
                === "indomaret") {
                return (
                    <div
                        className={`
                            ${styles["parent-list-panduan-pembayaran"]}
                            ${active.panduanPembayaran && styles["active-list-panduan-pembayaran"]}
                        `}
                    >
                        <ul>
                            <li>
                                1. Buka website
                                <Link
                                    to="https://simulator.sandbox.midtrans.com/indomaret/phoenix/index"
                                    target="_blank"
                                    className={styles["link-midtrans-simulator"]}
                                >
                                    midtrans payment simulator
                                </Link>
                            </li>
                            <li>
                                2. Masukkan Merchant Id ({(dataPayment.data_payment as PaymentStoreProps).payment_va_numbers.merchant_id}).
                            </li>
                            <li>
                                3. Masukkan "Nomor Payment Code" Busar, lalu pilih tombol Inquire
                            </li>
                            <li>
                                4. Akan muncul konfirmasi pembayaran, lalu pilih tombol Pay
                            </li>
                        </ul>
                    </div>
                )
            }
        }
    }

    return (
        <>
            {/* Display Loading */}
            {isLoadingPayment && <LoadingPayment />}

            {socket && socket.status === `${process.env.REACT_APP_SUCCESS_PAYMENT}` && (
                <NotifSuccessTrans totalPrice={socket.total_price} orderId={socket.transaction_id} />
            )}

            {!socket && !isLoadingPayment && dataPayment && (
                <>
                    <NavigationBar />

                    <div className={styles["global-container"]}>
                        <div className={styles["parent-transaction"]}>
                            <div className={styles["parent-judul-transaction"]}>
                                <h1>selesaikan pembayaran dalam</h1>
                                <p>
                                    {timer.jam < 10 ? "0" + timer.jam : timer.jam}:
                                    {timer.menit < 10 ? "0" + timer.menit : timer.menit}:
                                    {timer.detik < 10 ? "0" + timer.detik : timer.detik}
                                </p>

                                <div className={styles["parent-expiration-time"]}>
                                    <h3>batas Akhir Pembayaran</h3>
                                    <p>{fullTime}</p>
                                </div>
                            </div>

                            {/* Card Payment */}
                            {dataPayment && <CardDetailPayment detailPayment={dataPayment} />}

                            {/* Button Check Payment and shopping again */}
                            <div className={styles["parent-button-transaction"]}>
                                <button
                                    type="button"
                                    aria-label="button status pembayaran"

                                >
                                    cek status pembayaran
                                </button>

                                <button
                                    type="button"
                                    aria-label="button belanja lagi"
                                    onClick={() => navigate("/collections")}
                                >
                                    belanja lagi
                                </button>
                            </div>

                            <div className={styles["payment-method"]}>
                                <h3>cara pembayaran</h3>

                                <div className={styles["parent-note"]}>
                                    <p>note:</p>
                                    <p>karna ini website portfolio. pembayaran menggunakan midtrans simulator</p>
                                </div>

                                <div className={styles["parent-panduan-pembayaran"]}>
                                    <button
                                        type="button"
                                        aria-label="panduan pembayaran"
                                        className={`${styles["button-panduan-pembayaran"]}`}
                                        onClick={() => updateActive({ panduanPembayaran: !active.panduanPembayaran })}
                                    >
                                        panduan pembayaran
                                        <span className={`${active.panduanPembayaran && styles["active-icon-panduan-pembayaran"]}`}>
                                            <MdOutlineKeyboardArrowLeft />
                                        </span>
                                    </button>

                                    {handleListUiPaymentGuide()}
                                </div>
                            </div>
                        </div>
                    </div >

                    <Footers />
                </>
            )}
        </>

    )
}
