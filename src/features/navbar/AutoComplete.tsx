import React, { useEffect, useState } from "react";
import styles from "../../style/index.module.scss";
import { useAppSelector } from "../../app/hooks";
import { productProps } from "../../app/actions/apiProductSlice";
import { convertObjectToArray, formattedNumber } from "../../utils/convert";
import { BsArrowRight } from "../../utils/icons";
import { Link } from "react-router-dom";
import { useScrollNavbar } from "../../hook/useScrollNavbar";

type AutoCompleteProps = {
    inputSearch: string;
}

export const AutoComplete = ({ inputSearch }: AutoCompleteProps) => {
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    const [suggestions, setSuggestions] = useState<productProps[]>([]);
    const { scrolled, scrolls } = useScrollNavbar();

    useEffect(() => {
        // Hanya update daftar saran jika inputSearch tidak kosong
        if (inputSearch.trim() !== "") {
            const filteredProducts = dataProductApi.filter((product) =>
                product.name.toLowerCase().includes(inputSearch.toLowerCase())
            );
            setSuggestions(filteredProducts);
        } else {
            // Kosongkan daftar saran jika inputSearch kosong
            setSuggestions([]);
        }
    }, [inputSearch, dataProductApi]);

    const baseStyle = {
        top: `${!scrolled ? 65 + scrolls : 65}px`,
    };

    const StyleMax800 = {
        top: `${!scrolled ? 60 + scrolls : 60}px`,
    };

    const StyleMax600 = {
        top: `${!scrolled ? 55 + scrolls : 55}px`,
    };

    const StyleMax450 = {
        top: `${!scrolled ? 51 + scrolls : 51}px`,
    };

    return (
        <>
            {inputSearch.length !== 0 && (
                <div
                    className={styles["search-auto-complete-wrapper"]}
                    style={{
                        ...baseStyle,
                        ...(window.innerWidth <= 800 && StyleMax800),
                        ...(window.innerWidth <= 600 && StyleMax600),
                        ...(window.innerWidth <= 600 && StyleMax450),
                    }}
                >
                    <div className={styles["search-auto-complete"]}>
                        <div
                            className={styles["search-auto-complete-group"]} aria-label="product search"
                        >
                            <h4 className={styles["search-auto-complete-header-product"]}>product</h4>
                            <ul>
                                {suggestions.map((suggestion, index) => (
                                    <li key={index}>
                                        <Link to={`/collections/sayur-buah/products/${suggestion.name}`}>
                                            <div className={styles["search-auto-complete-left"]}>
                                                <img
                                                    width={60}
                                                    src={`${process.env.REACT_APP_API_URL_LOCAL}/${convertObjectToArray(suggestion.url)[0]}`}
                                                    alt={suggestion.name}
                                                />
                                            </div>
                                            <div className={styles["search-auto-complete-right"]}>
                                                <p className={styles["search-auto-complete-product-tittle"]}>
                                                    {suggestion.name}
                                                </p>
                                                <p className={styles["search-auto-complete-product-price"]}>
                                                    Rp {formattedNumber(suggestion.price)}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles["search-auto-complete-view-all"]}>
                                <Link to={`/collections/sayur-buah/products/${inputSearch}`}>
                                    <span>
                                        {`lihat semua ${suggestions.length} product`}
                                    </span>
                                    <BsArrowRight className={styles["icon"]} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
