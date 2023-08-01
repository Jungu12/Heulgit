import { http } from '@utils/http';
import React, { useCallback, useEffect } from 'react';

const LoginCallBackPage = () => {
	const getToken = useCallback(async (code: string) => {
		http.post(`http://i9d211.p.ssafy.io:9001/oauth/github`, {
			code: code,
		});
	}, []);

	// 인가 코드 파싱해서 서버에 보내주기
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get('code');

		if (code) {
			const tokens = getToken(code);
			console.log(tokens);
		}
	}, []);

	return <div>LoginCallBackPage</div>;
};

export default LoginCallBackPage;
