import axios from "axios";
import { useState } from "react";
import { getUsernameFromToken } from "./token-service";

const URL = "http://localhost:8083/korisnik";
export function getKorisnikPoKorisnickomImenu(korisnickoIme) {
	return axios.get(
		"http://localhost:8083/korisnikPoKorisnickomImenu/" + korisnickoIme
	);
}

export function getKorisnici(sortBy) {
	return axios.get(URL + "?sortBy=" + sortBy);
}
