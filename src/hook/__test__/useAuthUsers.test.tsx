import { render, renderHook, RenderResult } from "@testing-library/react";
import * as apiUsersSlice from "../../app/actions/apiUsersSlice";
import { useAuthUsers } from "../useAuthUsers";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { FormLoginRegister } from "../../features/formLoginRegister/FormLoginRegister";
import { act } from "react-dom/test-utils";

function apiUsersInitialState(isMessage: string, dataLoginUsers: any) {
    return configureStore({
        reducer: {
            apiUsers: (state = {
                isLoading: false, isError: null, isMessage: isMessage, dataLoginUsers: dataLoginUsers
            }, action: AnyAction) => state,
        }
    })
}

function setupLocalStorage() {
    const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
    };

    Object.defineProperty(global, 'localStorage', {
        value: localStorageMock,
    });

    return localStorageMock;
}

describe("useAuthUsers", () => {
    let authLogin: jest.SpyInstance;

    beforeEach(() => {
        authLogin = jest.spyOn(apiUsersSlice, "authLogin");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should request User API and dispatch authLogin with correct link", () => {
        const uuid = "12345-67890-12345";
        const mockApiUrl = "http://example.com/api";
        const expectedLink = `${mockApiUrl}/me/${uuid}`;

        process.env.REACT_APP_API_URL_LOCAL = mockApiUrl;
        localStorage.setItem("uuid", uuid);
        localStorage.getItem = jest.fn().mockReturnValue(uuid);

        const { result } = renderHook(() => useAuthUsers(), {
            wrapper: ({ children }) => (
                <Provider store={apiUsersInitialState("", { uuid: uuid })}>{children}</Provider>
            ),
        });

        result.current.requestUserApi();
        expect(authLogin).toHaveBeenCalledWith({ link: expectedLink });
    })

    test("should remove item from localStorage when isMessage is rejected", () => {
        const localStorageMock = setupLocalStorage();

        renderHook(() => useAuthUsers(), {
            wrapper: ({ children }) => (
                <Provider store={apiUsersInitialState("user tidak di temukan", null)}>{children}</Provider>
            ),
        });

        // Ensure removeItem was called with the correct event
        expect(localStorageMock.removeItem).toHaveBeenCalledWith("uuid");
    })
})