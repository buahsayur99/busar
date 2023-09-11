// import React from "react"
import styles from "../../style/index.module.scss";
import { HiOutlineBars4 } from "react-icons/hi2";
import { Navbar, Button, Stack } from "react-bootstrap";
import SearchCatatan from "./SearchCatatan";
import { BsSearch } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { activeSearch } from "../../app/actions/searchCatatanSlice";
import { Buttons } from "../../components/Buttons";
import { useScrollNavbar } from "../../hook/useScrollNavbar";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { UsersLogin } from "./UsersLogin";
import { activeFormTransition } from "../../app/actions/formLoginRegisterSlice";

export const NavigationBar = () => {
    const { activeInputSearch } = useAppSelector(state => state.searchCatatanSlice);
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { toggle } = useBodyScrollLock()
    const { scrolled } = useScrollNavbar()

    const dispatch = useAppDispatch()

    return (
        <>
            <div className="shadow-sm">
                <Navbar
                    className={`
                    ${!scrolled ? "" : styles["nav-fixed"]} 
                    ${styles["global-container"]} ${styles.nav}`
                    }
                >
                    <Stack className="flex-row position-relative me-3 me-md-5" >
                        {/* Search Catatan dimensi Tablet and Mobile */}
                        <Stack
                            data-testid="input-search-mobile"
                            className={`${styles["parent-search-mobile"]} ${!activeInputSearch ? styles["search-notActive"] : styles["search-active"]}`}
                        >
                            <SearchCatatan tipe={"mobile"} />
                        </Stack>

                        {/* Button Sidebar */}
                        <Button className={`${styles["btn-menu-utama-nav"]} align-self-center me-3`}>
                            <HiOutlineBars4 />
                        </Button>

                        {/* Icon Name Website */}
                        <Navbar.Brand
                            role="heading"
                            className={`${styles["judul-nav"]} align-self-center`}
                        >
                            Keep Aduh
                        </Navbar.Brand>

                        {/* Parent Search Dimensi Pc */}
                        <Stack className={styles["parent-search"]}>
                            {/* Search Dimensi PC */}
                            <Stack className={`${styles["search-catatan"]} justify-content-center align-self-end`}>
                                <SearchCatatan tipe={"noMobile"} />
                            </Stack>

                            {/* Button Active Search Dimensi Tablet And Mobile */}
                            <Button
                                className={`${styles["btn-search-on-off"]}`}
                                onClick={() => dispatch(activeSearch(!activeInputSearch))}
                            >
                                <BsSearch />
                            </Button>
                        </Stack>
                    </Stack>

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
                </Navbar >
            </div>
        </>
    )
}