import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { NavigationBar } from "../../features/navbar/index";
import { Footers, ImageArray } from "../../components/index";
import { useAppSelector } from "../../app/hooks";
import { useGetApiCart, useGetWishlist, usePageTittle } from "../../hook";
import { convertObjectToArray, filterAllProductByWithlist, formattedNumber } from "../../utils/convert";
import styles from "../../style/index.module.scss";
import { productProps } from "../../app/actions/apiProductSlice";

export const Wishlist = () => {
    let rows = 6;
    let slidesPerRows = 4;
    const [activeSlide, setActiveSlide] = useState(0);
    const [products, setProducts] = useState<productProps[] | []>([]);
    // Redux
    const { dataWishlist } = useAppSelector(state => state.apiWishlist);
    const { dataProductApi } = useAppSelector(state => state.apiProduct);
    // Custome Hook
    const { handleTitle } = usePageTittle();
    const { handleAddCart } = useGetApiCart();
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
                        const totalSlides = products.length / 3 / rows;

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
                        const totalSlides = products.length / 2 / rows;

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
            const totalSlides = products.length / slidesPerRows / rows;

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

    useEffect(() => {
        if (dataWishlist.length !== 0 && dataProductApi.length !== 0) {
            if (products.length === 0) return setProducts(filterAllProductByWithlist(dataProductApi, dataWishlist));
        }
    }, [dataWishlist, dataProductApi, products])

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
        if (products.length !== 0) setTimeout(adjustCardHeights, 1000);

        // Adjust card heights on window resize
        window.addEventListener('resize', () => {
            setTimeout(adjustCardHeights, 1000);
        });

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', adjustCardHeights);
        };
    }, [adjustCardHeights, products.length]);

    return (
        <>
            {/* Title */}
            {handleTitle(`Wishlist | BUSAR`)}

            {/* NavBar */}
            <NavigationBar />

            <div className={`${styles["global-container"]}`}>
                <div className={styles["container-wishlist"]}>
                    <Slider {...settings} className={styles["custom-slider"]}>
                        {products.length !== 0 && (
                            products.map((slide, index) => (
                                <div key={index} className={styles["global-card-padding"]} >
                                    <div className={`${styles["global-card-product"]} card`}>
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


                        {/* {products.length !== 0 && (
                            products.map((slide: productProps, index: number) => (
                                <div key={index} className={styles["global-card-padding"]} >
                                    <div className={styles["global-card-product"]}>
                                        <p>{slide.name}</p>
                                    </div>
                                </div>
                            ))
                        )} */}
                    </Slider>

                    {/* <Slider {...settings}>
                        <div className="card">
                            <div className="card-content">
                                <h3>Card 1</h3>
                                <p>Ini adalah konten untuk card 1.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <h3>Card 2</h3>
                                <p>Ini adalah konten untuk card 2. Kontennya sedikit lebih panjang untuk menunjukkan fitur tinggi yang sama.</p>
                            </div>
                        </div>
                </Slider> */}
                </div>
            </div >

            <Footers />
        </>
    )
}
