import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import styles from "../style/index.module.scss";

export const Logo = () => {
    return (
        <>
            <div className={styles["container-logo"]}>
                <Link to={"/"}>
                    <img src={logo} alt="logo" width={130} />
                </Link>
            </div>
        </>
    )
}
