import axios from "axios"

const baseURL = import.meta.env.PROD 
    ? "" 
    : "http://localhost:5000";

const AXIOS_API = axios.create(
    {
        baseURL:baseURL,
        withCredentials: true
    }
)

export default AXIOS_API