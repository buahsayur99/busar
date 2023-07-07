import styles from "../../style/index.module.scss";
import { Login } from "./Login";

export const FormLoginRegister = () => {
    return (
        <div className={`${styles["bg-black"]}`} >
            <Login />
        </div >
    )
}
