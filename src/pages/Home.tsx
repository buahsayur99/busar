import { FormEvent, useState } from "react";
import { FormLoginRegister } from "../features/formLoginRegister/FormLoginRegister";
import { NavigationBar } from "../features/navbar/NavigationBar";
import { useSaveLastPage } from "../hook/useSaveLastPage";

export const Home = () => {
    const [images, setImages] = useState<string | File>("");
    const [preview, setPreview] = useState<string | File>("");
    const [preview1, setPreview1] = useState<string | File>("");
    useSaveLastPage();

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // const formData = new FormData();
        // formData.append("images", images);


        // try {
        //     const res = await fetch("http://localhost:5000/upload", {
        //         method: "POST",
        //         body: formData
        //     });
        //     const data = await res.json();

        //     alert(data.message);
        // } catch (error) {

        // }
    }

    const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files?.[0];
        if (image) {
            const data = URL.createObjectURL(image);
            setPreview1(data);
            processImage(image)
        }
    }

    const processImage = (file: any) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target && event.target.result) {
                const img = new Image();
                img.src = event.target.result as string;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const size = Math.min(img.width, img.height);

                    canvas.width = size;
                    canvas.height = size;

                    const context = canvas.getContext('2d');

                    if (context) {
                        context.drawImage(img, 0, 0, size, size);

                        canvas.toBlob((blob) => {
                            if (blob) {
                                const processedImage = URL.createObjectURL(blob);

                                // Lakukan sesuatu dengan gambar yang telah diproses, seperti menampilkannya di komponen
                                setPreview(processedImage);
                                setImages(processedImage);
                            }
                        }, 'image/png');
                    }
                };
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            {/* Form Login Register */}
            <FormLoginRegister />

            {/* Navbar */}
            <NavigationBar />

            <form onSubmit={handleOnSubmit}>
                <label>Single</label>
                <input type="file" name="image" onChange={loadImage} />
                <br />
                <br />
                <button type="submit">submit</button>
            </form>

            {preview && typeof preview === "string" && (
                <figure >
                    <img style={{ width: "10rem", height: "10rem" }} src={preview} alt="preview" />
                </figure>
            )}

            {preview1 && typeof preview1 === "string" && (
                <figure >
                    <div style={{ width: "10rem", height: "10rem", backgroundColor: "red" }}>a</div>
                </figure>
            )}
        </>
    )
}
