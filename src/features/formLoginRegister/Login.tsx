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

    // Function Submit
    const onSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        // Parent Login
        <div className={`${styles["parent-login"]}`}>
            {/* Form Register */}
            <form onSubmit={onSubmit}>
                {/* Judul Form */}
                <h3 className={`${styles["judul-login"]}`}>Login</h3>
                {/* Input Login */}
                <div className={`${styles["parent-input-login"]}`}>
                    {/* Input Email */}
                    <InputsForm
                        valuePlaceholder={"input your email"}
                        styleIcon={{ fontSize: "1.3rem", cursor: "text" }}
                        typeInput={"text"}
                        changeInput={(input) => updateInput({ email: input })}
                        valueInput={input.email}
                        iconType={"FaUserAlt"}
                    />
                    {/* Input Password */}
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
                {/* Button Submit */}
                <Buttons styleScss="btn-login-form" stylesBtn={{ width: "100%" }}>
                    Login
                </Buttons>
            </form>
        </div>
    )
}
