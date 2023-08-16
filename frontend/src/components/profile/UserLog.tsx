import { getTimeAgo } from '@utils/date';
import React from 'react';
import { styled } from 'styled-components';

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
`;

const StyeldChatDataContainer = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
`;

type Props = {
	userLName: string;
	userLog: string;
	logDate: string;
	unReadNum: number;
};

const UserLog = ({ userLName, userLog, logDate, unReadNum }: Props) => {
	return (
		<StyledUserLog>
			<StyledUserImage src="" alt="User" />
			<StyeldChatDataContainer>
				<StyledLog>
					<div>{userLName}</div>
					<div> {userLog}</div>
				</StyledLog>

				<StyledInfoContainer>
					<div>{getTimeAgo(logDate)}</div>
					<StyledUnReadNum>{unReadNum}</StyledUnReadNum>
				</StyledInfoContainer>
			</StyeldChatDataContainer>
		</StyledUserLog>
	);
};

export default UserLog;
