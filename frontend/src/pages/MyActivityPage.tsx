import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
	height: 55px;
`;

const BackButton = styled.button``;

const StyledActivityMenu = styled.div`
	display: flex;
	align-items: center;
	height: 55px;
`;

const MyActivityPage = () => {
	return (
		<div>
			<Header>
				<BackButton>◀</BackButton>
				헤더
			</Header>
			<hr />
			<div>
				<StyledActivityMenu>흘깃</StyledActivityMenu>
				<StyledActivityMenu>커뮤니티</StyledActivityMenu>
				<StyledActivityMenu>댓글</StyledActivityMenu>
				<StyledActivityMenu>로그아웃</StyledActivityMenu>
			</div>
		</div>
	);
};

export default MyActivityPage;
