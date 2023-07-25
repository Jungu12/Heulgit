import Axios from 'axios';
const axios = Axios.create();

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
