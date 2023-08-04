import Axios from 'axios';
const axios = Axios.create();
axios.defaults.baseURL = 'https://i9d211.p.ssafy.io:9001/';
// axios.defaults.baseURL = 'http://192.168.100.84:8080/';
axios.defaults.withCredentials = true;

export const http = {
	get: async function get<Response = unknown>(url: string) {
		const res = await axios.get<Response>(url);
		return res.data;
	},
	post: async function post<Response = unknown, Request = unknown>(
		url: string,
		body?: Request,
	) {
		const res = await axios.post<Response>(url, body);
		return res.data;
	},
};
