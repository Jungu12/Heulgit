import { RootState } from '@store/index';
import Axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { useSelector } from 'react-redux';
const axios = Axios.create();
const authAxios = Axios.create();
axios.defaults.baseURL = 'https://i9d211.p.ssafy.io/api/';
// axios.defaults.baseURL = 'http://192.168.100.84:8080/';
axios.defaults.withCredentials = true;
authAxios.defaults.baseURL = 'https://i9d211.p.ssafy.io/api/';
authAxios.defaults.withCredentials = true;

// 인터셉터 설정
authAxios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = useSelector((state: RootState) => state.auth.token);
		if (accessToken) {
			config.headers = config.headers || {};
			(
				config.headers as AxiosRequestHeaders
			).Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		console.error(error);
		return Promise.reject(error);
	},
);

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

export const authHttp = {
	get: async function get<Response = unknown>(url: string) {
		const res = await authAxios.get<Response>(url);
		return res.data;
	},
	post: async function post<Response = unknown, Request = unknown>(
		url: string,
		body?: Request,
	) {
		const res = await authAxios.post<Response>(url, body);
		return res.data;
	},
};
