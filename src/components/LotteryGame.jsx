import { useState } from 'react'
import WinningValues from './winValuesandTime/winning_values'
import ScrollingText from './scrollingText/Scrollingtext';
import UtilRow from './util_row/util_row';
import LotteryGrid from './lottery_grid/grid';
import { useEffect } from 'react';
import { fetchResults } from '../utils/fetchResults';

function LotteryGame() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [resultsMap, setResultsMap] = useState({});
    const [curr1000sIdx, setCurr1000sIdx] = useState(1);
    const [grandTotals, setGrandTotals] = useState({ qty: 0, amt: 0 });


    const today = new Date().toISOString().split("T")[0];
    const latestResult = resultsMap?.[today]?.[0];
    const winValues = latestResult
        ? latestResult.result.slice(curr1000sIdx * 10, curr1000sIdx * 10 + 10)
        : [];

    useEffect(() => {
        const loadResults = async () => {
            const stored = localStorage.getItem("resultsMap");
            let map = stored ? JSON.parse(stored) : {};
            const results = await fetchResults(today);
            map[today] = results;
            localStorage.setItem("resultsMap", JSON.stringify(map));
            setResultsMap(map);
        };
        loadResults();
    }, [refreshTrigger]);

    return (
      <div className='h-dvh w-full flex flex-col overflow-hidden'>
        <div className='shrink-0 bg-black'>
          <WinningValues winValues={winValues} />
          <ScrollingText />
        </div>
        <div className='shrink-0 h-[6vh]'>
          <UtilRow setRefreshTrigger={setRefreshTrigger} grandTotals={grandTotals}/>
        </div>
        <div className='flex-grow min-h-0 overflow-hidden'>
          <LotteryGrid refreshTrigger={refreshTrigger} curr1000sIdx={curr1000sIdx} setCurr1000sIdx={setCurr1000sIdx} setGrandTotals={setGrandTotals}/>
        </div>
    </div>
    )
}

export default LotteryGame
