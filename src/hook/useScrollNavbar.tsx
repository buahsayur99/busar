import { useEffect, useState } from "react";

type UseScrollProps = boolean

export const useScrollNavbar = () => {
    const [scrolled, setScrolled] = useState<UseScrollProps>(false);
    const [scrolls, setScrolls] = useState<number>(0);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 80) {
                setScrolls(0)
                return setScrolled(true)
            }
            if (window.scrollY === 0) {
                setScrolls(0)
                return setScrolled(false)
            }
            return setScrolls(-window.scrollY)
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return { scrolled, scrolls };
}