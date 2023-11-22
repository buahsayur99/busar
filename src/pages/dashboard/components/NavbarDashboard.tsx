import { NavLink } from "react-router-dom";
import styles from "../../../style/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RxDashboard, MdProductionQuantityLimits, FaUserAlt, FaUsers, RiArrowLeftDoubleLine, FaHome, FiLogOut } from "../../../utils/icons";
import { activeReducer } from "../../../app/actions/onOffSlice";
import { useRef, useState } from "react";
import { useAuthUsers } from "../../../hook/useAuthUsers";
import { logoutUsers } from "../../../app/actions/apiUsersSlice";
import { useOutsideClick } from "../../../hook/useOutsideClick";

const dataButton = [
    { name: "dashboard", link: "/dashboard", icon: "RxDashboard" },
    { name: "product", link: "/dashboard/product", icon: "MdProductionQuantityLimits" },
    { name: "user", link: "/dashboard/user", icon: "FaUsers" },
]

const covertIcon = (icon: any) => {
    if (icon === "RxDashboard") return <RxDashboard />
    if (icon === "MdProductionQuantityLimits") return <MdProductionQuantityLimits />
    if (icon === "FaUsers") return <FaUsers />
}

export const NavbarDashboard = () => {
    // state
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [tooltip, setTooltip] = useState(null);
    // useAppSelector
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const { active } = useAppSelector(state => state.onOffSlice);
    // useAppDispatch
    const dispatch = useAppDispatch();

    const handleMouseMove = (event: any, name: any) => {
        const { screenX, clientY } = event.nativeEvent;
        setTooltipPosition({ top: clientY + 25, left: screenX + 10 });
        setTooltip(name)
        setTooltipVisible(true)
    }

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    }

    return (
        <>
            <div className={`
                    ${styles["container-navbar-dashboard"]}
                    ${!active.navDashboard && styles["nav-dashboard-off"]}
                    ${active.navDashboard && styles["shadow-maxsize-mobile"]}
                `}
            >
                {/* Button On Off Nav Dashboard */}
                <div className={styles["parent-btn-resize-nav"]}>
                    <button
                        type="button"
                        onClick={() => dispatch(activeReducer({ navDashboard: !active.navDashboard }))}
                    >
                        <RiArrowLeftDoubleLine
                            className={`${active.navDashboard ? styles["icon-left"] : styles["icon-right"]}`}
                        />
                    </button>
                </div>

                <div className={styles["nav-scroll"]}>
                    <NestedProfile active={active} dataLoginUsers={dataLoginUsers} />
                    <div className={`
                            ${styles["nav-dashboard"]}
                            ${!active.navDashboard && styles["nav-dashboard-off"]}
                        `}>
                        {dataButton.map((data, index) => (
                            <NavLink
                                key={index}
                                to={data.link}
                                className={
                                    ({ isActive }) => (isActive ? styles["btn-nav-dash-active"] : styles["btn-nav-dash"])
                                }
                                onMouseMove={(event) => handleMouseMove(event, data.name)}
                                onMouseLeave={handleMouseLeave}
                                end
                            >
                                <div className={styles["parent-icon-name-dash-nav"]}>
                                    <span
                                        className={`${styles["icon"]}`}
                                    >
                                        {covertIcon(data.icon)}
                                    </span>
                                    {active.navDashboard && <span>{data.name}</span>}
                                </div>
                            </NavLink>
                        ))}
                    </div >
                </div>

                {isTooltipVisible && !active.navDashboard && (
                    <div
                        className={styles["parent-tooltip"]}
                        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
                    >
                        <span>{tooltip}</span>
                    </div>
                )}
            </div >
        </>
    )
}

const NestedProfile = ({ active, dataLoginUsers }: any) => {
    const [activeDropdown, setActiveDropdown] = useState(false);
    // UseRef
    const buttonRef = useRef<HTMLDivElement>(null);
    // Custome Hook
    const { removeLocalStorage } = useAuthUsers();
    // UseAppDispatch
    const dispatch = useAppDispatch();

    const hanldeLogOut = () => {
        dispatch(logoutUsers());
        removeLocalStorage("uuid");
    }
    const handleCloseDropdown = () => {
        setActiveDropdown(false);
    }

    useOutsideClick({
        ref: buttonRef,
        faClose: handleCloseDropdown
    })

    return (
        <>
            <div>
                <div
                    role="button"
                    className={styles["profile-dashboard"]}
                    ref={buttonRef}
                    onClick={() => setActiveDropdown(!activeDropdown)}
                >
                    <span className={styles["icon-profile"]}>
                        <FaUserAlt />
                    </span>
                    {active.navDashboard && <h3>{dataLoginUsers?.email}</h3>}
                </div>

                {activeDropdown && (
                    <div className={styles["parent-dropdown-profile"]}>
                        <NavLink className={styles["button-dropdown"]} to={"/"}>
                            <span><FaHome /></span>
                            <p>home</p>
                        </NavLink>
                        <div className={styles["line"]}></div>
                        <button
                            className={styles["button-dropdown"]}
                            type="button"
                            onClick={() => hanldeLogOut()}
                        >
                            <span><FiLogOut /></span>
                            <p>log out</p>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
