import Header from '@components/common/Header';
import NotiFollow from '@components/notification/NotiFollow';
import { useQuery } from '@tanstack/react-query';
import { UnionNotificationType } from '@typedef/notification/notification.types';
import { isWithinOneMonth } from '@utils/date';
import { authHttp } from '@utils/http';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

// 알림 전체 컨테이너
const StyledNotificationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;

	height: 100vh;
`;

// 이번 주 알림 컨테이너
const StyledWeekNotiContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	top: 56px;
	width: 100%;
`;

// 알림
const StyledNotiDiv = styled.div`
	display: flex;
	position: relative;
	align-items: center;

	font-size: 16px;
	font-weight: 700;

	height: 50px;
	width: 100%;
`;

// 알림 내용 (이번 주, 이전 알림)
const StyleNoti = styled.div`
	display: flex;
	justify-content: start;
	margin-left: 18px;
`;

const StyledEmptyNotification = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const NotificationPage = () => {
	const [recentNotifications, setRecentNotifications] = useState<
		UnionNotificationType[]
	>([]);
	const [pastNotifications, setPastNotifications] = useState<
		UnionNotificationType[]
	>([]);

	const { data, refetch } = useQuery(['/notifications'], () =>
		authHttp.get('notifications').then((res) => res as UnionNotificationType[]),
	);

	useEffect(() => {
		if (data) {
			for (const noti of data) {
				if (isWithinOneMonth(noti.createdDate)) {
					setRecentNotifications((prev) => [...prev, noti]);
					continue;
				}
				setPastNotifications((prev) => [...prev, noti]);
			}
		}
	}, [data]);

	console.log(data);

	return (
		<StyledNotificationContainer>
			<Header title="알림" />
			{pastNotifications.length === 0 && recentNotifications.length === 0 ? (
				<StyledEmptyNotification>알림이 없습니다.</StyledEmptyNotification>
			) : (
				<>
					<StyledWeekNotiContainer>
						<StyledNotiDiv>
							<StyleNoti>이번 주</StyleNoti>
						</StyledNotiDiv>
						<NotiFollow
							notificationList={recentNotifications}
							refetch={refetch}
						/>
					</StyledWeekNotiContainer>
					{pastNotifications.length && (
						<StyledWeekNotiContainer>
							<StyledNotiDiv>
								<StyleNoti>이전 알림</StyleNoti>
							</StyledNotiDiv>
							<NotiFollow
								notificationList={pastNotifications}
								refetch={refetch}
							/>
						</StyledWeekNotiContainer>
					)}
				</>
			)}
		</StyledNotificationContainer>
	);
};

export default NotificationPage;
