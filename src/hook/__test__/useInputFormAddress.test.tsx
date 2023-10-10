import { renderHook } from "@testing-library/react"
import { useInputFormAddress } from "../useInputFormAddress"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import { act } from "react-dom/test-utils"

describe("useInputFormAddress", () => {
    test("should update input value correctly, and check value input", () => {
        // Memanggil useInputFormAddress dengan mockChangeInputValue yang telah dimodifikasi
        const { result } = renderHook(() => useInputFormAddress(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        });

        // Memanggil fungsi dalam hook
        act(() => {
            result.current.changeInputValue({
                name: "a", numberPhone: "111",
                city: "dki", subdistrict: "kal",
                codePos: "1234", completeAddress: "basmol",
                courierNote: ""
            });
        });

        // Check value input
        expect(result.current.input).toEqual({
            name: "a", numberPhone: "111",
            city: "dki", subdistrict: "kal",
            codePos: "1234", completeAddress: "basmol",
            courierNote: ""
        });
    })

    test("should when input minimum character, display danger validation", () => {
        // Memanggil useInputFormAddress dengan mockChangeInputValue yang telah dimodifikasi
        const { result } = renderHook(() => useInputFormAddress(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        });

        // Memanggil fungsi dalam hook
        act(() => {
            result.current.changeInputValue({
                name: "a", numberPhone: "111",
                city: "dki", subdistrict: "kal",
                codePos: "1234", completeAddress: "basmol",
                courierNote: ""
            });
        });

        // Check value Validasi input
        expect(result.current.validasiInput).toEqual({
            name: { status: true, text: "Name is too short (minimum 4 digits)." },
            numberPhone: { status: true, text: "Number phone is too short (minimum 10 digits)." },
            city: { status: true, text: "City is too short (minimum 4 digits)." },
            subdistrict: { status: true, text: "Subdistrict is too short (minimum 4 digits)." },
            codePos: { status: true, text: "CodePos is too short (minimum 5 digits)." },
            completeAddress: { status: true, text: "Complete Address is too short (minimum 15 digits)." },
            courierNote: { status: null, text: "" }
        });
    });

    test("should when input empty, display danger validation", () => {
        // Memanggil useInputFormAddress dengan mockChangeInputValue yang telah dimodifikasi
        const { result } = renderHook(() => useInputFormAddress(), {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            ),
        });

        // Memanggil fungsi dalam hook
        act(() => {
            result.current.changeInputValue({
                name: "a", numberPhone: "111",
                city: "dki", subdistrict: "kal",
                codePos: "1234", completeAddress: "basmol",
                courierNote: ""
            });
        });

        act(() => {
            result.current.changeInputValue({
                name: "", numberPhone: "",
                city: "", subdistrict: "",
                codePos: "", completeAddress: "",
                courierNote: ""
            });
        });

        // Check value Validasi input
        expect(result.current.validasiInput).toEqual({
            name: { status: true, text: "Name Must be filled in" },
            numberPhone: { status: true, text: "Number phone must be filled in" },
            city: { status: true, text: "City must be filled in" },
            subdistrict: { status: true, text: "Subdistrict must be filled in" },
            codePos: { status: true, text: "CodePos must be filled in" },
            completeAddress: { status: true, text: "Complete Address must be filled in" },
            courierNote: { status: null, text: "" }
        });
    });
})