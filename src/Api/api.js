import axios from "axios"

const AXIOS_API = axios.create(
    {
        baseURL:import.meta.env.VITE_API_URL || "http://localhost:5000" || "/",
        withCredentials: true
    }
)

export default AXIOS_API