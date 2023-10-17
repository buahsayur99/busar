import { RenderResult, cleanup, fireEvent, render } from "@testing-library/react";
import { FormAddress } from "../FormAddress";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { act } from "react-dom/test-utils";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { formLoginRegiterSlice } from "../../../app/actions/formLoginRegisterSlice";
import * as apiAddressSlice from "../../../app/actions/apiAddressSlice";

jest.useFakeTimers();

const dataInputFormAddress = {
    name: "",
    numberPhone: "",
    city: "",
    subdistrict: "",
    codePos: "",
    completeAddress: "",
    courierNote: "",
}

const dataInputFormAddressId = {
    id: 1,
    name: "",
    numberPhone: "",
    city: "",
    subdistrict: "",
    codePos: "",
    completeAddress: "",
    courierNote: "",
}

function stateApiAddress(isMessage: string, isLoading: boolean, inputFormAddress: any) {
    return configureStore({
        reducer: {
            formLoginRegisterSlice: formLoginRegiterSlice.reducer,
            apiAddress: (state = { isMessageAddress: isMessage, isLoading: isLoading, inputFormAddress: inputFormAddress }, action: AnyAction) => state,
        }
    })
}

describe("form address", () => {
    let component: RenderResult;
    let createAddressSpy: jest.SpyInstance;
    let updateAddressSpy: jest.SpyInstance;

    beforeEach(() => {
        // Mock onClicks function
        const onClicksMock = jest.fn();

        component = render(<Provider store={store}>
            <FormAddress
                onClicks={() => { onClicksMock }}
            />
        </Provider>)

        // Majukan timers sebanyak yang Anda butuhkan (500ms)
        act(() => {
            jest.advanceTimersByTime(500);
        });
    });

    afterEach(() => {
        cleanup();
    })

    test("render corretly", () => {
        const judulForm = component.getByRole("heading", { level: 2 });
        const btnCloseForm = component.getAllByRole("button")[0];
        const btnSave = component.getByRole("button", { name: "Save" });

        const componentInputName = component.getAllByTestId("inputElement")[0];
        const componentInputNumberPhone = component.getAllByTestId("inputElement")[1];
        const componentInputCity = component.getAllByTestId("inputElement")[2];
        const componentInputSubdistrict = component.getAllByTestId("inputElement")[3];
        const componentInputCodePos = component.getAllByTestId("inputElement")[4];
        const componentInputCompleteAddress = component.getByTestId("input-textarea");
        const componentInputCourierNote = component.getAllByTestId("inputElement")[5];

        expect(judulForm).toBeInTheDocument();
        expect(btnCloseForm).toBeInTheDocument();
        expect(btnSave).toBeInTheDocument();

        expect(componentInputName).toBeInTheDocument();
        expect(componentInputNumberPhone).toBeInTheDocument();
        expect(componentInputCity).toBeInTheDocument();
        expect(componentInputSubdistrict).toBeInTheDocument();
        expect(componentInputCodePos).toBeInTheDocument();
        expect(componentInputCompleteAddress).toBeInTheDocument();
        expect(componentInputCourierNote).toBeInTheDocument();
    });

    test("should update the input value when the input event change is triggered", () => {
        const inputName = component.getAllByTestId("inputElement")[0];
        const inputNumberPhone = component.getAllByTestId("inputElement")[1];
        const inputCity = component.getAllByTestId("inputElement")[2];
        const inputSubdistrict = component.getAllByTestId("inputElement")[3];
        const inputCodePos = component.getAllByTestId("inputElement")[4];
        const inputCompleteAddress = component.getByTestId("input-textarea");
        const inputCourierNote = component.getAllByTestId("inputElement")[5];

        fireEvent.change(inputName, { target: { value: "joko" } });
        fireEvent.change(inputNumberPhone, { target: { value: "1111" } });
        fireEvent.change(inputCity, { target: { value: "DKI Jakarta" } });
        fireEvent.change(inputSubdistrict, { target: { value: "Kembangan" } });
        fireEvent.change(inputCodePos, { target: { value: "11610" } });
        fireEvent.change(inputCompleteAddress, { target: { value: "jl.basmol raya" } });
        fireEvent.change(inputCourierNote, { target: { value: "rumah warna merah" } });

        expect(inputName).toHaveValue("joko");
        expect(inputNumberPhone).toHaveValue(1111);
        expect(inputCity).toHaveValue("DKI Jakarta");
        expect(inputSubdistrict).toHaveValue("Kembangan");
        expect(inputCodePos).toHaveValue(11610);
        expect(inputCompleteAddress).toHaveValue("jl.basmol raya");
        expect(inputCourierNote).toHaveValue("rumah warna merah");
    })

    test("should display component loading when isLoading is true", () => {
        component.rerender(<Provider store={stateApiAddress("", false, dataInputFormAddress)}>
            <FormAddress
                onClicks={() => { }}
            />
        </Provider>);

        // Memeriksa bahwa elemen "Loading" tidak ada di DOM
        expect(component.queryByText("Loading")).toBeNull();

        component.rerender(<Provider store={stateApiAddress("", true, dataInputFormAddress)}>
            <FormAddress
                onClicks={() => { }}
            />
        </Provider>)

        expect(component.getByText("Loading")).toBeInTheDocument();
    })

    test("should display the component AlertText when isMessageAddress 'add address success' and run the onClick event, make sure the onClick event function is run correlty", () => {
        component.rerender(
            <Provider store={stateApiAddress("add address success", false, dataInputFormAddress)}>
                <FormAddress
                    onClicks={() => { }}
                />
            </Provider>
        );

        // Make sure component alettext is in the DOM
        expect(component.getByText("add address success")).toBeInTheDocument();
        const buttonClose = component.getByRole("button", { name: "Close" });

        // Mock
        const onClickMock = jest.fn();
        buttonClose.onclick = onClickMock;

        fireEvent.click(buttonClose);

        // TImeout component AlertText
        jest.advanceTimersByTime(1000);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should display the component AlertText when isMessageAddress 'update address success' and run the onClick event, make sure the onClick event function is run corretly", () => {
        component.rerender(
            <Provider store={stateApiAddress("update address success", false, dataInputFormAddress)}>
                <FormAddress
                    onClicks={() => { }}
                />
            </Provider>
        );

        // Make sure component alettext is in the DOM
        expect(component.getByText("update address success")).toBeInTheDocument();
        const buttonClose = component.getByRole("button", { name: "Close" });

        // Mock
        const onClickMock = jest.fn();
        buttonClose.onclick = onClickMock;

        fireEvent.click(buttonClose);

        // TImeout component AlertText
        jest.advanceTimersByTime(1000);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("should create new address when it doesn't have inputFormAddress.id, and check value dispatch", () => {
        createAddressSpy = jest.spyOn(apiAddressSlice, "createAddress")

        const uuid = "12345-67890-12345";
        const mockApiUrl = "http://example.com/address";
        const dataInput = {
            uuidUser: uuid,
            name: "joko",
            numberPhone: "111111111111",
            city: "DKI Jakarta",
            subdistrict: "Kembangan",
            codePos: "11610",
            completeAddress: "Jln.Basmol Raya",
            courierNote: "rumah warna merah",
        }

        let getItemMock = jest.fn().mockReturnValue(uuid);
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);

        process.env.REACT_APP_API_URL_LOCAL = mockApiUrl;

        const expectedLink = `${mockApiUrl}/address`;

        fireEvent.change(component.getAllByTestId("inputElement")[0], { target: { value: dataInput.name } });
        fireEvent.change(component.getAllByTestId("inputElement")[1], { target: { value: dataInput.numberPhone } });
        fireEvent.change(component.getAllByTestId("inputElement")[2], { target: { value: dataInput.city } });
        fireEvent.change(component.getAllByTestId("inputElement")[3], { target: { value: dataInput.subdistrict } });
        fireEvent.change(component.getAllByTestId("inputElement")[4], { target: { value: dataInput.codePos } });
        fireEvent.change(component.getByTestId("input-textarea"), { target: { value: dataInput.completeAddress } });
        fireEvent.change(component.getAllByTestId("inputElement")[5], { target: { value: dataInput.courierNote } });

        const btnSave = component.getByRole("button", { name: "Save" });

        // Mock
        const onClickMock = jest.fn();
        btnSave.onclick = onClickMock;

        fireEvent.click(btnSave);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(createAddressSpy).toHaveBeenCalledWith({ data: dataInput, link: expectedLink })
    });

    test("should update address when it have inputFormAddress.id, and check value dispatch", () => {
        component.rerender(
            <Provider store={stateApiAddress("", false, dataInputFormAddressId)}>
                <FormAddress
                    onClicks={() => { }}
                />
            </Provider>
        )
        updateAddressSpy = jest.spyOn(apiAddressSlice, "updateAddress");

        const uuid = "12345-67890-12345";
        const mockApiUrl = "http://example.com/address";
        const dataInput = {
            name: "joko",
            numberPhone: "111111111111",
            city: "DKI Jakarta",
            subdistrict: "Kembangan",
            codePos: "11610",
            completeAddress: "Jln.Basmol Raya",
            courierNote: "rumah warna merah",
        }

        let getItemMock = jest.fn().mockReturnValue(uuid);
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);

        process.env.REACT_APP_API_URL_LOCAL = mockApiUrl;

        const expectedLink = `${mockApiUrl}/address`;

        fireEvent.change(component.getAllByTestId("inputElement")[0], { target: { value: dataInput.name } });
        fireEvent.change(component.getAllByTestId("inputElement")[1], { target: { value: dataInput.numberPhone } });
        fireEvent.change(component.getAllByTestId("inputElement")[2], { target: { value: dataInput.city } });
        fireEvent.change(component.getAllByTestId("inputElement")[3], { target: { value: dataInput.subdistrict } });
        fireEvent.change(component.getAllByTestId("inputElement")[4], { target: { value: dataInput.codePos } });
        fireEvent.change(component.getByTestId("input-textarea"), { target: { value: dataInput.completeAddress } });
        fireEvent.change(component.getAllByTestId("inputElement")[5], { target: { value: dataInput.courierNote } });

        const btnSave = component.getByRole("button", { name: "Save" });

        // Mock
        const onClickMock = jest.fn();
        btnSave.onclick = onClickMock;

        fireEvent.click(btnSave);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(updateAddressSpy).toHaveBeenCalledWith({ data: dataInput, link: expectedLink })
    })
})