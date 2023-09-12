import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";
import { resetDataLoginUsers } from "../../app/actions/apiUsersSlice";
import { MobileUsers } from "./MobileUsers";

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
                        <div className={`${styles["users-profile"]}`}>
                            <FaUserAlt />
                        </div>
                        <p>{dataLoginUsers?.email}</p>
                    </div>

                    <div className={`${styles["parent-users-menu"]}`}>
                        <ul>
                            <li>
                                <button
                                    type="button"
                                >
                                    Settings
                                </button>
                            </li>
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

            <MobileUsers />
        </>
    )
}
