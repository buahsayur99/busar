import { fireEvent, getByTestId, render } from "@testing-library/react";
import { InputsForm } from "../InputsForm";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { Icons } from "../InputsForm";
import { act } from "react-dom/test-utils";

jest.mock('../../utils/icons', () => ({
    FaUserAlt: () => <div data-testid="FaUserAlt" />,
    PiLockKeyFill: () => <div data-testid="PiLockKeyFill" />,
    PiLockKeyOpenFill: () => <div data-testid="PiLockKeyOpenFill" />
}));

describe('Icons', () => {
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

describe("Input Form", () => {
    // test("render input", () => {
    //     const typeInput = "text";
    //     const valuePlaceholder = "enter your name";
    //     const valueInput = "";

    //     const { getByTestId } = render(
    //         <Provider store={store}>
    //             <InputsForm
    //                 typeInput={typeInput}
    //                 valuePlaceholder={valuePlaceholder}
    //                 valueInput={valueInput}
    //                 changeInput={() => { }}
    //             />
    //         </Provider>
    //     )

    //     const inputElement = getByTestId("inputElement") as HTMLInputElement;
    //     expect(inputElement).toBeInTheDocument();
    // });

    // test("calls changeInput Function when input value changes", () => {
    //     const changeInputMock = jest.fn();

    //     const { getByTestId } = render(
    //         <Provider store={store}>
    //             <InputsForm
    //                 typeInput="text"
    //                 valuePlaceholder="input your name"
    //                 valueInput=""
    //                 changeInput={changeInputMock}
    //             />
    //         </Provider>
    //     )

    //     const inputElement = getByTestId("inputElement") as HTMLInputElement;
    //     fireEvent.change(inputElement, { target: { value: "name" } });

    //     expect(changeInputMock).toHaveBeenCalledWith("name");
    // });

    // test("should when valueInput.length === 0 className", async () => {
    //     const valueInput = ""
    //     const { queryAllByTestId } = render(
    //         <Provider store={store}>
    //             <InputsForm
    //                 typeInput="text"
    //                 iconType="PiLockKeyFill"
    //                 valuePlaceholder="input your name"
    //                 valueInput={valueInput}
    //                 changeInput={() => { }}
    //             />
    //         </Provider>
    //     );

    //     const inputElement = queryAllByTestId("inputElement")[0] as HTMLInputElement;
    //     expect(inputElement).toHaveClass("input-form"); // when valueInput.length !== 0
    //     const buttonIconElement = queryAllByTestId("inputElement")[1] as HTMLInputElement; // untuk button icon
    //     expect(buttonIconElement).toHaveClass("parent-icon"); // when valueInput.length !== 0
    // });

    // test("should when valueInput.length !== 0 change className", async () => {
    //     const valueInput = "joko"
    //     const { queryAllByTestId } = render(
    //         <Provider store={store}>
    //             <InputsForm
    //                 typeInput="text"
    //                 iconType="PiLockKeyFill"
    //                 valuePlaceholder="input your name"
    //                 valueInput={valueInput}
    //                 changeInput={() => { }}
    //             />
    //         </Provider>
    //     );

    //     const inputElement = queryAllByTestId("inputElement")[0] as HTMLInputElement;
    //     expect(inputElement).toHaveClass("input-form-active"); // when valueInput.length !== 0
    //     const buttonIconElement = queryAllByTestId("inputElement")[1] as HTMLInputElement; // untuk button icon
    //     expect(buttonIconElement).toHaveClass("parent-icon-active"); // when valueInput.length !== 0
    // });

    // test('toggles password visibility and updates input type when PiLockKeyFill icon is clicked', () => {
    //     jest.useFakeTimers();

    //     const { getByTestId, queryAllByTestId } = render(
    //         <InputsForm
    //             typeInput="password"
    //             iconType="PiLockKeyFill"
    //             changeInput={() => { }}
    //             valueInput="joko"
    //             valuePlaceholder="input your name"
    //         />
    //     );

    //     const iconElement = getByTestId('PiLockKeyFill');
    //     const inputElements = queryAllByTestId('inputElement') as HTMLInputElement[];
    //     const inputElement = inputElements[0];

    //     fireEvent.click(iconElement);
    //     Object.defineProperty(inputElement, 'type', { value: 'text', writable: true });
    //     expect(inputElement?.type).toBe('text');

    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     expect(document.activeElement).toBe(inputElement);

    //     fireEvent.click(iconElement);
    //     Object.defineProperty(inputElement, 'type', { value: 'password', writable: true });
    //     expect(inputElement?.type).toBe('password');
    // });

    // test("check className if iconType !== PiLockKeyFill and valueInput.length !== 0", () => {
    //     const { getByTestId } = render(
    //         <InputsForm
    //             typeInput="password"
    //             iconType="FaUserAlt"
    //             changeInput={() => { }}
    //             valueInput="joko"
    //             valuePlaceholder="input your name"
    //         />
    //     );

    //     const buttonIconElement = getByTestId("buttonIconElement");
    //     expect(buttonIconElement).toHaveClass("parent-icon-active")
    // })
});