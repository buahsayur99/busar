import { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { DataCartProps, updateCheckedCart } from "../app/actions/apiCartSlice";

export const useCheckedCart = (dataCart: DataCartProps[], checkedCart: DataCartProps[]) => {
    const dispatch = useAppDispatch();
    let localStorageCheckedCart = localStorage.getItem("checkedCart");

    const saveLocalStorage = (event: DataCartProps[]) => {
        localStorage.setItem("checkedCart", JSON.stringify(event));
    }

    const handleCheckedCart = (event: DataCartProps | string) => {
        if (typeof event === "string") {
            if (event === "selectAll") {
                if (checkedCart.length !== dataCart.length) {
                    dispatch(updateCheckedCart(dataCart))
                    saveLocalStorage(dataCart)
                } else {
                    dispatch(updateCheckedCart([]))
                    saveLocalStorage([])
                }
            }
        } else {
            const filterChecked = checkedCart.filter((data) => {
                return data.id === event.id
            });

            if (filterChecked.length === 0) {
                const newChecked = [...checkedCart, event]
                dispatch(updateCheckedCart(newChecked));
                saveLocalStorage(newChecked)
            } else {
                const newChecked = checkedCart.filter((data) => {
                    return data.id !== event.id
                });
                dispatch(updateCheckedCart(newChecked));
                saveLocalStorage(newChecked)
            }
        }
    }

    useEffect(() => {
        if (localStorageCheckedCart && dataCart.length !== 0) {
            const newChecked: DataCartProps[] = JSON.parse(localStorageCheckedCart)
            const filteredArray = dataCart.filter((item) =>
                newChecked.some((newItem: DataCartProps) => newItem.id === item.id)
            );
            dispatch(updateCheckedCart(filteredArray))
        }
        if (!localStorageCheckedCart && dataCart.length !== 0) dispatch(updateCheckedCart(dataCart))
    }, [dispatch, dataCart, localStorageCheckedCart]);

    return { handleCheckedCart }
}