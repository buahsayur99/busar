import React from "react";
import styles from "../../../style/index.module.scss";
import { NavLink, Outlet } from "react-router-dom";

export const NavPurchase = () => {
    const dataNav = [
        { nameNav: "all", redirect: "/user/purchase" },
        { nameNav: "not yet pain", redirect: "/user/purchase/pedding" },
        { nameNav: "being packed", redirect: "/user/purchase/packaged" },
        { nameNav: "send", redirect: "/user/purchase/send" },
        { nameNav: "finished", redirect: "/user/purchase/finished" },
        { nameNav: "cancelled", redirect: "/user/purchase/cancelled" },
    ]

    const styleNavPurchase = {
        width: `${dataNav.length}${0}rem`
    }

    return (
        <>
            <div className={styles["container-nav-purchase"]}>
                <nav className={styles["parent-nav-purchase"]}>
                    <div
                        className={styles["nav-purchase"]}
                        style={{
                            ...styleNavPurchase,
                        }}
                    >
                        {dataNav.map((data, index) => (
                            <NavLink
                                key={index}
                                to={data.redirect}
                                className={({ isActive }) => (isActive ? `${styles["btn-active"]}` : "")}
                                end
                            >
                                {data.nameNav}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </div>
            <Outlet />
        </>
    )
}
