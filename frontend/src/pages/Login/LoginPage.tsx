import React, { useCallback, useEffect } from 'react';
import { lotties } from '@constants/lotties';
import catUp from '../../animation_lkrkgwed.json';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import LoginMobilePage from './LoginPageMobile';
import LoginPageTablet from './LoginPageTablet';
import LoginPageWeb from './LoginPageWeb';

// 로그인 페이지로 왔을때 리프레시 토큰 확인하고 있는 경우는 메인화면으로 redirect 해야함
const LoginPage = () => {
	// oauth 요청 URL
	const githubURL = `http://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo user&redirect_uri=http://192.168.100.58:3000/oauth/github`;
	// const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo user&redirect_uri=https://i9d211.p.ssafy.io/oauth/github`;

	const onClickLoginButton = useCallback(() => {
		window.location.href = githubURL;
	}, []);

	useEffect(() => {
		console.log(lotties.catUp);
		console.log(catUp);
	}, []);

	return (
		<>
			<Mobile>
				<LoginMobilePage onClickLoginButton={onClickLoginButton} />
			</Mobile>
			<Tablet>
				<LoginPageTablet onClickLoginButton={onClickLoginButton} />
			</Tablet>
			<PC>
				<LoginPageWeb onClickLoginButton={onClickLoginButton} />
			</PC>
		</>
	);
};

export default LoginPage;
