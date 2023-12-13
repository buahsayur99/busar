import React, { useState } from "react";
import styles from "../style/index.module.scss";
import Slider from "react-slick";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "../utils/icons";

type ImagesArrayProps = {
    imageUrl: string[];
    indexs: number;
}

export const ImageArray = ({ imageUrl, indexs }: ImagesArrayProps) => {
    const [visibleIconArrow, setVisibleIconArrow] = useState(false);

    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;

        const handlePrevClick = () => {
            onClick();
        };

        return (
            <div
                style={visibleIconArrow ? { display: "inline" } : { display: "none" }}
                className={styles["custom-prev-arrow-image-array"]}
                onClick={handlePrevClick}
            >
                <MdOutlineKeyboardArrowLeft />
            </div>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;

        const handleNextClick = () => {
            onClick();
        };

        return (
            <div
                style={visibleIconArrow ? { display: "inline" } : { display: "none" }}
                className={styles["custom-next-arrow-image-array"]}
                onClick={handleNextClick}
            >
                <MdOutlineKeyboardArrowRight />
            </div>
        );
    };

    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <>
            <div
                className={styles["container-image-array"]}
                onMouseEnter={() => setVisibleIconArrow(true)}
                onMouseLeave={() => setVisibleIconArrow(false)}
            >
                <Slider {...settings}>
                    {imageUrl.map((url,index) => (
                        <img
                            key={index}
                            src={`${process.env.REACT_APP_API_URL_LOCAL}/${url}`}
                            alt={imageUrl[0]}
                            loading={indexs < 5 ? "eager" : "lazy"}
                            width={300}
                            height={300}
                        />
                    ))}
                </Slider>
            </div>
        </>
    )
}

