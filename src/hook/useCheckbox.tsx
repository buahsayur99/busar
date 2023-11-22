import { productProps } from "../app/actions/apiProductSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateCheckeds } from "../app/actions/onOffSlice";

type useCheckboxProps = {
    data: productProps[]
}

export const useCheckbox = ({ data }: useCheckboxProps) => {
    // useAppSelector
    const { checkeds } = useAppSelector(state => state.onOffSlice);
    // useAppDispatch
    const dispatch = useAppDispatch();

    const checkedAll = (checkeds: any) => {
        if (checkeds.length !== data.length) return dispatch(updateCheckeds(data));
        return dispatch(updateCheckeds([]));
    }

    const checkedOne = (event: any) => {
        let newChecked = [...checkeds]

        const filterCheckeds = checkeds.filter((data: any) => {
            return data.id === event.id
        });

        if (filterCheckeds.length === 0) {
            newChecked.push(event);
        } else {
            newChecked = checkeds.filter((data: any) => {
                return data.id !== event.id
            })
        }

        return dispatch(updateCheckeds(newChecked));
    }

    const handleCheckeds = (event: any) => {
        if (event.selectAll === true) return checkedAll(checkeds);

        checkedOne(event);
    }

    return { handleCheckeds }
}
