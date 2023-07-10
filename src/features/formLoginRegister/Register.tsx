import styles from "../../style/index.module.scss";
import { InputsForm } from "../../components/InputsForm";
import { useState } from "react";
import { Buttons } from "../../components/Buttons";

export const Register = () => {
    const [input, setInput] = useState({ email: "", password: "", confirmasiPassword: "" });

    // Function Update State Input
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
        <>
            <div className={`${styles["parent-login"]}`}>
                {/* Form Register */}
                <form onSubmit={onSubmit}>
                    {/* Judul Form */}
                    <h3 className={`${styles["judul-login"]}`}>Register</h3>
                    {/* Parent Input Register */}
                    <div className={`${styles["parent-input-login"]}`}>
                        {/* Input Email */}
                        <InputsForm
                            typeInput="text"
                            changeInput={(input) => updateInput({ email: input })}
                            valueInput={input.email}
                            iconType={"FaUserAlt"}
                            styleIcon={{ fontSize: "1.3rem", cursor: "text" }}
                            valuePlaceholder="input your email"
                        />
                        {/* Input Password */}
                        <InputsForm
                            typeInput={"password"}
                            changeInput={(input) => updateInput({ password: input })}
                            valueInput={input.password}
                            iconType={"PiLockKeyFill"}
                            styleIcon={{ fontSize: "1.4rem" }}
                            valuePlaceholder="input your password"
                        />
                        {/* Input Confirmasi Password */}
                        <InputsForm
                            typeInput={"password"}
                            changeInput={(input) => updateInput({ confirmasiPassword: input })}
                            valueInput={input.confirmasiPassword}
                            iconType={"PiLockKeyFill"}
                            styleIcon={{ fontSize: "1.4rem" }}
                            valuePlaceholder="input your confirmasi password"
                        />
                    </div>
                    {/* Button submit */}
                    <Buttons styleScss="btn-login-form" stylesBtn={{ width: "100%", marginTop: "3rem" }}>
                        Register
                    </Buttons>
                </form>
            </div>
        </>
    )
}
