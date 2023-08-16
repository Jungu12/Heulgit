import Header from '@components/common/Header';
import NotiFollow from '@components/notification/NotiFollow';
import { useQuery } from '@tanstack/react-query';
import { authHttp } from '@utils/http';
import React from 'react';
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

const NotificationPage = () => {
	const { data } = useQuery(['/notifications'], () => {
		authHttp
			.get('notifications')
			.then((res) => console.log('[알림 테스트]', res));
	});

	console.log(data);

	return (
		<StyledNotificationContainer>
			<Header title="알림" />
			<StyledWeekNotiContainer>
				<StyledNotiDiv>
					<StyleNoti>이번 주</StyleNoti>
				</StyledNotiDiv>
				<NotiFollow />
			</StyledWeekNotiContainer>
			<StyledWeekNotiContainer>
				<StyledNotiDiv>
					<StyleNoti>이전 알림</StyleNoti>
				</StyledNotiDiv>
				<NotiFollow />
			</StyledWeekNotiContainer>
		</StyledNotificationContainer>
	);
};

export default NotificationPage;
