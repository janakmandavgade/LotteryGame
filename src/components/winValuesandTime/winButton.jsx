function WinButton({ value, color }) {
    return (
        <div
            className={`h-[2.5vh] ${color} flex flex-col items-center justify-center 
            text-[clamp(6px,1.2vw,11px)] text-white rounded leading-tight mt-1 font-bold`}
        >
            {value}
        </div>
    );
}

export default WinButton;