import { setUser } from '@store/user';
import { AuthType, UserType } from '@typedef/common.types';
import { authHttp, http } from '@utils/http';

/**
 * 로그인 시 토큰 저장하기
 * @param code
 * @returns
 */
export const gitLogin = async (code: string) => {
	try {
		const response = await http.post<AuthType>(`oauth/github`, {
			code: code,
		});

		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * 유저 정보 저장하기
 * @param code
 * @returns
 */
export const setUserData = async () => {
	authHttp.get<UserType>('user').then((res) => {
		setUser(res);
	});
};
