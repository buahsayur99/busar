import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";
import { resetDataLoginUsers } from "../../app/actions/apiUsersSlice";
import { MobileUsers } from "./MobileUsers";
import { NavLink } from "react-router-dom";

export const UsersLogin = () => {
    const dispatch = useAppDispatch()
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);

    return (
        <>
            <div className={`${styles["parent-users-login"]}`}>
                <span className={`${styles["parent-icon-users"]}`}>
                    <FaUserAlt />
                </span>

                <div className={`${styles["parent-users-hover"]}`}>
                    <div className={`${styles["data-users"]}`}>
                        <NavLink
                            to="/account/profile"
                            className={`${styles["users-profile"]}`}
                        >
                            <FaUserAlt />
                        </NavLink>
                        <NavLink
                            to="/account"
                            className={`${styles["email-users"]}`}
                        >
                            {dataLoginUsers?.email}
                        </NavLink>
                    </div>
                    <div className={`${styles["parent-users-menu"]}`}>
                        <ul>
                            <li style={{ display: "grid", gap: ".5rem" }}>
                                {dataLoginUsers?.role === "admin" && (
                                    <NavLink
                                        to="/dashboard"
                                        className={`${styles["btn-users"]}`}
                                    >
                                        dashboard
                                    </NavLink>
                                )}
                                <NavLink
                                    to="/account"
                                    className={`${styles["btn-users"]}`}
                                >
                                    Settings
                                </NavLink>
                            </li>
                            <hr />
                            <li>
                                <button
                                    className={`${styles["btn-users"]}`}
                                    type="button"
                                    onClick={() => {
                                        dispatch(resetDataLoginUsers());
                                        localStorage.removeItem("uuid");
                                        localStorage.removeItem("checkedCart");
                                    }}
                                >
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <MobileUsers />
        </>
    )
}
