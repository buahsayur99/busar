import { NavigationBar } from "../features/navbar/NavigationBar";
import notFound from "../assets/NotFound/notfound.svg";
import styles from "../style/index.module.scss";
import { NavLink } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
            {/* Navbar */}
            < NavigationBar />
            <div className={`${styles["global-container"]}`}>
                <div className={styles["container-not-found"]}>
                    <img src={notFound} alt="Img Not Found" />

                    <div className={styles["parent-button"]}>
                        <button>
                            <NavLink to={"/"} className="text-decoration-none text-white">
                                Go to homepage
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
