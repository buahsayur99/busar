import { RenderResult, cleanup, fireEvent, getByTestId, render } from "@testing-library/react";
import { InputsForm } from "../InputsForm";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { Icons } from "../InputsForm";

jest.mock('../../utils/icons', () => ({
    FaUserAlt: () => <div data-testid="FaUserAlt" />,
    PiLockKeyFill: () => <div data-testid="PiLockKeyFill" />,
    PiLockKeyOpenFill: () => <div data-testid="PiLockKeyOpenFill" />
}));

describe("Input Form", () => {
    let component: RenderResult;
    const inputValue = "paatlupi@gmail.com";

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <InputsForm
                    cssInput="inputCss"
                    cssPlaceholder="inputEmail"
                    cssIcon="inconCss"
                    cssValidasi="validasiCss"
                    typeInput="text"
                    changeInput={() => { }}
                    valueInput={inputValue}
                    valuePlaceholder="input email"
                    iconType="text"
                    maxInput={20}
                />
            </Provider>
        )
    });

    afterEach(() => {
        cleanup();
    });

    test("render correlty", () => {
        const inputElement = component.getByTestId("inputElement");
        const placeholderElement = component.queryByText("input email");

        expect(inputElement).toBeInTheDocument();
        expect(placeholderElement).toBeInTheDocument();
    });

    test("Should update input value when 'change inputElement' is triggered", () => {
        const inputElement = component.getByTestId("inputElement");

        // Event Change
        fireEvent.change(inputElement, { target: { value: inputValue } });
        // make sure value inputElement is paatlupi@gmail.com
        expect(inputElement).toHaveValue(inputValue);
    });

    test("should when iconType === 'PiLockKeyFill'", () => {
        component.rerender(
            <Provider store={store}>
                <InputsForm
                    typeInput="text"
                    changeInput={() => { }}
                    valueInput={inputValue}
                    valuePlaceholder="input email"
                    iconType="PiLockKeyFill"
                />
            </Provider>
        )

        const buttonTypePass = component.getByTestId("buttonIconElement");

        // make sure 'buttonTypePass' is in the DOM
        expect(buttonTypePass).toBeInTheDocument();

        const onClickMock = jest.fn();
        buttonTypePass.onclick = onClickMock;
        // Event onClick
        fireEvent.click(buttonTypePass);

        // make sure onClick function is executed
        expect(onClickMock).toHaveBeenCalledTimes(1)
    });

    test("", () => {

    })

    test('renders PiLockKeyOpenFill icon when iconType is "PiLockKeyOpenFill"', () => {
        const { getByTestId } = render(<Icons iconType="PiLockKeyOpenFill" />);
        expect(getByTestId('PiLockKeyOpenFill')).toBeInTheDocument();
    });

    test('renders FaUserAlt icon when iconType is "FaUserAlt"', () => {
        const { getByTestId } = render(<Icons iconType="FaUserAlt" />);
        expect(getByTestId('FaUserAlt')).toBeInTheDocument();
    });

    test('renders PiLockKeyFill icon when iconType is "PiLockKeyFill"', () => {
        const { getByTestId } = render(<Icons iconType="PiLockKeyFill" />);
        expect(getByTestId('PiLockKeyFill')).toBeInTheDocument();
    });

    test('does not render icon when iconType is undefined', () => {
        const { container } = render(<Icons iconType="UnknownIcon" />);
        expect(container.firstChild).toBeNull();
    });
});