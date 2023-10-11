import { RenderResult, fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { AlertText } from "../AlertText";
import { AnyAction, configureStore } from "@reduxjs/toolkit";

jest.useFakeTimers();

function StateActiveAlert(active: any) {
    return configureStore({
        reducer: { formLoginRegisterSlice: (state = { activeAlert: active }, action: AnyAction) => state },
    });
}

describe("alertText", () => {
    let component: RenderResult;
    let onClicksMock: jest.Mock;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <AlertText children="Success" nameButton="Close" onClicks={() => { }} />
            </Provider>
        )
    });

    test("render correctly", () => {
        const headingH1 = component.getByRole("heading", {
            name: "Success"
        });
        const button = component.getByRole("button", {
            name: "Close"
        });

        expect(headingH1).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test("should call onClicksMock and onClickMock when button is clicked", () => {
        onClicksMock = jest.fn();

        component.rerender(
            <Provider store={store}>
                <AlertText children="Success" nameButton="Close" onClicks={onClicksMock} />
            </Provider>
        )

        const button = component.getByRole("button", {
            name: "Close"
        });

        // Mock Event
        const onClickMock = jest.fn();
        button.onclick = onClickMock

        fireEvent.click(button);

        jest.advanceTimersByTime(1000);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        // Make sure the onClick paramter is called successfully
        expect(onClicksMock).toHaveBeenCalledTimes(1);
    });

    test("should", () => {
        onClicksMock = jest.fn();

        component.rerender(
            <Provider store={StateActiveAlert({ alertText: { status: true } })}>
                <AlertText children="Success" nameButton="Close" onClicks={onClicksMock} />
            </Provider>
        )
        // setTime
        jest.advanceTimersByTime(3500);

        fireEvent.click(component.getByText("Close"));
        jest.advanceTimersByTime(1000);
        // Make sure the onClick paramter is called successfully
        expect(onClicksMock).toHaveBeenCalledTimes(1);
    })
})