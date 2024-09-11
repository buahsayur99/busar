import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { io } from "socket.io-client";
import { DataWishlistProps, updateDataWishlist } from "../app/actions/apiWishlist";
import { apiUrl } from "../utils/variable";

export const useSocketWishlist = () => {
    const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = useState(false);

    const handleSocketCart = useCallback(() => {
        if (dataLoginUsers) {
            const sockets = io(`${apiUrl}`);

            sockets.on(`${dataLoginUsers.uuid}-socket-wishlists`, (wishlist: DataWishlistProps[]) => {
                console.log(wishlist)
                dispatch(updateDataWishlist(wishlist));
            });

            return () => {
                sockets.off(`${dataLoginUsers.uuid}-socket-wishlists`);
                sockets.disconnect();
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoginUsers])

    // const handleSocketWishlist = useCallback(() => {
    //     if (dataLoginUsers && !isConnected) {
    //         console.log("run socket")
    //         try {
    //             const sockets = io(`${apiUrl}`);

    //             sockets.on("connect", () => {
    //                 setIsConnected(true);
    //             });

    //             sockets.on("connect_error", () => {
    //                 setIsConnected(false);
    //                 sockets.disconnect();  // Disconnect on error
    //             });

    //             sockets.on(`${dataLoginUsers.uuid}-socket-wishlists`, (wishlist: DataWishlistProps[]) => {
    //                 dispatch(updateDataWishlist(wishlist));
    //             });

    //             return () => {
    //                 sockets.off(`${dataLoginUsers.uuid}-socket-wishlists`);
    //                 sockets.disconnect();
    //             };
    //         } catch (error) {
    //             console.error("Socket connection failed:", error);
    //             setIsConnected(false);
    //         }
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dataLoginUsers, isConnected]);

    useEffect(() => {
        handleSocketCart();
    }, [handleSocketCart])
}