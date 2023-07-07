import styles from "../../style/index.module.scss";
import { Buttons } from "../../components/Buttons";
import { InputsForm } from "../../components/InputsForm";
import { useState } from "react";

export const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" })

    const updateInput = (value: any) => {
        setInput(prev => {
            return { ...prev, ...value }
        })
    }

    return (
        // Parent Login
        <div className={`${styles["parent-login"]}`}>
            {/* Input Login */}
            <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
                <InputsForm
                    valuePlaceholder={"input your email"}
                    styleIcon={{ fontSize: "1.3rem" }}
                    typeInput={"text"}
                    changeInput={(input) => updateInput({ email: input })}
                    valueInput={input.email}
                    iconType={"FaUserAlt"}
                />
                <InputsForm
                    valuePlaceholder={"input your password"}
                    styleIcon={{ fontSize: "1.4rem" }}
                    typeInput={"password"}
                    changeInput={(input) => updateInput({ password: input })}
                    valueInput={input.password}
                    iconType={"PiLockKeyFill"}
                />
            </div>
            {/* Button fotget to the password */}
            <div className={`${styles["parent-btn-forget-password"]}`}>
                <button
                    className={`${styles["btn-forget-password"]}`}
                >
                    Forget Password?
                </button>
            </div>

            <Buttons styleScss="btn-login-form" stylesBtn={{ width: "100%" }}>
                Login
            </Buttons>
        </div>
    )
}
