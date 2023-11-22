import { BsCheck2All } from "../utils/icons";
import styles from "../style/index.module.scss";
import { productProps } from "../app/actions/apiProductSlice";

type InputCheckboxProps = {
    valueInput: any;
    checkeds: productProps[];
    fcHandleCheckeds: (event: productProps) => void;
}

export const InputCheckbox = ({ valueInput, checkeds, fcHandleCheckeds }: InputCheckboxProps) => {

    return (
        <>
            <div className={styles["checkbox-container"]}>
                <input
                    type="checkbox"
                    className={styles["checkbox"]}
                    checked={checkeds.indexOf(valueInput) === -1 ? false : true}
                    onChange={() => fcHandleCheckeds(valueInput)}
                />
                <BsCheck2All className={styles["icon"]} />
            </div>
        </>
    )
}
