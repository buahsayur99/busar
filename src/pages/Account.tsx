import { Outlet } from "react-router-dom";
import { NavigationBar } from "../features/navbar/NavigationBar";
import styles from "../style/index.module.scss";

export const Account = () => {
    return (
        <>
            {/* Navbar */}
            <NavigationBar />

            <div className={`${styles["global-container"]} mt-5`}>
                <div className={`${styles["parent-account"]}`}>
                    <ul>
                        <li>General</li>
                        <li>Edit Profile</li>
                        <li>Password</li>
                    </ul>
                    <p>aaaaaaaaaaaaa</p>
                </div>

                <Outlet />
            </div>
        </>
    )
}
