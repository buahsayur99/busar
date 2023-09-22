import { FormEvent, useState, useEffect, useCallback } from "react"
import { NavigationBar } from "../../features/navbar/NavigationBar";
import styles from "../../style/index.module.scss";
import { MenuPengaturanProfile } from "../../features/pengaturanProfile/MenuPengaturanProfile";
import { ProfileEmailAndLink } from "../../features/pengaturanProfile/ProfileEmailAndLink";
import { InputsForm } from "../../components/InputsForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetIsMessage, updateSettingProfile, } from "../../app/actions/apiUsersSlice";
import { useGetApiUsers } from "../../hook/useGetApiUsers";
import { Loading } from "../../components/Loading";
import { AlertText } from "../../components/AlertText";
import { useSaveLastPage } from "../../hook/useSaveLastPage";

export const General = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [activeAlert, setActiveAlert] = useState(false);
    const [validasiInput, setValidasiInput] = useState({ email: { status: false, text: "" } });
    const { dataLoginUsers, isMessage, isLoading } = useAppSelector(state => state.apiUsers);
    // Custome Hook Get Api's Users
    useGetApiUsers({ isMessage, dataLoginUsers });
    // Custome Hook last page
    useSaveLastPage()
    const dispatch = useAppDispatch();

    const updateValidasiInputByIsMessage = useCallback(() => {
        if (isMessage === "Validation error: Validation isEmail on email failed") return setValidasiInput({ email: { status: true, text: "Format email tidak sesuai" } });
    }, [isMessage])

    const submitEmailChange = () => {
        let data = { email: inputEmail, uuid: dataLoginUsers?.uuid }
        let link = `${process.env.REACT_APP_API_URL_LOCAL}/users/email/${dataLoginUsers?.uuid}`;

        if (inputEmail === "") return setValidasiInput({ email: { status: true, text: "Email tidak boleh kosong" } });
        if (inputEmail === dataLoginUsers?.email) return setValidasiInput({ email: { status: true, text: "Email tetep sama" } });
        return dispatch(updateSettingProfile({ data, link }));
    }

    const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        resetIsMessage();
        setValidasiInput({ email: { status: false, text: "" } });
        updateValidasiInputByIsMessage();
        submitEmailChange()
    }

    const onOffAlert = useCallback(() => {
        if (isMessage === "update user success") return setActiveAlert(true);
    }, [isMessage])

    useEffect(() => {
        updateValidasiInputByIsMessage();
        onOffAlert();
        // If update success reset value input email
        if (isMessage === "update user success") return setInputEmail("");
    }, [updateValidasiInputByIsMessage, onOffAlert, isMessage])

    return (
        <>
            {/* Navbar */}
            < NavigationBar />
            {/* Loading */}
            {isLoading && <Loading />}
            {/* Alert update success */}
            {activeAlert && (
                <AlertText
                    nameButton="Close"
                    onClicks={() => setActiveAlert(false)}
                >
                    Update email success
                </AlertText>
            )}

            <div className={`${styles["global-container"]}`}>
                <div className={`${styles["global-parent-pengaturan-profile"]}`}>
                    <ProfileEmailAndLink />
                    <div className={`${styles["global-flex"]}`}>
                        {/* NavLink menu users profile */}
                        <MenuPengaturanProfile />

                        {/* Form update email */}
                        <form
                            onSubmit={onSubmitForm}
                            className="w-100"
                        >
                            <div className={`${styles["parent-form-profile"]}`}>
                                <InputsForm
                                    cssInput="input-form"
                                    cssPlaceholder="input-placeholder"
                                    cssIcon="input-icon"
                                    cssValidasi="validasi"
                                    typeInput="text"
                                    changeInput={(input) => setInputEmail(input)}
                                    valueInput={inputEmail}
                                    valuePlaceholder="Email"
                                    iconType="FaUserAlt"
                                    validasiInput={validasiInput.email}
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
