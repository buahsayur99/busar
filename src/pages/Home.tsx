import { authUuid } from "../app/actions/apiUsersSlice";
import { useAppDispatch } from "../app/hooks";
import { FormLoginRegister } from "../features/formLoginRegister/FormLoginRegister";
import { NavigationBar } from "../features/navbar/NavigationBar";
import { linkApiLocal } from "../utils/linkApi";

export const Home = () => {
    const dispatch = useAppDispatch();

    const onAuthUuid = () => {
        const link = `${linkApiLocal}/me`
        dispatch(authUuid({ link }))
    }

    return (
        <>
            {/* Form Login Register */}
            <FormLoginRegister />

            {/* Navbar */}
            <NavigationBar />

            <button
                onClick={() => onAuthUuid()}
            >
                click
            </button>
        </>
    )
}
