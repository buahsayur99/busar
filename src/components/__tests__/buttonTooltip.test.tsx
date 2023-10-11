import { RenderResult, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { ButtonTooltip } from "../ButtonTooltip";

describe("Button Tooltip", () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <ButtonTooltip
                    styleButton="style"
                    textTooltip="button submit"
                    styleTooltip="styleSubmit"
                    positionX={2}
                    positionY={1}
                    onClicks={() => { }}
                >
                    submit
                </ButtonTooltip>
            </Provider>
        )
    });

    test("render correlty", () => {
        // Make Sure button submit is in the DOM
        expect(component.getByRole("button", { name: "submit" })).toBeInTheDocument();
        // Make sure text tooltip is in the DOM
        expect(component.getByText("button submit")).toBeInTheDocument();
    })

    test("should handle onMouseEnter", () => {
        const button = component.getByRole("button", { name: "submit" });
        const tooltip = component.getByText("button submit");

        const handleMouseEnter = jest.fn();
        button.onmouseenter = handleMouseEnter;

        fireEvent.mouseEnter(button);

        // Check if the mock handleMouseEnter function is called
        expect(handleMouseEnter).toHaveBeenCalled();
        expect(tooltip).toHaveStyle(`top: ${1}px`);
        expect(tooltip).toHaveStyle(`left: ${-2}px`);
    })
})