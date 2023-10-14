import { useEffect, useRef } from "react";
import { useGetApiAddress } from "../../hook/useGetApiAddress";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "../../style/index.module.scss";
import { DataAddressProps, changeInputAddress, handleOnCheckboxAddress } from "../../app/actions/apiAddressSlice";
import { BsCheck2All } from "../../utils/icons";

type DisplayAddressProps = {
    activeCheckbox: boolean;
    handleAddressUtama: (address: any) => void;
    handleFormAddress: (event: any) => void
}

export const DisplayAddress = ({ activeCheckbox, handleAddressUtama, handleFormAddress }: DisplayAddressProps) => {
    // Custome Hook
    const { callGetApiAddress } = useGetApiAddress();
    // useAppSelector
    const { dataAddress, isMessageAddress, checkeds } = useAppSelector(state => state.apiAddress);
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    // useDispatch
    const dispatch = useAppDispatch();
    // useRef
    const checkboxRef = useRef<HTMLInputElement>(null)

    const handleOnCheckbox = (address: DataAddressProps) => {
        if (activeCheckbox === true) return dispatch(handleOnCheckboxAddress(address))
    }

    const handleOpenFormChangeAddress = (dataAddress: any) => {
        dispatch(changeInputAddress(dataAddress))
        handleFormAddress({ formAddress: true })
    }

    useEffect(() => {
        if (isMessageAddress === "add address success") {
            callGetApiAddress()
        }
    }, [callGetApiAddress, isMessageAddress])

    return (
        <>
            <div className={styles["container-display-address"]}>
                {dataAddress !== null && Array.isArray(dataAddress) && (
                    <ul>
                        {/* Main Address */}
                        {dataAddress
                            .filter((data) => data.id === dataLoginUsers?.idAddress)
                            .map((address) => (
                                <li
                                    key={address.id}
                                >
                                    <div
                                        className={`
                                            ${styles["parent-data-address"]}
                                        `}
                                    >
                                        <div className={styles["parent-name-address"]}>
                                            <div className={styles["flex-name-phone"]}>
                                                <h2>{address.name}</h2>
                                                <div className={styles["line"]}></div>
                                                <h4>{address.numberPhone}</h4>
                                            </div>

                                            {address.id === dataLoginUsers?.idAddress && (
                                                <span>
                                                    main address
                                                </span>
                                            )}
                                        </div>

                                        <div className={styles["addressWrapper"]}>
                                            <p className={styles["complete-address"]}>
                                                {address.completeAddress}
                                            </p>
                                            <div className={styles["parent-detail-address"]}>
                                                <p>{address.subdistrict},</p>
                                                <p>{address.city},</p>
                                                <p>{address.codePos}</p>
                                            </div>
                                        </div>
                                        <div className={styles["parent-btn-ubah-utama"]}>
                                            <button onClick={() => handleOpenFormChangeAddress(address)}>
                                                ubah
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}

                        {/* Address */}
                        {dataAddress
                            .filter((data) => data.id !== dataLoginUsers?.idAddress)
                            .map((address, index) => (
                                <li
                                    key={address.id}
                                    className={`
                                    ${activeCheckbox && address.id !== dataLoginUsers?.idAddress && styles["li-grid"]}
                                `}
                                >
                                    {activeCheckbox && address.id !== dataLoginUsers?.idAddress && (
                                        <div className={styles["checkbox-container"]}>
                                            <input
                                                ref={checkboxRef}
                                                type="checkbox"
                                                className={styles["checkbox"]}
                                                checked={checkeds.indexOf(address) === -1 ? false : true}
                                                onChange={() => dispatch(handleOnCheckboxAddress(address))}
                                            />
                                            <BsCheck2All className={styles["icon"]} />
                                        </div>
                                    )}

                                    <div
                                        data-testid="parent-data-address"
                                        className={`
                                        ${styles["parent-data-address"]}
                                        ${activeCheckbox && styles["line-left"]}
                                    `}
                                        onClick={() => handleOnCheckbox(address)}
                                    >
                                        <div className={styles["parent-name-address"]}>
                                            <div className={styles["flex-name-phone"]}>
                                                <h2>{address.name}</h2>
                                                <div className={styles["line"]}></div>
                                                <h4>{address.numberPhone}</h4>
                                            </div>
                                        </div>

                                        <div className={styles["addressWrapper"]}>
                                            <p className={styles["complete-address"]}>{address.completeAddress}</p>
                                            <div className={styles["parent-detail-address"]}>
                                                <p>{address.subdistrict},</p>
                                                <p>{address.city},</p>
                                                <p>{address.codePos}</p>
                                            </div>
                                        </div>
                                        <div className={styles["parent-btn-ubah-utama"]}>
                                            <button onClick={() => handleOpenFormChangeAddress(address)}>
                                                ubah
                                            </button>
                                            {address.id !== dataLoginUsers?.idAddress && (
                                                <>
                                                    <div className={styles["line"]}></div>
                                                    <button onClick={() => handleAddressUtama(address)}>
                                                        jadikan alamat utama
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </>
    )
}
