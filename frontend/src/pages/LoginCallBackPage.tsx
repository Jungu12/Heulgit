import { setToken } from '@store/auth';
import { http } from '@utils/http';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginCallBackPage = () => {
	const navigation = useNavigate();

	const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

	const getToken = useCallback(async (code: string) => {
		http
			.post<{
				accessToken: string;
				refreshToken: string;
			}>(`http://i9d211.p.ssafy.io:9001/oauth/github`, {
				code: code,
			})
			.then((response) => {
				console.log(response);
				// 로그인 성공 시 토큰 저장하고 홈화면으로 보내기
				dispatch(setToken(response.accessToken));
				navigation('/');
			})
			.catch((error) => {
				console.log(error);
				// 로그인 실패 시 에러메시지 띄우고 다시 로그인 화면으로
				alert('로그인에 실패했습니다.');
				navigation('/login');
			});
	}, []);

	// 인가 코드 파싱해서 서버에 보내주기
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get('code');

		if (code) {
			getToken(code);
		}
	}, []);

	return <div>loading</div>;
};

export default LoginCallBackPage;
