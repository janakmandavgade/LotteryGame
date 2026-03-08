import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchResults(date = "") {

    try {

        const token = localStorage.getItem("token");

        const url = date
            ? `${BACKEND_URL}api/fetch_result?date=${date}`
            : `${BACKEND_URL}api/fetch_result`;

        const res = await axios.get(url, {
            headers: {
                "x-api-key": API_KEY,
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;

    } catch (error) {

        console.error("Error fetching results:", error);

        return [];

    }
}