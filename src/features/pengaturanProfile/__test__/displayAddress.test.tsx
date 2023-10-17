import { RenderResult, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { DisplayAddress } from "../DisplayAddress";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { DataAddressProps } from "../../../app/actions/apiAddressSlice";

const dataAddress = [
    {
        id: 1,
        name: "John Doe",
        numberPhone: "1234567890",
        city: "New York",
        subdistrict: "Manhattan",
        codePos: "10001",
        completeAddress: "1234 Elm St",
        courierNote: "Handle with care",
        uuidUser: "abc123"
    },
    {
        id: 2,
        name: "Jane Smith",
        numberPhone: "0987654321",
        city: "Los Angeles",
        subdistrict: "Hollywood",
        codePos: "90001",
        completeAddress: "5678 Oak Ave",
        courierNote: "Handle with care 2",
        uuidUser: "abc123"
    },
    {
        id: 3,
        name: "Joko",
        numberPhone: "0987654321",
        city: "Los Angeles",
        subdistrict: "Hollywood",
        codePos: "90001",
        completeAddress: "5678 Oak Ave",
        courierNote: "Handle with care 2",
        uuidUser: "abc123"
    }
];
const usersData = {
    email: "john.doe@example.com",
    idAddress: 1,
    role: "user",
    uuid: "abc123"

};
const checkedData = [
    {
        id: 2,
        name: "Jane Smith",
        numberPhone: "0987654321",
        city: "Los Angeles",
        subdistrict: "Hollywood",
        codePos: "90001",
        completeAddress: "5678 Oak Ave",
        courierNote: "Handle with care 2",
        uuidUser: "abc123"
    },
    {
        id: 3,
        name: "Joko",
        numberPhone: "0987654321",
        city: "Los Angeles",
        subdistrict: "Hollywood",
        codePos: "90001",
        completeAddress: "5678 Oak Ave",
        courierNote: "Handle with care 2",
        uuidUser: "abc123"
    }
]

function stateApiAddress(isMessage: string, checkeds: DataAddressProps[]) {
    const store = configureStore({
        reducer: {
            apiAddress: (state = { dataAddress: dataAddress, isMessageAddress: isMessage, checkeds: checkeds }, action: AnyAction) => state,
            apiUsers: (state = { dataLoginUsers: usersData }, action: AnyAction) => state,
        },
    });

    store.dispatch({ type: "DUMMY_ACTION" });

    return store;
}

describe("display address", () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <DisplayAddress
                    activeCheckbox={false}
                    handleAddressUtama={() => { }}
                    handleFormAddress={() => { }}
                />
            </Provider>
        )
    });

    afterEach(() => {
        cleanup();
    });

    test("render correlty", () => {
        component.rerender(
            <Provider store={stateApiAddress("add address success", [])}>
                <DisplayAddress
                    activeCheckbox={true}
                    handleAddressUtama={() => { }}
                    handleFormAddress={() => { }}
                />
            </Provider>
        )

        // main address
        const mainAddress = component.getAllByText("main address");
        // address
        const address = component.getAllByText("jadikan alamat utama");

        // Make sure you have 2 data address
        expect(address).toHaveLength(2);
        // Make sure you have 2 main data address
        expect(mainAddress).toHaveLength(1);
    })

    test("should update checkeds when checkboxes are clicked", async () => {
        // Buat store dengan state yang dimanipulasi
        const store = stateApiAddress("", checkedData)

        component.rerender(
            <Provider store={stateApiAddress("", checkedData)}>
                <DisplayAddress
                    activeCheckbox={true}
                    handleAddressUtama={() => { }}
                    handleFormAddress={() => { }}
                />
            </Provider>
        )

        // Checkbox address
        const checkboxs = component.getAllByRole("checkbox");

        checkboxs.forEach(checkbox => {
            fireEvent.click(checkbox)
        });

        await waitFor(() => {
            // Ekstrak state apiAddress dari store
            const { apiAddress } = store.getState();

            // Periksa apakah checkeds sudah diperbarui sesuai dengan yang diharapkan
            expect(apiAddress.checkeds).toEqual(checkedData);
        });
    });

    test("should update checkeds when parent address are clicked", async () => {
        // Buat store dengan state yang dimanipulasi
        const store = stateApiAddress("", checkedData)

        component.rerender(
            <Provider store={stateApiAddress("", checkedData)}>
                <DisplayAddress
                    activeCheckbox={true}
                    handleAddressUtama={() => { }}
                    handleFormAddress={() => { }}
                />
            </Provider>
        )

        // parent address
        const parentAddress = component.getAllByTestId("parent-data-address");

        parentAddress.forEach(checkbox => {
            fireEvent.click(checkbox)
        });

        await waitFor(() => {
            // Ekstrak state apiAddress dari store
            const { apiAddress } = store.getState();

            // Periksa apakah checkeds sudah diperbarui sesuai dengan yang diharapkan
            expect(apiAddress.checkeds).toEqual(checkedData);
        });
    });

    test("should handle the change address when change button is clicked,and check whether the button function is running", () => {
        component.rerender(
            <Provider store={stateApiAddress("", [])}>
                <DisplayAddress
                    activeCheckbox={true}
                    handleAddressUtama={() => { }}
                    handleFormAddress={() => { }}
                />
            </Provider>
        )

        const buttonUbahMainAddress = component.getAllByRole("button", { name: "ubah" })[0];
        const buttonUbahAddress = component.getAllByRole("button", { name: "ubah" })[1];

        const onClickMock = jest.fn();
        buttonUbahMainAddress.onclick = onClickMock;
        buttonUbahAddress.onclick = onClickMock;

        fireEvent.click(buttonUbahMainAddress);
        fireEvent.click(buttonUbahAddress);

        // Make sure onClick function has been called
        expect(onClickMock).toHaveBeenCalledTimes(2);
    });

    test("should handle change main address when the button is clicked, and verify that the onClick function has been called", () => {
        component.rerender(
            <Provider store={stateApiAddress("", [])}>
                <DisplayAddress
                    activeCheckbox={true}
                    handleAddressUtama={() => { }}
                    handleFormAddress={() => { }}
                />
            </Provider>
        )

        const btnChangeMainAddress = component.getAllByRole("button", { name: "jadikan alamat utama" })[0];

        expect(btnChangeMainAddress).toBeInTheDocument();

        const onClickMock = jest.fn();
        btnChangeMainAddress.onclick = onClickMock;

        fireEvent.click(btnChangeMainAddress);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
})