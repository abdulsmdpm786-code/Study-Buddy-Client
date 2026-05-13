import axios from "axios"

const AXIOS_API = axios.create(
    {
        baseURL:"/",
        withCredentials: true
    }
)

export default AXIOS_API