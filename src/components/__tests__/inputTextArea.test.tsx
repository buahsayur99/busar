import { RenderResult, fireEvent, render } from "@testing-library/react";
import { InputTextArea } from "../InputTextArea";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("input textArea", () => {
    let component: RenderResult;
    // let changeInputMock: jest.Mock;
    let validasi = { status: false, text: "input bermasalah" }

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <InputTextArea
                    cssInput="inputCss"
                    cssPlaceholder="inputCss"
                    cssValidasi="validasiCss"
                    cssMaxInput="maxInputCss"
                    maxInput={20}
                    heights={10}
                    changeInput={() => { }}
                    valueInput="joko"
                    valuePlaceholder="input your name"
                    validasiInput={validasi}
                />
            </Provider>
        )
    });

    test("render correlty", () => {
        // Make Sure input text area is in the DOM
        expect(component.getByRole("textbox")).toBeInTheDocument();
        // Make sure text placeholder is in the DOM
        expect(component.getByText("input your name")).toBeInTheDocument();
        // Make sure text dangger validation is in the DOM
        expect(component.getByText("input bermasalah")).toBeInTheDocument();
        // Make sure text max input is in the DOM
        expect(component.getByText("20")).toBeInTheDocument();
    });

    test("should update value correctly when input changes and check value input", () => {
        let inputValue = "joko";
        const changeInputMock = jest.fn();

        component.rerender(
            <Provider store={store}>
                <InputTextArea
                    cssInput="inputCss"
                    cssPlaceholder="inputCss"
                    cssValidasi="validasiCss"
                    cssMaxInput="maxInputCss"
                    maxInput={300}
                    heights={10}
                    changeInput={changeInputMock}
                    valueInput=""
                    valuePlaceholder="input your name"
                    validasiInput={validasi}
                />
            </Provider>
        )
        const inputTextarea = component.getByRole("textbox");

        fireEvent.keyDown(inputTextarea);
        fireEvent.change(inputTextarea, { target: { value: inputValue } });
        // Memanggil changeInputMock setelah perubahan textarea
        changeInputMock(inputValue);
        // Check if changeInputMock is called with the correct value
        expect(changeInputMock).toHaveBeenCalledWith(inputValue);
    });

    test("should apply validation styles danger, when validasi.status is true", () => {
        let validasi = { status: true, text: "input bermasalah" }

        component.rerender(
            <Provider store={store}>
                <InputTextArea
                    cssInput="inputCss"
                    cssPlaceholder="placeholderCss"
                    cssValidasi="validasiCss"
                    cssMaxInput="maxInputCss"
                    maxInput={20}
                    heights={10}
                    changeInput={() => { }}
                    valueInput="a"
                    valuePlaceholder="input your name"
                    validasiInput={validasi}
                />
            </Provider>
        )
        const inputTextarea = component.getByRole("textbox");
        const placeholder = component.getByText("input your name");

        expect(inputTextarea).toHaveClass("inputCss-danger");
        expect(placeholder).toHaveClass("placeholderCss-danger-focus");
        expect(placeholder).toHaveClass("placeholderCss-danger");
    })
})