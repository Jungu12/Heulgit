import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
	redirectTo: string;
};

const PrivateRoutes = ({ redirectTo }: Props) => {
	return localStorage.getItem('login') ? (
		<Outlet />
	) : (
		<Navigate to={redirectTo} replace />
	);
};

export default PrivateRoutes;
