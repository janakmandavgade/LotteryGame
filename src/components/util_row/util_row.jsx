function UtilRow({setRefreshTrigger}){

    return (
        <div className="h-full grid grid-cols-[70%_30%] w-full">
            {/* 70% */}
            <div className="grid grid-cols-8 gap-1">
                <div className="h-full bg-linear-to-r from-[#1bae0c] to-[#8AB55F] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white">
                    3:37:50 PM
                </div>

                <div className="h-full bg-gradient-to-br from-[#5C4F27] to-[#AF904D] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white">
                    3:45 PM
                </div>

                <div className="h-full bg-gradient-to-br from-[#AC0609] to-[#840002] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white">
                    07:10 RT
                </div>

                <div className="h-full bg-gradient-to-br from-[#7A906E] to-[#CEE1C3] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-red-800 font-bold">
                    260494 PT
                </div>

                <div className="h-full bg-gradient-to-b from-[#5B0CC5] to-[#340373] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white font-extrabold">
                    RESULT
                </div>

                <div className="h-full bg-gradient-to-b from-[#00CBF7] to-[#019CC7] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white font-extrabold">
                    REPRINT
                </div>

                <div className="h-full bg-gradient-to-b from-[#2BBC90] to-[#0E7E67] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white font-extrabold">
                    CANCEL
                </div>

                <div className="h-full bg-[#245DE3] rounded-lg justify-center text-center text-[clamp(8px,1.5vw,14px)] flex items-center border-black border-1 text-white font-extrabold" onClick={() => setRefreshTrigger(prev => prev + 1)}>
                    REFRESH
                </div>
            </div>

            {/* 30% */}
            <div>
                <div className="h-[6vh] flex items-center justify-center ml-1">
                    <div className="grid grid-cols-3 gap-1 w-full">
                        <div className="h-[3vh] bg-[#A6070C] rounded-lg flex items-center justify-center text-[clamp(8px,1.5vw,14px)] border border-black text-white font-bold">
                            3D Game
                        </div>

                        <div className="h-[3vh] bg-[#010001] rounded-lg flex items-center justify-center text-[clamp(8px,1.5vw,14px)] border border-black text-white font-bold">
                            Password
                        </div>

                        <div className="h-[3vh] bg-[#EC4143] rounded-lg flex items-center justify-center text-[clamp(8px,1.5vw,14px)] border border-black text-white font-bold">
                            Logout
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default UtilRow;