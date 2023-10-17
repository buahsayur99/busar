import { useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { FaUserAlt } from "../../utils/icons";
import { NavLink } from "react-router-dom";
import { useSaveLastPage } from "../../hook/useSaveLastPage";
import { covertInfoHalamanToNameButton } from "../../utils/convert";

export const ProfileEmailAndLink = () => {
    // useAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    // Custome Hook
    const { infoHalaman } = useSaveLastPage();

    const convertNameToInfo = () => {
        let link = covertInfoHalamanToNameButton(infoHalaman?.page_path)

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
                        <h3 className={`${styles["url-link"]}`}>
                            {covertInfoHalamanToNameButton(infoHalaman?.page_path)}
                        </h3>
                    </div>
                    <p>
                        {convertNameToInfo()}
                    </p>
                </div>
            </div>
        </>
    )
}
