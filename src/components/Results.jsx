import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchResults } from "../utils/fetchResults";

export default function Results(){

    const navigate = useNavigate();

    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
    });

    const [selectedDate, setSelectedDate] = useState(today);
    const [resultsMap, setResultsMap] = useState({});

    const loadResults = async (date) => {

        const stored = localStorage.getItem("resultsMap");
        let map = stored ? JSON.parse(stored) : {};

        const results = await fetchResults(date);

        map[date] = results;

        localStorage.setItem("resultsMap", JSON.stringify(map));

        setResultsMap(map);
    };

    useEffect(() => {
        loadResults(today);
    }, []);

    const handleDateChange = async (e) => {

        const date = e.target.value;

        setSelectedDate(date);

        await loadResults(date);
    };

    const results = resultsMap?.[selectedDate] || [];

    return (
        <div className="flex flex-col h-dvh w-full bg-gray-100">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white shadow shrink-0">

                <button
                    onClick={() => navigate("/game")}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    Back
                </button>

                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border px-2 py-1 rounded"
                />

                <div></div>

            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">

                <div className="text-center text-sm text-gray-600">
                    (Note: Recent times first)
                </div>

                {results.map((res, idx) => (

                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow p-3"
                    >

                        <div className="font-bold text-center mb-3">
                            Time Generated: {
    new Date(`${res.date}T${res.result_time}:00`).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata"
    })
}
                        </div>

                        {Array.from({ length: Math.ceil(res.result.length / 10) }).map((_, i) => {

    const start = i * 10;
    const values = res.result.slice(start, start + 10);

    if (!values.length) return null;

    const rangeStart = i * 1000;
    const rangeEnd = rangeStart + 999;

    return (

        <div key={i} className="mb-4">

            <div className="font-semibold text-center mb-2">
                Range: {rangeStart}-{rangeEnd}
            </div>

            <div className="grid grid-cols-3 gap-2">

                {values.map((val, v) => (

                    <div
                        key={v}
                        className="bg-gray-200 rounded text-center py-1 text-sm"
                    >
                        {val}
                    </div>

                ))}

            </div>

        </div>

    );

})}

                    </div>

                ))}

            </div>

        </div>
    );
}