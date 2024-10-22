import axios from "axios";

const apiRequest = axios.create({
    baseURL: "api/start-test",
    withCredentials: true,
})

export default apiRequest