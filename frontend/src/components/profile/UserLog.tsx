import { colors } from '@constants/colors';
import { UserDetailType } from '@typedef/gm/gm.types';
import { getTimeAgo } from '@utils/date';
import React from 'react';
import { styled } from 'styled-components';

type LogProps = {
	$isRead: boolean;
};

const StyledUserLog = styled.div`
	display: flex;
`;
const StyledUserImage = styled.img`
	display: flex;
	justify-content: flex-start;
	background-color: black;
	height: 45px;
	width: 45px;
	border-radius: 50px;
`;
const StyledLog = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 11px;
`;

const StyledUnReadNum = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: red;
	color: white;
	font-size: 12px;
	font-weight: 500;
	padding: 4px;
	height: 24px;
	width: 24px;
	margin-left: auto;
`;

const StyledInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 4px;
	justify-content: space-between;

	.current-date {
		font-size: 14px;
		font-weight: 500;
		color: ${colors.greyScale.grey3};
	}
`;

const StyeldChatDataContainer = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
`;

const StyledUserName = styled.p`
	font-size: 16px;
	font-weight: 700;
`;

const StyledLastMessage = styled.p<LogProps>`
	font-size: 14px;
	font-weight: 500;
	color: ${(props) => (props.$isRead ? 'black' : colors.greyScale.grey3)};
`;

type Props = {
	user: UserDetailType;
	userLog: string;
	logDate: string;
	unReadNum: number;
};

const UserLog = ({ user, userLog, logDate, unReadNum }: Props) => {
	return (
		<StyledUserLog>
			<StyledUserImage src={user.avater_url} alt="User" />
			<StyeldChatDataContainer>
				<StyledLog>
					<StyledUserName>{user.id}</StyledUserName>
					<StyledLastMessage $isRead={unReadNum > 0}>
						{userLog}
					</StyledLastMessage>
				</StyledLog>

				<StyledInfoContainer>
					<div className="current-date">{getTimeAgo(logDate)}</div>
					{unReadNum > 0 && <StyledUnReadNum>{unReadNum}</StyledUnReadNum>}
				</StyledInfoContainer>
			</StyeldChatDataContainer>
		</StyledUserLog>
	);
};

export default UserLog;
