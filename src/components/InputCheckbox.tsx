import { BsCheck2All } from "../utils/icons";
import styles from "../style/index.module.scss";

type InputCheckboxProps = {
    valueInput: any;
    checkeds: any[] | string;
    dataToCheckeds?: any[];
    fcHandleCheckeds: (event: any) => void;
}

export const InputCheckbox = ({ valueInput, checkeds, dataToCheckeds, fcHandleCheckeds }: InputCheckboxProps) => {

    return (
        <>
            {valueInput === "selectAll" ? (
                <div className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        value="selectAll"
                        id="selectAll"
                        className={styles["checkbox"]}
                        checked={checkeds.length === dataToCheckeds?.length ? true : false}
                        onChange={() => fcHandleCheckeds(valueInput)}
                    />
                    <BsCheck2All className={styles["icon"]} />
                </div>
            ) : (
                <div className={styles["checkbox-container"]}>
                    <input
                        type="checkbox"
                        className={styles["checkbox"]}
                        checked={checkeds.indexOf(valueInput) === -1 ? false : true}
                        onChange={() => fcHandleCheckeds(valueInput)}
                    />
                    <BsCheck2All className={styles["icon"]} />
                </div>
            )}

        </>
    )
}
