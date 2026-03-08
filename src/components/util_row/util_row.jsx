import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchBalance } from "../../utils/fetchBalance";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function UtilRow({setRefreshTrigger, grandTotals}){
    const SLOT = 15; // minutes
    const navigate = useNavigate();
    const [points, setPoints] = useState();

    const displayPoints = Math.max(points - grandTotals.amt, 0);

    useEffect(() => {

        const loadBalance = async () => {
            const balance = await fetchBalance();
            setPoints(balance);
        };

        loadBalance();

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        navigate("/login");
    };

    const [currentTime, setCurrentTime] = useState(() =>
        new Date().toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }));
    
    const getInitialNextRound = () => {
        const now = new Date();

        const minutes = now.getMinutes();
        const nextSlot = Math.ceil(minutes / SLOT) * SLOT;

        const next = new Date(now);
        next.setSeconds(0);
        next.setMilliseconds(0);

        if (nextSlot === 60) {
            next.setHours(now.getHours() + 1);
            next.setMinutes(0);
        } else {
            next.setMinutes(nextSlot);
        }

        // ensure it is always future
        if (next <= now) {
            next.setMinutes(next.getMinutes() + SLOT);
        }

        return next;
    };

    const initialNext = getInitialNextRound();

    const [nextRound, setNextRound] = useState(initialNext);

    const getRemainingTime = (next) => {
        const now = new Date();
        const diff = next.getTime() - now.getTime();

        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")} RT`;
    };

    const [remainingTime, setRemainingTime] = useState(
        getRemainingTime(initialNext)
    );

    

    useEffect(() => {

        let next = getInitialNextRound();
        setNextRound(next);

        const interval = setInterval(() => {

            const now = new Date();

            setCurrentTime(
                now.toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                })
            );

            if (now >= next) {

                const newNext = new Date(next);
                newNext.setMinutes(newNext.getMinutes() + SLOT);

                next = newNext;
                setNextRound(newNext);
                setRefreshTrigger(prev => prev + 1);
            }

            const diff = next.getTime() - now.getTime();

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            const formatted =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

            setRemainingTime(formatted + " RT");

        }, 1000);

        return () => clearInterval(interval);

    }, []);
    
    return (
        <div className="h-full grid grid-cols-[70%_30%] w-full overflow-hidden">
            {/* 70% */}
            <div className="grid grid-cols-8 gap-[0.3vw] overflow-hidden">
                <div className="h-full bg-linear-to-r from-[#1bae0c] to-[#8AB55F] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white">
                    {currentTime}
                </div>

                <div className="h-full bg-gradient-to-br from-[#5C4F27] to-[#AF904D] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white">
                    {nextRound &&
                        nextRound.toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                        })
                    }
                </div>

                <div className="h-full bg-gradient-to-br from-[#AC0609] to-[#840002] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white">
                    {remainingTime}
                </div>

                <div className="h-full bg-gradient-to-br from-[#7A906E] to-[#CEE1C3] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-red-800 font-bold">
                    {displayPoints} PT
                </div>

                <div className="h-full bg-gradient-to-b from-[#5B0CC5] to-[#340373] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white font-extrabold"
                onClick={() => navigate('/results')}>
                    RESULT
                </div>

                <div className="h-full bg-gradient-to-b from-[#00CBF7] to-[#019CC7] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white font-extrabold">
                    REPRINT
                </div>

                <div className="h-full bg-gradient-to-b from-[#2BBC90] to-[#0E7E67] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white font-extrabold">
                    CANCEL
                </div>

                <div className="h-full bg-[#245DE3] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white font-extrabold" onClick={() => setRefreshTrigger(prev => prev + 1)}>
                    REFRESH
                </div>
            </div>

            {/* 30% */}
            <div>
                <div className="h-full flex items-center justify-center ml-1 py-[1vh]">
                    <div className="grid grid-cols-3 gap-[0.3vw] w-full h-full">
                        <div className="h-full bg-[#A6070C] rounded-lg flex items-center justify-center text-[clamp(5px,0.9vw,9px)] truncate border border-black text-white font-bold">
                            3D Game
                        </div>

                        <div className="h-full bg-[#010001] rounded-lg flex items-center justify-center text-[clamp(5px,0.9vw,9px)] truncate border border-black text-white font-bold">
                            Password
                        </div>

                        <div className="h-full bg-[#EC4143] rounded-lg flex items-center justify-center text-[clamp(5px,0.9vw,9px)] truncate border border-black text-white font-bold cursor-pointer" onClick={handleLogout}>
                            Logout
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default UtilRow;