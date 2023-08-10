import store from '@store/store';
import Axios, {
	AxiosRequestConfig,
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
} from 'axios';

const axios = Axios.create();
const authAxios = Axios.create();
axios.defaults.baseURL = 'https://i9d211.p.ssafy.io/api/';
// axios.defaults.baseURL = 'http://192.168.100.64:8080/api/';
axios.defaults.withCredentials = true;
authAxios.defaults.baseURL = 'https://i9d211.p.ssafy.io/api/';
// authAxios.defaults.baseURL = 'http://192.168.0.10:8080/api/';
authAxios.defaults.withCredentials = true;

// 인터셉터 설정
authAxios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		console.log('엑세스 토큰 확인');

		const accessToken = store.getState().auth.token;
		console.log('엑세스 토큰 :', accessToken);

		if (accessToken) {
			config.headers = config.headers || {};
			(
				config.headers as AxiosRequestHeaders
			).Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		console.log('엑세스 토큰 만료..?');
		console.error(error);
		return Promise.reject(error);
	},
);

export const http = {
	get: async function get<Response = unknown>(
		url: string,
		header?: AxiosRequestConfig['headers'],
	) {
		const options: AxiosRequestConfig = {
			headers: header,
		};

		const res = await axios.get<Response>(url, options);
		return res.data;
	},
	post: async function post<Response = unknown, Request = unknown>(
		url: string,
		body?: Request,
		header?: AxiosRequestConfig['headers'],
	) {
		const options: AxiosRequestConfig = {
			headers: header,
		};

		const res = await axios.post<Response>(url, body, options);
		return res.data;
	},
};

export const authHttp = {
	get: async function get<Response = unknown>(
		url: string,
		header?: AxiosRequestConfig['headers'],
	) {
		const options: AxiosRequestConfig = {
			headers: header,
		};
		const res = await authAxios.get<Response>(url, options);
		return res.data;
	},

	post: async function post<Response = unknown, Request = unknown>(
		url: string,
		body?: Request,
		header?: AxiosRequestConfig['headers'],
	) {
		const options: AxiosRequestConfig = {
			headers: header,
		};

		const res = await authAxios.post<Response>(url, body, options);
		return res.data;
	},

	put: async function put<Response = unknown, Request = unknown>(
		url: string,
		body?: Request,
		header?: AxiosRequestConfig['headers'],
	) {
		const options: AxiosRequestConfig = {
			headers: header,
		};

		const res = await authAxios.put<Response>(url, body, options);
		return res.data;
	},
	delete: async function axiosDelete<Response = unknown>(
		url: string,
		header?: AxiosRequestConfig['headers'],
	) {
		const options: AxiosRequestConfig = {
			headers: header,
		};
		const res = await authAxios.delete<Response>(url, options);
		return res.data;
	},
};
