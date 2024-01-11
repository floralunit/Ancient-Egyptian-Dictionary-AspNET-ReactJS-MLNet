import axios from "axios";
import {API_URL} from "../global-const.js";

const instance = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;