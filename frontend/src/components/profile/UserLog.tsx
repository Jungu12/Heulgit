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
	margin-left: 5px;
`;

type Props = {
	userLName: string;
	userLog: string;
	logDate: string;
};

const UserLog = ({ userLName, userLog, logDate }: Props) => {
	return (
		<StyledUserLog>
			<StyledUserImage src="" alt="User" />
			<StyledLog>
				<div>{userLName}</div>
				<div>
					{userLog}
					{logDate}
				</div>
			</StyledLog>
		</StyledUserLog>
	);
};

export default UserLog;
