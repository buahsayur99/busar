import { render, screen } from "@testing-library/react";
import { Buttons } from "../Buttons";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("Button", () => {
    test("render correctly with the props parameter", () => {
        render(
            <Provider store={store}>
                <Buttons
                    children={"Login"}
                    styleScss={"btn"}
                    stylesBtn={{ width: "6rem", height: "2.5rem", fontSize: "1.2rem" }}
                />
            </Provider>
        )

        const buttonElement = screen.getByRole("button", {
            name: "Login"
        })

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass("btn");
    })
})