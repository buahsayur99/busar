import { Helmet } from "react-helmet";


export const usePageTittle = () => {
    const handleTitle = (titles: string) => {
        return <Helmet><title>{titles}</title></Helmet>
    }

    return { handleTitle }
}