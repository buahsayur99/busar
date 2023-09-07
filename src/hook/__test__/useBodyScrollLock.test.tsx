import { useBodyScrollLock } from "../useBodyScrollLock";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Use Body Scroll Lock", () => {
    test("should toggle body scroll lock", () => {
        const { result } = renderHook(() => useBodyScrollLock());

        act(() => {
            // Open form
            result.current.toggle(true);
        });
        expect(document.body.style.overflowY).toBe("hidden");

        act(() => {
            // Close Form 
            result.current.toggle(false);
        });
        expect(document.body.style.overflowY).toBe("auto");
    });
});