import React, { useEffect, useRef, useState } from "react"

export const useScrollTotalPrice = (containerRef: React.RefObject<HTMLDivElement>) => {
    const [scrolledTotalPrice, setScrolledTotalPrice] = useState<any>(false);
    const [scrolledSelectAll, setScrolledSelectAll] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolling(false);
            const container = containerRef.current;

            if (container) {
                const isAtBottom = container.scrollHeight - 274 <= window.scrollY
                setScrolledTotalPrice(isAtBottom)

                // Setelah 200ms dari scroll terakhir, kembalikan isScrolling ke false
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                scrollTimeoutRef.current = setTimeout(() => {
                    setIsScrolling(true);
                }, 200);
            }

            if (window.scrollY > 90) return setScrolledSelectAll(true);
            if (window.scrollY === 0) return setScrolledSelectAll(false);
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [containerRef])

    return { scrolledTotalPrice, scrolledSelectAll, isScrolling }
}