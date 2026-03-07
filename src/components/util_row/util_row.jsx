function UtilRow({setRefreshTrigger}){

    return (
        <div className="h-full grid grid-cols-[70%_30%] w-full overflow-hidden">
            {/* 70% */}
            <div className="grid grid-cols-8 gap-[0.3vw] overflow-hidden">
                <div className="h-full bg-linear-to-r from-[#1bae0c] to-[#8AB55F] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white">
                    3:37:50 PM
                </div>

                <div className="h-full bg-gradient-to-br from-[#5C4F27] to-[#AF904D] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white">
                    3:45 PM
                </div>

                <div className="h-full bg-gradient-to-br from-[#AC0609] to-[#840002] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white">
                    07:10 RT
                </div>

                <div className="h-full bg-gradient-to-br from-[#7A906E] to-[#CEE1C3] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-red-800 font-bold">
                    260494 PT
                </div>

                <div className="h-full bg-gradient-to-b from-[#5B0CC5] to-[#340373] rounded-lg justify-center text-center text-[clamp(6px,1.2vw,11px)] truncate flex items-center border-black border-1 text-white font-extrabold">
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

                        <div className="h-full bg-[#EC4143] rounded-lg flex items-center justify-center text-[clamp(5px,0.9vw,9px)] truncate border border-black text-white font-bold">
                            Logout
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default UtilRow;