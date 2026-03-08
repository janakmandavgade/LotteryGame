import React, { useState, useMemo, useRef, useEffect } from 'react';

export default function LotteryGrid({refreshTrigger, curr1000sIdx, setCurr1000sIdx, setGrandTotals, pendingTransactions, setPendingTransactions}) {
  const [valueMap, setValueMap] = useState({});
  // const [curr1000sIdx, setCurr1000sIdx] = useState(0);
  const [curr100sIdx, setCurr100sIdx] = useState(0);
  const [thousandsSelected, setThousandsSelected] = useState(new Array(10).fill(false));
  const [hundredsSelected, setHundredsSelected] = useState(new Array(10).fill(false));
  
  const [evenOnly, setEvenOnly] = useState(false);
  const [oddOnly, setOddOnly] = useState(false);
  
  const bulkPrevValues = useRef({});

  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-gray-400",
    "bg-pink-500", "bg-gray-600"
  ];

  const isCellAllowed = (localId) => {
    if (evenOnly) return localId % 2 === 0;
    if (oddOnly) return localId % 2 !== 0;
    return true;
  };

  const handleRefresh = () => {
    setValueMap({});
    setThousandsSelected(new Array(10).fill(false));
    setHundredsSelected(new Array(10).fill(false));
    setEvenOnly(false);
    setOddOnly(false);
    bulkPrevValues.current = {};
    document.querySelectorAll('input[type="number"]').forEach(i => i.value = "");
  };

  const handleBuy = () => {

    if (Object.keys(valueMap).length === 0) return;

    const email = JSON.parse(localStorage.getItem("currentUser")).email;

    const playedValues = Object.fromEntries(
      Object.entries(valueMap).filter(([_, v]) => v > 0)
    );

    const transaction = {
      email,
      valuesPlayed: playedValues,
      total_qty: grandTotals.qty,
      total_amt: grandTotals.amt,
      time: new Date(),
      date: new Date()
    };

    setPendingTransactions(prev => [...prev, transaction]);

    handleRefresh();
  };

  useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('Refreshed')
      handleRefresh();
    }
  }, [refreshTrigger]);

  const rowStats = useMemo(() => {
    const stats = Array.from({ length: 10 }, () => ({ qty: 0, amt: 0 }));
    const thousandsBase = curr1000sIdx * 1000;
    Object.entries(valueMap).forEach(([id, value]) => {
      const numericId = parseInt(id);
      if (numericId < thousandsBase || numericId >= thousandsBase + 1000) return;
      const localId = numericId % 100;
      if (!isCellAllowed(localId)) return;
      const val = parseFloat(value) || 0;
      if (val === 0) return;
      const hundredsIdx = Math.floor((numericId - thousandsBase) / 100);
      if (hundredsIdx >= 0 && hundredsIdx < 10) {
        stats[hundredsIdx].qty += val;
        stats[hundredsIdx].amt += (val * 2);
      }
    });
    return stats;
  }, [valueMap, evenOnly, oddOnly, curr1000sIdx]);

  const grandTotals = useMemo(() => {
    let qty = 0, amt = 0;
    Object.entries(valueMap).forEach(([id, value]) => {
      const numericId = parseInt(id);
      const localId = numericId % 100;
      if (!isCellAllowed(localId)) return;
      const val = parseFloat(value) || 0;
      if (val === 0) return;
      qty += val;
      amt += val * 2;
    });
    return { qty, amt };
  }, [valueMap, evenOnly, oddOnly]);

  useEffect(() => {
    setGrandTotals(grandTotals);
  }, [grandTotals]);

  const stampData = (nextT, nextH) => {
    setValueMap(prevMap => {
      const newMap = { ...prevMap };
      const sourceBase = (curr1000sIdx * 1000) + (curr100sIdx * 100);
      const activeT = nextT.map((s, i) => s ? i : null).filter(v => v !== null);
      if (!activeT.includes(curr1000sIdx)) activeT.push(curr1000sIdx);
      const activeH = nextH.map((s, i) => s ? i : null).filter(v => v !== null);
      if (!activeH.includes(curr100sIdx)) activeH.push(curr100sIdx);

      activeT.forEach(tIdx => {
        activeH.forEach(hIdx => {
          const targetBase = (tIdx * 1000) + (hIdx * 100);
          for (let i = 0; i < 100; i++) {
            if (isCellAllowed(i) && prevMap[sourceBase + i]) {
              newMap[targetBase + i] = prevMap[sourceBase + i];
            }
          }
        });
      });
      return newMap;
    });
  };

  const updateMapValues = (cellIndices, newValueRaw, inputKey, isDirect = false) => {
    const newValue = newValueRaw === "" ? 0 : parseFloat(newValueRaw);
    const prevValue = bulkPrevValues.current[inputKey] || 0;
    const delta = isDirect ? 0 : newValue - prevValue;
    if (!isDirect) bulkPrevValues.current[inputKey] = newValue;

    setValueMap(prevMap => {
      const newMap = { ...prevMap };
      const activeT = thousandsSelected.map((s, i) => s ? i : null).filter(v => v !== null);
      if (!activeT.includes(curr1000sIdx)) activeT.push(curr1000sIdx);
      const activeH = hundredsSelected.map((s, i) => s ? i : null).filter(v => v !== null);
      if (!activeH.includes(curr100sIdx)) activeH.push(curr100sIdx);

      activeT.forEach(tIdx => {
        activeH.forEach(hIdx => {
          cellIndices.forEach(localId => {
            if (!isCellAllowed(localId)) return;
            const absoluteId = (tIdx * 1000) + (hIdx * 100) + localId;
            if (isDirect) {
              newValue === 0 ? delete newMap[absoluteId] : newMap[absoluteId] = newValue;
            } else {
              const currentVal = prevMap[absoluteId] || 0;
              const finalVal = currentVal + delta;
              finalVal <= 0 ? delete newMap[absoluteId] : newMap[absoluteId] = finalVal;
            }
          });
        });
      });
      return newMap;
    });
  };

  const toggleAll = (type) => {
    if (type === '1000') {
      const isAll = thousandsSelected.every(v => v);
      const nextT = new Array(10).fill(!isAll);
      setThousandsSelected(nextT);
      if (!isAll) stampData(nextT, hundredsSelected);
    } else {
      const isAll = hundredsSelected.every(v => v);
      const nextH = new Array(10).fill(!isAll);
      setHundredsSelected(nextH);
      if (!isAll) stampData(thousandsSelected, nextH);
    }
  };

  return (
    <div className="p-0 w-full h-full overflow-hidden font-sans grid grid-rows-[7%_86%_7%]">
      {/* 1k Row */}

      <div className="grid grid-cols-[5fr_1fr] overflow-hidden w-full h-full items-center py-[1vh]">

        <div className='grid grid-cols-[1fr_11fr] gap-[0.3vw] items-center justify-center overflow-hidden h-full'>

          <div className="flex items-center justify-center text-center self-center max-h-[4vh] w-full gap-[0.2vw]">

            <input type="checkbox" checked={thousandsSelected.every(v => v)} onChange={() => toggleAll('1000')} className="w-2 h-2 shrink-0" />
            <span className="flex items-center justify-center bg-black text-white font-bold w-full px-[0.3vw] py-[0.5vh] rounded text-[clamp(5px,0.9vw,10px)] leading-none h-full">All</span>
          </div>

          <div className="grid grid-cols-10 gap-[0.3vw] h-full items-center">
            {thousandsSelected.map((sel, i) => (

              <div key={i} className="flex items-center gap-[0.2vw] min-w-0 overflow-hidden">
                
                <input type="checkbox" checked={sel} onChange={() => { const n = [...thousandsSelected]; n[i] = !n[i]; setThousandsSelected(n); if(n[i]) stampData(n, hundredsSelected); }} className="w-2 h-2 shrink-0" />
                <button 
                  onClick={() => setCurr1000sIdx(i)} 
                  className={`${colors[i]} text-white font-bold w-full h-full px-0 py-0 rounded shadow-sm hover:opacity-80 transition-opacity text-[clamp(5px,0.9vw,10px)] truncate`}
                >
                  {i}0-{i}9
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-[0.5vw] pl-[0.3vw] h-full w-full items-center justify-center">
          {['EVEN', 'ODD', 'CP', 'FP'].map((label) => (
            <label key={label} className="flex items-center text-[clamp(6px,1vw,11px)] gap-[0.5vw] font-black cursor-pointer h-full" >
              <input 
                type="checkbox" 
                className="w-2 h-2 shrink-0"
                checked={label === 'EVEN' ? evenOnly : label === 'ODD' ? oddOnly : false} 
                onChange={() => {
                  if (label === 'EVEN') { setEvenOnly(!evenOnly); setOddOnly(false); }
                  if (label === 'ODD') { setOddOnly(!oddOnly); setEvenOnly(false); }
                }}
              /> {label}
            </label>
          ))}
        </div>
      </div>

      {/* Main Grid for matrix*/}
      
      <div className="grid grid-cols-[2fr_9fr_2fr] gap-[0.3vh] w-full h-full overflow-hidden">
        <div className="flex flex-col h-full max-h-full bg-[#F1F1F1] overflow-hidden">
          <div className="grid grid-rows-11 gap-[0.3vh] h-full bg-white rounded-lg shadow-inner">
            <div className="flex items-center justify-center h-full w-[94%] py-[0.4vh] ml-1">
              <div className="bg-black text-white rounded-full px-2 flex items-center h-full w-full shadow-sm border border-black">
                <input 
                  type="checkbox" 
                  className="w-3 h-3 accent-blue-500"
                  checked={hundredsSelected.every(v => v)} 
                  onChange={() => toggleAll('100')} 
                />
                <span className="text-[clamp(7px,1.1vw,11px)] font-black flex-1 text-center pr-4 leading-none">
                  ALL
                </span>
              </div>
            </div>

            {hundredsSelected.map((sel, i) => (
              <div key={i} className="flex items-center px-1 py-[0.4vh] overflow-hidden">
                <div 
                  className={`flex items-center px-1 rounded-full border-[1.5px] h-full w-full min-h-0 py-0.5 transition-all ${
                    curr100sIdx === i 
                    ? 'bg-black text-white border-black shadow-md' 
                    : 'bg-white text-gray-800 border-black'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    className="w-3 h-3 accent-blue-500"
                    checked={sel} 
                    onChange={() => { 
                      const n = [...hundredsSelected]; 
                      n[i] = !n[i]; 
                      setHundredsSelected(n); 
                      if(n[i]) stampData(thousandsSelected, n); 
                    }} 
                  />
                  <button 
                    onClick={() => setCurr100sIdx(i)} 
                    className="flex-1 flex items-center justify-center text-[10px] font-black pr-4 h-full leading-none"
                  >
                    {curr1000sIdx}{i}00-{curr1000sIdx}{i}99
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Center Column */}
        <div key={refreshTrigger} className="flex flex-col w-full h-full overflow-hidden min-w-0 bg-[#F1F1F1]">

          <div className="grid grid-cols-11 grid-rows-11 gap-[0.3vh] w-full h-full p-[0.5vh] rounded-xl shadow-sm">

            <div className="flex items-center justify-center">
              <span className="text-xs font-black text-black uppercase">BLOCK</span>
            </div>

            {/* B rows */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`head-b-${i}`} className="flex flex-col items-center gap-[0.1vh]">
                <div className="text-[clamp(5px,1vw,10px)] font-black text-black uppercase">B{i}</div>
                <input 
                  type="number" 
                  placeholder="" 
                  size={1}
                  onChange={(e) => updateMapValues(Array.from({ length: 10 }, (_, r) => r * 10 + i), e.target.value, `b${i}`)} 
                  className="w-full h-[2.5vh] min-w-0 rounded-full border-[1.5px] border-black
                    text-center text-xs font-bold 
                    appearance-none p-0 leading-none 
                    flex items-center justify-center
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-webkit-outer-spin-button]:appearance-none 
                    focus:outline-none focus:border-black" 
                />
              </div>
            ))}

            {/* f cell + 10 cells */}
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                
                <div className="flex flex-col items-center gap-[0.1vh]">
                  <div className="text-[clamp(5px,1vw,10px)] font-black text-black uppercase">F{rowIndex}</div>
                  <input 
                    type="number" 
                    size={1}
                    placeholder="" 
                    onChange={(e) => updateMapValues(Array.from({ length: 10 }, (_, c) => rowIndex * 10 + c), e.target.value, `f${rowIndex}`)} 
                    className="w-full h-full max-h-[3vh] rounded-full border border-black text-center text-[clamp(6px,1.2vw,11px)] font-bold p-0 flex items-center justify-center focus:outline-none"
                  />
                </div>


                {Array.from({ length: 10 }).map((_, colIndex) => {
                  const localId = (rowIndex * 10) + colIndex;
                  const absoluteId = (curr1000sIdx * 1000) + (curr100sIdx * 100) + localId;
                  const disabled = !isCellAllowed(localId);

                  return (
                    <div key={absoluteId} className="flex flex-col items-center gap-[0vh]">
                        <span className={`text-[clamp(6px,1vw,10px)] font-black ${disabled ? 'text-gray-300' : 'text-black'}`}>
                        {/* {absoluteId} */}
                        {String(absoluteId).padStart(4, '0')}
                      </span>
                      <input 
                        type="number" 
                        size={1}
                        disabled={disabled}
                        value={valueMap[absoluteId] || ""} 
                        onChange={(e) => updateMapValues([localId], e.target.value, `cell${absoluteId}`, true)} 
                        className={`w-full h-[3vh] rounded-full border-[1.5px] border-black
                          text-center text-xs font-bold 
                          appearance-none p-0 leading-none 
                          flex items-center justify-center
                          [&::-webkit-inner-spin-button]:appearance-none 
                          [&::-webkit-outer-spin-button]:appearance-none 
                          focus:outline-none focus:border-black
                          ${disabled ? 'border-gray-200 bg-gray-50' : 'border-black bg-white focus:border-black'}
                          ${valueMap[absoluteId] ? 'border-black' : ''}`} 
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col h-full max-h-full bg-[#F1F1F1] overflow-hidden">
          <div className="grid grid-rows-11 gap-y-[0.8vh] h-full">
            
            <div className="grid grid-cols-2 gap-x-1">
              <div className="flex items-center justify-center  bg-[#FE0D09] rounded-md border-b border-gray-300">
                <span className="text-[clamp(5px,1vw,9px)] font-black  text-white">QTY</span>
              </div>
              <div className="flex items-center justify-center bg-[#FE0D09] rounded-md border-b border-gray-300">
                <span className="text-[clamp(5px,1vw,9px)] font-black text-white">AMT</span>
              </div>
            </div>

            {rowStats.map((stat, i) => (
              <div key={i} className="grid grid-cols-2 gap-1 h-full min-h-0 py-0.5">
                <div className="flex items-center justify-center bg-[#010180] rounded-full border border-black h-full">
                  <span className="text-[clamp(6px,1.1vw,10px)] font-bold text-white leading-none">{stat.qty}</span>
                </div>
                <div className="flex items-center justify-center bg-[#010180] rounded-full border border-black h-full">
                  <span className="text-[clamp(6px,1.1vw,10px)] font-bold text-white leading-none">{stat.amt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='grid grid-cols-[25fr_55fr_20fr] border-t-2 border-black bg-white overflow-hidden h-full'>
        <div className='bg-[#FE0000] flex justify-center items-center text-white text-[clamp(6px,1.2vw,12px)] font-bold text-center px-[0.3vw] h-full'>Advance Draw F9</div>
        <div className='flex flex-row bg-[#7E22CD] items-center justify-end h-full px-[1vw]'>
          <button className='bg-[#FE0000] rounded-md h-[60%] w-[60%] text-white text-[clamp(6px,1.2vw,12px)] font-bold flex items-center justify-center' onClick={handleBuy}>
              Buy
          </button>
        </div>
        <div className='flex flex-row bg-[#00807F] justify-around items-center h-full'>
          <div className='bg-white h-[60%] w-[35%] text-[clamp(8px,1.5vw,16px)] rounded-md font-bold flex items-center justify-center'>
            {grandTotals.qty}
          </div>
          <div className='bg-white h-[60%] w-[35%] text-[clamp(8px,1.5vw,16px)] rounded-md font-bold flex items-center justify-center'>
            {grandTotals.amt}
          </div>
        </div>
      </div>
    </div>
  );
}