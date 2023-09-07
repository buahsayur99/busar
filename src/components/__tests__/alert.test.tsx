import { RenderResult, cleanup, fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { Alert } from "../Alert"
import { store } from "../../app/store"
import { AnyAction, configureStore } from "@reduxjs/toolkit"
import { formLoginRegiterSlice } from "../../app/actions/formLoginRegisterSlice"

function createIsMessageStore(initialIsMessage: string) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer,
            apiUsers: (state = { isLoading: false, isError: null, isMessage: initialIsMessage, dataLoginUsers: null }, action: AnyAction) => state,
        }
    })
}

describe("alert", () => {
    let component: RenderResult;
    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <Alert classCss="alert" onClicks={() => { }} >{'success'}</Alert>
            </Provider>
        )
    });

    afterEach(() => {
        cleanup();
    });

    test("should when isMessage === 'register success' display alert component", () => {
        expect(component.queryByTestId("parent-alert")).not.toBeInTheDocument();

        component.rerender(
            <Provider store={createIsMessageStore("register success")}>
                <Alert classCss="alert" onClicks={() => { }} >{'success'}</Alert>
            </Provider>
        )

        expect(component.queryByTestId("parent-alert")).toBeInTheDocument();
    });

    test("should when isMessage === 'register success' display alert component", () => {
        component.rerender(
            <Provider store={createIsMessageStore("register success")}>
                <Alert classCss="alert" onClicks={() => { }} >{'success'}</Alert>
            </Provider>
        )

        const button = component.getByRole("button", {
            name: "success"
        })

        const onClickMock = jest.fn();
        button.onclick = onClickMock

        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
})