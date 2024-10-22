import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/start-test",
    withCredentials: true,
})

export default apiRequest