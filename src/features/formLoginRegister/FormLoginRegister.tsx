import { useEffect, useState } from "react";
import styles from "../../style/index.module.scss";
import { Login } from "./Login";
import { Register } from "./Register";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { activeFormTransition, resetValidasi, resetTrasitionForm } from "../../app/actions/formLoginRegisterSlice";
import { resetIsMessage } from "../../app/actions/apiUsersSlice";
import { BannerForm } from "../../components/BannerForm";
import { IoIosCloseCircle } from "../../utils/icons";
import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";
import { ForgetPassword } from "./ForgetPassword";
import { useBodyScrollLock } from "../../hook/useBodyScrollLock";
import { AlertText } from "../../components/AlertText";

export const FormLoginRegister = () => {
    const { activeTransitionForm } = useAppSelector(state => state.formLoginRegisterSlice);
    const { isLoading, dataLoginUsers, isMessage } = useAppSelector(state => state.apiUsers);
    const { toggle } = useBodyScrollLock();
    const [onOffBgWhite, setOnOffBgWhite] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dataLoginUsers?.uuid !== undefined) {
            dispatch(resetTrasitionForm())
            dispatch(resetValidasi())
            dispatch(resetIsMessage())
            return
        }
    }, [dataLoginUsers?.uuid, dispatch])

    useEffect(() => {
        // if form ferget password kebuka onOffBgWhite === true
        if (activeTransitionForm.forgetPassword === true) return setOnOffBgWhite(true)
    }, [dispatch, activeTransitionForm.forgetPassword])

    return (
        <>
            {/* Loading */}
            {isLoading && <Loading />}

            <Alert
                classCss={"alert_register"}
                onClicks={() => {
                    dispatch(activeFormTransition({ formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true }))
                    dispatch(resetIsMessage())
                    dispatch(resetValidasi())
                }}
            >
                login now
            </Alert>

            {isMessage === "Terjadi kesalahan saat memproses permintaan." && (
                <AlertText
                    nameButton="Close"
                    onClicks={() => dispatch(resetIsMessage())}
                >
                    Maaf ada kendala pada server.
                </AlertText>
            )}

            <div
                data-testid="bg-black"
                className={`${styles["bg-black"]} ${activeTransitionForm.onOffForm ? styles["scale-in-center_bg-black"] : styles["scale-out-center_bg-black"]}`}
            >
                {activeTransitionForm.forgetPassword
                    ? (
                        <ForgetPassword />
                    )
                    : (
                        <div className={`
                                ${activeTransitionForm.onOffForm && onOffBgWhite === true ? styles["scale-in-center_bg-white"] : styles["scale-out-center_bg-white"]}
                            `}
                        >
                            {/* Dimensi +550 */}
                            <div className={`${styles["bg-white"]}`}>
                                <button
                                    data-testid="close-button"
                                    className={`${styles["btn-close-form"]}`}
                                    onClick={() => {
                                        toggle(false)
                                        dispatch(activeFormTransition({ onOffForm: false }))
                                        dispatch(resetValidasi())
                                    }}
                                >
                                    <IoIosCloseCircle />
                                </button>

                                <div className={`${styles["parent-form-login-register"]}`}>
                                    {/* Form Login */}
                                    <div style={{ overflow: "hidden", position: "relative" }}>
                                        {/* Banner Login */}
                                        <div
                                            data-testid="banner-form-component"
                                            className={`
                                                ${styles["parent_banner-form"]}
                                                ${activeTransitionForm.bannerLogin ? styles["banner-login-out-top"] : styles["banner-login-out-top-active"]}
                                            `}
                                        >
                                            <BannerForm
                                                judulText={"login"}
                                                spanText={"Account"}
                                                onClick={() => dispatch(activeFormTransition({ formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true }))}
                                                stylesCss={{ textAlign: "right" }}
                                                judulButton="Login"
                                            >
                                                jika anda sudah mendaftar atau sudah memiliki akun, anda bisa langsung login
                                            </BannerForm>
                                        </div>

                                        {/* Background Green */}
                                        <div
                                            className={
                                                `${styles["bg-green"]}
                                ${activeTransitionForm.formLogin ? styles["form-login-out-right"] : styles["form-login-out-right-active"]}`
                                            }
                                        >
                                            <div
                                                data-testid="login-component"
                                                className={`${activeTransitionForm.formLogin ? styles["form-login_out-bottom"] : styles["form-login_out-bottom-active"]}`}
                                            >
                                                {/* Component Login */}
                                                <Login toggleBackgroundWhite={() => setOnOffBgWhite(false)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Register */}
                                    <div style={{ overflow: "hidden", position: "relative" }}>
                                        {/* Banner Register */}
                                        <div
                                            data-testid="banner-form-component"
                                            className={
                                                `${styles["parent_banner-form"]}
                                ${activeTransitionForm.bannerRegiter ? styles["banner-register-out-top"] : styles["banner-register-out-top-active"]}`
                                            }
                                        >
                                            <BannerForm
                                                judulText={"create"}
                                                spanText={"account!"}
                                                onClick={() => dispatch(activeFormTransition({ formLogin: false, bannerLogin: true, formRegister: true, bannerRegiter: false }))}
                                                judulButton="Register"
                                            >
                                                Apakah anda masih belum memiliki akun? jika belum, anda bisa melakukan regiterasi, anda hanya perlu mengisi beberapa hall singkat saja.
                                            </BannerForm>
                                        </div>

                                        {/* Background Green */}
                                        <div
                                            className={
                                                `${styles["bg-green"]}
                            ${activeTransitionForm.formRegister ? styles["form-register-out-left"] : styles["form-register-out-left-active"]}`
                                            }
                                        >
                                            <div
                                                data-testid="register-component"
                                                className={
                                                    `${activeTransitionForm.formRegister ? styles["form-register_out-bottom"] : styles["form-register_out-bottom-active"]}`
                                                }
                                            >
                                                {/* Component Register */}
                                                <Register />
                                            </div>
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
                                            className={
                                                `${styles["bg-green"]}
                                                ${activeTransitionForm.formLogin ? styles["form-login-out-right"] : styles["form-login-out-right-active"]}`
                                            }
                                        >
                                            {/* Button Close */}
                                            <button
                                                type="button"
                                                data-testid="close-button"
                                                className={`${styles["btn-close-form"]}`}
                                                onClick={() => {
                                                    dispatch(activeFormTransition({ onOffForm: false }))
                                                    dispatch(resetValidasi())
                                                }}
                                            >
                                                <IoIosCloseCircle />
                                            </button>
                                            {/* Login */}
                                            <div
                                                data-testid="login-component-min-550"
                                                className={
                                                    `${activeTransitionForm.formLogin ? styles["form-login_out-bottom"] : styles["form-login_out-bottom-active"]}`
                                                }
                                            >
                                                {/* Component Login */}
                                                <Login toggleBackgroundWhite={() => setOnOffBgWhite(false)} />
                                            </div>
                                        </div>
                                    )
                                    : (
                                        // Parent Register
                                        <div
                                            className={
                                                `${styles["bg-green"]}
                                                ${activeTransitionForm.formRegister ? styles["form-register-out-left"] : styles["form-register-out-left-active"]}`
                                            }
                                        >
                                            {/* Button Close */}
                                            <button
                                                type="button"
                                                data-testid="close-button"
                                                className={`${styles["btn-close-form"]}`}
                                                onClick={() => {
                                                    dispatch(activeFormTransition({ onOffForm: false }))
                                                    dispatch(resetValidasi())
                                                }}
                                            >
                                                <IoIosCloseCircle />
                                            </button>

                                            {/* Register */}
                                            <div
                                                data-testid="register-component"
                                                className={
                                                    `${activeTransitionForm.formRegister ? styles["form-register_out-bottom"] : styles["form-register_out-bottom-active"]}`
                                                }
                                            >
                                                {/* Component Register */}
                                                <Register />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}
            </div >
        </>
    )
}
