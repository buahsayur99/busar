import React, { useState } from "react";
import styles from "../style/index.module.scss";
import { FaFacebookF, FaTwitter, IoLogoYoutube, TiSocialInstagram, FaLinkedinIn } from "../utils/icons";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Footers = () => {
    const dataSosialMedia = [
        {
            icon: <FaFacebookF />,
            cssIcon: "icon",
            style: { backgroundColor: "blue" },
            text: "facebook",
            cssText: "tooltip"
        },
        {
            icon: <FaTwitter />,
            cssIcon: "icon",
            style: { backgroundColor: "#00fff2" },
            text: "twitter",
            cssText: "tooltip"
        },
        {
            icon: <IoLogoYoutube />,
            cssIcon: "icon",
            style: { backgroundColor: "red" },
            text: "youtube",
            cssText: "tooltip"
        },
        {
            icon: <TiSocialInstagram />,
            cssIcon: "icon",
            style: {
                background: '#d6249f radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
            },
            text: "instagram",
            cssText: "tooltip"
        },
        {
            icon: <FaLinkedinIn />,
            cssIcon: "icon",
            style: { backgroundColor: "#0a66c2" },
            text: "linkedin",
            cssText: "tooltip"
        },
    ]

    return (
        <>
            <div className={styles["container-footers"]}>
                <div className={styles["footer-head"]}>
                    <div className={`${styles["global-container"]} ${styles["flex"]}`}>
                        <div className={styles["parent-logo"]}>
                            <Logo />
                            <p>selamat datang di busar - pasar segar online!</p>
                        </div>
                        <div className={styles["parent-sosial-media"]}>
                            <p>temukan kami di:</p>
                            <div className={styles["icon-sosial-media"]}>
                                {dataSosialMedia.map((data,index) => (
                                    <div key={index}>
                                        <IconTootip data={data} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles["footer-content"]}`}>
                    <div className={styles["global-container"]}>
                        <p>
                            busar adalah destinasi terbaik untuk mendapatkan kelezatan segar langsung dari kebun ke meja Anda. Kami dengan bangga menyajikan beragam pilihan sayur dan buah berkualitas tinggi, ditanam dengan cinta dan keahlian oleh petani terbaik kami. Dengan komitmen untuk menyediakan produk segar terbaik, kami menghubungkan Anda dengan alam dan memberikan pengalaman berbelanja yang menyenangkan.
                        </p>
                    </div>
                </div>
                <div className={styles["footer-footer"]}>
                    <p>
                        Copyright © 2023
                    </p>
                    <Link to={"https://safaaat.github.io"} target="_blank" >Safaat_Art.</Link>
                </div>
            </div>
        </>
    )
}

export const IconTootip = ({ data }: any) => {
    const [invisible, setInvisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

    const handleOnTooltip = (event: any) => {
        const { clientX } = event
        setInvisible(true);
        setTooltipPosition({ top: -15, left: clientX - 35 });
    }

    return (
        <>
            <div>
                <div
                    style={{ ...data.style }}
                    className={`${styles[data.cssIcon]}`}
                    onMouseEnter={(event) => handleOnTooltip(event)}
                    onMouseLeave={() => setInvisible(false)}
                >
                    {data.icon}
                </div>
                {invisible && (
                    <p
                        className={`${styles[data.cssText]}`}
                        style={{ position: "absolute", bottom: tooltipPosition.top, left: tooltipPosition.left }}
                    >{data.text}</p>
                )}
            </div>
        </>
    )
}
