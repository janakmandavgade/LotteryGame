import { useState } from 'react'
import WinningValues from './winValuesandTime/winning_values'
import ScrollingText from './scrollingText/Scrollingtext';
import UtilRow from './util_row/util_row';
import LotteryGrid from './lottery_grid/grid';

function LotteryGame() {
    const [winValues, setWinValues] = useState([
        1000, 1001, 1002, 1003, 1004,
        1005, 1006, 1007, 1008, 1009
      ]);
    
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    return (
      <div className='h-dvh w-full flex flex-col overflow-hidden'>
        <div className='shrink-0 bg-black'>
          <WinningValues winValues={winValues} />
          <ScrollingText />
        </div>
        <div className='shrink-0 h-[6vh]'>
          <UtilRow setRefreshTrigger={setRefreshTrigger} />
        </div>
        <div className='flex-grow min-h-0 overflow-hidden'>
          <LotteryGrid refreshTrigger={refreshTrigger}/>
        </div>
    </div>
    )
}

export default LotteryGame
