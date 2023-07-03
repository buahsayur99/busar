import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useScrollNavbar } from "../useScrollNavbar";

describe("useScrollNavbar", () => {
    it("render the windows scroll and state scrolled", () => {
        const { result } = renderHook(() => useScrollNavbar());

        expect(window.scrollY).toBe(0); // Pastikan window.scrollY bernilai 0
        expect(result.current.scrolled).toBe(false); // Pastikan nilai false
    })

    it("should set scrolled to true when window.scrollY > 80", () => {
        const { result } = renderHook(() => useScrollNavbar());

        expect(window.scrollY).toBe(0); // Pastikan window.scrollY bernilai 0

        // Mengubah nilai window.scrollY ke 100
        act(() => {
            window.scrollY = 100;
            window.dispatchEvent(new Event("scroll"));
        });

        expect(result.current.scrolled).toBe(true); // Pastikan nilai telah berubah menjadi true
    });

    it("should set scrolled to true when window.scrollY is 0", () => {
        const { result } = renderHook(() => useScrollNavbar());

        expect(window.scrollY).toBe(100); // Pastikan window.scrollY bernilai 100

        // Mengubah nilai window.scrollY ke 0
        act(() => {
            window.scrollY = 0;
            window.dispatchEvent(new Event("scroll"));
        });

        expect(result.current.scrolled).toBe(false); // Pastikan nilai telah berubah menjadi true
    });
});