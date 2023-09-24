import React, { useState } from "react";
import styles from "../../style/index.module.scss";
import { MenuPengaturanProfile } from "../../features/pengaturanProfile/MenuPengaturanProfile";
import { ProfileEmailAndLink } from "../../features/pengaturanProfile/ProfileEmailAndLink";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { FormAddress } from "../../features/pengaturanProfile/FormAddress";

export const Address = () => {
    const [active, setActive] = useState({ formAddress: false });

    const changeActive = (event: any) => {
        setActive(prev => {
            return { ...prev, ...event }
        })
    }
    return (
        <>
            {/* Navbar */}
            < NavigationBar />

            <FormAddress />

            <div className={`${styles["global-container"]}`}>
                <div className={`${styles["global-parent-pengaturan-profile"]}`}>
                    <ProfileEmailAndLink />
                    <div className={`${styles["global-flex"]}`}>
                        {/* NavLink menu users profile */}
                        <MenuPengaturanProfile />

                        {/* Form update email */}
                        <div className="w-100">

                            {/* Button */}
                            <div className={`${styles["parent-button"]}`}>
                                <button onClick={() => changeActive({ formAddress: true })}>
                                    Add Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
