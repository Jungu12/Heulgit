import React, { useCallback, useEffect } from 'react';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import LoginMobilePage from './LoginPageMobile';
import LoginPageTablet from './LoginPageTablet';
import LoginPageWeb from './LoginPageWeb';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigation = useNavigate();
	// oauth 요청 URL
	// const githubURL = `http://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo user&redirect_uri=http://localhost:3000/oauth/github`;
	const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo user&redirect_uri=https://i9d211.p.ssafy.io/oauth/github`;

	const onClickLoginButton = useCallback(() => {
		window.location.href = githubURL;
	}, []);

	useEffect(() => {
		if (localStorage.getItem('login')) {
			console.log('로그이인!');
			navigation('/');
		}
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
