import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "../../style/index.module.scss";
import { IoIosCloseCircle, RiLockPasswordFill } from "../../utils/icons";
import { InputsForm } from "../../components/InputsForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { activeFormTransition, resetValidasi, updateInputValue, updateValidasi } from "../../app/actions/formLoginRegisterSlice";
import { getUsersByEmail, resetIsMessage, resetUuid, updateUsersById } from "../../app/actions/apiUsersSlice";
import { InputProps } from "./Login";
import { AlertText } from "../../components/AlertText";
import { AlertConfirmasi } from "../../components/AlertConfirmasi";

type ActiveAlertTextProps = {
    success: {
        status: boolean;
        text: null | string;
    };
    cansel: {
        status: boolean;
        text: null | string;
    };
}

export const ForgetPassword = () => {
    const [active, setActive] = useState(false);
    const [alertActive, setAlertActive] = useState(false);
    const [activeAlertText, setActiveAlertText] = useState<ActiveAlertTextProps>({
        success: { status: false, text: null },
        cansel: { status: false, text: null }
    })
    const { inputValueForm, validasiInput, activeTransitionForm } = useAppSelector(state => state.formLoginRegisterSlice);
    const { isMessage, isUuid } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();

    const handleInputEmail = (input: InputProps) => {
        if (input.email === "") return dispatch(updateValidasi({ email: { status: true, text: "Email tidak boleh kosong" } }));

        // reset all the validation and server responses messages
        dispatch(resetValidasi());
        dispatch(resetIsMessage());

        const link = `${process.env.REACT_APP_API_URL_LOCAL}/users/${input.email}`
        return dispatch(getUsersByEmail({ link }));
    };

    const onSubmitEmail = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleInputEmail(inputValueForm);
    };

    const updateAlertText = (prev: any) => {
        setActiveAlertText(state => ({ ...state, ...prev }))
    }

    const handleServerResponse = useCallback(() => {
        // display danger validation when the users entered an incorrect email
        if (isMessage === "Email tidak ditemukan") {
            dispatch(updateValidasi({ email: { status: true, text: isMessage } }));
        };
        // display danger validation when the users entered password and confirmasi password not the same
        if (isMessage === "password dan confirmasi password tidak sama") {
            dispatch(updateValidasi({ password: { status: true, text: isMessage }, confirmasiPassword: { status: true, text: isMessage } }));
        };

        // displaying Alert Text when the server off
        if (isMessage === "Terjadi kesalahan saat memproses permintaan.") {
            updateAlertText({ cansel: { status: true, text: isMessage } });
        };
        // displaying Alert Text when change passowrd
        if (isMessage === "update user success") {
            updateAlertText({ success: { status: true, text: isMessage } });
        };
    }, [isMessage, dispatch]);

    useEffect(() => {
        handleServerResponse();

        if (activeTransitionForm.forgetPassword === true) setActive(true);
    }, [isMessage, isUuid, dispatch, activeTransitionForm.forgetPassword, handleServerResponse]);

    const handleResetPassword = (input: InputProps) => {
        if (input.password === "") {
            dispatch(updateValidasi({ password: { status: true, text: "password tidak boleh kosong" } }));
        };
        if (input.confirmasiPassword === "") {
            dispatch(updateValidasi({ confirmasiPassword: { status: true, text: "confirmasi password tidak boleh kosong" } }));
            return
        };

        const link = `${process.env.REACT_APP_API_URL_LOCAL}/users/${isUuid}`;
        const data = inputValueForm
        return dispatch(updateUsersById({ data, link }));
    };

    const onSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleResetPassword(inputValueForm);
    };

    const handleFormClose = () => {
        setAlertActive(false)
        setActive(false);

        setTimeout(() => {
            dispatch(resetUuid());
            dispatch(resetValidasi());
            dispatch(resetIsMessage());
            dispatch(activeFormTransition({ forgetPassword: false }));
        }, 600);
    };

    const closeAlert = () => {
        updateAlertText({
            success: { status: false, text: null },
            cansel: { status: false, text: null }
        });
        dispatch(resetIsMessage());
    }

    return (
        <>
            {activeAlertText.success.status && (
                <AlertText
                    onClicks={() => {
                        closeAlert();
                        handleFormClose();
                    }}
                    nameButton="Go to login page"
                    children="Perubahan password berhasil"
                />
            )}

            {activeAlertText.cansel.status && (
                <AlertText
                    onClicks={() => closeAlert()}
                    nameButton="Close"
                    children={activeAlertText.cansel.text}
                />
            )};

            {/* Alert  */}
            {alertActive && (
                <AlertConfirmasi
                    okText="Ok"
                    canselText="Cansel"
                    onOkClick={() => handleFormClose()}
                    onCanselClick={() => setAlertActive(false)}
                >
                    Apakah anda ingin membatalkan perubahan password
                </AlertConfirmasi>
            )};

            <div className={`
                ${styles["parent-form-forget-pass"]}
                ${active ? styles["scale-in-center"] : styles["scale-out-center"]}
            `}
            >
                <div className={styles["bg-green-forget-pass"]}>
                    <button
                        className={`${styles["icon-close"]}`}
                        onClick={() => setAlertActive(true)}
                    >
                        <IoIosCloseCircle />
                    </button>
                    <span className={`${styles["icon_forget-password"]}`}><RiLockPasswordFill /></span>
                    <h1>forget password</h1>
                    {isUuid
                        ? (
                            <p>Silakan masukan password anda yang baru</p>
                        )
                        : (
                            <p>Gunakan email untuk riset password anda</p>
                        )
                    }

                </div>
                <div className={styles["bg-white-forget-pass"]}>
                    {isUuid
                        ? (
                            <form
                                onSubmit={onSubmitPassword}
                                className={`${styles["form-pass"]} ${styles["gap-password"]}`}
                            >
                                <InputsForm
                                    cssInput="input-forget-pass"
                                    cssPlaceholder="placeholder-forget-pass"
                                    cssIcon="parent-icon-forget-pass"
                                    cssValidasi="validasi-danger-forget-pass"
                                    typeInput="password"
                                    valueInput={inputValueForm.password}
                                    valuePlaceholder="input your password"
                                    validasiInput={validasiInput.password}
                                    iconType={"PiLockKeyFill"}
                                    changeInput={(input) => dispatch(updateInputValue({ password: input }))}
                                />
                                <InputsForm
                                    cssInput="input-forget-pass"
                                    cssPlaceholder="placeholder-forget-pass"
                                    cssIcon="parent-icon-forget-pass"
                                    cssValidasi="validasi-danger-forget-pass-overfont"
                                    typeInput="password"
                                    valueInput={inputValueForm.confirmasiPassword}
                                    valuePlaceholder="input your confirmasi password"
                                    validasiInput={validasiInput.confirmasiPassword}
                                    iconType={"PiLockKeyFill"}
                                    changeInput={(input) => dispatch(updateInputValue({ confirmasiPassword: input }))}
                                />
                                <button
                                    type="submit"
                                    className={`${styles["button-reset-pass"]}`}
                                >
                                    Reset password
                                </button>
                            </form>
                        )
                        : (
                            <form
                                onSubmit={onSubmitEmail}
                                style={{ display: "grid", gap: "2rem" }}
                                className={`${styles["form-pass"]}`}
                            >
                                <InputsForm
                                    cssInput="input-forget-pass"
                                    cssPlaceholder="placeholder-forget-pass"
                                    cssIcon="parent-icon-forget-pass"
                                    cssValidasi="validasi-danger-forget-pass"
                                    typeInput="text"
                                    valueInput={inputValueForm.email}
                                    valuePlaceholder="input your email"
                                    validasiInput={validasiInput.email}
                                    iconType={"FaUserAlt"}
                                    changeInput={(input) => dispatch(updateInputValue({ email: input }))}
                                />
                                <button
                                    type="submit"
                                    className={`${styles["button-reset-pass"]}`}
                                >
                                    submit
                                </button>
                            </form>
                        )
                    }
                </div>
            </div >
        </>
    )
}
