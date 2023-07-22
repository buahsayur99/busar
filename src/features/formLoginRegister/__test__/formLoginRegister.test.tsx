import { FormLoginRegister } from "../FormLoginRegister";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { activeFormTransition } from "../../../app/actions/formLoginRegisterSlice";
import { store } from "../../../app/store";

describe("Form Login Register", () => {
    // const mockStore = configureStore([]);
    test("", () => {

    })

    // test("renders component by activeTransitionForm.formLogin === true", () => {
    //     const stores = mockStore({
    //         formLoginRegisterSlice: {
    //             activeTransitionForm: {
    //                 onOffForm: true,
    //                 formLogin: true,
    //                 bannerLogin: false,
    //                 formRegister: false,
    //                 bannerRegiter: true,
    //             },
    //         },
    //     });

    //     const { queryAllByRole, getAllByRole } = render(
    //         <Provider store={stores}>
    //             <FormLoginRegister />
    //         </Provider>
    //     );

    //     const loginComponents = queryAllByRole("login-component");
    //     expect(loginComponents).toHaveLength(2); // there is 2 component login, for dimensi +550 and dimensi -550

    //     const registerComponents = queryAllByRole("register-component");
    //     expect(registerComponents).toHaveLength(1); // there is 1 component register. for dimensi +550

    //     const bannerFormComponents = getAllByRole("banner-form-component");
    //     expect(bannerFormComponents).toHaveLength(2); // there is 2 component bannerForm. For banner Login dan banner register

    //     // Check if the button with the desired class exists
    //     const buttons = getAllByRole("button");
    //     const closeButton = buttons.find((button) =>
    //         button.classList.contains("btn-close-form")
    //     );
    //     expect(closeButton).toBeInTheDocument();
    // });

    // test("clicking close button triggers form close action", () => {
    //     const dispatchSpy = jest.spyOn(store, "dispatch");

    //     const { queryAllByTestId, getByTestId } = render(
    //         <Provider store={store}>
    //             <FormLoginRegister />
    //         </Provider>
    //     );

    //     const bgBlackElement = getByTestId("bg-black");
    //     expect(bgBlackElement).toBeInTheDocument();
    //     expect(bgBlackElement).toHaveClass("scale-in-center_bg-black");

    //     const closeButtons = queryAllByTestId('close-button');
    //     expect(closeButtons).toHaveLength(2);

    //     const closeButton = closeButtons[0];
    //     fireEvent.click(closeButton);

    //     expect(dispatchSpy).toHaveBeenCalledWith(activeFormTransition({ onOffForm: false }));
    //     dispatchSpy.mockRestore();
    //     expect(bgBlackElement).toHaveClass("scale-out-center_bg-black");
    // });

    // test("check classname dimensi +550 by activeTransitionForm", () => {
    //     const stores = mockStore({
    //         formLoginRegisterSlice: {
    //             activeTransitionForm: {
    //                 onOffForm: true,
    //                 formLogin: true,
    //                 bannerLogin: false,
    //                 formRegister: false,
    //                 bannerRegiter: true,
    //             },
    //         },
    //     });

    //     const { getAllByRole } = render(
    //         <Provider store={stores}>
    //             <FormLoginRegister />
    //         </Provider>
    //     );

    //     const bannerFormComponents = getAllByRole("banner-form-component");
    //     expect(bannerFormComponents[0]).toHaveClass("banner-login-out-top-active"); // Banner login out
    //     expect(bannerFormComponents[1]).toHaveClass("banner-register-out-top"); // Banner register show

    //     const loginComponents = getAllByRole("login-component");
    //     expect(loginComponents[0]).toHaveClass("form-login_out-bottom"); // Form Login show

    //     const registerComponents = getAllByRole("register-component");
    //     expect(registerComponents[0]).toHaveClass("form-register_out-bottom-active") // Form register out
    // });

    // test("check classname dimensi +550 by activeTransitionForm", () => {
    //     const stores = mockStore({
    //         formLoginRegisterSlice: {
    //             activeTransitionForm: {
    //                 onOffForm: true,
    //                 formLogin: false,
    //                 bannerLogin: true,
    //                 formRegister: true,
    //                 bannerRegiter: false,
    //             },
    //         },
    //     });

    //     const { getAllByRole } = render(
    //         <Provider store={stores}>
    //             <FormLoginRegister />
    //         </Provider>
    //     );

    //     const bannerFormComponents = getAllByRole("banner-form-component");
    //     expect(bannerFormComponents[0]).toHaveClass("banner-login-out-top"); // Banner login show
    //     expect(bannerFormComponents[1]).toHaveClass("banner-register-out-top-active"); // Banner register out

    //     const loginComponents = getAllByRole("login-component");
    //     expect(loginComponents[0]).toHaveClass("form-login_out-bottom-active"); // Form Login out

    //     const registerComponents = getAllByRole("register-component");
    //     expect(registerComponents[0]).toHaveClass("form-register_out-bottom") // Form register show
    // });

    // test("check classname dimensi -550 by activeTransitionForm.formLogin: true", () => {
    //     const stores = mockStore({
    //         formLoginRegisterSlice: {
    //             activeTransitionForm: {
    //                 onOffForm: true,
    //                 formLogin: true,
    //                 bannerLogin: false,
    //                 formRegister: false,
    //                 bannerRegiter: true,
    //             },
    //         },
    //     });

    //     const { getAllByRole } = render(
    //         <Provider store={stores}>
    //             <FormLoginRegister />
    //         </Provider>
    //     );

    //     const loginComponents = getAllByRole("login-component");
    //     expect(loginComponents[1]).toHaveClass("form-login_out-bottom"); // Form Login show
    // });

})