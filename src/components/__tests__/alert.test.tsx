import { RenderResult, cleanup, fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { Alert } from "../Alert"
import { store } from "../../app/store"

jest.useFakeTimers();

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

    test("render alert", () => {
        // Make sure alert is in the DOM
        expect(component.getByTestId("parent-alert")).toBeInTheDocument();
        // Make sure button is in the DOM
        expect(component.getByRole("button", { name: "success" })).toBeInTheDocument()
    })

    test("onClicks is called after 500ms timeout", () => {
        const button = component.getByRole("button", {
            name: "success"
        });

        const onClickMock = jest.fn();
        button.onclick = onClickMock

        // Simulasikan klik pada tombol
        fireEvent.click(button);

        jest.advanceTimersByTime(500);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
})