import { NavbarDashboard } from "./components/NavbarDashboard";
import styles from "../../style/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { DataUsersAllProps, getUsersAll } from "../../app/actions/apiUsersSlice";

type UsersAdminProps = {
    dataUsersAll: DataUsersAllProps[];
}

export const UsersAdmin = () => {
    // useAppSelector
    const { active } = useAppSelector(state => state.onOffSlice);
    const { dataUsersAll } = useAppSelector(state => state.apiUsers);
    // useAppDispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/users`
        dispatch(getUsersAll({ link }))
    }, [dispatch])

    return (
        <>
            <div className={styles["global-container-dashboard"]}>
                <NavbarDashboard />
                {/* Dimensi Tablet And PC */}
                <div
                    className={`
                        ${styles["global-parent-dashboard"]}
                        ${active.navDashboard ? styles["global-margin-max-size"] : styles["global-margin-min-size"]}
                        ${styles["hidden-mobile"]}
                    `}
                >
                    <UsersTable dataUsersAll={dataUsersAll} />
                </div>

                {/* Dimensi Mobile */}
                <div
                    className={`
                        ${styles["global-parent-dashboard"]}
                        ${styles["global-margin-min-size"]}
                        ${styles["hidden-tablet-pc"]}
                    `}
                >
                    <UsersTable dataUsersAll={dataUsersAll} />
                </div>
            </div>
        </>
    )
}

const UsersTable = ({ dataUsersAll }: UsersAdminProps) => {
    return (
        <>
            <div className={styles["padding-table"]}>
                {/* Table Product */}
                <div className={styles["parent-product-admin"]}>
                    <div className={styles["parent-button-judul-product"]}>
                        <h3>daftar user</h3>
                    </div>
                    <div className={styles["line"]}></div>
                </div>
            </div>
        </>
    )
}
