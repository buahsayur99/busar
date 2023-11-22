import { useRef } from "react";
import styles from "../style/index.module.scss";
import { BiSolidCloudUpload, IoIosCloseCircle } from "../utils/icons";
import { ButtonTooltip } from "./ButtonTooltip";
import { productProps } from "../app/actions/apiProductSlice";

type UploadFileProps = {
    inputFile: (event: any) => void;
    dangerValidasi?: { status: boolean, text: string };
    text?: string;
    dataImage?: null | string | File
    updateProduct?: productProps | null
}

export const UploadFile = ({ inputFile, text, dangerValidasi, dataImage }: UploadFileProps) => {
    // Membuat ref untuk elemen input
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleContainerClick = () => {
        // Mengaktifkan klik pada elemen input
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]; // Mengambil file pertama yang dipilih oleh pengguna
        if (selectedFile) {
            inputFile(selectedFile); // Panggil fungsi inputFile dan kirim file
        }
    };

    const canselUploaded = () => {
        // Mengosongkan nilai input file
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        inputFile(null); // Panggil fungsi inputFile dan kirim file
    }

    return (
        <>
            <div style={{ backgroundColor: "red", position: "relative" }}>
                {dataImage && (
                    <ButtonTooltip
                        styleButton="button-tooltip-upload-file"
                        textTooltip="close form"
                        styleTooltip="text-tooltip-form-upload-file"
                        onClicks={() => canselUploaded()}
                    >
                        <IoIosCloseCircle />
                    </ButtonTooltip>
                )}

                <div
                    className={`
                    ${styles["container-upload-file"]}
                    ${dataImage && styles["container-uploaded"]}
                    ${dangerValidasi?.status && styles["upload-danger"]}
                `}
                >
                    <div onClick={() => handleContainerClick()}>
                        <input type="file" accept="image/*" name="image1" ref={inputRef} onChange={handleFileChange} hidden />
                        <div style={{ display: "grid", justifyItems: "center", padding: ".5rem" }}>
                            {/* if 'dataImage' exists */}
                            {dataImage ? (
                                <>
                                    {/* Check if 'dataImage' is a file */}
                                    {dataImage instanceof File && (
                                        // Display image
                                        <img src={URL.createObjectURL(dataImage)} alt={text} />
                                    )}
                                    {/* Check if 'dataImage' is a string */}
                                    {typeof dataImage === "string" && (
                                        // Display image
                                        <img src={`${process.env.REACT_APP_API_URL_LOCAL}/${dataImage}`} alt={"aaaa"} />
                                    )}
                                </>
                            )
                                // if 'dataImage' does not exists.
                                : (
                                    // Display icon upload image
                                    <>
                                        <span className={`
                                    ${styles["icon-upload"]}
                                    ${dangerValidasi?.status && styles["icon-upload-danger"]}
                                `}
                                        >
                                            <BiSolidCloudUpload />
                                        </span>
                                        <h5 className={`${dangerValidasi?.status && styles["text-danger"]}`}>
                                            {!text ? (
                                                "upload"
                                            ) : (
                                                text
                                            )}
                                        </h5>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
