import { NavLink } from "react-router-dom";
import styles from "../../style/index.module.scss";
import menuData from "../../data/menuData";
import { useSaveLastPage } from "../../hook/useSaveLastPage";
import { covertInfoHalamanToNameButton } from "../../utils/convert";
import { IoIosArrowDown, BsCheckAll } from "../../utils/icons";
import { useEffect, useRef, useState } from "react";

export const MenuPengaturanProfile = () => {
    const { infoHalaman } = useSaveLastPage();
    const [active, setActive] = useState(false);
    const menuRef = useRef<HTMLAnchorElement | null>(null);
    const btnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onClickDropdown = (value: any) => {
            if (value !== menuRef.current && value !== btnRef.current) {
                setActive(false);
            }
        }
        window.addEventListener("click", (e) => onClickDropdown(e.target));

        return () => window.removeEventListener("click", (e) => onClickDropdown(e.target))
    })

    return (
        <>
            <div className={styles["container-menu-pengaturan-profile"]}>
                {/* Dismensi Pc */}
                <ul>
                    {menuData.map((data, index) => (
                        <li key={index}>
                            <NavLink
                                to={data.toLink}
                                className={({ isActive }) => (isActive
                                    ? styles["users-menu-active"]
                                    : styles["users-menu"]
                                )}
                                end
                            >
                                {data.nameLink}
                            </NavLink>
                        </li>
                    ))}
                </ul >

                {/* Dimensi mobile */}
                <div className={styles["nav-account-mobile"]}>
                    {infoHalaman.page_path && (
                        <div
                            ref={btnRef}
                            className={`
                                ${styles["parent-info-halaman"]}
                                ${active ? styles["border-active"] : styles["border"]}
                            `}
                            onClick={() => setActive(state => !state)}
                        >
                            <h3>{covertInfoHalamanToNameButton(infoHalaman.page_path)}</h3>
                            {!active ? <IoIosArrowDown className={styles["icon"]} /> : <BsCheckAll className={styles["icon"]} />}
                        </div>
                    )}

                    {active && (
                        <div className={styles["parent-users-menu"]}>
                            {menuData
                                .filter(data => data.toLink !== infoHalaman.page_path)
                                .map((data, index) => (
                                    <NavLink
                                        ref={menuRef}
                                        key={index}
                                        to={data.toLink}
                                        className={`
                                            ${styles["users-menu"]}
                                            ${index === menuData.length - 2 && styles["border-navlink"]}
                                        `}
                                        onClick={() => setActive(false)}
                                    >
                                        {data.nameLink}
                                    </NavLink>
                                ))
                            }
                        </div>
                    )}
                </div >
            </div >
        </>
    )
}
