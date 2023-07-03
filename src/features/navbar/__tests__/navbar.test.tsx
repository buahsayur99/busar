import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import Navbar from "../Navbar";

describe("NavigationBar", () => {
    test("Render Correctly", () => {
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        )

        const elementHeading = screen.getByRole("heading", {
            name: "Keep Aduh"
        });
        expect(elementHeading).toBeInTheDocument();
    })
})