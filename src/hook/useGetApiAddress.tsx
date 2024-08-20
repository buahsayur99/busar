import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAddress, removeAddress, resetIsMessageAddress, updateChoiceAddress, updateMainAddress } from "../app/actions/apiAddressSlice";
import { apiUrl } from "../utils/variable";

export const useGetApiAddress = () => {
    const { dataAddress, isMessageAddress } = useAppSelector(state => state.apiAddress);
    const uuid = localStorage.getItem("uuid");
    // useAppDispatch
    const dispatch = useAppDispatch();

    const callGetApiAddress = useCallback(() => {
        if (isMessageAddress === "update main address success" ||
            isMessageAddress === "delete address success" ||
            isMessageAddress === "update choice address success") dispatch(resetIsMessageAddress());

        const link = `${apiUrl}/address/${uuid}`;
        return dispatch(getAddress({ link }));
    }, [dispatch, uuid, isMessageAddress])

    const deleteApiAddress = (id: number[]) => {
        const link = `${apiUrl}/address/${uuid}`;
        const data = { id: [...id] }

        return dispatch(removeAddress({ data, link }))
    }

    const updateApiAddressMain = (idAddress: number) => {
        const link = `${apiUrl}/update/main/address`;
        const filterAddress = dataAddress.filter(data => data.main === true);
        const idMainAddress = filterAddress[0].id

        if (idMainAddress && idAddress) {
            const data = {
                mainAddress: { id: idMainAddress },
                address: { id: idAddress }
            };
            dispatch(updateMainAddress({ data, link }))
        }
    }

    const updateApiAddressChoice = (idAddress: number) => {
        const link = `${apiUrl}/update/choice/address`;
        const filterAddress = dataAddress.filter(data => data.choice === true);
        const idChoiceAddress = filterAddress[0].id

        if (idChoiceAddress && idAddress) {
            const data = {
                choiceAddress: { id: idChoiceAddress },
                address: { id: idAddress }
            };
            dispatch(updateChoiceAddress({ data, link }))
        }
    }

    useEffect(() => {
        if (dataAddress.length === 0) callGetApiAddress();
    }, [callGetApiAddress, dataAddress.length])

    return { callGetApiAddress, deleteApiAddress, updateApiAddressMain, updateApiAddressChoice }
}