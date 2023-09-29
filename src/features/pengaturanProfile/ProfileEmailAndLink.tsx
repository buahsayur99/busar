import React from "react";
import menuData from "../../data/menuData";
import { useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";
import { NavLink } from "react-router-dom";
import { useSaveLastPage } from "../../hook/useSaveLastPage";

export const ProfileEmailAndLink = () => {
    // useAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    // Custome Hook
    useSaveLastPage();

    const convertLinkToName = () => {
        // Take website liks without domain
        let currentPageString = localStorage.getItem("informasi_halaman");
        let page_path;
        if (currentPageString) page_path = JSON.parse(currentPageString);

        let currentPath = page_path.page_path;
        // Convert currentPath to string
        let hasil = currentPath.toString();

        // looping data menu
        menuData.forEach((data) => {
            if (data.toLink === hasil) return hasil = data.nameLink
        })

        return hasil
    }

    const convertNameToInfo = () => {
        let link = convertLinkToName();

        if (link === "general") return "Update your email and manage your account";
        if (link === "edit profile") return "Add your profile image";
        if (link === "password") return "Manage your password";
        if (link === "address") return "Manage your address";
    }

    return (
        <>
            <div className={`${styles["container-profile-email"]}`}>
                <NavLink
                    to={"/account/profile"}
                    className={`${styles["profile"]}`}
                >
                    <FaUserAlt />
                </NavLink>
                <div className={`${styles["parent-name-info"]}`}>
                    <div className={`${styles["name-profile-email"]}`}>
                        <h2>{dataLoginUsers?.email}</h2>
                        <span>/</span>
                        <h3 className={`${styles["url-link"]}`}>{convertLinkToName()}
                        </h3>
                    </div>

                    <p>{convertNameToInfo()}</p>
                </div>
            </div>
        </>
    )
}
