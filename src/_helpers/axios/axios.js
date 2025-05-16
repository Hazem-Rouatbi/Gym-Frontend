import axios from "axios";

export const initAxios = () => {
    axios.defaults.timeout = 2000;
    axios.defaults.withCredentials = true;
};
