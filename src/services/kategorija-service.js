import axios from "axios";
import { getToken } from "./token-service";

const URL = "http://localhost:8083/kategorija";
export function getKategorije(pageNo, pageSize, sortBy) {
	axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
	return axios.get(URL + "?pageSize=100"
		//URL + "?pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortby=" + sortBy
	);
}

export function getKategorija(kategorijaId) {
	//return axios.get("${ULR}/${kategorijaId}");
}

export function postKategorija(kategorija) {
	axios.post(URL, kategorija);
}

export function putKategorija(kategorija) {
	//axios.put("${ULR}/$kategorija.kategorijaId", kategorija);
}

export function deleteKategorija(kategorijaId) {
	//axios.delete("${ULR}/${kategorijaId}");
}
