import { useState } from 'react'
import WinningValues from './components/winValuesandTime/winning_values'
import ScrollingText from './components/scrollingText/Scrollingtext';
import UtilRow from './components/util_row/util_row';
import LotteryGrid from './components/lottery_grid/grid';
function App() {
    const [winValues, setWinValues] = useState([
        1000, 1001, 1002, 1003, 1004,
        1005, 1006, 1007, 1008, 1009
      ]);
    
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    return (
      // <>
      // <div className='bg-black mt-0'>
      //   <WinningValues winValues={winValues} />
      //   <ScrollingText />
      // </div>
      // <div >
      //     <div className='h-[5vh]'>
      //       <UtilRow setRefreshTrigger={setRefreshTrigger} />
      //     </div>
      // </div>
      //   <LotteryGrid refreshTrigger={refreshTrigger}/>
      // </>
      
      <div className='h-screen w-full flex flex-col overflow-hidden'>
    <div className='shrink-0 bg-black'>
      <WinningValues winValues={winValues} />
      <ScrollingText />
    </div>
    <div className='shrink-0 h-[5vh]'>
      <UtilRow setRefreshTrigger={setRefreshTrigger} />
    </div>
    {/* This container now controls the remaining 100% height */}
    <div className='flex-grow overflow-hidden'>
      <LotteryGrid refreshTrigger={refreshTrigger}/>
    </div>
  </div>
    )
}

export default App
