import React, { useEffect } from 'react';

const LoginCallBackPage = () => {
	// 인가 코드 파싱해서 서버에 보내주기
	useEffect(() => {
		const params = new URL(document.location.toString()).searchParams;
		const code = params.get('code');

		console.log(code);
	}, []);

	return <div>LoginCallBackPage</div>;
};

export default LoginCallBackPage;
