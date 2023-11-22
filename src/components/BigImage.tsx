import { useEffect, useState } from "react";
import styles from "../style/index.module.scss";
import { BsArrowLeft, BsArrowRight, IoIosCloseCircle } from "../utils/icons";

type BigImageProps = {
    targetImage?: string | null;
    dataImage?: string[];
    closeBigImage?: (visible: boolean) => void;
}

export const BigImage = ({ targetImage, dataImage, closeBigImage }: BigImageProps) => {
    const [visibleImage, setVisibleImage] = useState<string | null>(null);
    const [imageList, setImageList] = useState<string[]>([]);

    const cycleImages = (delta: number) => {
        if (visibleImage && imageList) {
            const index = imageList.indexOf(visibleImage) + delta;

            if (index > imageList.length - 1) return setVisibleImage(imageList[0]);
            if (index < 0) return setVisibleImage(imageList[imageList.length - 1]);
            return setVisibleImage(imageList[index]);
        }
    }

    useEffect(() => {
        if (targetImage && dataImage) {
            setImageList(dataImage)
            return setVisibleImage(targetImage);
        }
        if (dataImage && targetImage === null) {
            setImageList(dataImage);
            return setVisibleImage(dataImage[0]);
        }
    }, [targetImage, dataImage]);

    return (
        <>
            <div className={styles["container-big-image"]}>
                <div className={styles["parent-image"]}>
                    <div className={styles["parent-button-big-image"]}>
                        <button
                            type="button"
                            onClick={() => cycleImages(-1)}
                        >
                            <BsArrowLeft />
                        </button>
                        <button
                            type="button"
                            onClick={() => cycleImages(1)}
                        >
                            <BsArrowRight />
                        </button>
                        <button
                            type="button"
                            onClick={() => closeBigImage && closeBigImage(false)}
                        >
                            <IoIosCloseCircle />
                        </button>
                    </div>
                    <img src={`${process.env.REACT_APP_API_URL_LOCAL}/${visibleImage}`} alt="visibleImage" />
                </div>
            </div>
        </>
    )
}
