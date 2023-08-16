import { RootState } from '@store/index';
import { EventSourcePolyfill } from 'event-source-polyfill';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
	redirectTo: string;
};

const PrivateRoutes: React.FC<Props> = ({ redirectTo }: Props) => {
	const isLogin = localStorage.getItem('login') ? true : false;
	const accessToken = useSelector((state: RootState) => state.auth.token);

	useEffect(() => {
		let eventSource: EventSourcePolyfill | null = null;
		if (isLogin && accessToken) {
			const fetchSse = async () => {
				try {
					eventSource = new EventSourcePolyfill(
						`https://i9d211.p.ssafy.io/api/notifications/connect`,
						{
							headers: {
								Authorization: accessToken,
							},
							withCredentials: true,
						},
					);

					eventSource.onmessage = async (event) => {
						const res = await event.data;
						console.log(res);
					};

					eventSource.onerror = async (event) => {
						console.log(event);
					};
				} catch (error) {
					console.error(error);
				}
			};

			fetchSse();
		}
		return () => {
			eventSource?.close();
		};
	}, [isLogin, accessToken]);

	return isLogin ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoutes;
