import axios from "axios";
import { getToken } from "./token-service";

const URL = "http://localhost:8083/placanje";
export function getPlacanja() {

    axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
    return axios.get(URL);
}