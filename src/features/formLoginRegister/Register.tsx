import styles from "../../style/index.module.scss";
import { InputsForm } from "../../components/InputsForm";
import { Buttons } from "../../components/Buttons";
import { activeFormTransition, updateInputValue, updateValidasi, resetValidasi } from "../../app/actions/formLoginRegisterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postToApi, resetIsMessage } from "../../app/actions/apiUsersSlice";
import { InputProps } from "./Login";
import { useEffect } from "react";

export const Register = () => {
    const { isMessage } = useAppSelector(state => state.apiUsers);
    const { inputValueForm, validasiInput } = useAppSelector(state => state.formLoginRegisterSlice);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isMessage === "email yang anda gunakan sudah terdaftar") {
            dispatch(updateValidasi({ email: { status: true, text: isMessage } }));
            return;
        }
        if (isMessage === "password dan confirmasi password tidak sama") {
            dispatch(updateValidasi({ password: { status: true, text: isMessage } }));
            dispatch(updateValidasi({ confirmasiPassword: { status: true, text: isMessage } }));
            return;
        }
        if (isMessage === "Validation error: Validation isEmail on email failed") {
            dispatch(updateValidasi({ email: { status: true, text: "format email anda salah" } }));
            return;
        }

    }, [isMessage, dispatch]);

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

        if (inputValueForm.confirmasiPassword === "") {
            dispatch(updateValidasi({ confirmasiPassword: { status: true, text: "confirmasi password tidak boleh kosong" } }))
        } else {
            dispatch(updateValidasi({ confirmasiPassword: { status: false, text: "" } }))
        }

        const data = { ...eventInput, role: "user", idAddress: null }
        // const link = "https://rich-tan-llama-wear.cyclic.app/users"
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/users`
        if (inputValueForm.email !== "" && inputValueForm.password !== "" && inputValueForm.confirmasiPassword !== "") return dispatch(postToApi({ data, link }));
    }

    // Function Submit
    const onSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleInputChange(inputValueForm);
    }

    return (
        <>
            {/* Register */}
            <div className={`${styles["parent-login"]}`}>
                {/* Form Register */}
                <form onSubmit={onSubmit}>
                    {/* Judul Form */}
                    <h3 className={`${styles["judul-login"]}`}>Register</h3>
                    {/* Parent Input Register */}
                    <div className={`${styles["parent-input-login"]}`}>
                        {/* Input Email */}
                        <InputsForm
                            cssPlaceholder="text-placeholder"
                            cssInput="input-form"
                            cssIcon="parent-icon"
                            cssValidasi="validasi-danger"

                            typeInput="text"
                            changeInput={(input) => dispatch(updateInputValue({ email: input }))}
                            valueInput={inputValueForm.email}
                            iconType={"FaUserAlt"}
                            styleIcon={{ fontSize: "1.3rem", cursor: "text" }}
                            valuePlaceholder="input your email"
                            validasiInput={validasiInput.email}
                        />
                        {/* Input Password */}
                        <InputsForm
                            cssPlaceholder="text-placeholder"
                            cssInput="input-form"
                            cssIcon="parent-icon"
                            cssValidasi="validasi-danger"

                            typeInput={"password"}
                            changeInput={(input) => dispatch(updateInputValue({ password: input }))}
                            valueInput={inputValueForm.password}
                            iconType={"PiLockKeyFill"}
                            styleIcon={{ fontSize: "1.4rem" }}
                            valuePlaceholder="input your password"
                            validasiInput={validasiInput.password}
                        />
                        {/* Input Confirmasi Password */}
                        <InputsForm
                            cssPlaceholder="text-placeholder"
                            cssInput="input-form"
                            cssIcon="parent-icon"
                            cssValidasi="validasi-danger"

                            typeInput={"password"}
                            changeInput={(input) => dispatch(updateInputValue({ confirmasiPassword: input }))}
                            valueInput={inputValueForm.confirmasiPassword}
                            iconType={"PiLockKeyFill"}
                            styleIcon={{ fontSize: "1.4rem" }}
                            valuePlaceholder="input your confirmasi password"
                            validasiInput={validasiInput.confirmasiPassword}
                        />
                    </div>


                    <div className={styles["parent_btn"]} style={{ marginTop: "2rem" }}>
                        {/* Button Submit */}
                        <button
                            type="submit"
                            className={`${styles["btn-login-form"]}`}
                            style={{ width: "100%" }}
                        >
                            submit
                        </button>

                        {/* Button Form Login to windows min-550px */}
                        <Buttons
                            onClicks={() => {
                                dispatch(activeFormTransition({ formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true }))
                                dispatch(resetIsMessage())
                                dispatch(resetValidasi())
                            }}
                            styleScss="btn-login-form-register"
                            stylesBtn={{ width: "100%" }}
                        >
                            Login
                        </Buttons>
                    </div>
                </form>
            </div>
        </>
    )
}
