import React from "react";
import styles from "../../../style/index.module.scss";
import { BsTrashFill } from "../../../utils/icons";
import { productProps } from "../../../app/actions/apiProductSlice";
import { ImageArray } from "../../../components/ImageArray";
import { convertObjectToArray, faWishlist, formattedNumber } from "../../../utils/convert";
import { useAppSelector } from "../../../app/hooks";
import { Link } from "react-router-dom";
import { useGetApiCart } from "../../../hook";

type RecommendationCartProps = {
    dataMap: productProps[];
    tittle: string;
    faHandleRemoveWishlist: (id: number) => void;
}

export const RecommendationCart = ({ dataMap, tittle, faHandleRemoveWishlist }: RecommendationCartProps) => {
    const { dataWishlist } = useAppSelector(state => state.apiWishlist);
    const { handleAddCart } = useGetApiCart();

    // const CustomPrevArrow = (props: any) => {
    //     const { onClick } = props;

    //     const handlePrevClick = () => {
    //         onClick();
    //     };

    //     return (
    //         <div onClick={handlePrevClick}>
    //             <BsArrowLeft />
    //         </div>
    //     );
    // };

    // const CustomNextArrow = (props: any) => {
    //     const { onClick } = props;
    //     const handleNextClick = () => {
    //         onClick();
    //     };
    //     return (
    //         <div onClick={handleNextClick}>
    //             <BsArrowRight />
    //         </div>
    //     );
    // };

    // const settings = {
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     prevArrow: <CustomPrevArrow />,
    //     nextArrow: <CustomNextArrow />,
    //     // responsive: [
    //     //     {
    //     //         breakpoint: 950,
    //     //         settings: {
    //     //             slidesToShow: dataProductApi.length < 5 ? 1 : 4,
    //     //             slidesToScroll: dataProductApi.length < 5 ? 1 : 4,
    //     //         }
    //     //     },
    //     //     {
    //     //         breakpoint: 770,
    //     //         settings: {
    //     //             slidesToShow: dataProductApi.length < 5 ? 1 : 3,
    //     //             slidesToScroll: dataProductApi.length < 5 ? 1 : 3,
    //     //         }
    //     //     },
    //     //     {
    //     //         breakpoint: 620,
    //     //         settings: {
    //     //             slidesToShow: dataProductApi.length < 5 ? 1 : 2,
    //     //             slidesToScroll: dataProductApi.length < 5 ? 1 : 2,
    //     //         }
    //     //     }
    //     // ]
    // };

    return (
        <>
            <div className={styles["container-rekomendasi"]}>
                <div className={styles["heading-wrapper"]}>
                    <h2>{tittle}</h2>
                    <Link to={"/wishlist"}>
                        see all
                    </Link>
                </div>
                {(dataMap && dataMap.length !== 0) && (
                    <ul>
                        {dataMap.map((data, index) => (
                            <li key={index}>
                                {data && (
                                    <>
                                        <div className={styles["card"]}>
                                            <div className={`${styles["card-left"]}`}>
                                                <ImageArray indexs={index} imageUrl={convertObjectToArray(data.url)} nameProducts={data.name} />
                                            </div>
                                            <div className={styles["card-right"]}>
                                                <h3>{data.name}</h3>
                                                <p>rp {formattedNumber(data.price)}</p>
                                            </div>
                                        </div>
                                        <div className={styles["parent-button"]}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (data.id !== undefined) faHandleRemoveWishlist(faWishlist(data, dataWishlist)[0].id)
                                                }}
                                            >
                                                <BsTrashFill />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleAddCart(data, 1)}
                                            >
                                                + Keranjang
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
