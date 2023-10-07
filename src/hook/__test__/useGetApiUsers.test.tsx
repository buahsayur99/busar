import { renderHook } from "@testing-library/react";
import { useGetApiUsers } from "../useGetApiUsers";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import * as apiUsersSlice from "../../app/actions/apiUsersSlice";

describe("use get api users", () => {
    let getApiUsers: jest.SpyInstance;

    beforeEach(() => {
        getApiUsers = jest.spyOn(apiUsersSlice, "getUsers");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("get users", () => {
        const isMessage = "update user success";
        const dataLoginUsers = {
            email: "joko@gmail.com",
            role: "users",
            uuid: "123456",
            idAddress: 12
        }

        const uuid = "1234";
        localStorage.setItem("uuid", uuid);
        process.env.REACT_APP_API_URL_LOCAL = "http://example.com/api";

        const expectedLink = `${process.env.REACT_APP_API_URL_LOCAL}/get/users/${dataLoginUsers.uuid}`;

        renderHook(() => useGetApiUsers({ isMessage, dataLoginUsers }), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
        });

        expect(useGetApiUsers).toBeDefined();

        expect(getApiUsers).toHaveBeenCalledWith({ link: expectedLink })
    })
})