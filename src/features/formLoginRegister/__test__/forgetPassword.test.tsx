import { RenderResult, cleanup, fireEvent, render, renderHook, waitFor } from "@testing-library/react";
import { store } from "../../../app/store";
import { ForgetPassword } from "../ForgetPassword";
import { Provider } from "react-redux";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { activeFormTransition, formLoginRegiterSlice, resetValidasi } from "../../../app/actions/formLoginRegisterSlice";
import { resetIsMessage, resetUuid } from "../../../app/actions/apiUsersSlice";

function createIsMessageStore(initialIsMessage: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer, // Perbaiki nama Slice yang benar
            apiUsers: (state = { isLoading: false, isError: null, isMessage: initialIsMessage, dataLoginUsers: null }, action: AnyAction) => state,
        }
    })
}

function createFormForgetPasswordStore(initialForgetPassword: boolean) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: (state = {
                activeTransitionForm: {
                    formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false, forgetPassword: initialForgetPassword
                },
                inputValueForm: {
                    email: "", password: "", confirmasiPassword: ""
                },
                validasiInput: {
                    email: { status: false, text: "" },
                    password: { status: false, text: "" },
                    confirmasiPassword: { status: false, text: "" }
                },
            }, action: AnyAction) => state,
            apiUsers: (state = { isLoading: false, isError: null, isMessage: "", dataLoginUsers: null }, action: AnyAction) => state,
        }
    })
}

function createIsUuid(initialIsUuid: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer, // Perbaiki nama Slice yang benar
            apiUsers: (state = { isLoading: false, isError: null, isMessage: "", dataLoginUsers: null, isUuid: initialIsUuid }, action: AnyAction) => state,
        }
    })
}

function createIsUuidAndIsMessage(initialIsUuid: string, isMessage: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer, // Perbaiki nama Slice yang benar
            apiUsers: (state = { isLoading: false, isError: null, isMessage: isMessage, dataLoginUsers: null, isUuid: initialIsUuid }, action: AnyAction) => state,
        }
    })
}

describe("Form Forget Password", () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <ForgetPassword />
            </Provider>
        )
    });

    afterEach(() => {
        cleanup(); // Bersihkan DOM setelah setiap pengujian
    });

    test("", () => {
        component.rerender(
            <Provider store={createFormForgetPasswordStore(true)}>
                <ForgetPassword />
            </Provider>
        );

        const parentFormForgetPassword = component.getByTestId("parentFormForgetPassword");
        expect(parentFormForgetPassword).toHaveClass("scale-in-center");
    });

    test("should update email input and trigger form submission on button click", () => {
        // Element input email
        const inputEmail = component.getByTestId("inputElement");
        // make sure the email input is in the DOM
        expect(inputEmail).toBeInTheDocument();

        // Value input email
        const newEmailValue = "joko@gmail.com";
        // Event Change
        fireEvent.change(inputEmail, { target: { value: newEmailValue } });
        // make sure the value email input is updated correctly
        expect(inputEmail).toHaveValue(newEmailValue);

        // button submit
        const btnSubmit = component.getByRole("button", {
            name: "submit"
        });
        // Mock event onClick
        const onClickMock = jest.fn();
        btnSubmit.onclick = onClickMock;
        // Simulasi button click
        fireEvent.click(btnSubmit);
        // Verify that the onClick function has been called
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should when value email input is empty, display danger validation", () => {
        const inputEmail = component.getByTestId("inputElement");
        const btnSubmit = component.getByRole("button", {
            name: "submit"
        })

        // Make sure danger validation is not the DOM
        expect(component.queryByText("Email tidak boleh kosong")).not.toBeInTheDocument();

        // Simulasi event change
        fireEvent.change(inputEmail, { target: { value: "" } });
        // Simulasi event onClick
        fireEvent.click(btnSubmit);

        // Make sure danger validation is in the DOM
        expect(component.queryByText("Email tidak boleh kosong")).toBeInTheDocument();
    });

    test("should when isUuid !== null, show form password and confirmasi password, when input password and confirmasi password empty, show danger validation", () => {
        component.rerender(
            <Provider store={createIsUuid("1212412515")}>
                <ForgetPassword />
            </Provider>
        );

        const inputPassword = component.getAllByTestId("inputElement")[0];
        const inputConfirmasiPassword = component.getAllByTestId("inputElement")[1];
        const btnResetPass = component.getByRole("button", {
            name: "Reset password"
        });

        // Make sure danger validation is not in the DOM
        expect(component.queryByText("password tidak boleh kosong")).not.toBeInTheDocument; // password
        expect(component.queryByText("confirmasi password tidak boleh kosong")).not.toBeInTheDocument; // confirmasi password

        fireEvent.change(inputPassword, { target: { value: "" } });
        fireEvent.change(inputConfirmasiPassword, { target: { value: "" } });
        fireEvent.click(btnResetPass);

        // Make sure danger validation is in the DOM
        expect(component.queryByText("password tidak boleh kosong")).toBeInTheDocument; // password
        expect(component.queryByText("confirmasi password tidak boleh kosong")).toBeInTheDocument; // confirmasi password
    });

    test("should when isUuid !== null, update password input and confirmasi password input, and trigger form reset password on button click", () => {
        component.rerender(
            <Provider store={createIsUuid("1212412515")}>
                <ForgetPassword />
            </Provider>
        );

        const inputPassword = component.getAllByTestId("inputElement")[0];
        const inputConfirmasiPassword = component.getAllByTestId("inputElement")[1];
        const btnResetPass = component.getByRole("button", {
            name: "Reset password"
        })

        // Make sure element input and button is in the DOM
        expect(inputPassword).toBeInTheDocument();
        expect(inputConfirmasiPassword).toBeInTheDocument();
        expect(btnResetPass).toBeInTheDocument();

        // Simulasi event change
        const password = "123456"
        fireEvent.change(inputPassword, { target: { value: password } });
        fireEvent.change(inputConfirmasiPassword, { target: { value: password } });

        const onClickMock = jest.fn();
        btnResetPass.onclick = onClickMock;

        fireEvent.click(btnResetPass);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(inputPassword).toHaveValue(password);
        expect(inputConfirmasiPassword).toHaveValue(password);
    });

    test("should when isMessage === 'update user success', show alert goToLoginPage", () => {
        // Make sure alert goToLoginPage is not in the DOM
        expect(component.queryByText("Perubahan password berhasil")).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createIsMessageStore("update user success")}>
                <ForgetPassword />
            </Provider>
        );

        // Make sure alert goToLoginPage is not in the DOM
        expect(component.queryByText("Perubahan password berhasil")).toBeInTheDocument();
    });

    test("should when btn close is clicked display confirmation alert", async () => {
        const btnCloseForm = component.getByTestId("closeFormForgetPassword");
        // Make sure the close form button is in the DOM
        expect(btnCloseForm).toBeInTheDocument();

        // Make sure alert close form forget password is in the DOM
        expect(component.queryByText("Apakah anda ingin membatalkan perubahan password")).not.toBeInTheDocument();

        // Simulasi event click
        fireEvent.click(btnCloseForm);

        // Make sure alert close form forget password is in the DOM
        expect(component.queryByText("Apakah anda ingin membatalkan perubahan password")).toBeInTheDocument();
    });

    test("should close ForgetPassword form when the Ok button on the alert is clicked", async () => {
        // create a spy for the dispatch function
        const dispatch = jest.spyOn(store, "dispatch");

        const btnCloseForm = component.getByTestId("closeFormForgetPassword");
        // Simulasi event click Close Form ForgetPassword
        fireEvent.click(btnCloseForm);

        // make sure the alert close form forgetPassword is in the DOM
        expect(component.queryByText("Apakah anda ingin membatalkan perubahan password")).toBeInTheDocument();
        // Button Ok Close form ForgetPassword
        const btnAlertOk = component.getByRole("button", {
            name: "Ok"
        });

        // Event Click Ok Alert
        fireEvent.click(btnAlertOk);
        await waitFor(() => {
            // Check whether the dispatch function is called correctly
            expect(dispatch).toHaveBeenCalledWith(resetUuid());
            expect(dispatch).toHaveBeenCalledWith(resetValidasi());
            expect(dispatch).toHaveBeenCalledWith(resetIsMessage());
            expect(dispatch).toHaveBeenCalledWith(
                activeFormTransition({ forgetPassword: false })
            );
        });
    });

    test("should close alert when the Cansel button on the alert is clicked", async () => {
        const btnCloseForm = component.getByTestId("closeFormForgetPassword");
        // Simulasi event click Close Form ForgetPassword
        fireEvent.click(btnCloseForm);

        // make sure the alert close form forgetPassword is in the DOM
        expect(component.queryByText("Apakah anda ingin membatalkan perubahan password")).toBeInTheDocument();
        // Button Ok Close form ForgetPassword
        const btnAlertCansel = component.getByRole("button", {
            name: "Cansel"
        });

        // Event Click Ok Alert
        fireEvent.click(btnAlertCansel);
        // make sure the alert close form forgetPassword is not in the DOM
        expect(component.queryByText("Apakah anda ingin membatalkan perubahan password")).not.toBeInTheDocument();
    });

    test("should when isMessage = 'Terjadi kesalahan saat memproses permintaan.', show alert server off", () => {
        // make sure danger alert server off is not in the DOM
        expect(component.queryByText("Terjadi kesalahan saat memproses permintaan.")).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createIsMessageStore("Terjadi kesalahan saat memproses permintaan.")}>
                <ForgetPassword />
            </Provider>
        );
        // make sure danger alert server off is in the DOM
        expect(component.queryByText("Terjadi kesalahan saat memproses permintaan.")).toBeInTheDocument();
        const btnClose = component.getByRole("button", {
            name: "Close"
        });

        const onClickMock = jest.fn();
        btnClose.onclick = onClickMock;
        fireEvent.click(btnClose);

        // make sure event click run 1x
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should when isMessage = 'Email tidak ditemukan', show danger validation", () => {
        // make sure danger alert server off is not in the DOM
        expect(component.queryByText("Email tidak ditemukan")).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createIsMessageStore("Email tidak ditemukan")}>
                <ForgetPassword />
            </Provider>
        );

        // make sure danger alert server off is in the DOM
        expect(component.queryByText("Email tidak ditemukan")).toBeInTheDocument();
    });

    test("should when isMessage = 'Email tidak ditemukan', show danger validation", () => {
        const uuid = "12345";
        const isMessage = "password dan confirmasi password tidak sama"

        // make sure password validation danger is not in the DOM
        expect(component.queryByText(isMessage)).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createIsUuidAndIsMessage(uuid, isMessage)}>
                <ForgetPassword />
            </Provider>
        );

        // Make sure password validation danger is not in the DOM
        expect(component.queryAllByText(isMessage)[0]).toBeInTheDocument();
        // Make sure confirmasi password validation danger is not in the DOM
        expect(component.queryAllByText(isMessage)[1]).toBeInTheDocument();
    });
})