import React, { useEffect, useRef, useState } from "react";
import styles from "../../style/index.module.scss";
import { Logo } from "../../components/Logo";
import { BsArrowLeft, MdLocationPin } from "../../utils/icons";
import { useAppSelector } from "../../app/hooks";
import { convertObjectToArray, convertTotalPrice, formattedNumber } from "../../utils/convert";
import { useBodyScrollLock, useCheckedCart, useGetApiAddress, useScrollNavbar } from "../../hook";
import { useScrollShipment } from "../../hook/useScrollShipment";
import { Footers } from "../../components/Footers";
import { Link, useNavigate } from "react-router-dom";
import { DaftarAddressCart } from "./components/DaftarAddressCart";
import { FormAddress } from "../../features/pengaturanProfile/FormAddress";
import { AlertText } from "../../components/AlertText";
import { useApiPayment } from "../../hook/useApiPayment";

export const Shipment = () => {
    // State
    const [active, setActive] = useState({ daftarAddress: false, form: false, alertEmptyAddress: false })
    const shipmentRef = useRef(null);
    // UseAppSelector
    const { checkedCart, dataCart, isLoadingCart } = useAppSelector(state => state.apiCart);
    const { dataAddress, isGetLoading, isMessageAddress } = useAppSelector(state => state.apiAddress);
    // Custome Hook
    useGetApiAddress();
    useCheckedCart(dataCart, checkedCart);
    const { callGetApiAddress } = useGetApiAddress();
    const { toggle } = useBodyScrollLock();
    const { scrolled } = useScrollNavbar();
    const { isScrollShipment } = useScrollShipment(shipmentRef);
    const { postPayment, snapShow } = useApiPayment();

    const handleActive = (event: any) => {
        setActive(prev => {
            return { ...prev, ...event }
        })
    }

    const handleActiveDaftarAddressCart = (event: boolean) => {
        handleActive({ daftarAddress: event });
        toggle(event);
    }

    const handleActiveFormAddress = (event: any) => {
        handleActive({ form: event });
        toggle(event);
    }

    const handleSelectPayment = () => {
        if (dataAddress.length === 0) return handleActive({ alertEmptyAddress: true });
        postPayment(checkedCart, dataAddress)
    }

    const closeAlertEmptyAddress = () => {
        handleActive({ alertEmptyAddress: false });
        handleActiveFormAddress(true);
    }

    useEffect(() => {
        if (isMessageAddress === "add address success" ||
            isMessageAddress === "delete address success" ||
            isMessageAddress === "update main address success" ||
            isMessageAddress === "update choice address success" ||
            isMessageAddress === "update address success") callGetApiAddress();
    }, [isMessageAddress, callGetApiAddress])

    return (
        <>
            {active.daftarAddress && (
                <DaftarAddressCart
                    stateActive={active.daftarAddress}
                    faHandleActiveDaftarAddressCart={(event) => handleActiveDaftarAddressCart(event)}
                />
            )}

            {active.form && (
                <FormAddress
                    onClicks={() => handleActiveFormAddress(false)}
                />
            )}

            {active.alertEmptyAddress && (
                <AlertText
                    nameButton={"add address"}
                    onClicks={() => closeAlertEmptyAddress()}
                >
                    address empty. please fill in your address
                </AlertText>
            )}

            {!snapShow && (
                <div className={styles["bg-body-gray"]}>
                    <div
                        className={`
                        ${styles["nav-shipment-wrapper"]}
                        ${scrolled && styles["fixed-nav-shipment"]}
                        ${scrolled && styles["slide-in-top"]}
                    `}
                    >
                        <div
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            className={`${styles["global-container"]}`}
                        >
                            <Link to={"/cart"}>
                                <BsArrowLeft className={styles["icon"]} />
                                <span>back</span>
                            </Link>
                            <Logo />
                        </div>
                    </div>

                    <div className={styles["container-shipment"]} ref={shipmentRef}>
                        <div className={`${styles["global-container"]}`}>
                            <h1>delivery</h1>

                            <div className={styles["shipment-wrapper"]}>
                                <div className={styles["parent-address-order"]}>
                                    {isGetLoading ? (
                                        <LoadingAddressCard />
                                    ) : (
                                        <>
                                            {dataAddress.length !== 0 ? (
                                                // Address Card
                                                <div className={styles["address-wrapper"]}>
                                                    <h2>shipping address</h2>

                                                    <div className={styles["css-line-cart"]}></div>

                                                    {dataAddress
                                                        .filter((data) => data.choice === true)
                                                        .map((data) => (
                                                            <div key={data.id}>
                                                                <div className={styles["title-wrapper"]}>
                                                                    <MdLocationPin className={styles["icon"]} />
                                                                    <p data-testid="addressTitle">{`${data.addressLabel} . ${data.name}`}</p>
                                                                </div>

                                                                <p className={styles["number-phone"]}>{data.numberPhone}</p>

                                                                <div className={styles["detail-address"]}>
                                                                    <p>{data.completeAddress}</p>
                                                                    <p>{`${data.subdistrict}, ${data.city}, ${data.codePos}`}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                    <div className={styles["css-line-cart"]}></div>

                                                    <div className={styles["button-wrapper"]}>
                                                        <button
                                                            type="button"
                                                            aria-label="button change address"
                                                            onClick={() => handleActiveDaftarAddressCart(true)}
                                                        >
                                                            change address
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Address empty
                                                <div className={styles["address-wrapper"]}>
                                                    <div className={styles["address-empty-wrapper"]}>
                                                        <button
                                                            type="button"
                                                            aria-label="button add address"
                                                            onClick={() => handleActiveFormAddress(true)}
                                                            className={styles["button-add-address"]}
                                                        >
                                                            <span>+</span>
                                                            <p>add address</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {isLoadingCart ? (
                                        <LoadingOrderCard />
                                    ) : (
                                        // Product Cart Card
                                        <ul className={styles["order-wrapper"]}>
                                            {checkedCart.map((data, index) => (
                                                <li key={data.id}>
                                                    <h2>{`pesanan ${index + 1}`}</h2>

                                                    <div className={styles["css-line-cart"]}></div>

                                                    <div className={styles["box-order"]}>
                                                        <img width={80} height={80} src={`${process.env.REACT_APP_API_URL_LOCAL}/${convertObjectToArray(data.urlImage)[0]}`} alt={data.nameProduct} />

                                                        <div className={styles["detail-order"]}>
                                                            <p>{data.nameProduct}</p>
                                                            <p>{`${data.amount} product`}</p>
                                                            <p>{`rp ${formattedNumber(data.price)}`}</p>
                                                        </div>
                                                    </div>

                                                    <div className={styles["css-line-cart"]}></div>

                                                    <div className={styles["order-total-price"]}>
                                                        <p>subtotal</p>
                                                        <span>{`rp ${formattedNumber(data.totalPrice)}`}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className={styles["parent-select-payment"]}>
                                    {isLoadingCart ? (
                                        <LoadingPayment />
                                    ) : (
                                        <div
                                            className={`
                                            ${styles["cart-select-payment"]}
                                            ${isScrollShipment === "fixeds" && styles["fixed-cart"]}
                                            ${isScrollShipment === "absolute-bottom" && styles["absolute-card-payment"]}
                                        `}
                                        >
                                            <h2>shopping summary</h2>

                                            <div className={styles["css-line-cart"]}></div>

                                            <div className={styles["text-contain"]}>
                                                <p>{`total harga (${checkedCart.length} barang)`}</p>
                                                <span>rp {convertTotalPrice(checkedCart)}</span>
                                            </div>

                                            <div className={styles["css-line-cart"]}></div>

                                            <div className={styles["button-wrapper"]}>
                                                <button
                                                    type="button"
                                                    aria-label="button select payment"
                                                    onClick={() => handleSelectPayment()}
                                                >
                                                    select payment
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles["footer-chipment"]}>
                        <Footers />
                    </div>
                </div>
            )}
        </>
    )
}

const LoadingAddressCard = () => {
    return (
        <div className={`${styles["address-wrapper"]} ${styles["address-card-loading"]}`}>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
        </div>
    )
}

const LoadingOrderCard = () => {
    const data = [1, 2, 3, 4, 5]

    return (
        <>
            {data.map((data) => (
                <div key={data} className={`${styles["loading-order-card"]} ${styles["address-wrapper"]}`}>
                    <div className={styles["loading-card"]}></div>
                    <div className={styles["loading-card"]}></div>

                    <div className={styles["flex"]}>
                        <div className={styles["loading-card"]}></div>
                        <div className={styles["loading-text"]}>
                            <div className={styles["loading-card"]}></div>
                            <div className={styles["loading-card"]}></div>
                            <div className={styles["loading-card"]}></div>
                        </div>
                    </div>

                    <div className={styles["loading-card"]}></div>

                    <div className={styles["total-price-loading"]}>
                        <div className={styles["loading-card"]}></div>
                        <div>
                            <div className={styles["loading-card"]}></div>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
}

const LoadingPayment = () => {
    return (
        <div className={`${styles["cart-select-payment"]} ${styles["loading-payment"]}`}>
            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>

            <div className={styles["flex"]}>
                <div className={styles["loading-card"]}></div>
                <div className={styles["contain-2"]}>
                    <div className={styles["loading-card"]}></div>
                </div>
            </div>

            <div className={styles["loading-card"]}></div>
            <div className={styles["loading-card"]}></div>
        </div>
    )
}
