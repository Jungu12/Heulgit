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
`;

const StyledInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	right: auto;
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
			<StyledLog>
				<div>{userLName}</div>
				<div> {userLog}</div>
			</StyledLog>

			<StyledInfoContainer>
				<div>{getTimeAgo(logDate)}</div>
				<StyledUnReadNum>{unReadNum}</StyledUnReadNum>
			</StyledInfoContainer>
		</StyledUserLog>
	);
};

export default UserLog;
