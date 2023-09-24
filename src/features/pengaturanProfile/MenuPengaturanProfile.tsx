import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../style/index.module.scss";
import menuData from "../../data/menuData";

export const MenuPengaturanProfile = () => {
    return (
        <>
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
        </>
    )
}
