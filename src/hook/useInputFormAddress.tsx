import { useCallback, useEffect, useState } from "react";
import { dataValidasiInputFormAddress, datainputClicked } from "../data/FormAddress";
import { useAppSelector } from "../app/hooks";

export const useInputFormAddress = () => {
    const { inputFormAddress } = useAppSelector(state => state.apiAddress);
    // State
    const [input, setInput] = useState(inputFormAddress);
    const [validasiInput, setValidasiInput] = useState(dataValidasiInputFormAddress);
    const [inputClicked, setInputClicked] = useState(datainputClicked);
    const [activeSave, setActiveSave] = useState(false);

    const changeInputValue = (event: any) => {
        setInput(prev => {
            const updatedInput = { ...prev, ...event };
            return updatedInput;
        });
    };

    const changeValidasiInput = (event: any) => {
        setValidasiInput(prev => {
            return { ...prev, ...event }
        })
    }

    const changeInputClicked = (event: any) => {
        setInputClicked(prev => {
            return { ...prev, ...event }
        })
    }

    const validateNameInput = useCallback((updatedInput: any) => {
        // if the user enters an input value, make inputClicked true
        if (updatedInput.name.length >= 1) changeInputClicked({ name: true });

        if (inputClicked.name && updatedInput.name === "") return changeValidasiInput({ name: { status: true, text: "Name Must be filled in" } });
        if (inputClicked.name && updatedInput.name.length < 4 && updatedInput.name.length >= 1) return changeValidasiInput({ name: { status: true, text: "Name is too short (minimum 4 digits)." } });
        return changeValidasiInput({ name: { status: false, text: "" } });
    }, [inputClicked.name]);
    const validateNumberPhoneInput = useCallback((updatedInput: any) => {
        // if the user entrs an input value, make inputClicked true
        if (updatedInput.numberPhone.length >= 1) changeInputClicked({ numberPhone: true });

        // If Number Phone
        if (inputClicked.numberPhone && updatedInput.numberPhone === "") return changeValidasiInput({ numberPhone: { status: true, text: "Number phone must be filled in" } });
        if (inputClicked.numberPhone && updatedInput.numberPhone.length < 10 && updatedInput.numberPhone.length >= 1) return changeValidasiInput({ numberPhone: { status: true, text: "Number phone is too short (minimum 10 digits)." } });
        return changeValidasiInput({ numberPhone: { status: false, text: "" } });
    }, [inputClicked.numberPhone]);
    const validateCityInput = useCallback((updatedInput: any) => {
        // if the user enters an input value, make inputClicked true
        if (updatedInput.city.length >= 1) changeInputClicked({ city: true });

        // If City
        if (inputClicked.city && updatedInput.city === "") return changeValidasiInput({ city: { status: true, text: "City must be filled in" } });
        if (inputClicked.city && updatedInput.city.length < 4 && updatedInput.city.length >= 1) return changeValidasiInput({ city: { status: true, text: "City is too short (minimum 4 digits)." } });
        return changeValidasiInput({ city: { status: false, text: "" } });
    }, [inputClicked.city]);
    const validateSubdistrictInput = useCallback((updatedInput: any) => {
        // if the user enters an input value, make inputClicked true
        if (updatedInput.subdistrict.length >= 1) changeInputClicked({ subdistrict: true });

        // If Subdistrict
        if (inputClicked.subdistrict && updatedInput.subdistrict === "") return changeValidasiInput({ subdistrict: { status: true, text: "Subdistrict must be filled in" } });
        if (inputClicked.subdistrict && updatedInput.subdistrict.length < 4 && updatedInput.subdistrict.length >= 1) return changeValidasiInput({ subdistrict: { status: true, text: "Subdistrict is too short (minimum 4 digits)." } });
        return changeValidasiInput({ subdistrict: { status: false, text: "" } });
    }, [inputClicked.subdistrict]);
    const validateCodePosInput = useCallback((updatedInput: any) => {
        // if the user enters an input value, make inputClicked true
        if (updatedInput.codePos.length >= 1) changeInputClicked({ codePos: true });

        // If CodePos
        if (inputClicked.codePos && updatedInput.codePos === "") return changeValidasiInput({ codePos: { status: true, text: "CodePos must be filled in" } });
        if (inputClicked.codePos && updatedInput.codePos.length < 5 && updatedInput.codePos.length >= 1) return changeValidasiInput({ codePos: { status: true, text: "CodePos is too short (minimum 5 digits)." } });
        return changeValidasiInput({ codePos: { status: false, text: "" } });
    }, [inputClicked.codePos]);
    const validateCompleteAddressInput = useCallback((updatedInput: any) => {
        // if the user enters an input value, make inputClicked true
        if (updatedInput.completeAddress.length >= 1) changeInputClicked({ completeAddress: true });

        // If Complete Address
        if (inputClicked.completeAddress && updatedInput.completeAddress === "") return changeValidasiInput({ completeAddress: { status: true, text: "Complete Address must be filled in" } });
        if (inputClicked.completeAddress && updatedInput.completeAddress.length < 15 && updatedInput.completeAddress.length >= 1) return changeValidasiInput({ completeAddress: { status: true, text: "Complete Address is too short (minimum 15 digits)." } });
        return changeValidasiInput({ completeAddress: { status: false, text: "" } });

    }, [inputClicked.completeAddress]);

    const changeActiveSave = useCallback(() => {
        if (
            validasiInput.name.status === false && inputClicked.name &&
            validasiInput.numberPhone.status === false && inputClicked.numberPhone &&
            validasiInput.city.status === false && inputClicked.city &&
            validasiInput.subdistrict.status === false && inputClicked.subdistrict &&
            validasiInput.codePos.status === false && inputClicked.codePos &&
            validasiInput.completeAddress.status === false && inputClicked.completeAddress
        ) return setActiveSave(true)
        return setActiveSave(false)
    }, [validasiInput.name.status, inputClicked.name, validasiInput.numberPhone.status, inputClicked.numberPhone, validasiInput.city.status, inputClicked.city, validasiInput.subdistrict.status, inputClicked.subdistrict, validasiInput.codePos.status, inputClicked.codePos, validasiInput.completeAddress.status, inputClicked.completeAddress])

    useEffect(() => {
        changeActiveSave()

        validateNameInput(input);
        validateNumberPhoneInput(input);
        validateCityInput(input)
        validateSubdistrictInput(input);
        validateCodePosInput(input);
        validateCompleteAddressInput(input);
    }, [changeActiveSave, validateCompleteAddressInput, validateCodePosInput, validateSubdistrictInput, validateCityInput, validateNumberPhoneInput, validateNameInput, input]);

    return { input, validasiInput, activeSave, inputClicked, changeInputValue }
}
