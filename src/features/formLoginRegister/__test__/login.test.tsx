import { Provider } from "react-redux";
import { Login } from "../Login";
import { RenderResult, fireEvent, render, waitFor } from "@testing-library/react";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import formLoginRegisterSlice from "../../../app/actions/formLoginRegisterSlice";
import { activeFormTransition } from "../../../app/actions/formLoginRegisterSlice";

describe("Login Component", () => {
    let store: EnhancedStore;
    let component: RenderResult;

    beforeEach(() => {
        store = configureStore({ reducer: formLoginRegisterSlice });
        store.dispatch = jest.fn();

        component = render(
            <Provider store={store}>
                <Login />
            </Provider>
        ) as RenderResult;
    });

    test("should update email input value", () => {
        const emailInput = component.getAllByTestId("inputElement")[0] as HTMLInputElement;
        expect(emailInput).toBeInTheDocument(); // Check emailInput must exist

        fireEvent.change(emailInput, { target: { value: "test@example.com" } }); // event change
        expect(emailInput.value).toBe("test@example.com"); // check value emailInput
    });

    test("should update password input value", () => {
        const passwordInput = component.getAllByTestId("inputElement")[1] as HTMLInputElement;
        expect(passwordInput).toBeInTheDocument(); // Check passwordInput must exist

        fireEvent.change(passwordInput, { target: { value: "123456" } }); // event change
        expect(passwordInput.value).toBe("123456"); // Check value passwordInput
    });

    test("should call onSubmit", async () => {
        const onSubmit = jest.fn();
        const formElement = component.getByTestId("loginForm") as HTMLFormElement;
        expect(formElement).toBeInTheDocument();

        component.rerender( // Render ulang komponen dengan onSubmit yang baru
            <Provider store={store}>
                <Login />
            </Provider>
        );

        fireEvent.submit(formElement);
    });

    test("should call dispatch with the correct action when 'create account' button is clicked", () => {
        const createAccountButton = component.getByText("create account");
        fireEvent.click(createAccountButton);

        expect(store.dispatch).toHaveBeenCalledWith(
            activeFormTransition({
                formLogin: false,
                bannerLogin: true,
                formRegister: true,
                bannerRegiter: false,
            })
        );
    });
});