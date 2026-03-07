function WinButton({ value, color }) {
    return (
        <div
            className={`h-[2vh] landscape:h-[2vh] ${color} flex flex-col items-center justify-center 
            text-[9px] sm:text-[10px] md:text-xs text-white rounded leading-tight mt-1 font-bold`}
        >
            {value}
        </div>
    );
}

export default WinButton;