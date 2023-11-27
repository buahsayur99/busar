import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { InputsForm } from "../../../components/InputsForm";
import styles from "../../../style/index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createProductsApi, productProps, resetIsMessageProduct, resetValidasiProduct, updateProductApi, updateValidasiProduct } from "../../../app/actions/apiProductSlice";
import { Dropdown } from "../../../components/Dropdown";
import { UploadFile } from "../../../components/UploadFile";
import { IoIosCloseCircle } from "../../../utils/icons";
import { ButtonTooltip } from "../../../components/ButtonTooltip";
import { getCategory } from "../../../app/actions/apiCategory";
import { InputTextArea } from "../../../components/InputTextArea";
import { AlertText } from "../../../components/AlertText";
import { Loading } from "../../../components/Loading";
import { useGetProduct } from "../../../hook/useGetProduct";


const maxSize = 1 * 1024 * 1024;

export const TYPE_IMAGE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
}

type LocalInputProps = {
    name: string;
    amount: string | number;
    price: string | number;
    category: string | number;
    information: string;
    image1: File | null;
    image2: File | null;
    image3: File | null;
    image4: File | null;
    image5: File | null;
}

type FormAddProductProps = {
    handleOnOffForm: () => void;
    dataUpdateProduct?: productProps | null
}

export const FormAddProduct = ({ handleOnOffForm, dataUpdateProduct }: FormAddProductProps) => {
    // useAppSelector
    const { validasiProduct, isLoadingProduct, isMessageProduct } = useAppSelector(state => state.apiProduct);
    const { dataCategory } = useAppSelector(state => state.apiCategory);
    const [textValidasiUpload, setTextValidasiUpload] = useState<string | null>(null)
    // useAppDispatch
    const dispatch = useAppDispatch();
    // useState
    const [localInput, setLocalInput] = useState<LocalInputProps>({
        name: "", amount: "", price: "", category: "", information: "",
        image1: null, image2: null, image3: null, image4: null, image5: null
    });
    const [visibleWhite, setVisibleWhite] = useState(true);
    const [visibleBlack, setVisibleBlack] = useState(true);
    const [formWhite, setFormWhite] = useState(false);
    // useRef
    const parentUploadFileRef = useRef<HTMLDivElement | null>(null);
    // Custome Hook
    const { handleGetProduct } = useGetProduct();

    const updateLocalInput = (event: any) => {
        setLocalInput((prev) => {
            return { ...prev, ...event }
        })
    }

    const validasiInputProduct = () => {
        // Reset status validasi product
        dispatch(resetValidasiProduct());
        // Reset validasi text upload file
        setTextValidasiUpload(null);

        if (localInput.name === "") dispatch(updateValidasiProduct({ name: { status: true, text: "name is not empty" } }));
        if (localInput.amount === "") dispatch(updateValidasiProduct({ amount: { status: true, text: "amount is not empty" } }));
        if (localInput.price === "") dispatch(updateValidasiProduct({ price: { status: true, text: "price is not empty" } }));
        if (localInput.category === "") dispatch(updateValidasiProduct({ category: { status: true, text: "category is not empty" } }));
        if (localInput.information === "") dispatch(updateValidasiProduct({ information: { status: true, text: "information is not empty" } }));
    }

    const validasiUploadFile = () => {
        const acceptMine = Object.keys(TYPE_IMAGE);

        // if the input image file is empty
        if (!localInput.image1 && !localInput.image2 && !localInput.image3 && !localInput.image4 && !localInput.image5) {
            setTextValidasiUpload("harap unggah minim 1 file gambar.");
            return dispatch(updateValidasiProduct({ image1: { status: true, text: "harap unggah minim 1 file gambar." } }));
        }

        if (localInput.image1 instanceof File) {
            if (!acceptMine.includes(localInput.image1!.type)) {
                setTextValidasiUpload("format gambar Upload1 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan.");
                return dispatch(updateValidasiProduct({ image1: { status: true, text: "format gambar Upload1 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan." } }));
            }
            if (localInput.image1.size > maxSize) {
                setTextValidasiUpload("Ukuran file Upload1 terlalu besar. Maksimum 1MB diizinkan.");
                return dispatch(updateValidasiProduct({ image1: { status: true, text: "Ukuran file Upload1 terlalu besar. Maksimum 1MB diizinkan." } }));
            }
        }
        if (localInput.image2 instanceof File) {
            if (!acceptMine.includes(localInput.image2!.type)) {
                setTextValidasiUpload("format gambar Upload2 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan.");
                return dispatch(updateValidasiProduct({ image2: { status: true, text: "format gambar Upload2 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan." } }));
            }
            if (localInput.image2.size > maxSize) {
                setTextValidasiUpload("Ukuran file Upload2 terlalu besar. Maksimum 1MB diizinkan.");
                return dispatch(updateValidasiProduct({ image2: { status: true, text: "Ukuran file Upload2 terlalu besar. Maksimum 1MB diizinkan." } }));
            }
        }
        if (localInput.image3 instanceof File) {
            if (!acceptMine.includes(localInput.image3!.type)) {
                setTextValidasiUpload("format gambar Upload3 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan.");
                return dispatch(updateValidasiProduct({ image3: { status: true, text: "format gambar Upload2 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan." } }));
            }
            if (localInput.image3.size > maxSize) {
                setTextValidasiUpload("Ukuran file Upload3 terlalu besar. Maksimum 1MB diizinkan.");
                return dispatch(updateValidasiProduct({ image3: { status: true, text: "Ukuran file Upload2 terlalu besar. Maksimum 1MB diizinkan." } }));
            }
        }
        if (localInput.image4 instanceof File) {
            if (!acceptMine.includes(localInput.image4!.type)) {
                setTextValidasiUpload("format gambar Upload4 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan.");
                return dispatch(updateValidasiProduct({ image4: { status: true, text: "format gambar Upload2 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan." } }));
            }
            if (localInput.image4.size > maxSize) {
                setTextValidasiUpload("Ukuran file Upload4 terlalu besar. Maksimum 1MB diizinkan.");
                return dispatch(updateValidasiProduct({ image4: { status: true, text: "Ukuran file Upload2 terlalu besar. Maksimum 1MB diizinkan." } }));
            }
        }
        if (localInput.image5 instanceof File) {
            if (!acceptMine.includes(localInput.image5!.type)) {
                setTextValidasiUpload("format gambar Upload5 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan.");
                return dispatch(updateValidasiProduct({ image5: { status: true, text: "format gambar Upload2 tidak sesuai. Hanya format JPG, JPEG, atau PNG yang diizinkan." } }));
            }
            if (localInput.image5.size > maxSize) {
                setTextValidasiUpload("Ukuran file Upload5 terlalu besar. Maksimum 1MB diizinkan.");
                return dispatch(updateValidasiProduct({ image5: { status: true, text: "Ukuran file Upload2 terlalu besar. Maksimum 1MB diizinkan." } }));
            }
        }

        // jika input tidak memiliki validasi danger, post api product
        if (localInput.name !== "" && localInput.amount !== "" && localInput.price !== "" && localInput.category !== "" && localInput.information !== "") return handlePostApiRedux();
    }

    const handlePostApiRedux = async () => {
        const formData = new FormData();
        if (localInput.image1) {
            formData.append("image1", localInput.image1);
        }
        if (localInput.image2) {
            formData.append("image2", localInput.image2);
        }
        if (localInput.image3) {
            formData.append("image3", localInput.image3);
        }
        if (localInput.image4) {
            formData.append("image4", localInput.image4);
        }
        if (localInput.image5) {
            formData.append("image5", localInput.image5);
        }
        formData.append("name", localInput.name);
        formData.append("amount", localInput.amount.toString());
        formData.append("price", localInput.price.toString());
        formData.append("category", localInput.category.toString());
        formData.append("information", localInput.information.toString());

        if (!dataUpdateProduct) {
            let link = `${process.env.REACT_APP_API_URL_LOCAL}/upload`;
            dispatch(createProductsApi({ formData, link }));
        } else {
            let link = `${process.env.REACT_APP_API_URL_LOCAL}/products/${dataUpdateProduct.id}`;
            dispatch(updateProductApi({ formData, link }));
        }
    }

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validasi Input Product
        validasiInputProduct();
        // Validasi upload file
        validasiUploadFile();
    }

    // Fungsi untuk mengatur posisi scrollbar ke maksimum
    const setScrollBarToMax = () => {
        if (parentUploadFileRef.current) {
            const element = parentUploadFileRef.current;
            element.scrollLeft = element.scrollWidth;
        }
    };

    // if the users has finished uploading the file,the scroll is at the max position
    useEffect(() => {
        if (localInput.image2) return setScrollBarToMax();
        if (localInput.image3) return setScrollBarToMax();
        if (localInput.image4) return setScrollBarToMax();
        if (localInput.image5) return setScrollBarToMax();
    }, [localInput.image2, localInput.image3, localInput.image4, localInput.image5]);

    // Function close form add address
    const closeForm = () => {
        // Reset status validasi product
        dispatch(resetValidasiProduct());
        // Reset validasi text upload file
        setTextValidasiUpload(null);

        // Invisible form white
        setVisibleWhite(false);
        // wait 'form white' invisible
        setTimeout(() => {
            // Invisible bg-black
            setVisibleBlack(false);
            // Wait 'bg-black' invisible
            setTimeout(() => {
                handleOnOffForm()
                // Reset state input
                setLocalInput({ name: "", amount: "", price: "", category: "", information: "", image1: null, image2: null, image3: null, image4: null, image5: null });
                // Reset IsMessageProduct
                dispatch(resetIsMessageProduct());
            }, 1000);
        }, 500);
    }

    // wait visible 'bg-black'
    setTimeout(() => {
        // show 'form white'
        setFormWhite(true)
    }, 1000);

    useEffect(() => {
        const link = `${process.env.REACT_APP_API_URL_LOCAL}/category`
        dispatch(getCategory(link))
    }, [dispatch])

    const faUpdateProduct = useCallback(() => {
        updateLocalInput({
            name: dataUpdateProduct?.name, amount: dataUpdateProduct?.amount, price: dataUpdateProduct?.price, category: dataUpdateProduct?.category, information: dataUpdateProduct?.information,
        });

        if (dataUpdateProduct?.url) {
            const arrayImage = JSON.parse(dataUpdateProduct?.url);
            updateLocalInput(arrayImage);
        }

    }, [dataUpdateProduct?.name, dataUpdateProduct?.amount, dataUpdateProduct?.price, dataUpdateProduct?.category, dataUpdateProduct?.information, dataUpdateProduct?.url]);

    useEffect(() => {
        if (dataUpdateProduct) return faUpdateProduct();
    }, [dataUpdateProduct, faUpdateProduct])

    return (
        <>
            {isLoadingProduct && <Loading />}

            {(isMessageProduct === "add product success" || isMessageProduct === "update product success") && (
                <AlertText
                    onClicks={() => {
                        closeForm();
                        handleGetProduct();
                    }}
                    nameButton="Close"
                >
                    {isMessageProduct}
                </AlertText>
            )}

            <div className={`
                ${styles["container-form-add-product"]}
                ${!visibleBlack ? styles["fade-out"] : styles["fade-in"]}
            `}>
                {formWhite && (
                    <div className={`${!visibleWhite ? styles["scale-out-center"] : styles["scale-in-center"]}`}>
                        <ButtonTooltip
                            styleButton="button-tooltip-form-add-product"
                            textTooltip="close form"
                            styleTooltip="text-tooltip-form-add-product"
                            styleCssTooltip={{ color: "white", width: "6rem" }}
                            onClicks={() => closeForm()}
                        >
                            <IoIosCloseCircle />
                        </ButtonTooltip>
                        <div className={styles["overflow-bg-white"]}>
                            <div className={styles["bg-white"]}>
                                <h3 className={styles["judul-form"]}>add product</h3>
                                <form onSubmit={handleOnSubmit}>
                                    <div className={styles["parent-input"]}>
                                        {/* Name */}
                                        <InputsForm
                                            typeInput="text"
                                            changeInput={(input) => updateLocalInput({ name: input })}
                                            valueInput={localInput.name}
                                            iconType={"SiNamecheap"}
                                            valuePlaceholder="name product"
                                            cssInput="input"
                                            cssPlaceholder="placeholder"
                                            cssIcon="icon"
                                            cssValidasi="validasi"
                                            maxInput={30}
                                            cssMaxInput="max-input"
                                            validasiInput={validasiProduct.name}
                                        />
                                        {/* Amount */}
                                        <InputsForm
                                            typeInput="number"
                                            changeInput={(input) => updateLocalInput({ amount: input })}
                                            valueInput={localInput.amount}
                                            iconType={"FaSortAmountUp"}
                                            valuePlaceholder="Amount"
                                            cssInput="input"
                                            cssPlaceholder="placeholder"
                                            cssIcon="icon"
                                            cssValidasi="validasi"
                                            maxInput={16}
                                            cssMaxInput="max-input"
                                            validasiInput={validasiProduct.amount}
                                        />
                                        {/* Price */}
                                        <InputsForm
                                            typeInput="number"
                                            changeInput={(input) => updateLocalInput({ price: input })}
                                            valueInput={localInput.price}
                                            iconType={"MdOutlinePriceChange"}
                                            valuePlaceholder="price"
                                            cssInput="input"
                                            cssPlaceholder="placeholder"
                                            cssIcon="icon"
                                            cssValidasi="validasi"
                                            maxInput={16}
                                            cssMaxInput="max-input"
                                            validasiInput={validasiProduct.price}
                                        />
                                        {/* Information */}
                                        <InputTextArea
                                            cssInput={"input-textarea"}
                                            cssPlaceholder={"placeholder-textarea"}
                                            cssValidasi={"input-validasi"}
                                            cssMaxInput={"max-input"}
                                            maxInput={1000}
                                            changeInput={(input) => updateLocalInput({ information: input })}
                                            valueInput={localInput.information}
                                            valuePlaceholder={"input your information"}
                                            validasiInput={validasiProduct.information}
                                            heights={50}
                                        />

                                        {/* Category */}
                                        <Dropdown
                                            choices={localInput.category}
                                            data={dataCategory}
                                            validasi={validasiProduct.category}
                                            cssUl="cssUl"
                                            onClicks={(data) => updateLocalInput({ category: data })}
                                        />

                                        {textValidasiUpload && (
                                            <p className={styles["validasi-image"]}>{textValidasiUpload}</p>
                                        )}
                                        {/* Input File Image */}
                                        <div className={styles["parent-upload-file"]} ref={parentUploadFileRef}>
                                            {/* Upload1 */}
                                            <UploadFile
                                                text={"upload1"}
                                                inputFile={(event) => updateLocalInput({ image1: event })}
                                                dangerValidasi={validasiProduct.image1}
                                                dataImage={localInput.image1}
                                                updateProduct={dataUpdateProduct}
                                            />
                                            {/* Upload2 */}
                                            {(localInput.image1 || localInput.image2) && (
                                                <UploadFile
                                                    text={"upload2"}
                                                    inputFile={(event) => updateLocalInput({ image2: event })}
                                                    dangerValidasi={validasiProduct.image2}
                                                    dataImage={localInput.image2}
                                                />
                                            )}
                                            {/* Upload3 */}
                                            {(localInput.image2 || localInput.image3) && (
                                                <UploadFile
                                                    text={"upload3"}
                                                    inputFile={(event) => updateLocalInput({ image3: event })}
                                                    dangerValidasi={validasiProduct.image3}
                                                    dataImage={localInput.image3}
                                                />
                                            )}
                                            {/* Upload4 */}
                                            {(localInput.image3 || localInput.image4) && (
                                                <UploadFile
                                                    text={"upload4"}
                                                    inputFile={(event) => updateLocalInput({ image4: event })}
                                                    dangerValidasi={validasiProduct.image4}
                                                    dataImage={localInput.image4}
                                                />
                                            )}
                                            {/* Upload5 */}
                                            {(localInput.image4 || localInput.image5) && (
                                                <UploadFile
                                                    text={"upload5"}
                                                    inputFile={(event) => updateLocalInput({ image5: event })}
                                                    dangerValidasi={validasiProduct.image5}
                                                    dataImage={localInput.image5}
                                                />
                                            )}
                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className={styles["btn-submit-form-add-product"]}
                                    >
                                        submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
