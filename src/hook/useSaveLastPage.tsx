import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

type infoHalamanProps = {
    page_path: string | null,
    page_url: string | null,
    is_authenticated: boolean
}

export const useSaveLastPage = () => {
    // State
    const [page, setPage] = useState<string | null>(null);
    const [infoHalaman, setInfoHalaman] = useState<infoHalamanProps>({ page_path: null, page_url: null, is_authenticated: false });

    // useAppSelector
    const { isLoadingAuth } = useAppSelector(state => state.apiUsers);

    const saveLastPage = useCallback(() => {
        const stringInfoHalaman = JSON.stringify(infoHalaman);
        localStorage.setItem("informasi_halaman", stringInfoHalaman);
    }, [infoHalaman])

    const updatePage = useCallback(() => {
        const currentPage = window.location.pathname;
        if (page !== null) return setPage(window.location.pathname);
        if (currentPage === infoHalaman.page_path) {
            saveLastPage()
            return setPage(currentPage);
        }
    }, [page, infoHalaman.page_path, saveLastPage]);

    const updateInfoHalaman = (event: any) => {
        setInfoHalaman(prev => {
            return { ...prev, ...event }
        })
    }

    useEffect(() => {
        updatePage();
        if (isLoadingAuth === false && infoHalaman.page_path === null) return updateInfoHalaman({ page_path: window.location.pathname, page_url: window.location.href, is_authenticated: true })
    }, [updatePage, isLoadingAuth, infoHalaman.page_path])

    return { infoHalaman }
}