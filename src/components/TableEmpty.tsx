import styles from "../style/index.module.scss";


type TableEmptyProps = {
    image: any
}

export const TableEmpty = ({ image }: TableEmptyProps) => {
    return (
        <>
            <div className={styles["container-tableEmpty"]}>
                <img src={image} alt="Table-Empty" />
                <h3>product empty</h3>
                <p>click the add product button to add products</p>
            </div>
        </>
    )
}
