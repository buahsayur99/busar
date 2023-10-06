import { FormEvent, useState, useEffect, useCallback } from "react"
import { NavigationBar } from "../../features/navbar/NavigationBar";
import styles from "../../style/index.module.scss";
import { MenuPengaturanProfile } from "../../features/pengaturanProfile/MenuPengaturanProfile";
import { ProfileEmailAndLink } from "../../features/pengaturanProfile/ProfileEmailAndLink";
import { InputsForm } from "../../components/InputsForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetIsMessage, updateUsersById } from "../../app/actions/apiUsersSlice";
import { matchPass, rejectedUpdatePassword, updateSuccess } from "../../utils/responseApi";
import { AlertText } from "../../components/AlertText";

type inputProps = {
    password: string;
    confirmasiPassword: string;
}

type validasiProps = {
    password: { status: boolean, text: string };
    confirmasiPassword: { status: boolean, text: string };
}

export const Password = () => {
    // State
    const [input, setInput] = useState<inputProps>({ password: "", confirmasiPassword: "" });
    const [validasiInput, setValidasiInput] = useState<validasiProps>({ password: { status: false, text: "" }, confirmasiPassword: { status: false, text: "" } });
    const [active, setActive] = useState({ success: { status: false, text: "" } })
    // useAppSelector
    const { dataLoginUsers, isMessage } = useAppSelector(state => state.apiUsers);
    // useAppDispatch
    const dispatch = useAppDispatch();


    const resetInputToDefault = () => {
        setInput({ password: "", confirmasiPassword: "" });
    };

    const resetValidasiToDefault = () => {
        setValidasiInput({ password: { status: false, text: "" }, confirmasiPassword: { status: false, text: "" } });
    };

    const resetAlertToDefault = () => {
        setActive({ success: { status: false, text: "" } });
        dispatch(resetIsMessage());
    }

    const changeInputValue = (event: any) => {
        setInput(prev => {
            return { ...prev, ...event }
        })
    }

    const changeValidasiInput = (event: any) => {
        setValidasiInput(prev => {
            return { ...prev, ...event }
        })
    }

    const changeActiveAlert = (event: any) => {
        setActive(prev => {
            return { ...prev, ...event }
        });
    }

    const submitPasswordToApi = () => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/users/${dataLoginUsers?.uuid}`;
        const data = input

        dispatch(updateUsersById({ data, link }));
    }

    const updateValidasiByInput = () => {
        // Reset Validasi
        resetValidasiToDefault();
        // Check Input
        if (input.password === "") changeValidasiInput({ password: { status: true, text: "Input password tidak boleh kosong" } });
        if (input.confirmasiPassword === "") changeValidasiInput({ confirmasiPassword: { status: true, text: "Input confirmasi password tidak boleh kosong" } });
        if (input.password !== "" && input.confirmasiPassword !== "") return submitPasswordToApi();
    }

    const updateValidasiByIsMessage = useCallback(() => {
        if (isMessage === matchPass.toLowerCase()) return setValidasiInput({ password: { status: true, text: matchPass }, confirmasiPassword: { status: true, text: matchPass } });
        if (isMessage === rejectedUpdatePassword.toLowerCase()) return setValidasiInput({ password: { status: true, text: rejectedUpdatePassword }, confirmasiPassword: { status: true, text: rejectedUpdatePassword } });
        if (isMessage === updateSuccess.toLowerCase()) {
            resetInputToDefault();
            return changeActiveAlert({ success: { status: true, text: "Perubahan password berhasil" } })
        }
    }, [isMessage])

    const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateValidasiByInput();
    }

    useEffect(() => {
        updateValidasiByIsMessage()
    }, [updateValidasiByIsMessage])

    return (
        <>
            {/* Navbar */}
            <NavigationBar />

            {active.success.status && (
                <AlertText
                    nameButton="Close"
                    onClicks={() => resetAlertToDefault()}
                >
                    {active.success.text}
                </AlertText>
            )}

            <div className={`${styles["global-container"]}`}>
                <div className={`${styles["global-parent-pengaturan-profile"]}`}>
                    <ProfileEmailAndLink />
                    <div className={`${styles["global-flex"]}`}>
                        {/* NavLink menu users profile */}
                        <MenuPengaturanProfile />
                        <form
                            onSubmit={onSubmitForm}
                            className="w-100"
                        >
                            <div
                                className={`${styles["parent-form-profile"]}`}
                            >
                                <InputsForm
                                    cssInput="input-form"
                                    cssPlaceholder="input-placeholder"
                                    cssIcon="input-icon"
                                    cssValidasi="validasi"
                                    typeInput="password"
                                    changeInput={(input) => changeInputValue({ password: input })}
                                    valueInput={input.password}
                                    valuePlaceholder={"Password"}
                                    iconType="PiLockKeyFill"
                                    validasiInput={validasiInput.password}
                                />
                                <InputsForm
                                    cssInput="input-form"
                                    cssPlaceholder="input-placeholder"
                                    cssIcon="input-icon"
                                    cssValidasi="validasi"
                                    typeInput="password"
                                    changeInput={(input) => changeInputValue({ confirmasiPassword: input })}
                                    valueInput={input.confirmasiPassword}
                                    valuePlaceholder={"Confirmasi Password"}
                                    iconType="PiLockKeyFill"
                                    validasiInput={validasiInput.confirmasiPassword}
                                />
                            </div>
                            <div className={`${styles["parent-button"]}`}>
                                <button>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
