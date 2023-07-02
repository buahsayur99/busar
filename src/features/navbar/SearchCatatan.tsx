import styles from "../../style/index.module.scss";
import { Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { activeSearch } from "../../app/actions/searchCatatanSlice";

type tipeInputSearch = {
    tipe: String;
}

const SearchCatatan = ({ tipe }: tipeInputSearch) => {
    const { activeInputSearch } = useAppSelector(state => state.activeButton)
    const dispatch = useAppDispatch()

    return (
        <>
            <Form className={`${styles["parent-input-nav"]}`}>
                {tipe === "mobile"
                    ? (
                        <Button
                            className={styles["btn-back"]}
                            onClick={() => dispatch(activeSearch(!activeInputSearch))}
                        >
                            <IoIosArrowRoundBack />
                        </Button>
                    )
                    : (
                        <Button className={styles["btn-search"]}>
                            <BsSearch />
                        </Button>
                    )
                }
                <Button className={styles["btn-search-close"]}>
                    <IoCloseSharp />
                </Button>
                <Form.Control
                    placeholder="Telusuri"
                    className={styles["input-search"]}
                />
            </Form>
        </>
    )
}

export default SearchCatatan