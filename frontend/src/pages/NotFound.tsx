// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useCallback } from 'react';
import { Mobile, PC, Tablet } from '@components/common/MediaQuery';
import { useNavigate } from 'react-router-dom';
import NotFoundWeb from './NotFound/NotFoundWeb';
import NotFoundMobile from './NotFound/NotFoundMobile';

const NotFound = () => {
	const navigation = useNavigate();

	const onClickBack = useCallback(() => {
		navigation(-1);
	}, []);

	const onClickHome = useCallback(() => {
		navigation('/');
	}, []);

	return (
		<>
			<Mobile>
				<NotFoundMobile onClickBack={onClickBack} onClickHome={onClickHome} />
			</Mobile>
			<Tablet>
				<NotFoundWeb onClickBack={onClickBack} onClickHome={onClickHome} />
			</Tablet>
			<PC>
				<NotFoundWeb onClickBack={onClickBack} onClickHome={onClickHome} />
			</PC>
		</>
	);
};

export default NotFound;
