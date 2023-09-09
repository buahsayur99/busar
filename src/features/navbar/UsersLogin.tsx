import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";

export const UsersLogin = () => {
    return (
        <>
            <div>
                <span className={`${styles["parent-icon-users"]}`}>
                    <FaUserAlt />
                </span>
            </div>
        </>
    )
}
