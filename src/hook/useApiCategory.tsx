import { getCategory } from "../app/actions/apiCategory";
import { useAppDispatch } from "../app/hooks"
import { apiUrl } from "../utils/variable";


export const useApiCategory = () => {
    const dispatch = useAppDispatch();

    const handleGetCategory = () => {
        const link = `${apiUrl}/category`;

        dispatch(getCategory(link));
    }

    return { handleGetCategory };
}
