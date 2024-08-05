import React from "react";
import Slider from "react-slick";
import { useAppSelector } from "../../../app/hooks";
import { useGetProduct } from "../../../hook/useGetProduct";
import { BsArrowRight, BsArrowLeft, SlBasket } from "../../../utils/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../style/index.module.scss";
import { convertObjectToArray, faWishlist, formattedNumber } from "../../../utils/convert";
import { ImageArray } from "../../../components/ImageArray";
import { LoadingCard } from "../../../components/LoadingCard";
import { Link } from "react-router-dom";
import { useGetApiCart } from "../../../hook/useGetApiCart";
import { ButtonWishlist } from "../../collections/components/index";

export const SliderProduct = () => {
    // Data total Loding Card
    const arrayLoadingCard = [1, 2, 3, 4, 5]
    // UseAppSelector
    const { dataProductApi, isLoadingProduct } = useAppSelector(state => state.apiProduct);
    const { dataWishlist } = useAppSelector(state => state.apiWishlist);
    // Custome Hook
    useGetProduct(); // Get Api's Product
    const { handleAddCart } = useGetApiCart(); // Get Api's Cart

    const CustomPrevArrow = (props: any) => {
        const { onClick } = props;

        const handlePrevClick = () => {
            onClick();
        };

        return (
            <div className={styles["custom-prev-arrow"]} onClick={handlePrevClick}>
                <BsArrowLeft />
            </div>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { onClick } = props;

        const handleNextClick = () => {
            onClick();
        };

        return (
            <div className={styles["custom-next-arrow"]} onClick={handleNextClick}>
                <BsArrowRight />
            </div>
        );
    };

    const settings = {
        speed: 500,
        slidesToShow: dataProductApi.length < 5 ? 1 : 5,
        slidesToScroll: dataProductApi.length < 5 ? 1 : 5,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: dataProductApi.length < 5 ? 1 : 4,
                    slidesToScroll: dataProductApi.length < 5 ? 1 : 4,
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: dataProductApi.length < 5 ? 1 : 3,
                    slidesToScroll: dataProductApi.length < 5 ? 1 : 3,
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: dataProductApi.length < 5 ? 1 : 2,
                    slidesToScroll: dataProductApi.length < 5 ? 1 : 2,
                }
            }
        ]
    };

    return (
        <>
            <div className={styles["container-slider-product"]}>
                <div className={styles["opposing-items"]}>
                    <h2><Link to={"/collections"}>produk</Link></h2>
                    <Link to={"/collections"}>{`lihat semua >`}</Link>
                </div>

                <div className={styles["parent-slider"]}>
                    {isLoadingProduct && <LoadingCard arrayLoopCard={arrayLoadingCard} />}

                    <div className={`${dataProductApi.length < 5 && styles["product-min-5"]}`}>
                        {!isLoadingProduct && (
                            <Slider {...settings}>
                                {dataProductApi.map((slide, index) => (
                                    <div key={index} className={styles["padding-card"]}>
                                        <div className={`${styles["card"]}`}>
                                            <div className={`${styles["card-top"]}`}>
                                                <ImageArray indexs={index} imageUrl={convertObjectToArray(slide.url)} nameProducts={slide.name} />
                                            </div>
                                            <div className={styles["card-bottom"]}>
                                                <h3>{slide.name}</h3>
                                                <p>rp {formattedNumber(slide.price)}</p>
                                                <div className={styles["parent-button"]}>
                                                    <ButtonWishlist
                                                        dataWishlist={faWishlist(slide, dataWishlist)}
                                                        idProduct={slide.id}
                                                    />

                                                    <button
                                                        type="button"
                                                        aria-label="basket"
                                                        className={styles["icon-basket"]}
                                                        onClick={() => handleAddCart(slide, 1)}
                                                    >
                                                        <SlBasket />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider >
                        )}
                    </div>
                </div >
            </div >
        </>
    )
}


