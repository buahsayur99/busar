import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";


export const usePageTittle = () => {
    const handleTitle = (titles: string) => {
        return <Helmet><title>{titles}</title></Helmet>
    }

    return { handleTitle }
}