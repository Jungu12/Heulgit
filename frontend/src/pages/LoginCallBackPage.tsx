import { setToken } from '@store/auth';
import { authHttp, http } from '@utils/http';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';
import loadingCat from '../loading.json';
import { setUserData } from '@utils/api/Login/loginApi';

const StyledCallBackContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(var(--vh, 1vh) * 100);
	align-items: center;
	justify-content: center;

	p {
		margin-top: 24px;
		font-family: 'RixYeoljeongdo_Regular';
		font-size: 28px;
	}
`;

const LoginCallBackPage = () => {
	const navigation = useNavigate();
	const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
	const getToken = useCallback(
		async (code: string) => {
			http
				.post<{
					accessToken: string;
					refreshToken: string;
				}>(`oauth/github`, {
					code: code,
				})
				.then((response) => {
					const { accessToken } = response;
					console.log(response);
					// 로그인 성공 시 토큰과 아이콘 저장 및 로컬 스토리지에 로그인 정보 저장하고 홈화면으로 보내기
					dispatch(setToken(accessToken));
					window.localStorage.setItem('login', 'true');
					authHttp.get('users/repo').then(() => console.log('레포 슥삭'));
				})
				.then(() => {
					// navigation('/', { replace: true });
					setUserData().then(() => navigation('/', { replace: true }));
				})
				.catch((error) => {
					console.log(error);
					// 로그인 실패 시 에러메시지 띄우고 다시 로그인 화면으로
					alert('로그인에 실패했습니다.');
					navigation('/login', { replace: true });
				});
		},
		[navigation, dispatch],
	);

	// 인가 코드 파싱해서 서버에 보내주기
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get('code');

		if (code) {
			getToken(code);
		}
	}, []);

	return (
		<StyledCallBackContainer>
			<Lottie
				animationData={loadingCat}
				loop={true}
				style={{
					width: '300px',
					height: '300px',
				}}
			/>
			<p>잠시만 기다려주세요</p>
		</StyledCallBackContainer>
	);
};

export default LoginCallBackPage;
