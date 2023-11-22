import { useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { NavbarDashboard } from "./components/NavbarDashboard";

export const DashboardAdmin = () => {
    const { active } = useAppSelector(state => state.onOffSlice);

    return (
        <>
            <div >
                <NavbarDashboard />
                <div
                    className={`
                        ${styles["global-container-dashboard"]}
                        ${!active.navDashboard && styles["global-container-resize"]}
                    `}
                >
                    DashboardAdmin
                </div>
            </div>
        </>
    )
}
