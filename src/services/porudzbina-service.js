import axios from "axios";
import { getToken } from "./token-service";

const URL = "http://localhost:8083/porudzbina";

export function getPorudzbine() {
	axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
	return axios.get(URL + "?pageSize=" + 100);
}
export function postPorudzbina(porudzbina) {
	axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
	return axios.post(URL, porudzbina)
}

export function putPorudzbina(porudzbina) {
	axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
	return axios.put(URL, porudzbina)
}

export function getPorudzbinaById(porudzbinaId) {

	axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
	return axios.get(URL + "/" + porudzbinaId);
}
