import React, { useCallback, useEffect } from 'react';
import { lotties } from '@constants/lotties';
import catUp from '../../animation_lkrkgwed.json';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import LoginMobilePage from './LoginPageMobile';
import LoginPageTablet from './LoginPageTablet';
import LoginPageWeb from './LoginPageWeb';

const LoginPage = () => {
	// oauth 요청 URL
	const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo user&redirect_uri=http://localhost:3000/oauth/github`;

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
