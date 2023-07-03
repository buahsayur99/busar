import { useEffect, useState } from "react";

type UseScrollProps = boolean

export const useScrollNavbar = () => {
    const [scrolled, setScrolled] = useState<UseScrollProps>(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 80) return setScrolled(true)
            if (window.scrollY === 0) return setScrolled(false)
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return { scrolled };
}