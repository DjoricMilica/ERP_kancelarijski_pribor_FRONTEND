import axios from "axios";
import { getToken } from "./token-service";

const URL = "http://localhost:8083/proizvod";
function setHeaders() {
    return axios.defaults.headers.common["Authorization"] = "Bearer " + getToken();
}
export function getProizvodi(pageNo) {
    //setHeaders();
    return axios.get(URL + "?pageNo=" + pageNo);
}

export function deleteProizvod(id) {
    setHeaders();
    return axios.delete(URL + "/" + id)
}

export function putProizvod(id, cena, naziv, naStanju, jedinica, vrsta, vrstaId, kategorija, kategorijaId, proizvodjac, proizvodjacId) {
    setHeaders();
    return axios.put(URL, {
        proizvodId: id,
        cena: cena,
        jedinica: jedinica,
        naStanju: naStanju,
        naziv: naziv,
        kategorija: {
            kategorijaId: kategorijaId,
            nazivKategorija: kategorija
        },
        proizvodjac: {
            proizvodjacId: proizvodjacId,
            nazivProizvodjaca: proizvodjac
        },
        vrsta: {
            vrstaId: vrstaId,
            nazivVrste: vrsta
        }
    });
}

export function getProizvodById(proizvidId) {
    setHeaders();
    return axios.get(URL + "/" + proizvidId)
}