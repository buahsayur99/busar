import { renderHook } from "@testing-library/react";
import { useSaveLastPage } from "../useSaveLastPage";
import { Provider } from "react-redux";
import { AnyAction, configureStore } from "@reduxjs/toolkit";

function createIsLoadingAuth(loading: boolean) {
    return configureStore({
        reducer: {
            apiUsers: (state = {
                isLoading: false,
                isLoadingAuth: loading,
                isError: null,
                isMessage: "",
                dataLoginUsers: null,
                isUuid: null
            }, action: AnyAction) => state,
        }
    })
}

describe("useSaveLastPage", () => {
    test("should when isLoadingAuth === false make sure custome hook useSaveLastPage not undefined", () => {
        const { result } = renderHook(() => useSaveLastPage(), {
            wrapper: ({ children }) => <Provider store={createIsLoadingAuth(false)}>{children}</Provider>,
        });

        expect(useSaveLastPage).toBeDefined();

        // Check initial state
        expect(result.current.infoHalaman).toEqual({
            page_path: "/",
            page_url: "http://localhost/",
            is_authenticated: true,
        });
    });
});
