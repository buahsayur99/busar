import { BannerSlider } from "../../components/BannerSlider";
import { Footers } from "../../components/Footers";
import { NavigationBar } from "../../features/navbar/NavigationBar";
import { usePageTittle } from "../../hook/index";
import styles from "../../style/index.module.scss";
import { SliderProduct } from "./components/SliderProduct";

export const Home = () => {
    const { handleTitle } = usePageTittle();

    return (
        <>
            {/* Title */}
            {handleTitle("BUSAR")}

            {/* Navbar */}
            <NavigationBar />

            <div className={`${styles["global-container"]}`}>
                <div className={`${styles["container-home"]}`}>
                    <BannerSlider />
                    <SliderProduct />
                </div>
            </div>

            {/* Footer */}
            <Footers />
        </>
    )
}
