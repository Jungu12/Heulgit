import { setToken } from '@store/auth';
import store from '@store/store';
import { AuthType } from '@typedef/common.types';
import Axios, {
	AxiosRequestConfig,
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
} from 'axios';

const axios = Axios.create();
const authAxios = Axios.create();
axios.defaults.baseURL = 'https://i9d211.p.ssafy.io/api/';
// axios.defaults.baseURL = 'http://i9d211.p.ssafy.io/api/';
// axios.defaults.baseURL = 'http://192.168.100.64:8080/api/';
axios.defaults.withCredentials = true;
authAxios.defaults.baseURL = 'https://i9d211.p.ssafy.io/api/';
// authAxios.defaults.baseURL = 'http://192.168.100.64:8080/api/';
authAxios.defaults.withCredentials = true;

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

// 인터셉터 설정
authAxios.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		console.log('엑세스 토큰 확인');

		const accessToken = store.getState().auth.token;
		console.log('엑세스 토큰 :', accessToken);

		if (accessToken) {
			config.headers = config.headers || {};
			(
				config.headers as AxiosRequestHeaders
			).Authorization = `Bearer ${accessToken}`;
		}
		// 없는 경우 리프레시 토큰으로 액세스 토큰 재발급
		else {
			try {
				const refreshResponse = await http.get<AuthType>('oauth/refresh-token');
				const newAccessToken = refreshResponse.accessToken;

				if (newAccessToken) {
					config.headers = config.headers || {};
					(
						config.headers as AxiosRequestHeaders
					).Authorization = `Bearer ${newAccessToken}`;

					// 액세스 토큰을 리덕스 스토어에 저장
					store.dispatch(setToken(newAccessToken)); // setToken은 리덕스 액션으로 액세스 토큰을 저장하는 액션입니다.
				}
			} catch (error) {
				console.error('액세스 토큰 재발급 실패:', error);
				// 재발급 실패 시 로그아웃 등의 처리를 진행할 수 있습니다.
			}
		}
		return config;
	},
	(error) => {
		console.log('엑세스 토큰 만료..?');
		console.error(error);
		return Promise.reject(error);
	},
);

export const authHttp = {
	get: async function get<Response = unknown>(
		url: string,
		header?: AxiosRequestConfig['headers'],
		params?: object,
	) {
		const options: AxiosRequestConfig = {
			headers: header,
			params: params,
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
