import axios from "axios";
import jwt_decode from "jwt-decode";

export function setToken(token) {
	localStorage.setItem("token", token);
}
export function getToken() {
	return localStorage.getItem("token");
}

export function getUsernameFromToken() {
	return decodeToken()?.sub;
}

export function getTipKorisnikaFromToken() {
	return decodeToken()?.auth;
}

function decodeToken() {
	const token = getToken();
	return !!token ? jwt_decode(token) : null;
}

export function setAxiosInterceptors() {
	axios.interceptors.request.use(function (config) {
		const token = getToken();
		config.headers.Authorization = token ? "Bearer " + token : null;
		console.log(config.headers.Authorization);
		return config;
	});
}
