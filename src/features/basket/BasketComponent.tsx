import React, { useEffect, useState } from "react";
import styles from "../../style/index.module.scss"
import { IoIosArrowUp, MdOutlineKeyboardArrowLeft } from "../../utils/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { convertObjectToArray, convertProductByCart, convertTotalAmountProduct, convertTotalPrice, formattedNumber } from "../../utils/convert";
import { Link, useNavigate } from "react-router-dom";
import { DataCartProps, activeCarts } from "../../app/actions/apiCartSlice";
import { ButtonLoading } from "../../components/ButtonLoading";
import { useDebounce } from "use-debounce";
import { AlertText } from "../../components/AlertText";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { useGetApiCart } from "../../hook";

export const BasketComponent = () => {
    // State
    const [activeProduct, setActiveProduct] = useState(true);
    // Custome Hook
    const { toggle } = useBodyScrollLock();
    // useAppSelector
    const { dataCart, isLoadingCart } = useAppSelector(state => state.apiCart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleInvisbleBasket = () => {
        dispatch(activeCarts(false))
        toggle(false)
    }

    const handleGoPageCart = () => {
        navigate("/cart");
        handleInvisbleBasket();
    }

    return (
        <>
            <div className={styles["container-basket-component"]}>
                <div className={styles["bg-white"]}>
                    <button
                        type="button"
                        className={styles["button-back-shopping"]}
                        onClick={() => handleInvisbleBasket()}
                    >
                        <MdOutlineKeyboardArrowLeft className={styles["icon"]} />
                        <p>continue shopping</p>
                    </button>

                    <div className={styles["product-wrapp"]}>
                        <h3>your order</h3>

                        <button
                            type="button"
                            className={styles["button-judul"]}
                            onClick={() => setActiveProduct((state) => !state)}
                        >
                            <div className={styles["judul"]}>
                                <h4>product</h4>
                                <span>{`(${dataCart.length})`}</span>
                            </div>

                            <IoIosArrowUp
                                className={`
                                    ${styles["icon"]}
                                    ${!activeProduct && styles["icon-down"]}
                                `}
                            />
                        </button>

                        <div
                            className={`
                                ${styles["parent-to-do-list"]}
                                ${!activeProduct && styles["to-do-list-invisible"]}
                            `}
                        >
                            <ul className={`${activeProduct ? styles["ul-visible"] : styles["ul-invisible"]}`}>
                                {dataCart.map((product) => (
                                    <li key={product.id}>
                                        <Products
                                            product={product}
                                            isLoading={isLoadingCart}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles["see-basket-wrap"]}>
                        <div className={styles["parent-total-price"]}>
                            <p>subtotal:</p>
                            <span>{`Rp ${convertTotalPrice(dataCart)}`}</span>
                        </div>
                        <ButtonLoading
                            classButton={"button-see-basket"}
                            isLoading={isLoadingCart}
                            onClicks={() => handleGoPageCart()}
                        >
                            see basket
                        </ButtonLoading>
                    </div>
                </div>
            </div >
        </>
    )
}

type ProductsProps = {
    product: DataCartProps;
    isLoading: boolean
}

const Products = ({ product, isLoading }: ProductsProps) => {
    // State
    const [amounts, setAmounts] = useState<number>(product.amount);
    const [alert, setAlert] = useState(false);
    // useAppProduct
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    // Custome Hook
    const { handleUpdateCart, handleDeleteCart } = useGetApiCart();

    const [debouncedValue] = useDebounce(amounts, 3500);
    const productByCart = convertProductByCart(dataProductApi, product)

    const increment = () => {
        setAmounts((state) => {
            if (state < convertTotalAmountProduct(dataProductApi, product)) return state + 1
            return state
        })
    }

    const decrement = () => {
        setAmounts((state) => {
            if (state > 1) return state - 1
            return state
        });
    }

    // if the users change input, update amount cart
    useEffect(() => {
        if (debouncedValue !== product.amount) return handleUpdateCart(product, debouncedValue)
    }, [debouncedValue, handleUpdateCart, product]);

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

            <Link
                to={`/collections/sayur-buah/products/${product.nameProduct}`}
            >
                <img
                    width={60}
                    src={`${process.env.REACT_APP_API_URL_LOCAL}/${convertObjectToArray(product.urlImage)[0]}`}
                    alt={product.nameProduct}
                    className={styles["image-product"]}
                />
            </Link>
            <div className={styles["containt-product"]}>
                <Link
                    to={`/collections/sayur-buah/products/${product.nameProduct.toLowerCase()}`}
                >
                    <h5>{product.nameProduct}</h5>
                </Link>
                <p>{`rp ${formattedNumber(product.price)}`}</p>
                <div className={styles["parent-amount"]}>
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
                        onChange={(event) => setAmounts(parseFloat(event.target.value))}
                        onKeyUp={() => handleMaxMinAmountInput()}
                    />

                    <ButtonLoading
                        classButton={"button-increm-decremen"}
                        isLoading={isLoading}
                        onClicks={() => increment()}
                    >
                        +
                    </ButtonLoading>

                    <hr className={styles["line"]} />

                    <ButtonLoading
                        classButton={"button-remove"}
                        isLoading={isLoading}
                        onClicks={() => handleDeleteCart([product.id])}
                    >
                        remove
                    </ButtonLoading>
                </div>
            </div>
        </>
    )
}