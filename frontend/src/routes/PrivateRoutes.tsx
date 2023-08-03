import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
	loginState: boolean;
	redirectTo: string;
};

const PrivateRoutes = ({ redirectTo, loginState }: Props) => {
	return loginState ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoutes;
