import styles from "../style/index.module.scss";

export const Loading = () => {
    return (
        <>
            <div className={`${styles["parent-loading"]}`}>
                <div className={`${styles["loading-form"]}`}>
                    <h3>Loading</h3>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                </div>
            </div>
        </>
    )
}
