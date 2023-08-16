import { RenderResult, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Login } from "../Login";
import { store } from "../../../app/store";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { formLoginRegiterSlice } from "../../../app/actions/formLoginRegisterSlice";

// Fungsi untuk membuat store sementara dengan data dummy
function createTestStore(initialIsMessage: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer, // Perbaiki nama Slice yang benar
            apiUsers: (state = { isLoading: false, isError: null, isMessage: initialIsMessage, dataLoginUsers: null }, action: AnyAction) => state,
        },
    });
}

describe("login", () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <Login />
            </Provider>
        )
    });

    test("Render", () => {
        const inputEmail = component.getAllByTestId("inputElement")[0];
        const inputPassword = component.getAllByTestId("inputElement")[0];
        const buttonForgetPass = component.getByRole("button", {
            name: "Forget Password?"
        });
        const buttonLogin = component.getByRole("button", {
            name: "Login"
        });
        const buttonRegister = component.getByRole("button", {
            name: "register"
        });

        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(buttonForgetPass).toBeInTheDocument();
        expect(buttonLogin).toBeInTheDocument();
        expect(buttonRegister).toBeInTheDocument();
    });

    test("should display validation danger when value input empty", () => {
        const inputEmail = component.getAllByTestId("inputElement")[0];
        const inputPassword = component.getAllByTestId("inputElement")[1];
        const buttonLogin = component.getByRole("button", {
            name: "Login"
        });

        // make sure the validation danger is not in the DOM
        expect(component.queryByText("email tidak boleh kosong")).toBeNull();
        expect(component.queryByText("password tidak boleh kosong")).toBeNull();

        // make sure the change input empty
        fireEvent.change(inputEmail, { target: { value: "" } });
        fireEvent.change(inputPassword, { target: { value: "" } });

        // event onClick
        fireEvent.click(buttonLogin);

        // make sure the validation danger is in the DOM
        expect(component.queryByText("email tidak boleh kosong")).toBeInTheDocument();
        expect(component.queryByText("password tidak boleh kosong")).toBeInTheDocument();
    })

    test("should is not display validation danger when value input is not empty ", () => {
        const inputEmail = component.getAllByTestId("inputElement")[0];
        const inputPassword = component.getAllByTestId("inputElement")[1];
        const buttonLogin = component.getByRole("button", {
            name: "Login"
        });

        // make sure the change input empty
        fireEvent.change(inputEmail, { target: { value: "joko@gmail.com" } });
        fireEvent.change(inputPassword, { target: { value: "987987" } });

        // event onClick
        fireEvent.click(buttonLogin);

        // make sure the validation danger is not in the DOM
        expect(component.queryByText("email tidak boleh kosong")).toBeNull();
        expect(component.queryByText("password tidak boleh kosong")).toBeNull();
    });

    test("should display validation danger when isMessage is 'email yang anda masukan tidak terdafatar'", async () => {
        // Ubah nilai isMessage di store dengan fungsi dispatch palsu
        component.rerender(
            <Provider store={createTestStore('email yang anda masukan tidak terdafatar')}>
                <Login />
            </Provider>
        );

        // Pastikan pesan validasi untuk email ditampilkan sesuai dengan isMessage yang disimpan di store
        const emailValidationMessage = component.getByText('email yang anda masukan tidak terdafatar');
        const passwordValidationMessage = component.queryByText('password yang anda masukan salah');

        expect(emailValidationMessage).toBeInTheDocument();
        expect(passwordValidationMessage).toBeNull();
    });

    test("should display validation danger when isMessage is 'password yang anda masukan salah'", async () => {
        // Ubah nilai isMessage di store dengan fungsi dispatch palsu
        component.rerender(
            <Provider store={createTestStore('password yang anda masukan salah')}>
                <Login />
            </Provider>
        );

        // Pastikan pesan validasi untuk password ditampilkan sesuai dengan isMessage yang disimpan di store
        const emailValidationMessage = component.queryByText('email yang anda masukan tidak terdafatar');
        const passwordValidationMessage = component.getByText('password yang anda masukan salah');

        expect(emailValidationMessage).toBeNull();
        expect(passwordValidationMessage).toBeInTheDocument();
    });

    test("should when buttonRegister is clicked close formLogin and open formRegister and reset all input value and validasi danger", async () => {
        const buttonRegister = component.getByRole("button", {
            name: "register"
        });

        // Gunakan fireEvent.click() untuk mensimulasikan klik pada tombol "register"
        fireEvent.click(buttonRegister);

        await waitFor(() => {
            // Ekstraksi state formLoginRegisterSlice
            const { activeTransitionForm, validasiInput, inputValueForm } = store.getState().formLoginRegisterSlice;

            // Open Form Register
            expect(activeTransitionForm).toStrictEqual({ formLogin: false, bannerLogin: true, formRegister: true, bannerRegiter: false, onOffForm: false });
            // Reset validasi
            expect(validasiInput.email).toStrictEqual({ status: false, text: '' });
            expect(validasiInput.password).toStrictEqual({ status: false, text: '' });
            // Reset input value
            expect(inputValueForm).toStrictEqual({ email: '', password: '', confirmasiPassword: '' });
        });
    });
});