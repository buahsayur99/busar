import { useEffect, useState } from "react";
import styles from "../style/index.module.scss";
import { RiArrowLeftDoubleLine } from "../utils/icons";

type DropdownProps = {
    data: any[];
    choices: number | string
    cssChoice?: string;
    cssUl?: string;
    validasi?: { status: boolean, text: string };
    onClicks: (event: string) => void;
}

export const Dropdown = ({ data, choices, cssChoice, cssUl, validasi, onClicks }: DropdownProps) => {
    const [active, setActive] = useState(false);
    const [choice, setChoice] = useState("pilih category");

    const handleOnClickChoice = (data: any) => {
        setChoice(data.name)
        setActive(false)
        onClicks(data.id)
    }

    useEffect(() => {
        if (choices !== "") {
            const choicesFilter = data.filter((data) => {
                return data.id === choices
            });
            setChoice(choicesFilter[0].name)
        }
    }, [choices, data])

    return (
        <>
            <div className={styles["container-dropdown"]}>
                <div
                    className={`
                        ${styles["parent-choice"]}
                        ${styles[`${cssChoice}`]}
                        ${active && styles["active-choice"]}
                        ${active && styles[`active-${cssChoice}`]}
                        ${validasi?.status && !active && styles["choice-danger"]}
                        ${validasi?.status && !active && styles[`${cssChoice}-danger`]}
                    `}
                    onClick={() => setActive((state) => !state)}
                >
                    <h3 className={styles["text"]}>{choice}</h3>
                    <span className={`${active && styles["icon-active"]}`}>{<RiArrowLeftDoubleLine />}</span>
                </div>

                {validasi?.status === true && !active && (
                    <p className={styles["validasi-dropdown"]}>{validasi.text}</p>
                )}
                <div
                    className={`
                        ${styles["parent-ul"]}

                        ${active && styles["ul-active"]}
                        ${active && styles[`${cssUl}`]}
                    `}
                >
                    <ul className={`${active && styles["shadow-active"]}`}>
                        {data.map((data) => (
                            <li
                                key={data.id}
                                onClick={() => handleOnClickChoice(data)}
                            >
                                {data.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
