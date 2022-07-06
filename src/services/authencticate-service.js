import axios from "axios";

export function postAuthenticate(korisnickoIme, lozinka) {
	return axios.post("http://localhost:8083/authenticate", {
		username: korisnickoIme,
		password: lozinka,
	});
}
