import { render, screen } from "@testing-library/react";
import { BannerForm } from "../BannerForm";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import user from "@testing-library/user-event";

describe("Banner Form", () => {
    test("renders the correct title and text", () => {
        const children = "jika belom memiliki akun silakan register";
        const judulText = "create";
        const spanText = "account";

        const { getByText } = render(
            <Provider store={store}>
                <BannerForm
                    children={children}
                    judulText={judulText}
                    spanText={spanText}
                    onClick={() => { }}
                />
            </Provider>
        );

        const headingElement = getByText(/create/i);
        const spanElement = getByText(/account/i);
        const textElement = getByText(/jika belom memiliki akun silakan register/i);

        expect(headingElement).toBeInTheDocument();
        expect(spanElement).toBeInTheDocument();
        expect(textElement).toBeInTheDocument();
    })

    test("calls onClick when the button is clicked", async () => {
        const onClickMock = jest.fn();

        render(
            <Provider store={store}>
                <BannerForm
                    children={"jika belom memiliki akun silakan register"}
                    judulText={"create"}
                    spanText={"account"}
                    onClick={onClickMock}
                />
            </Provider>
        )

        const buttonElement = screen.getByRole("button")
        expect(buttonElement).toBeInTheDocument();

        await user.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    })
})