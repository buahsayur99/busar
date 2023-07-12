import styles from "../../style/index.module.scss";
import { Login } from "./Login";
import { Register } from "./Register";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { activeFormTransition } from "../../app/actions/formLoginRegisterSlice";
import { BannerForm } from "../../components/BannerForm";
import { IoIosCloseCircle } from "../../utils/icons";

export const FormLoginRegister = () => {
    const { activeTransitionForm } = useAppSelector(state => state.formLoginRegisterSlice);
    const dispatch = useAppDispatch();

    console.log(activeTransitionForm);

    return (
        <div className={`${styles["bg-black"]} ${activeTransitionForm.onOffForm ? styles["scale-in-center_bg-black"] : styles["scale-out-center_bg-black"]}`} >
            <div className={`${activeTransitionForm.onOffForm ? styles["scale-in-center_bg-white"] : styles["scale-out-center_bg-white"]}`}>
                {/* Dimensi +550 */}
                <div className={`${styles["bg-white"]}`}>
                    <button
                        className={`${styles["btn-close-form"]}`}
                        onClick={() => dispatch(activeFormTransition({ onOffForm: false }))}
                    >
                        <IoIosCloseCircle />
                    </button>

                    {/* Form Login */}
                    <div style={{ overflow: "hidden", position: "relative" }}>
                        {/* Banner Regiter */}
                        <div className={
                            `${styles["parent_banner-form"]}
                        ${activeTransitionForm.bannerLogin ? styles["banner-login-out-top"] : styles["banner-login-out-top-active"]}`}
                        >
                            <BannerForm
                                judulText={"login"}
                                spanText={"Account"}
                                onClick={() => dispatch(activeFormTransition({ formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true }))}
                                stylesCss={{ textAlign: "right" }}
                            >
                                jika anda sudah mendaftar atau sudah memiliki akun, anda bisa langsung login
                            </BannerForm>
                        </div>

                        {/* Background Green */}
                        <div
                            style={{ borderRadius: "2rem 0 0 2rem" }}
                            className={
                                `${styles["bg-green"]}
                            ${activeTransitionForm.formLogin ? styles["form-login-out-right"] : styles["form-login-out-right-active"]}`
                            }
                        >
                            <div
                                className={`${activeTransitionForm.formLogin ? styles["form-login_out-bottom"] : styles["form-login_out-bottom-active"]}`}
                            >
                                {/* Component Login */}
                                <Login />
                            </div>
                        </div>
                    </div>

                    {/* Form Register */}
                    <div style={{ overflow: "hidden", position: "relative" }}>
                        {/* Banner Regiter */}
                        <div className={
                            `${styles["parent_banner-form"]}
                        ${activeTransitionForm.bannerRegiter ? styles["banner-register-out-top"] : styles["banner-register-out-top-active"]}`}
                        >
                            <BannerForm
                                judulText={"create"}
                                spanText={"account!"}
                                onClick={() => dispatch(activeFormTransition({ formLogin: false, bannerLogin: true, formRegister: true, bannerRegiter: false }))}
                            >
                                Apakah anda masih belum memiliki akun? jika belum, anda bisa melakukan regiterasi, anda hanya perlu mengisi beberapa hall singkat saja.
                            </BannerForm>
                        </div>

                        {/* Background Green */}
                        <div
                            style={{ borderRadius: "0 2rem 2rem 0" }}
                            className={
                                `${styles["bg-green"]}
                            ${activeTransitionForm.formRegister ? styles["form-register-out-left"] : styles["form-register-out-left-active"]}`
                            }
                        >
                            <div className={`${activeTransitionForm.formRegister ? styles["form-register_out-bottom"] : styles["form-register_out-bottom-active"]}`}>
                                {/* Component Register */}
                                <Register />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dimensi -550 */}
                <div className={`${styles["bg-white-mobile"]}`}>
                    {/* if activeTransitionForm.formLogin equals true run Login, */}
                    {activeTransitionForm.formLogin
                        ? (
                            // Parent Login
                            <div
                                style={{ borderRadius: "2rem 0 0 2rem" }}
                                className={
                                    `${styles["bg-green"]}
                            ${activeTransitionForm.formLogin ? styles["form-login-out-right"] : styles["form-login-out-right-active"]}`
                                }
                            >
                                {/* Button Close */}
                                <button
                                    className={`${styles["btn-close-form"]}`}
                                    onClick={() => dispatch(activeFormTransition({ onOffForm: false }))}
                                >
                                    <IoIosCloseCircle />
                                </button>
                                {/* Login */}
                                <div
                                    className={`${activeTransitionForm.formLogin ? styles["form-login_out-bottom"] : styles["form-login_out-bottom-active"]}`}
                                >
                                    {/* Component Login */}
                                    <Login />
                                </div>
                            </div>
                        )
                        : (
                            // Parent Register
                            <div
                                style={{ borderRadius: "0 2rem 2rem 0" }}
                                className={
                                    `${styles["bg-green"]}
                                ${activeTransitionForm.formRegister ? styles["form-register-out-left"] : styles["form-register-out-left-active"]}`
                                }
                            >
                                {/* Button Close */}
                                <button
                                    className={`${styles["btn-close-form"]}`}
                                    onClick={() => dispatch(activeFormTransition({ onOffForm: false }))}
                                >
                                    <IoIosCloseCircle />
                                </button>

                                {/* Register */}
                                <div className={`${activeTransitionForm.formRegister ? styles["form-register_out-bottom"] : styles["form-register_out-bottom-active"]}`}>
                                    {/* Component Register */}
                                    <Register />
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div >
    )
}
