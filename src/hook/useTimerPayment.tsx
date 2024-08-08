import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

export const useTimerPayment = (id: string | undefined) => {
    const [timer, setTimer] = useState({ jam: 0, menit: 0, detik: 0 });
    const [fullTime, setFullTime] = useState<any>(null);
    // UseAppSelector
    const { dataPayment } = useAppSelector(state => state.apiPayment);

    const updateTimer = (event: any) => {
        setTimer((prev) => {
            return { ...prev, ...event }
        })
    }

    const handleDateExpiration = () => {
        if (dataPayment) {
            const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
            const months = ["january", "febuary", "march", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"]

            const dateTime = new Date(dataPayment.expiration_time);
            const year = dateTime.getFullYear();
            const day = dateTime.getDay();
            const date = dateTime.getDate();
            const month = dateTime.getMonth();
            const hours = dateTime.getHours();
            const minute = dateTime.getMinutes();

            const newHours = hours < 10 ? "0" + hours : hours;
            const newMinute = minute < 10 ? "0" + minute : minute;

            setFullTime(`${days[day]}, ${date} ${months[month]} ${year}, ${newHours}:${newMinute}`)
        }
    }

    const handleDefaultTimer = useCallback(() => {
        if (dataPayment) {
            handleDateExpiration();

            const currentTimestamp = new Date().getTime();
            const remainingTime = dataPayment.expiration_time - currentTimestamp;

            // Menghitung jam, menit, dan detik
            const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            if (remainingHours > 0 || remainingMinutes > 0 || remainingSeconds > 0) {
                updateTimer({ jam: remainingHours, menit: remainingMinutes, detik: remainingSeconds });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPayment]);

    // Handle Default Timer
    useEffect(() => {
        if (dataPayment) return handleDefaultTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPayment]);

    // Set Interval Timer
    useEffect(() => {
        if (timer.jam > 0 || timer.menit > 0 || timer.detik > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => {
                    if (prev.menit === 0 && prev.detik === 0) {
                        const data = { jam: prev.jam - 1, menit: 59, detik: 60 }
                        return { ...prev, ...data };
                    }

                    if (prev.detik === 0 && prev.menit > 0) {
                        const data = { menit: prev.menit - 1, detik: 60 }
                        return { ...prev, ...data };
                    }

                    const newDetik = prev.detik - 1;
                    return { ...prev, detik: newDetik };
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timer.jam, timer.menit, timer.detik]);

    return { timer, fullTime }
}
