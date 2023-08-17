import React, { useCallback, useEffect } from 'react';
import LoginMobilePage from './LoginPageMobile';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigation = useNavigate();
	// oauth 요청 URL
	// const githubURL = `http://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo user&redirect_uri=http://localhost:3000/oauth/github`;
	const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=public_repo user&redirect_uri=https://i9d211.p.ssafy.io/oauth/github`;

	const onClickLoginButton = useCallback(() => {
		window.location.href = githubURL;
	}, []);

	useEffect(() => {
		if (localStorage.getItem('login')) {
			console.log('로그이인!');
			console.log(localStorage.getItem('login'));

			// window.location.replace('/');
			navigation('/');
		}
	}, []);

	return <LoginMobilePage onClickLoginButton={onClickLoginButton} />;
};

export default LoginPage;
