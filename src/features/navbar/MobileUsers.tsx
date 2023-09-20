import { useState } from "react";
import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetDataLoginUsers } from "../../app/actions/apiUsersSlice";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { NavLink } from "react-router-dom";

export const MobileUsers = () => {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState({ usersMenu: false });
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { toggle } = useBodyScrollLock();

    const updateActive = (prev: any) => {
        setActive(state => ({ ...state, ...prev }));
    };

    const toggleUsersProfileMenu = () => {
        updateActive({ usersMenu: !active.usersMenu });
        toggle(!active.usersMenu);
    };

    const toggleLogoutUsers = () => {
        toggleUsersProfileMenu();
        dispatch(resetDataLoginUsers());
        localStorage.removeItem("uuid");
    };

    return (
        <>
            <div className={`${styles["parent-users-login-mobile"]}`}>
                <span
                    className={`${styles["parent-icon-users"]}`}
                    onClick={() => toggleUsersProfileMenu()}
                >
                    <FaUserAlt />
                </span>

                {active.usersMenu && (
                    <div className={`${styles["bg-black-mobile-users"]}`}>
                        <div className={`${styles["parent-users-hover"]}`}>
                            <div className={`${styles["data-users"]}`}>
                                {/* Navlink Profile */}
                                <NavLink
                                    to="/account/profile"
                                    className={`${styles["users-profile"]}`}
                                    onClick={() => toggleUsersProfileMenu()}
                                >
                                    <FaUserAlt />
                                </NavLink>
                                {/* Navlink Email */}
                                <NavLink
                                    to="/account"
                                    className={`${styles["email-users"]}`}
                                    onClick={() => toggleUsersProfileMenu()}
                                >
                                    {dataLoginUsers?.email}
                                </NavLink>
                            </div>

                            <div className={`${styles["parent-users-menu"]}`}>
                                <ul>
                                    <li>
                                        <NavLink
                                            to="/account"
                                            className={`${styles["btn-users"]}`}
                                            onClick={() => toggleUsersProfileMenu()}
                                        >
                                            Settings
                                        </NavLink>
                                    </li>
                                    <hr />
                                    <li>
                                        <button
                                            type="button"
                                            className={`${styles["btn-users"]}`}
                                            onClick={toggleLogoutUsers}
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
