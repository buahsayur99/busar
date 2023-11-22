import { renderHook, act } from "@testing-library/react";
import { useInsideClick } from "../useInsideClick";

describe('useOutsideClick', () => {
    let ref: React.RefObject<HTMLDivElement>;
    let faCloseMock: jest.Mock;

    beforeEach(() => {
        ref = { current: document.createElement('div') };
        faCloseMock = jest.fn();
    });

    it('should call faClose when event target is the ref', () => {
        renderHook(() => useInsideClick({ ref, faClose: faCloseMock }));

        // Create a mock event with the correct target (your ref)
        const event = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(event, 'target', { value: ref.current });

        // Simulate the click event with the correct target
        act(() => {
            document.dispatchEvent(event);
        });

        // Since the event target is the ref, faCloseMock should be called once
        expect(faCloseMock).toHaveBeenCalledTimes(1);
    });
});