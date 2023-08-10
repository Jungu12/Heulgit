import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
	redirectTo: string;
};

const PrivateRoutes = ({ redirectTo }: Props) => {
	useEffect(() => {
		console.log('방어!', localStorage.getItem('login'));
	}, []);

	return localStorage.getItem('login') ? (
		<Outlet />
	) : (
		<Navigate to={redirectTo} replace />
	);
};

export default PrivateRoutes;
