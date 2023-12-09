import React from "react";
import styles from "../style/index.module.scss";
import { arrayBanner } from "../data/banner";
import Slider from "react-slick";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "../utils/icons";

export const BannerSlider = () => {
    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button type="button" className={styles["btn-prev-arrow"]} onClick={() => onClick()}>
                <MdOutlineKeyboardArrowLeft />
            </button>
        )
    }

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;

        return (
            <button type="button" className={styles["btn-next-arrow"]} onClick={() => onClick()}>
                <MdOutlineKeyboardArrowRight />
            </button>
        )
    }

    const setting = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    }

    return (
        <>
            <div className={styles["container-banner-slider"]}>
                <Slider {...setting}>
                    {arrayBanner.map((data, index) => (
                        <img key={index} src={data} alt={data} width={1400} />
                    ))}
                </Slider>
            </div>
        </>
    )
}

