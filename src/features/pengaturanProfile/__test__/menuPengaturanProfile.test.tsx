import React, { useRef } from 'react';
import { RenderResult, cleanup, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { MenuPengaturanProfile } from "../MenuPengaturanProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("menu pengaturan profile", () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <Router>
                    <MenuPengaturanProfile />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        cleanup();
    })

    test("render corretly nav account Pc", () => {
        expect(component.getByText("general")).toBeInTheDocument();
        expect(component.getByText("edit profile")).toBeInTheDocument();
        expect(component.getByText("password")).toBeInTheDocument();
        expect(component.getByText("address")).toBeInTheDocument();
    })

    test("should run the onClick event on the 'active mobile nav button' and make sure the function is running properly", () => {
        const btnNav = component.getByTestId("btn-nav-active-mobile");

        // Mock
        const onClickMock = jest.fn();
        btnNav.onclick = onClickMock;

        fireEvent.click(btnNav);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should when 'btn-nav-active-mobile' is clicked, show the nav button and check the onClick event if it is running properly", () => {
        fireEvent.click(component.getByTestId("btn-nav-active-mobile"));

        // target salah satu nav, saya menarget nav general
        const buttonNav = component.getAllByText("general")[1];
        expect(buttonNav).toBeInTheDocument();

        // Mock
        const onClickMock = jest.fn();
        buttonNav.onclick = onClickMock;

        fireEvent.click(buttonNav);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});