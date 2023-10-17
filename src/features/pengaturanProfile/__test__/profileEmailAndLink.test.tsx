import { RenderResult, cleanup, render } from "@testing-library/react";
import { ProfileEmailAndLink } from "../ProfileEmailAndLink";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { LoginUsers } from "../../../app/actions/apiUsersSlice";

const usersLogin = {
    email: "paatlupi@gmail.com",
    role: "users",
    uuid: "123456789",
    idAddress: 10,
}

function stateRedux(dataLoginUsers: LoginUsers) {
    return configureStore({
        reducer: {
            apiUsers: (state = { dataLoginUsers: dataLoginUsers }, account: AnyAction) => state
        }
    })
}

// Mock the custom hook
let mockUseSaveLastPage: jest.Mock;

jest.mock("../../../hook/useSaveLastPage", () => ({
    useSaveLastPage: () => mockUseSaveLastPage(),
}));

function useSaveLastPageMock(page: string) {
    mockUseSaveLastPage = jest.fn(() => ({
        infoHalaman: {
            page_path: page,
            page_url: "http://localhost:3000/account",
            is_authenticated: true
        }
    }));
}

describe("profile email and link", () => {
    let component: RenderResult;

    beforeEach(() => {
        useSaveLastPageMock("/account");

        component = render(
            <Provider store={store}>
                <Router>
                    <ProfileEmailAndLink />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
    })

    test("render correctly", () => {
        component.rerender(
            <Provider store={stateRedux(usersLogin)}>
                <Router>
                    <ProfileEmailAndLink />
                </Router>
            </Provider>
        );

        const elementEmail = component.getByRole("heading", { name: usersLogin.email });
        const elementPage = component.getByRole("heading", { level: 3 });

        expect(elementEmail).toBeInTheDocument();
        expect(elementPage).toBeInTheDocument();

        // make sure when page_path = /account is in the DOM
        expect(component.getByText("Update your email and manage your account")).toBeInTheDocument();
    });

    test("should display 'Add your profile image' when page_path is '/account/profile'", () => {
        useSaveLastPageMock("/account/profile");

        component.rerender(
            <Provider store={store}>
                <Router>
                    <ProfileEmailAndLink />
                </Router>
            </Provider>
        );

        // make sure when page_path = /account/profile is in the DOM
        expect(component.getByText("Add your profile image")).toBeInTheDocument();
    });

    test("should display 'Manage your password' when page_path is '/account/password'", () => {
        useSaveLastPageMock("/account/password");

        component.rerender(
            <Provider store={store}>
                <Router>
                    <ProfileEmailAndLink />
                </Router>
            </Provider>
        );

        // make sure when page_path = /account/profile is in the DOM
        expect(component.getByText("Manage your password")).toBeInTheDocument();
    });

    test("should display 'Manage your address' when page_path is '/account/address'", () => {
        useSaveLastPageMock("/account/address");

        component.rerender(
            <Provider store={store}>
                <Router>
                    <ProfileEmailAndLink />
                </Router>
            </Provider>
        );

        // make sure when page_path = /account/profile is in the DOM
        expect(component.getByText("Manage your address")).toBeInTheDocument();
    });
})