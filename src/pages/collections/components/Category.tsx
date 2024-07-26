import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../style/index.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "../../../utils/icons";


export const Category = () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [invisibleCategory, setInvisibleCategory] = useState(true);
    // Redux
    const { dataCategory } = useAppSelector(state => state.apiCategory);
    const navigate = useNavigate();

    const handleCheckboxChange = (category: string) => {
        setCheckedItems(prevState => {
            if (prevState.includes(category)) return prevState.filter(item => item !== category);
            return [...prevState, category];
        });
    };

    const handleRedirectCategoryProduct = useCallback(() => {
        if (checkedItems.length > 0) {
            const links = checkedItems.join('/');
            return navigate(`/collections/category/${links}`);
        }
        if (checkedItems.length === 0) return navigate(`/collections`);
    }, [checkedItems, navigate]);

    useEffect(() => {
        handleRedirectCategoryProduct();
    }, [handleRedirectCategoryProduct]);

    return (
        <>
            <div className={styles["container-category"]}>
                <button
                    className={styles["title-category"]}
                    type="button"
                    onClick={() => setInvisibleCategory((prev) => !prev)}
                >
                    <IoIosArrowDown className={styles["icon"]} />
                    <h4>category</h4>
                </button>

                <div className={`
                    ${styles["list-category-wrapper"]}
                    ${invisibleCategory && styles["list-category-wrapper_invisible"]}
                `}>
                    <div className={styles["list-category"]}>
                        {dataCategory.length !== 0 && (
                            <ul>
                                {dataCategory.map((category) => (
                                    <li key={category.id}>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems.includes(category.name)}
                                            onChange={() => handleCheckboxChange(category.name)}
                                        />
                                        <p className={`
                                    ${checkedItems.includes(category.name) && styles["active-category"]}
                                `}>
                                            {category.name}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
