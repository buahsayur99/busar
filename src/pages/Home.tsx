import { FormLoginRegister } from "../features/formLoginRegister/FormLoginRegister";
import { NavigationBar } from "../features/navbar/NavigationBar";
import { useSaveLastPage } from "../hook/useSaveLastPage";

export const Home = () => {
    useSaveLastPage();

    return (
        <>
            {/* Form Login Register */}
            <FormLoginRegister />

            {/* Navbar */}
            <NavigationBar />

            <button
            >
                click
            </button>
        </>
    )
}
