import styles from "../style/index.module.scss";

export const EmptyAddress = () => {
    const loop = 10
    const elements = Array.from({ length: loop }, (index) => index);

    return (
        <>
            {elements.map((data, index) => (
                <div key={index} className={`${styles["container-empty-address"]} ${styles["parent-opacity-empty"]}`}>
                    <div className={styles["parent-name-phone"]}>
                        <div className={`${styles["name"]} ${styles["pulsate-bck"]}`}></div>
                        <div className={styles["line"]}></div>
                        <span className={`${styles["phone"]} ${styles["pulsate-bck"]}`}></span>
                    </div>
                    <div className={`${styles["detail-address"]}`}>
                        <div className={`${styles["complete-address"]}`}></div>
                        <div className={styles["parent-subdis-city-codepos"]}>
                            <div className={`${styles["subdistrict"]} ${styles["pulsate-bck"]}`}></div>
                            <div className={`${styles["city"]} ${styles["pulsate-bck"]}`}></div>
                            <div className={`${styles["codepos"]} ${styles["pulsate-bck"]}`}></div>
                        </div>
                    </div>
                    <div className={styles["parent-ubah-alamat-utama"]}>
                        <div className={`${styles["ubah"]} ${styles["pulsate-bck"]}`}></div>
                        <div className={styles["line"]}></div>
                        <div className={`${styles["jadi-alamat-utama"]} ${styles["pulsate-bck"]}`}></div>
                    </div>
                </div>
            ))}
        </>
    )
}
