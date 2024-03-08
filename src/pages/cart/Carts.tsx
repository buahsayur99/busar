import React, { useCallback, useEffect, useRef, useState } from "react"
import { NavigationBar } from "../../features/navbar/NavigationBar"
import styles from "../../style/index.module.scss";
import { Footers } from "../../components/Footers";
import { InputCheckbox } from "../../components/InputCheckbox";
import { useAppSelector } from "../../app/hooks";
import { filterAllProductByWithlist, convertObjectToArray, convertProductByCart, convertTotalAmountProduct, faWishlist, formattedNumber, convertTotalPrice } from "../../utils/convert";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLoading } from "../../components/ButtonLoading";
import { DataCartProps } from "../../app/actions/apiCartSlice";
import { HeartIcon } from "../../components/HeartIcon";
import { ButtonTooltip } from "../../components/ButtonTooltip";
import { BsTrashFill } from "../../utils/icons";
import { useDebounce } from "use-debounce";
import { AlertText } from "../../components/AlertText";
import { AlertConfirmasi } from "../../components/AlertConfirmasi";
import { useBodyScrollLock, useCheckedCart, useGetWishlist, useGetProduct, useGetApiCart, useScrollNavbar } from "../../hook/index";
import { RecommendationCart } from "./components/RecommendationCart";
import { BasketEmpty } from "./components/BasketEmpty";
import { useScrollTotalPrice } from "../../hook/useScrollTotalPrice";

export const Carts = () => {
    // UseAppSelector
    const { dataCart, isLoadingCart, checkedCart } = useAppSelector(state => state.apiCart);
    const { dataWishlist } = useAppSelector(state => state.apiWishlist);
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    // Custome Hook
    useGetProduct();
    const { handleRemoveWishlist } = useGetWishlist();
    const { handleDeleteCart } = useGetApiCart();
    const { scrolled } = useScrollNavbar();
    const { handleCheckedCart } = useCheckedCart(dataCart, checkedCart);
    const { toggle } = useBodyScrollLock();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrolledTotalPrice, scrolledSelectAll, isScrolling } = useScrollTotalPrice(containerRef);
    // State
    const [alerts, setAlert] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCanselAlert = () => {
        toggle(false);
        setAlert(false);
    }

    const handleActiveAlert = () => {
        toggle(true);
        setAlert(true);
    }

    const deleteCart = () => {
        const id = checkedCart.reduce((accumulator: number[], cart: DataCartProps) => {
            return [...accumulator, cart.id]
        }, []);

        handleDeleteCart(id);
        handleCanselAlert();
    }

    const selectAllRef = useRef<HTMLLabelElement>(null);

    const handleClickCheckbox = () => {
        selectAllRef.current?.click()
    }

    const handleBuyProduct = () => {
        if (checkedCart.length !== 0) {
            navigate("shipment")
        }
    }

    return (
        <>
            {/* Navbar */}
            <NavigationBar />

            <div className={`${styles["global-container"]}`}>
                <div className={`${styles["container-carts"]}`} ref={containerRef}>
                    {/* Alert Confirmasi Delete Cart */}
                    {alerts && (
                        <AlertConfirmasi
                            okText={"delete"}
                            canselText={"cansel"}
                            onOkClick={() => deleteCart()}
                            onCanselClick={() => handleCanselAlert()}
                        >
                            <h3>
                                {`delete ${checkedCart.length} products`}
                            </h3>
                            <p>
                                the product you selected will be removed from the cart
                            </p>
                        </AlertConfirmasi>
                    )}

                    <div>
                        {dataCart.length === 0 ? (
                            <BasketEmpty />
                        ) : (
                            <>
                                {checkedCart.length !== 0 && (
                                    <div
                                        className={`
                                            ${styles["container-select-product-table"]}
                                            ${scrolled && styles["index-0"]}
                                            ${scrolledSelectAll && styles["fixed"]}
                                        `}
                                    >
                                        <div
                                            className={`
                                                ${styles["parent-select-product-table"]}
                                                ${!isScrolling ? styles["slide-out-top"] : styles["slide-in-top"]}
                                            `}
                                        >
                                            <div className={styles["text-contain"]}>
                                                <p>{`${checkedCart.length} product selected`}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleActiveAlert()}
                                            >
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <h3>basket</h3>
                                <div>
                                    <div className={styles["parent-left-side"]}>
                                        <div className={`${styles["cart-select-all"]} ${styles["flex-alig-center"]}`}>
                                            <div className={styles["wrapper-left"]}>
                                                <label
                                                    data-testid="cartSelectAll"
                                                    ref={selectAllRef}
                                                    htmlFor="selectAll"
                                                >
                                                    <InputCheckbox
                                                        valueInput={"selectAll"}
                                                        checkeds={checkedCart}
                                                        dataToCheckeds={dataCart}
                                                        fcHandleCheckeds={(event) => handleCheckedCart(event)}
                                                    />
                                                </label>
                                            </div>
                                            <div className={styles["wrapper-right"]}>
                                                <button
                                                    type="button"
                                                    className={styles["button-select-all"]}
                                                    onClick={() => handleClickCheckbox()}
                                                >
                                                    select all
                                                </button>
                                                {checkedCart.length !== 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleActiveAlert()}
                                                    >
                                                        delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className={styles["css-line-cart"]}></div>

                                        <ul>
                                            {dataCart.map((data) => (
                                                <li key={data.id}>
                                                    <Products
                                                        product={data}
                                                        isLoading={isLoadingCart}
                                                        faHandleDeleteCart={(id) => handleDeleteCart(id)}
                                                        faHandleCheckedCart={(event) => handleCheckedCart(event)}
                                                        checkedCart={checkedCart}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}

                        {dataWishlist.length !== 0 && (
                            <RecommendationCart
                                dataMap={filterAllProductByWithlist(dataProductApi, dataWishlist)}
                                tittle={"make your wishlist come true!"}
                                faHandleRemoveWishlist={(id: number) => handleRemoveWishlist(id)}
                            />
                        )}
                    </div>

                    <div className={styles["parent-total-harga"]}>
                        <div
                            className={`
                                ${styles["card-total-harga"]}
                                ${scrolledTotalPrice ? styles["card-absolute"] : styles["card-fixed"]}
                            `}
                        >
                            <div className={styles["header-input-wrapper"]}>
                                <div className={styles["parent-input-select-all"]}>
                                    <InputCheckbox
                                        valueInput={"selectAll"}
                                        checkeds={checkedCart}
                                        dataToCheckeds={dataCart}
                                        fcHandleCheckeds={(event) => handleCheckedCart(event)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleClickCheckbox()}
                                    >
                                        select all
                                    </button>
                                </div>

                                <h3>ringkasan belanja</h3>
                            </div>

                            <div className={`${styles["css-line-cart"]} ${styles["tablet-hidden"]}`}></div>

                            <div className={styles["parent-button-text"]}>
                                <div className={styles["text-contain"]}>
                                    <p>total harga</p>
                                    <span>rp {convertTotalPrice(checkedCart)}</span>
                                </div>
                                <div className={styles["button-wrapper"]}>
                                    {/* <Link to={"shipment"}>
                                        
                                    </Link> */}

                                    <button
                                        type="button"
                                        className={`${checkedCart.length === 0 && styles["invisible"]}`}
                                        onClick={() => handleBuyProduct()}
                                    >
                                        {`buy (${checkedCart.length})`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={styles["cart-footers-wrapper"]}>
                <Footers />
            </div>
        </>
    )
}

type ProductProps = {
    product: DataCartProps;
    isLoading: boolean;
    faHandleDeleteCart: (id: number[]) => void;
    faHandleCheckedCart: (event: DataCartProps) => void;
    checkedCart: DataCartProps[];
}

const Products = ({ product, isLoading, checkedCart, faHandleDeleteCart, faHandleCheckedCart }: ProductProps) => {
    const [amounts, setAmounts] = useState(product.amount);
    const [alert, setAlert] = useState(false);
    const [onClickOrChange, setOnClickOrChange] = useState(false);
    // useAppSelector
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    const { dataWishlist } = useAppSelector(state => state.apiWishlist);
    // Custome Hook
    const { handleUpdateCart } = useGetApiCart();

    const [debouncedValue] = useDebounce(amounts, 3000);
    const productByCart = convertProductByCart(dataProductApi, product)

    const increment = () => {
        setOnClickOrChange(true)
        setAmounts((state) => {
            if (state < convertTotalAmountProduct(dataProductApi, product)) return state + 1
            return state
        })
    }

    const decrement = () => {
        setOnClickOrChange(true)
        setAmounts((state) => {
            if (state > 1) return state - 1
            return state
        });
    }

    const settingHeart = {
        cssButton: "icon-heart",
        cssTooltipRemove: "text-tooltip",
        cssTooltipAdd: "text-tooltip",
        textTooltipRemove: "remove from wishlist",
        textTooltipAdd: "add from wishlist",
        styleButtonFill: { color: "red" },
        positionX: -115,
        positionY: 25,
        arialLabelFill: "heart fill",
        arialLabelNoFill: "heart",
    }

    const updateCart = useCallback(() => {
        setOnClickOrChange(false)
        handleUpdateCart(product, debouncedValue)
    }, [debouncedValue, product, handleUpdateCart])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmounts(parseFloat(event.target.value))

        setAmounts((state) => {
            if (state !== product.amount) {
                setOnClickOrChange(true)
            }

            return state
        })
    }

    // if the users change input, update amount cart
    useEffect(() => {
        if (debouncedValue !== product.amount && onClickOrChange === true) updateCart()
    }, [debouncedValue, product, onClickOrChange, updateCart]);

    useEffect(() => {
        setAmounts(product.amount)
    }, [product.amount])

    const handleMaxMinAmountInput = () => {
        setTimeout(() => {
            setAmounts((state) => {
                if (isNaN(state)) return 1
                if (state > productByCart.amount) {
                    setAlert(true)
                    return productByCart.amount
                }
                return state
            });
        }, 3000)
    }

    return (
        <>
            {alert && (
                <AlertText
                    nameButton={"close alert"}
                    onClicks={() => setAlert(false)}
                >
                    {`product ${productByCart.name} hanya memiliki maxsimal stok ${productByCart.amount}`}
                </AlertText >
            )}

            <div className={styles["flex-alig-center"]}>
                <div className={styles["wrapper-left"]}>
                    <label data-testid="cartListProductBox">
                        <InputCheckbox
                            valueInput={product}
                            checkeds={checkedCart}
                            fcHandleCheckeds={(event) => faHandleCheckedCart(event)}
                        />
                    </label>
                </div>
                <div style={{ width: "100%" }}>
                    <div className={styles["parent-product-box"]}>
                        <Link
                            to={`/collections/sayur-buah/products/${product.nameProduct}`}
                        >
                            <img
                                width={150}
                                src={`${process.env.REACT_APP_API_URL_LOCAL}/${convertObjectToArray(product.urlImage)[0]}`}
                                alt={product.nameProduct}
                            />
                        </Link>
                        <div className={styles["text-wrapper"]}>
                            <Link
                                to={`/collections/sayur-buah/products/${product.nameProduct}`}
                            >
                                {product.nameProduct}
                            </Link>
                            <p>rp {formattedNumber(product.price)}</p>
                        </div>
                    </div>

                    <div className={styles["wrapper-button"]}>
                        <div className={`${styles["flex-alig-center"]} ${styles["button-left"]}`}>
                            <div className={styles["increment-decrement-wrapper"]}>
                                <ButtonLoading
                                    classButton={"button-increm-decremen"}
                                    isLoading={isLoading}
                                    onClicks={() => decrement()}
                                >
                                    -
                                </ButtonLoading>

                                <input
                                    className={styles["input-amounts"]}
                                    type="number"
                                    value={amounts}
                                    onChange={(event) => handleOnChange(event)}
                                    onKeyUp={() => handleMaxMinAmountInput()}
                                />

                                <ButtonLoading
                                    classButton={"button-increm-decremen"}
                                    isLoading={isLoading}
                                    onClicks={() => increment()}
                                >
                                    +
                                </ButtonLoading>
                            </div>
                            <hr className={styles["line-vertical"]} />
                            <div className={styles["parent-total-price"]}>
                                <p>total price:</p>
                                <span>rp {formattedNumber(product.totalPrice)}</span>
                            </div>
                        </div>
                        <div className={styles["flex-alig-center"]}>
                            <HeartIcon
                                settingHeart={settingHeart}
                                dataWishlist={faWishlist(convertProductByCart(dataProductApi, product), dataWishlist)}
                                products={convertProductByCart(dataProductApi, product)}
                                onClicks={() => { }}
                            />
                            <hr className={styles["line-vertical"]} />
                            <ButtonTooltip
                                styleButton={"button-remove-cart"}
                                textTooltip={"remove cart"}
                                styleTooltip={"text-tooltip"}
                                positionX={-87}
                                positionY={14}
                                onClicks={() => faHandleDeleteCart([product.id])}
                                ariaLabel={"remove cart"}
                            >
                                <BsTrashFill />
                            </ButtonTooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles["css-line-cart"]}></div>
        </>
    )
}
