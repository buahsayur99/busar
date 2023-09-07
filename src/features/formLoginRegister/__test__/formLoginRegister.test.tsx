import { FormLoginRegister } from "../FormLoginRegister";
import { RenderResult, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { AnyAction, configureStore } from "@reduxjs/toolkit";

function createActiveFormLoginStore(initialFormLogin: boolean) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: (state = {
                activeTransitionForm: {
                    formLogin: initialFormLogin, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false, forgetPassword: false
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
            apiUsers: (state = {
                isLoading: false, isError: null, isMessage: "", dataLoginUsers: null
            }, action: AnyAction) => state
        }
    })
}
function createIsMessageStore(initialIsMessage: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: (state = {
                activeTransitionForm: {
                    formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false, forgetPassword: false
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
            apiUsers: (state = {
                isLoading: false, isError: null, isMessage: initialIsMessage, dataLoginUsers: null
            }, action: AnyAction) => state
        }
    })
}
function createIsLoadingStore(initialIsLoading: boolean) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: (state = {
                activeTransitionForm: {
                    formLogin: true, bannerLogin: false, formRegister: false, bannerRegiter: true, onOffForm: false, forgetPassword: false
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
            apiUsers: (state = {
                isLoading: initialIsLoading, isError: null, isMessage: "", dataLoginUsers: null
            }, action: AnyAction) => state
        }
    })
}
function createActiveFrogetPasswordStore(initialForgetPassword: boolean) {
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
            apiUsers: (state = {
                isLoading: false, isError: null, isMessage: "", dataLoginUsers: null
            }, action: AnyAction) => state
        }
    })
}

describe("Form Login Register", () => {
    let component: RenderResult;


    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <FormLoginRegister />
            </Provider>
        )
    });

    afterEach(() => {
        cleanup();
    })

    test("Render correctly", () => {
        const btnClosePlus550 = component.getAllByTestId("close-button")[0];
        const btnCloseMin550 = component.getAllByTestId("close-button")[1];
        const bannerLogin = component.getByText("jika anda sudah mendaftar atau sudah memiliki akun, anda bisa langsung login");
        const bannerRegister = component.getByText("Apakah anda masih belum memiliki akun? jika belum, anda bisa melakukan regiterasi, anda hanya perlu mengisi beberapa hall singkat saja.");

        // Make sure "btnClosePlus550" is in the DOM
        expect(btnClosePlus550).toBeInTheDocument();
        // Make sure "btnCloseLoginMin550" is in the DOM
        expect(btnCloseMin550).toBeInTheDocument();
        // Make sure "Banner Login" is in the DOM
        expect(bannerLogin).toBeInTheDocument();
        // Make sure "Banner Register" is in the DOM
        expect(bannerRegister).toBeInTheDocument();
    });

    test("should verify that the onClick function has been called after close button clicked", () => {
        const btnClosePlus550 = component.getAllByTestId("close-button")[0];

        // Mock
        const onClickMock = jest.fn();
        btnClosePlus550.onclick = onClickMock;
        // Simulasi event Click
        fireEvent.click(btnClosePlus550);
        // Verify that the onClick function has been called
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("it should be when the 'Login' button on the login banner is +550 in dimension, display the 'Form Login' and 'Banner Register', and close the 'Form Register' and  'Banner Login'", async () => {
        // button banner login Dimensi +550
        const btnBannerLogin = component.getAllByTestId("button-bannerForm")[0];

        // Simulasi event Click
        fireEvent.click(btnBannerLogin);

        await waitFor(() => {
            const { activeTransitionForm } = store.getState().formLoginRegisterSlice;

            // Make sure "banner register" is in the DOM
            expect(activeTransitionForm.bannerRegiter).toBe(true);
            // Make sure "form login" is in the DOM
            expect(activeTransitionForm.formLogin).toBe(true);

            // Make sure "banner login" is not in the DOM
            expect(activeTransitionForm.bannerLogin).toBe(false);
            // Make sure "form register" is not in the DOM
            expect(activeTransitionForm.formRegister).toBe(false);
        });
    });

    test("it should be when the 'Register' button on the register banner is +550 in dimension, display the 'Form Register' and 'Banner Login', and close the 'Form Login' and  'Banner Register'", async () => {
        // button banner Register Dimensi +550
        const btnBannerRegister = component.getAllByTestId("button-bannerForm")[1];

        // Simulasi event Click
        fireEvent.click(btnBannerRegister);

        await waitFor(() => {
            const { activeTransitionForm } = store.getState().formLoginRegisterSlice;

            // Make sure "banner login" is in the DOM
            expect(activeTransitionForm.bannerLogin).toBe(true);
            // Make sure "form register" is in the DOM
            expect(activeTransitionForm.formRegister).toBe(true);

            // Make sure "banner register" is not in the DOM
            expect(activeTransitionForm.bannerRegiter).toBe(false);
            // Make sure "form login" is not in the DOM
            expect(activeTransitionForm.formLogin).toBe(false);
        });
    });

    test("should verify that the onClick function has been called after close button on 'Form Register Min 550' clicked", () => {
        const btnCloseFormRegisMin550 = component.getAllByTestId("close-button")[1];

        // Mock
        const onClickMock = jest.fn();
        btnCloseFormRegisMin550.onclick = onClickMock;
        // Simulasi event Click
        fireEvent.click(btnCloseFormRegisMin550);
        // Verify that the onClick function has been called
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should verify that the onClick function has been called after close button on 'Form Register Min 550' clicked", () => {
        component.rerender(
            <Provider store={createActiveFormLoginStore(true)}>
                <FormLoginRegister />
            </Provider>
        );

        const btnCloseFormRegisMin550 = component.getAllByTestId("close-button")[1];

        // Mock
        const onClickMock = jest.fn();
        btnCloseFormRegisMin550.onclick = onClickMock;
        // Simulasi event Click
        fireEvent.click(btnCloseFormRegisMin550);
        // Verify that the onClick function has been called
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should when isMessage === 'register success' display alert and run event onClick and make sure the onClick function is executed", async () => {
        component.rerender(
            <Provider store={createIsMessageStore("register success")}>
                <FormLoginRegister />
            </Provider>
        )

        const button = component.getByRole("button", {
            name: "login now"
        });
        const alert = component.getByText("login now");
        // Make Sure Alert is in the DOM
        expect(alert).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        const onClickMock = jest.fn();
        button.onclick = onClickMock;
        // Simulasi event click
        fireEvent.click(button);
        // Verify that the onClick function has been called
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should when isLoading === true display 'Loading Component' ", () => {
        expect(component.queryByText("Loading")).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createIsLoadingStore(true)}>
                <FormLoginRegister />
            </Provider>
        );

        expect(component.getByText("Loading")).toBeInTheDocument();
    })

    test("should when 'Active Forget Password' === true display 'ForgetPassword Component'", () => {
        expect(component.queryByTestId("parentFormForgetPassword")).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createActiveFrogetPasswordStore(true)}>
                <FormLoginRegister />
            </Provider>
        )

        expect(component.queryByTestId("parentFormForgetPassword")).toBeInTheDocument();
    });
})