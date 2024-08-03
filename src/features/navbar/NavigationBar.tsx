import styles from "../../style/index.module.scss";
import SearchProduct from "./SearchProduct";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Buttons } from "../../components/Buttons";
import { useScrollNavbar } from "../../hook/useScrollNavbar";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { UsersLogin } from "./UsersLogin";
import { activeFormTransition } from "../../app/actions/formLoginRegisterSlice";
import { useAuthUsers } from "../../hook/useAuthUsers";
import { Logo } from "../../components/Logo";
import { BsSearch, GoHeartFill } from "../../utils/icons";
import { ButtonTooltip } from "../../components/ButtonTooltip";
import { useState } from "react";
import { IconBasket } from "./IconBasket";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
    const { scrolled } = useScrollNavbar();

    return (
        <>
            <div
                className={`${styles["fixed-navigation-bar-invisible"]} ${scrolled && styles["fixeds"]}`}
            >
                <Navbar />
            </div>

        </>
    )
}

const Navbar = () => {
    // State
    const [input, setInput] = useState("");
    const [searchMobile, setSearchMobile] = useState(false);
    const navigate = useNavigate();
    // Hook
    // useOutsideClick({ ref, faClose: () => invisibleInputSearch() });
    useAuthUsers();
    const { toggle } = useBodyScrollLock();
    // Redux
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();


    const handleNavigateToWishlist = () => {
        if (dataLoginUsers) return navigate("/wishlist");
    }

    return (
        <>
            <nav className={`${styles["container-navigation-bar"]}`}>
                <div className={styles["global-container"]}>
                    <div className={styles["toolbar-container"]}>
                        <div className={styles["toolbar-left"]}>
                            {/* Logo */}
                            <div className={styles["parent-logo"]}>
                                <Logo />
                            </div>
                            {/* Search Pc */}
                            <div className={styles["parent-search-pc"]}>
                                <SearchProduct inputs={input} setInputs={(input) => setInput(input)} />
                            </div>
                            {/* Search Mobile */}
                            {searchMobile && (
                                <div
                                    className={`
                                        ${styles["parent-search-600"]}
                                        ${searchMobile && styles["visible-search-mobile-navbar"]}
                                    `}
                                >
                                    <SearchProduct inputs={input} setInputs={(input) => setInput(input)} onClicks={() => setSearchMobile(false)} />
                                </div>
                            )}
                        </div>

                        <div className={styles["toolbar-right"]}>
                            {/* Search Mobile */}
                            {!searchMobile && (
                                <ButtonTooltip
                                    styleButton={"btn-search-navigation"}
                                    textTooltip={"see wishlist"}
                                    styleTooltip={"tooltip"}
                                    positionX={13}
                                    positionY={17}
                                    onClicks={() => setSearchMobile(true)}
                                >
                                    <BsSearch />
                                </ButtonTooltip>
                            )}
                            <ButtonTooltip
                                styleButton={"btn-heart"}
                                textTooltip={"see wishlist"}
                                styleTooltip={"tooltip"}
                                positionX={13}
                                positionY={17}
                                onClicks={() => handleNavigateToWishlist()}
                            >
                                <GoHeartFill />
                            </ButtonTooltip>

                            <IconBasket />

                            {/* Button Login */}
                            {dataLoginUsers?.uuid === undefined
                                ? (
                                    <Buttons
                                        styleScss={"btn"}
                                        stylesBtn={{ width: "6rem", height: "2.5rem", fontSize: "1.2rem" }}
                                        onClicks={() => {
                                            toggle(true)
                                            dispatch(activeFormTransition({ onOffForm: true }))
                                        }}
                                    >
                                        Login
                                    </Buttons>
                                )
                                : (
                                    <UsersLogin />
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}