import styles from "../../style/index.module.scss";
import { Buttons } from "../../components/Buttons";
import { InputsForm } from "../../components/InputsForm";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { activeFormTransition, updateValidasi, updateInputValue, resetValidasi } from "../../app/actions/formLoginRegisterSlice";
import { postToApi, resetIsMessage } from "../../app/actions/apiUsersSlice";
import { apiUrl } from "../../utils/variable";

export type InputProps = {
    email?: string;
    password?: string;
    confirmasiPassword?: string;
}

type LoginProps = {
    toggleBackgroundWhite?: () => void
}

export const Login: React.FC<LoginProps> = ({ toggleBackgroundWhite }) => {
    const { isMessage } = useAppSelector(state => state.apiUsers);
    const { validasiInput, inputValueForm } = useAppSelector(state => state.formLoginRegisterSlice);
    const dispatch = useAppDispatch()

    const handleInputChange = (eventInput: InputProps) => {
        if (inputValueForm.email === "") {
            dispatch(updateValidasi({ email: { status: true, text: "email tidak boleh kosong" } }))
        } else {
            dispatch(updateValidasi({ email: { status: false, text: "" } }))
        }

        if (inputValueForm.password === "") {
            dispatch(updateValidasi({ password: { status: true, text: "password tidak boleh kosong" } }))
        } else {
            dispatch(updateValidasi({ password: { status: false, text: "" } }))
        }

        const data = eventInput
        const link = `${apiUrl}/login`
        if (inputValueForm.email !== "" && inputValueForm.password !== "") return dispatch(postToApi({ data, link }));
    }

    // Function Submit
    const onSubmit = (event: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        event.preventDefault();
        handleInputChange(inputValueForm)
    }

    useEffect(() => {
        if (isMessage === "email yang anda masukan tidak terdafatar") {
            dispatch(updateValidasi({ email: { status: true, text: isMessage } }));
            return;
        }
        if (isMessage === "password yang anda masukan salah") {
            dispatch(updateValidasi({ password: { status: true, text: isMessage } }));
            return;
        }
    }, [isMessage, dispatch]);

    const btnRegister = useCallback(() => {
        dispatch(activeFormTransition({ formLogin: false, bannerLogin: true, formRegister: true, bannerRegiter: false }));
        dispatch(resetValidasi());
        dispatch(resetIsMessage());
    }, [dispatch])

    const fcForgetPass = () => {
        toggleBackgroundWhite?.();
        dispatch(resetValidasi());
        setTimeout(() => {
            dispatch(dispatch(activeFormTransition({ forgetPassword: true })))
        }, 600);
    }

    return (
        <>
            {/* Parent Login */}
            <div className={`${styles["parent-login"]}`}>
                {/* Form Register */}
                <form data-testid="loginForm" onSubmit={onSubmit}>
                    {/* Judul Form */}
                    <h3 className={`${styles["judul-login"]}`}>Login</h3>
                    {/* Input Login */}
                    <div className={`${styles["parent-input-login"]}`}>
                        {/* Input Email */}
                        <InputsForm
                            cssPlaceholder="text-placeholder"
                            cssInput="input-form"
                            cssIcon="parent-icon"
                            cssValidasi="validasi-danger"
                            valuePlaceholder={"input your email"}
                            styleIcon={{ fontSize: "1.3rem", cursor: "text" }}
                            typeInput={"text"}
                            changeInput={(input) => dispatch(updateInputValue({ email: input }))}
                            valueInput={inputValueForm.email}
                            iconType={"FaUserAlt"}
                            validasiInput={validasiInput.email}
                        />
                        {/* Input Password */}
                        <InputsForm
                            cssPlaceholder="text-placeholder"
                            cssInput="input-form"
                            cssIcon="parent-icon"
                            cssValidasi="validasi-danger"
                            valuePlaceholder={"input your password"}
                            styleIcon={{ fontSize: "1.4rem" }}
                            typeInput={"password"}
                            changeInput={(input) => dispatch(updateInputValue({ password: input }))}
                            valueInput={inputValueForm.password}
                            iconType={"PiLockKeyFill"}
                            validasiInput={validasiInput.password}
                        />
                    </div>
                    {/* Button fotget to the password */}
                    <div className={`${styles["parent-btn-forget-password"]}`}>
                        <button
                            type="button"
                            className={`${styles["btn-forget-password"]}`}
                            onClick={() => fcForgetPass()}
                        >
                            Forget Password?
                        </button>
                    </div>

                    <div className={styles["parent_btn"]}>
                        {/* Button Submit */}
                        <button
                            type="submit"
                            className={`${styles["btn-login-form"]}`}
                            style={{ width: "100%" }}
                        >
                            Login
                        </button>

                        {/* Button Submit */}
                        <Buttons
                            onClicks={() => btnRegister()}
                            styleScss="btn-login-form-register"
                            stylesBtn={{ width: "100%" }}
                        >
                            register
                        </Buttons>
                    </div>
                </form>
            </div>
        </>
    )
}