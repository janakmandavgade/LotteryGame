import { useState } from "react";
import WinButton from "./winButton";



function WinningValues({winValues}){
    // const [value, setValue] = useState(lotteryValues)
    
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-orange-500",
        "bg-gray-200",
        "bg-pink-500",
        "bg-gray-500",
        "bg-black"
    ];

    function getDateTime() {
        const now = new Date();

        const date = now.toISOString().split("T")[0];

        const time = now
            .toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
            })
            .replace("AM", "A.M")
            .replace("PM", "P.M");

        return (
            <>
            <span>{date}</span>
            <span>{time}</span>
            </>
        );
    }

    return (
        <div className="grid grid-cols-11 w-full gap-1">
            {winValues.map((item, index) => {
                const randomColor = colors[index];

                return (
                    <WinButton
                        
                        key={index}
                        value={item}
                        color={randomColor}
                    />
                );

            })}
            <div>
                <WinButton value={getDateTime()} color={colors[colors.length - 1]}/>
            </div>
        </div>
    )
}

export default WinningValues;