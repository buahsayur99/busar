import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { NavigationBar } from "../../features/navbar/index";
import { Footers, ImageArray, LoadingCard } from "../../components/index";
import { useAppSelector } from "../../app/hooks";
import { useGetApiCart, useGetWishlist, usePageTittle } from "../../hook";
import { convertObjectToArray, formattedNumber } from "../../utils/convert";
import styles from "../../style/index.module.scss";
import { productProps } from "../../app/actions/apiProductSlice";
import imageWishlist from "../../assets/wishlist/wishlistEmpty.webp";
import { useNavigate } from "react-router-dom";
import { GoHeartFill } from "../../utils/icons";

export const Wishlist = () => {
    let rows = 6;
    let slidesPerRows = 4;
    let arrayLoopCard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [activeSlide, setActiveSlide] = useState(0);

    const navigate = useNavigate();
    // Redux
    const { dataWishlist, isLoadingWishlist } = useAppSelector(state => state.apiWishlist);
    // Custome Hook
    const { handleTitle } = usePageTittle();
    const { handleAddCart } = useGetApiCart();
    const { handleRemoveWishlist } = useGetWishlist();
    useGetWishlist();

    const addToCart = (event: productProps) => {
        return handleAddCart(event, 1);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        rows: rows,
        slidesPerRow: slidesPerRows,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    rows: rows,
                    slidesPerRow: 3,
                    appendDots: (dots: React.ReactNode) => {
                        // Total Slider
                        const totalSlides = (dataWishlist.length ?? 0) / 3 / rows;

                        // Start Slider
                        let start = activeSlide - 1;
                        // Last Slider
                        let end = activeSlide + 2;

                        if (start < 0 || totalSlides < 3) { // Jika Start 0 and total slider kurang dari 3
                            start = 0;
                            end = 3;
                        } else if (activeSlide >= totalSlides - 2) { // Jika slider berada pada max
                            start = Math.ceil(totalSlides) - 3;
                            end = Math.ceil(totalSlides);
                        }

                        // Custom display paging
                        const displayDots = (dots as any[]).slice(start, end);

                        return (
                            <div className={styles['wrapper-paging']}>
                                <ul className={styles['dots-paging']}>{displayDots}</ul>
                            </div>
                        );
                    },
                }
            },
            {
                breakpoint: 800,
                settings: {
                    rows: rows,
                    slidesPerRow: 2,
                    appendDots: (dots: React.ReactNode) => {
                        // Total Slider
                        const totalSlides = (dataWishlist.length ?? 0) / 2 / rows;

                        // Start Slider
                        let start = activeSlide - 1;
                        // Last Slider
                        let end = activeSlide + 2;

                        if (start < 0 || totalSlides < 3) { // Jika Start 0 and total slider kurang dari 3
                            start = 0;
                            end = 3;
                        } else if (activeSlide >= totalSlides - 2) { // Jika slider berada pada max
                            start = Math.ceil(totalSlides) - 3;
                            end = Math.ceil(totalSlides);
                        }

                        // Custom display paging
                        const displayDots = (dots as any[]).slice(start, end);

                        return (
                            <div className={styles['wrapper-paging']}>
                                <ul className={styles['dots-paging']}>{displayDots}</ul>
                            </div>
                        );
                    },
                }
            }
        ],
        // Mengambil data next slider
        beforeChange: (current: number, next: number) => {
            const slide = next;
            setActiveSlide(slide);
        },

        // Custom background paging / dot.
        appendDots: (dots: React.ReactNode) => {
            // Total Slider
            const totalSlides = (dataWishlist.length ?? 0) / slidesPerRows / rows;

            // Start Slider
            let start = activeSlide - 1;
            // Last Slider
            let end = activeSlide + 2;

            if (start < 0 || totalSlides < 3) { // Jika Start 0 and total slider kurang dari 3
                start = 0;
                end = 3;
            } else if (activeSlide >= totalSlides - 2) { // Jika slider berada pada max
                start = Math.ceil(totalSlides) - 3;
                end = Math.ceil(totalSlides);
            }

            // Custom display paging
            const displayDots = (dots as any[]).slice(start, end);

            return (
                <div className={styles['wrapper-paging']}>
                    <ul className={styles['dots-paging']}>{displayDots}</ul>
                </div>
            );
        },

        // Custom Paging
        customPaging: (i: number) => (
            <div className={`${activeSlide === i && styles['global-active-paging']}`}>
                {i + 1}
            </div>
        ),
    };

    const adjustCardHeights = useCallback(() => {
        const cards = document.querySelectorAll('.product-info');
        let maxHeight = 0;

        cards.forEach(card => {
            const cardElement = card as HTMLElement;
            cardElement.style.height = 'auto'; // Reset height to auto before calculating
            const cardHeight = cardElement.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });

        cards.forEach(card => {
            const cardElement = card as HTMLElement;
            cardElement.style.height = `${maxHeight}px`;
        });
    }, [])

    useEffect(() => {
        // Adjust card heights on mount
        if (dataWishlist.length !== 0) setTimeout(adjustCardHeights, 1000);

        // Adjust card heights on window resize
        window.addEventListener('resize', () => {
            setTimeout(adjustCardHeights, 1000);
        });

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', adjustCardHeights);
        };
    }, [adjustCardHeights, dataWishlist.length]);
    console.log(dataWishlist)

    return (
        <>
            {/* Title */}
            {handleTitle(`Wishlist | BUSAR`)}

            {/* NavBar */}
            <NavigationBar />

            <div className={`${styles["global-container"]}`}>
                <div className={styles["container-wishlist"]}>
                    {isLoadingWishlist && dataWishlist.length === 0 && (
                        // Loading Card Wishlist
                        <div className={styles["loading-card-wrapper"]}>
                            <LoadingCard arrayLoopCard={arrayLoopCard} />
                        </div>
                    )}

                    {dataWishlist.length !== 0 && (
                        // Card Wishlist
                        <Slider {...settings} className={styles["custom-slider"]}>
                            {dataWishlist && (
                                dataWishlist.map((slide, index) => (
                                    <div key={index} className={styles["global-card-padding"]} >
                                        <div className={`${styles["global-card-product"]} card`}>
                                            {/* Button wishlist remove */}
                                            <div className={styles["remove-wishlist-wrapper"]}>
                                                <button
                                                    type="button"
                                                    className={styles["btn-remove-wishlist"]}
                                                    onClick={() => handleRemoveWishlist(slide.id)}
                                                >
                                                    <GoHeartFill />
                                                </button>
                                                <p>remove wishlist</p>
                                            </div>
                                            {/* Image Card */}
                                            <div className={`${styles["card-top"]}`}>
                                                <ImageArray indexs={index} imageUrl={convertObjectToArray(slide.url)} nameProducts={slide.name} />
                                            </div>
                                            <div className={`${styles["card-bottom"]}`}>
                                                <div className={`product-info`}>
                                                    <h3>{slide.name}</h3>
                                                    <p>rp {formattedNumber(slide.price)}</p>
                                                </div>
                                                <div className={styles["wrapper-button"]}>
                                                    <button
                                                        type="button"
                                                        onClick={() => addToCart(slide)}
                                                    >
                                                        add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </Slider>
                    )}

                    {!isLoadingWishlist && dataWishlist.length === 0 && (
                        // Card Empty
                        <div className={styles["wishlist-empty-wrapper"]}>
                            <div className={styles["wishlist-empty"]}>
                                <img className={styles["img-wishlist-empty"]} src={imageWishlist} width={300} height={200} alt="wishlist-empty" />
                                <div className={styles["content-wishlist"]}>
                                    <h4>wishlist kamu masih kosong</h4>
                                    <p>isi dengan produk-produk incaran dan buat wishlist kamu jadi nyata!</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate("/collections")}
                                >
                                    cari product
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div >

            <Footers />
        </>
    )
}
