import React, { useEffect, useState } from "react"

export const useScrollShipment = (containerRef: React.RefObject<HTMLDivElement>) => {
    const [isScrollShipment, setIsScrollShipment] = useState<string>("");

    useEffect(() => {
        const onScroll = () => {
            const container = containerRef.current;

            if (container) {
                if (window.scrollY <= 55) return setIsScrollShipment("");
                if (container.clientHeight - 305 <= window.scrollY) return setIsScrollShipment("absolute-bottom");
                if (window.scrollY >= 80) return setIsScrollShipment("fixeds");
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [containerRef])

    return { isScrollShipment }
}
