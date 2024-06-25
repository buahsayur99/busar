import { getCategory } from "../app/actions/apiCategory";
import { useAppDispatch } from "../app/hooks"


export const useApiCategory = () => {
    const dispatch = useAppDispatch();

    const handleGetCategory = () => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/category`;

        dispatch(getCategory(link));
    }

    return { handleGetCategory };
}
