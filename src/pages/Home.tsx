import { FormLoginRegister } from "../features/formLoginRegister/FormLoginRegister"
import { NavigationBar } from "../features/navbar/NavigationBar"

export const Home = () => {
    return (
        <>
            {/* Form Login Register */}
            <FormLoginRegister />
            {/* Navbar */}
            <NavigationBar />
        </>
    )
}
