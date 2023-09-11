import React, { useState } from "react";
import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetDataLoginUsers } from "../../app/actions/apiUsersSlice";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";

export const MobileUsers = () => {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState({ usersMenu: false });
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { toggle } = useBodyScrollLock();

    const updateActive = (prev: any) => {
        setActive(state => ({ ...state, ...prev }))
    }

    return (
        <>
            <div className={`${styles["parent-users-login-mobile"]}`}>
                <span
                    className={`${styles["parent-icon-users"]}`}
                    onClick={() => {
                        updateActive({ usersMenu: !active.usersMenu });
                        toggle(!active.usersMenu)
                    }}
                >
                    <FaUserAlt />
                </span>

                {active.usersMenu && (
                    <div className={`${styles["bg-black-mobile-users"]}`}>
                        <div className={`${styles["parent-users-hover"]}`}>
                            <div className={`${styles["data-users"]}`}>
                                <div className={`${styles["users-profile"]}`}>
                                    <FaUserAlt />
                                </div>
                                <p>{dataLoginUsers?.email}</p>
                            </div>

                            <div className={`${styles["parent-users-menu"]}`}>
                                <ul>
                                    <li>Settings</li>
                                    <hr />
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() => dispatch(resetDataLoginUsers())}
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
