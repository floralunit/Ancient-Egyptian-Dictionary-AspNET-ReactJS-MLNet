import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.ancient-egyptian-helper.ru/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;