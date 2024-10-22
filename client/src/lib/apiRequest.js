import axios from "axios";

const apiRequest = axios.create({
    baseURL: "eksp-psyhh-katse-backend.vercel.app/start-test",
    withCredentials: true,
})

export default apiRequest