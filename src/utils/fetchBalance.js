import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchBalance() {

    try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "api/fetch_balance",
            {
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY,
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const balance = res.data.balance;

        localStorage.setItem("balance", balance);

        return balance;

    } catch (error) {

        console.error(error);
        return 0;

    }
}