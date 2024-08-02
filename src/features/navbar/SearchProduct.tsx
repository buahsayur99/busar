import { ButtonTooltip } from "../../components/ButtonTooltip";
import styles from "../../style/index.module.scss";
import { BsSearch, IoCloseSharp, BsArrowLeft } from "../../utils/icons";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AutoComplete } from "./AutoComplete";
import { useNavigate } from "react-router-dom";

type SearchProductProps = {
    onClicks?: () => void;
    inputs: string;
    setInputs: (input: string) => void
}

const SearchProduct = ({ onClicks, inputs, setInputs }: SearchProductProps) => {
    // state
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();
    // useRef
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const focusAutoRef = useRef<HTMLInputElement | null>(null);

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        navigate(`/search/${inputs}`);
        setInputs("");
    }

    const handleOnClick = () => {
        navigate(`/search/${inputs}`);
        setInputs("");
    }

    const handleFocusInput = () => {
        // Menetapkan fokus pada input saat form diklik
        focusInputRef.current?.focus();
        // Menetapkan isInputFocused ke true
        setIsInputFocused(true);
    }

    const closeSearch = () => {
        if (onClicks) {
            onClicks();
        }
    }

    // Menutup AutoComplete ketika pengguna mengklik di luar elemen input atau AutoComplete
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (focusInputRef.current?.contains(target)) {
            setIsInputFocused(true);
        } else if (focusAutoRef.current?.contains(target)) {
            setIsInputFocused(true);
        } else {
            setIsInputFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className={`${styles["container-search-product"]}`}>
                <form
                    onSubmit={handleOnSubmit}
                    onClick={handleFocusInput}
                >
                    <ButtonTooltip
                        styleButton={"btn-search"}
                        textTooltip={"telusuri"}
                        styleTooltip={"tooltip"}
                        positionX={13}
                        positionY={21}
                        onClicks={() => handleOnClick()}
                        ariaLabel={"search"}
                    >
                        <BsSearch />
                    </ButtonTooltip>

                    <ButtonTooltip
                        styleButton={"btn-arrow-left"}
                        textTooltip={"close search"}
                        styleTooltip={"tooltip"}
                        positionX={13}
                        positionY={21}
                        onClicks={() => closeSearch()}
                        ariaLabel={"close search"}
                    >
                        <BsArrowLeft />
                    </ButtonTooltip>

                    <ButtonTooltip
                        styleButton={"btn-close"}
                        textTooltip={"delete search"}
                        styleTooltip={"tooltip"}
                        positionX={13}
                        positionY={21}
                        onClicks={() => setInputs("")}
                        ariaLabel={"delete search"}
                    >
                        <IoCloseSharp />
                    </ButtonTooltip>

                    <input
                        ref={focusInputRef}
                        value={inputs}
                        onChange={(event) => setInputs(event.target.value)}
                        type="text"
                        placeholder="Search Product"
                        className={styles["input-search"]}
                    />
                </form>

                {/* if the users focus on the search product input, show component AutoComplete */}
                {isInputFocused && (
                    <div ref={focusAutoRef}>
                        <AutoComplete inputSearch={inputs} close={() => setIsInputFocused(false)} />
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchProduct