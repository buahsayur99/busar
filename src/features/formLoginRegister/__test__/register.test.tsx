import { RenderResult, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { Register } from "../Register";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { formLoginRegiterSlice } from "../../../app/actions/formLoginRegisterSlice";

function createTestStore(initialIsMessage: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer, // Perbaiki nama Slice yang benar
            apiUsers: (state = { isLoading: false, isError: null, isMessage: initialIsMessage, dataLoginUsers: null }, action: AnyAction) => state,
        }
    });
}

describe("Form Register", () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <Register />
            </Provider>
        )
    });

    test("render correctly", () => {
        // Input Element
        const inputEmail = component.getAllByTestId("inputElement")[0];
        const inputPassword = component.getAllByTestId("inputElement")[1];
        const inputConfirmasiPassword = component.getAllByTestId("inputElement")[2];
        // Button Submit
        const buttonSubmit = component.getByRole("button", {
            name: "submit"
        })
        // Button Back To Login
        const buttonBack = component.getByRole("button", {
            name: "Login"
        })

        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(inputConfirmasiPassword).toBeInTheDocument();
        expect(buttonSubmit).toBeInTheDocument();
        expect(buttonBack).toBeInTheDocument();
    });

    test("should show validation warning when form input value is empty", () => {
        // Input Element
        const inputEmail = component.getAllByTestId("inputElement")[0];
        const inputPassword = component.getAllByTestId("inputElement")[1];
        const inputConfirmasiPassword = component.getAllByTestId("inputElement")[2];
        // Button Submit
        const buttonSubmit = component.getByRole("button", {
            name: "submit"
        })

        // make sure danger validation is not the DOM
        expect(component.queryByText("email tidak boleh kosong")).toBeNull();
        expect(component.queryByText("password tidak boleh kosong")).toBeNull();
        expect(component.queryByText("confirmasi password tidak boleh kosong")).toBeNull();

        // Event change input is empty
        fireEvent.change(inputEmail, { target: { value: "" } });
        fireEvent.change(inputPassword, { target: { value: "" } });
        fireEvent.change(inputConfirmasiPassword, { target: { value: "" } });
        // Event click
        fireEvent.click(buttonSubmit);

        // make sure danger validasi is in the DOM when input value empty
        expect(component.queryByText("email tidak boleh kosong")).toBeInTheDocument();
        expect(component.queryByText("password tidak boleh kosong")).toBeInTheDocument();
        expect(component.queryByText("confirmasi password tidak boleh kosong")).toBeInTheDocument();
    });

    test("should is not show validation warning when form input value is not empty", () => {
        // Input Element
        const inputEmail = component.getAllByTestId("inputElement")[0];
        const inputPassword = component.getAllByTestId("inputElement")[1];
        const inputConfirmasiPassword = component.getAllByTestId("inputElement")[2];
        // Button Submit
        const buttonSubmit = component.getByRole("button", {
            name: "submit"
        });

        // Event change input is empty
        fireEvent.change(inputEmail, { target: { value: "paatlupi@gmail.com" } });
        fireEvent.change(inputPassword, { target: { value: "123456" } });
        fireEvent.change(inputConfirmasiPassword, { target: { value: "123456" } });
        // Event click
        fireEvent.click(buttonSubmit);

        // make sure danger validasi is not in the DOM when input value is not empty
        expect(component.queryByText("email tidak boleh kosong")).toBeNull();
        expect(component.queryByText("password tidak boleh kosong")).toBeNull();
        expect(component.queryByText("confirmasi password tidak boleh kosong")).toBeNull();
    });

    test("should show danger validasi when isMessage = email yang anda gunakan sudah terdaftar", () => {
        // Ubah nilai isMessage di store dengan fungsi dispatch palsu
        component.rerender(
            <Provider store={createTestStore("email yang anda gunakan sudah terdaftar")}>
                <Register />
            </Provider>
        );

        expect(component.queryByText("email yang anda gunakan sudah terdaftar")).toBeInTheDocument();
    });

    test("should show danger validasi when isMessage = password dan confirmasi password tidak sama", () => {
        // Ubah nilai isMessage di store dengan fungsi dispatch palsu
        component.rerender(
            <Provider store={createTestStore("password dan confirmasi password tidak sama")}>
                <Register />
            </Provider>
        );

        const validationPassword = component.queryAllByText("password dan confirmasi password tidak sama")[0];
        const validationConfirmasiPassword = component.queryAllByText("password dan confirmasi password tidak sama")[1];

        expect(validationPassword).toBeInTheDocument();
        expect(validationConfirmasiPassword).toBeInTheDocument();
    });

    test("should show danger validasi when isMessage = Validation error: Validation isEmail on email failed", () => {
        // Ubah nilai isMessage di store dengan fungsi dispatch palsu
        component.rerender(
            <Provider store={createTestStore("Validation error: Validation isEmail on email failed")}>
                <Register />
            </Provider>
        );

        expect(component.queryByText("format email anda salah")).toBeInTheDocument();
    });

    test("should when buttonBackLogin is clicked close formRegister and open formLogin and reset all input value, validasi danger, and Message Api's", async () => {
        const buttonBackLogin = component.getByRole("button", {
            name: "Login"
        });

        // Gunakan fireEvent.click() untuk mensimulasikan klik pada tombol "register"
        fireEvent.click(buttonBackLogin);

        await waitFor(() => {
            // Ekstraksi state formLoginRegisterSlice
            const { activeTransitionForm, validasiInput, inputValueForm } = store.getState().formLoginRegisterSlice;

            // Open Form Register
            expect(activeTransitionForm).toStrictEqual({ formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false, forgetPassword: false });
            // Reset validasi
            expect(validasiInput.email).toStrictEqual({ status: false, text: '' });
            expect(validasiInput.password).toStrictEqual({ status: false, text: '' });
            // Reset input value
            expect(inputValueForm).toStrictEqual({ email: '', password: '', confirmasiPassword: '' });
        });
    });
});